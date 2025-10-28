import BlogCard from "@/components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import type { SelectContent } from "@shared/schema";

export default function Blog() {
  const { data: blogPosts, isLoading } = useQuery<SelectContent[]>({
    queryKey: ["/api/content?type=blog&status=published"],
  });

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Insights & Resources
        </h1>
        <p className="text-lg text-muted-foreground">
          Expert guidance, research, and practical advice for change management professionals.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      ) : !blogPosts || blogPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.summary || ""}
              category="Blog Post"
              date={new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
              readTime="5 min read"
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
