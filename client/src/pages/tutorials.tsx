import BlogCard from "@/components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import type { SelectContent } from "@shared/schema";

export default function Tutorials() {
  const { data: tutorials, isLoading } = useQuery<SelectContent[]>({
    queryKey: ["/api/content?type=tutorial&status=published"],
  });

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Tutorials & Guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step tutorials to help you master the Change Management Information System and accelerate your change initiatives.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading tutorials...</p>
        </div>
      ) : !tutorials || tutorials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tutorials available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <BlogCard
              key={tutorial.slug}
              title={tutorial.title}
              excerpt={tutorial.summary || ""}
              category="Tutorial"
              date={new Date(tutorial.publishedAt || tutorial.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
              readTime="10 min read"
              slug={tutorial.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
