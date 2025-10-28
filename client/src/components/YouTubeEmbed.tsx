import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({ url, title = "YouTube video", className = "" }: YouTubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);
  
  if (!embedUrl) {
    return (
      <div className="bg-muted rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Invalid YouTube URL: {url}
        </p>
      </div>
    );
  }
  
  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        data-testid="youtube-embed"
      />
    </div>
  );
}
