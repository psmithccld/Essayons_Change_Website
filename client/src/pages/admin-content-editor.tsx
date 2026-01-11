import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Save, Plus, Trash2, Video, ImageIcon } from "lucide-react";
import { isYouTubeUrl } from "@/lib/youtube";

interface Attachment {
  id: number;
  contentId: number;
  kind: string;
  url: string;
  title?: string | null;
  description?: string | null;
  order: number;
}

interface Content {
  id: number;
  type: string;
  title: string;
  slug: string;
  summary?: string;
  body: string;
  status: string;
  publishedAt?: string | null;
  heroImageUrl?: string | null;
  authorId?: number | null;
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
}

export default function AdminContentEditor() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/admin/content/:id");
  const { toast } = useToast();
  const isNewContent = params?.id === "new";
  const contentId = isNewContent ? null : params?.id;

  const [formData, setFormData] = useState({
    type: "blog",
    title: "",
    slug: "",
    summary: "",
    body: "",
    status: "draft",
    heroImageUrl: "",
  });

  const [newVideo, setNewVideo] = useState({
    url: "",
    title: "",
    description: "",
  });

  const [newImage, setNewImage] = useState({
    url: "",
    alt: "",
    description: "",
  });

  const { data: existingContent, isLoading } = useQuery<Content>({
    queryKey: ["/api/admin/content", contentId],
    enabled: !isNewContent && !!contentId,
  });

  useEffect(() => {
    if (existingContent) {
      setFormData({
        type: existingContent.type,
        title: existingContent.title,
        slug: existingContent.slug,
        summary: existingContent.summary || "",
        body: existingContent.body,
        status: existingContent.status,
        heroImageUrl: existingContent.heroImageUrl || "",
      });
    }
  }, [existingContent]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (isNewContent) {
        return await apiRequest("POST", "/api/admin/content", {
          ...data,
          publishedAt: data.status === "published" ? new Date().toISOString() : null,
        });
      } else {
        return await apiRequest("PATCH", `/api/admin/content/${contentId}`, {
          ...data,
          publishedAt: data.status === "published" ? new Date().toISOString() : null,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      toast({
        title: isNewContent ? "Content created" : "Content updated",
        description: `The ${formData.type} has been ${isNewContent ? "created" : "updated"} successfully`,
      });
      navigate("/admin/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.body) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate(formData);
  };

  const createVideoMutation = useMutation({
    mutationFn: async (data: { contentId: number; kind: string; url: string; title?: string | null; description?: string | null; order: number }) => {
      return await apiRequest("POST", "/api/admin/attachments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content", contentId] });
      setNewVideo({ url: "", title: "", description: "" });
      toast({
        title: "Video added",
        description: "The video has been added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive",
      });
    },
  });

  const createImageMutation = useMutation({
    mutationFn: async (data: { contentId: number; kind: string; url: string; title?: string | null; description?: string | null; order: number }) => {
      return await apiRequest("POST", "/api/admin/attachments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content", contentId] });
      setNewImage({ url: "", alt: "", description: "" });
      toast({
        title: "Image added",
        description: "The image has been added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add image",
        variant: "destructive",
      });
    },
  });

  const deleteAttachmentMutation = useMutation({
    mutationFn: async (attachmentId: number) => {
      return await apiRequest("DELETE", `/api/admin/attachments/${attachmentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content", contentId] });
      toast({
        title: "Video deleted",
        description: "The video has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      });
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isNewContent ? generateSlug(title) : prev.slug,
    }));
  };

  const handleAddVideo = () => {
    if (!newVideo.url) {
      toast({
        title: "Validation error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!isYouTubeUrl(newVideo.url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    if (!contentId) {
      toast({
        title: "Save content first",
        description: "Please save the content before adding videos",
        variant: "destructive",
      });
      return;
    }

    const nextOrder = (existingContent?.attachments?.length || 0);
    createVideoMutation.mutate({
      contentId: parseInt(contentId),
      kind: "video",
      url: newVideo.url,
      title: newVideo.title || null,
      description: newVideo.description || null,
      order: nextOrder,
    });
  };

  const handleAddImage = () => {
    if (!newImage.url) {
      toast({
        title: "Validation error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }

    if (!contentId) {
      toast({
        title: "Save content first",
        description: "Please save the content before adding images",
        variant: "destructive",
      });
      return;
    }

    const nextOrder = (existingContent?.attachments?.length || 0);
    createImageMutation.mutate({
      contentId: parseInt(contentId),
      kind: "image",
      url: newImage.url,
      title: newImage.alt || null,
      description: newImage.description || null,
      order: nextOrder,
    });
  };

  const handleDeleteAttachment = (attachmentId: number, type: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      deleteAttachmentMutation.mutate(attachmentId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">
              {isNewContent ? "Create New Content" : "Edit Content"}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>{isNewContent ? "New" : "Edit"} {formData.type}</CardTitle>
            <CardDescription>
              Fill in the details for your {formData.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    disabled={!isNewContent}
                  >
                    <SelectTrigger id="type" data-testid="select-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger id="status" data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  data-testid="input-title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  data-testid="input-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  data-testid="input-summary"
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary or excerpt"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroImageUrl">Hero Image URL</Label>
                <Input
                  id="heroImageUrl"
                  data-testid="input-hero-image"
                  value={formData.heroImageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, heroImageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Content *</Label>
                <Textarea
                  id="body"
                  data-testid="input-body"
                  value={formData.body}
                  onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                  placeholder="Write your content here..."
                  rows={15}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/dashboard")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-testid="button-save"
                  disabled={saveMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Video Attachments Section - Only show for existing content */}
        {!isNewContent && contentId && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                YouTube Videos
              </CardTitle>
              <CardDescription>
                Add YouTube tutorial videos to this {formData.type}. You can also use [video:URL] syntax in the content body for inline embedding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing videos list */}
              {existingContent?.attachments && existingContent.attachments.filter((a: Attachment) => a.kind === 'video').length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Videos</h3>
                  {existingContent.attachments
                    .filter((a: Attachment) => a.kind === 'video')
                    .map((attachment: Attachment) => (
                      <div
                        key={attachment.id}
                        className="flex gap-4 p-4 border rounded-lg"
                        data-testid={`video-item-${attachment.id}`}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              {attachment.title && (
                                <h4 className="font-medium">{attachment.title}</h4>
                              )}
                              <p className="text-sm text-muted-foreground font-mono break-all">
                                {attachment.url}
                              </p>
                              {attachment.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {attachment.description}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAttachment(attachment.id, 'video')}
                              disabled={deleteAttachmentMutation.isPending}
                              data-testid={`button-delete-video-${attachment.id}`}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Add new video form */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Add New Video</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">YouTube URL *</Label>
                    <Input
                      id="video-url"
                      data-testid="input-video-url"
                      value={newVideo.url}
                      onChange={(e) => setNewVideo((prev) => ({ ...prev, url: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title (optional)</Label>
                    <Input
                      id="video-title"
                      data-testid="input-video-title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Introduction to CMIS"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description (optional)</Label>
                    <Textarea
                      id="video-description"
                      data-testid="input-video-description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the video content"
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddVideo}
                    disabled={createVideoMutation.isPending || !newVideo.url}
                    data-testid="button-add-video"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {createVideoMutation.isPending ? "Adding..." : "Add Video"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Attachments Section - Only show for existing content */}
        {!isNewContent && contentId && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Images
              </CardTitle>
              <CardDescription>
                Add images to this {formData.type}. You can also use [image:URL] or [image:URL|Caption] syntax in the content body for inline embedding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing images list */}
              {existingContent?.attachments && existingContent.attachments.filter((a: Attachment) => a.kind === 'image').length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {existingContent.attachments
                      .filter((a: Attachment) => a.kind === 'image')
                      .map((attachment: Attachment) => (
                        <div
                          key={attachment.id}
                          className="relative border rounded-lg overflow-hidden"
                          data-testid={`image-item-${attachment.id}`}
                        >
                          <img 
                            src={attachment.url} 
                            alt={attachment.title || 'Image'} 
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3 space-y-1">
                            {attachment.title && (
                              <p className="text-sm font-medium">{attachment.title}</p>
                            )}
                            <p className="text-xs text-muted-foreground font-mono break-all truncate">
                              {attachment.url}
                            </p>
                            {attachment.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {attachment.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                            onClick={() => handleDeleteAttachment(attachment.id, 'image')}
                            disabled={deleteAttachmentMutation.isPending}
                            data-testid={`button-delete-image-${attachment.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Add new image form */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Add New Image</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL *</Label>
                    <Input
                      id="image-url"
                      data-testid="input-image-url"
                      value={newImage.url}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-alt">Alt Text / Caption (optional)</Label>
                    <Input
                      id="image-alt"
                      data-testid="input-image-alt"
                      value={newImage.alt}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, alt: e.target.value }))}
                      placeholder="e.g., Diagram showing change management process"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-description">Description (optional)</Label>
                    <Textarea
                      id="image-description"
                      data-testid="input-image-description"
                      value={newImage.description}
                      onChange={(e) => setNewImage((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the image"
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    disabled={createImageMutation.isPending || !newImage.url}
                    data-testid="button-add-image"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {createImageMutation.isPending ? "Adding..." : "Add Image"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
