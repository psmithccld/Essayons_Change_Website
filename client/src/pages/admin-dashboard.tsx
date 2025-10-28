import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

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

interface AdminUser {
  id: number;
  username: string;
  email: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "blog" | "tutorial">("all");

  const { data: currentUser, isLoading: userLoading } = useQuery<AdminUser>({
    queryKey: ["/api/auth/me"],
  });

  const { data: content = [], isLoading: contentLoading, refetch } = useQuery<Content[]>({
    queryKey: ["/api/admin/content"],
    enabled: !!currentUser,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      setLocation("/admin/login");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/admin/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      toast({
        title: "Content deleted",
        description: "The content has been deleted successfully",
      });
      refetch();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!userLoading && !currentUser) {
      setLocation("/admin/login");
    }
  }, [currentUser, userLoading, setLocation]);

  if (userLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const filteredContent = filter === "all" 
    ? content 
    : content.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentUser.username}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
            <div>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>
                Manage blog posts and tutorials
              </CardDescription>
            </div>
            <Button
              data-testid="button-create-content"
              onClick={() => setLocation("/admin/content/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                data-testid="filter-all"
              >
                All
              </Button>
              <Button
                variant={filter === "blog" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("blog")}
                data-testid="filter-blog"
              >
                Blog Posts
              </Button>
              <Button
                variant={filter === "tutorial" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("tutorial")}
                data-testid="filter-tutorial"
              >
                Tutorials
              </Button>
            </div>

            {contentLoading ? (
              <p className="text-center py-8">Loading content...</p>
            ) : filteredContent.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No content found. Create your first {filter === "all" ? "item" : filter}!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((item) => (
                    <TableRow key={item.id} data-testid={`content-row-${item.id}`}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === "published" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/admin/content/${item.id}`)}
                            data-testid={`button-edit-${item.id}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this content?")) {
                                deleteMutation.mutate(item.id);
                              }
                            }}
                            data-testid={`button-delete-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
