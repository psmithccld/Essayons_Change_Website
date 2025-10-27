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
import { ArrowLeft, Save } from "lucide-react";

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

  const { data: existingContent, isLoading } = useQuery<Content & { attachments?: any[] }>({
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
        return await apiRequest("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            publishedAt: data.status === "published" ? new Date().toISOString() : null,
          }),
          credentials: "include",
        });
      } else {
        return await apiRequest(`/api/admin/content/${contentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            publishedAt: data.status === "published" ? new Date().toISOString() : null,
          }),
          credentials: "include",
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
      </main>
    </div>
  );
}
