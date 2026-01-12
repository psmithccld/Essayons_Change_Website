import DOMPurify from 'dompurify';
import { YouTubeEmbed } from "./YouTubeEmbed";
import { isYouTubeUrl } from "@/lib/youtube";

interface ContentRendererProps {
  content: string;
  className?: string;
}

type ContentPart = 
  | { type: 'text'; content: string }
  | { type: 'html'; content: string }
  | { type: 'video'; content: string; title?: string }
  | { type: 'image'; content: string; alt?: string };

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

function parseContent(content: string): ContentPart[] {
  const mediaPattern = /\[(video|image):([^\]|]+)(?:\|([^\]]+))?\]/g;
  const parts: ContentPart[] = [];
  
  let lastIndex = 0;
  let match;
  
  while ((match = mediaPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index);
      parts.push({
        type: isHtmlContent(textBefore) ? 'html' : 'text',
        content: textBefore
      });
    }
    
    const mediaType = match[1] as 'video' | 'image';
    const mediaUrl = match[2].trim();
    const mediaLabel = match[3]?.trim();
    
    if (mediaType === 'video') {
      if (isYouTubeUrl(mediaUrl)) {
        parts.push({
          type: 'video',
          content: mediaUrl,
          title: mediaLabel
        });
      } else {
        parts.push({
          type: 'text',
          content: match[0]
        });
      }
    } else if (mediaType === 'image') {
      parts.push({
        type: 'image',
        content: mediaUrl,
        alt: mediaLabel
      });
    }
    
    lastIndex = mediaPattern.lastIndex;
  }
  
  if (lastIndex < content.length) {
    const remaining = content.substring(lastIndex);
    parts.push({
      type: isHtmlContent(remaining) ? 'html' : 'text',
      content: remaining
    });
  }
  
  return parts;
}

export function ContentRenderer({ content, className = "" }: ContentRendererProps) {
  if (!content) {
    return null;
  }
  
  const parts = parseContent(content);
  
  const sanitizeConfig = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'figure', 
      'figcaption', 'div', 'span', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
      'width', 'height', 'style', 'data-*'
    ],
    ALLOW_DATA_ATTR: true,
  };
  
  return (
    <div className={`prose prose-slate max-w-none dark:prose-invert ${className}`}>
      {parts.map((part, index) => {
        if (part.type === 'video') {
          return (
            <div key={index} className="my-8">
              <YouTubeEmbed url={part.content} title={part.title} />
              {part.title && (
                <p className="text-sm text-center text-muted-foreground mt-2">
                  {part.title}
                </p>
              )}
            </div>
          );
        } else if (part.type === 'image') {
          return (
            <figure key={index} className="my-8">
              <img 
                src={part.content} 
                alt={part.alt || ''} 
                className="rounded-lg w-full max-w-2xl mx-auto"
                loading="lazy"
              />
              {part.alt && (
                <figcaption className="text-sm text-center text-muted-foreground mt-2">
                  {part.alt}
                </figcaption>
              )}
            </figure>
          );
        } else if (part.type === 'html') {
          const sanitizedHtml = DOMPurify.sanitize(part.content, sanitizeConfig);
          return (
            <div 
              key={index}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          );
        } else {
          return (
            <div key={index}>
              {part.content.split('\n').map((line, lineIndex) => (
                <p key={lineIndex}>{line || '\u00A0'}</p>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
}
