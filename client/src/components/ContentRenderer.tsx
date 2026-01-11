import { YouTubeEmbed } from "./YouTubeEmbed";
import { isYouTubeUrl } from "@/lib/youtube";

interface ContentRendererProps {
  content: string;
  className?: string;
}

type ContentPart = 
  | { type: 'text'; content: string }
  | { type: 'video'; content: string; title?: string }
  | { type: 'image'; content: string; alt?: string };

/**
 * Renders content with support for inline video and image embedding
 * Syntax: [video:YOUTUBE_URL] or [video:YOUTUBE_URL|Title]
 *         [image:IMAGE_URL] or [image:IMAGE_URL|Alt text]
 */
export function ContentRenderer({ content, className = "" }: ContentRendererProps) {
  if (!content) {
    return null;
  }
  
  // Parse content for [video:URL], [image:URL] patterns with optional title/alt
  const mediaPattern = /\[(video|image):([^\]|]+)(?:\|([^\]]+))?\]/g;
  const parts: ContentPart[] = [];
  
  let lastIndex = 0;
  let match;
  
  while ((match = mediaPattern.exec(content)) !== null) {
    // Add text before the media
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex, match.index)
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
        // If not a valid YouTube URL, treat as text
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
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.substring(lastIndex)
    });
  }
  
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
        } else {
          // Render text with preserved line breaks
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
