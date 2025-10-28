import { YouTubeEmbed } from "./YouTubeEmbed";
import { isYouTubeUrl } from "@/lib/youtube";

interface ContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders content with support for inline video embedding
 * Syntax: [video:YOUTUBE_URL] or [video:YOUTUBE_URL|Title]
 */
export function ContentRenderer({ content, className = "" }: ContentRendererProps) {
  if (!content) {
    return null;
  }
  
  // Parse content for [video:URL] or [video:URL|Title] patterns
  const videoPattern = /\[video:([^\]|]+)(?:\|([^\]]+))?\]/g;
  const parts: Array<{ type: 'text' | 'video'; content: string; title?: string }> = [];
  
  let lastIndex = 0;
  let match;
  
  while ((match = videoPattern.exec(content)) !== null) {
    // Add text before the video
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex, match.index)
      });
    }
    
    // Add video
    const videoUrl = match[1].trim();
    const videoTitle = match[2]?.trim();
    
    if (isYouTubeUrl(videoUrl)) {
      parts.push({
        type: 'video',
        content: videoUrl,
        title: videoTitle
      });
    } else {
      // If not a valid YouTube URL, treat as text
      parts.push({
        type: 'text',
        content: match[0]
      });
    }
    
    lastIndex = videoPattern.lastIndex;
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
