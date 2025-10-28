import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentRenderer } from "@/components/ContentRenderer";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
interface Attachment {
  id: number;
  kind: string;
  url: string;
  title?: string;
  description?: string;
}

interface Content {
  id: number;
  type: string;
  title: string;
  slug: string;
  summary?: string | null;
  body: string;
  status: string;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  heroImageUrl?: string | null;
  attachments?: Attachment[];
}

interface ContentDetailProps {
  contentType: "blog" | "tutorial";
}

export default function ContentDetail({ contentType }: ContentDetailProps) {
  const [, params] = useRoute(`/${contentType}/:slug`);
  const slug = params?.slug;

  const { data: content, isLoading, error} = useQuery<Content>({
    queryKey: [`/api/content/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold">Content Not Found</h2>
            <p className="text-muted-foreground">
              The {contentType} you're looking for doesn't exist or has been removed.
            </p>
            <Link href={`/${contentType}`}>
              <Button variant="outline" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {contentType === "blog" ? "Blog" : "Tutorials"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const videoAttachments = content.attachments?.filter((a: Attachment) => a.kind === 'video') || [];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back button */}
        <Link href={`/${contentType}`}>
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {contentType === "blog" ? "Blog" : "Tutorials"}
          </Button>
        </Link>

        {/* Hero image */}
        {content.heroImageUrl && (
          <div className="w-full aspect-video rounded-lg overflow-hidden border">
            <img
              src={content.heroImageUrl}
              alt={content.title}
              className="w-full h-full object-cover"
              data-testid="img-hero"
            />
          </div>
        )}

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" data-testid="badge-type">
              {contentType === "blog" ? "Blog Post" : "Tutorial"}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-title">
            {content.title}
          </h1>

          {content.summary && (
            <p className="text-xl text-muted-foreground" data-testid="text-summary">
              {content.summary}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" data-testid="text-date">
              <Calendar className="h-4 w-4" />
              {new Date(content.publishedAt || content.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1" data-testid="text-read-time">
              <Clock className="h-4 w-4" />
              {contentType === "blog" ? "5 min read" : "10 min read"}
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Video attachments */}
        {videoAttachments.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Videos</h2>
            {videoAttachments.map((attachment: Attachment, index: number) => (
              <div key={attachment.id} className="space-y-2" data-testid={`video-attachment-${index}`}>
                <YouTubeEmbed url={attachment.url} title={attachment.title || content.title} />
                {attachment.title && (
                  <h3 className="text-lg font-semibold">{attachment.title}</h3>
                )}
                {attachment.description && (
                  <p className="text-sm text-muted-foreground">{attachment.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content body */}
        <ContentRenderer content={content.body} data-testid="content-body" />
      </div>
    </div>
  );
}
