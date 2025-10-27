import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, category, date, readTime, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-blog-${slug}`}>
        <CardHeader>
          <div className="mb-2">
            <Badge variant="secondary" data-testid="badge-category">{category}</Badge>
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1" data-testid="text-date">
            <Calendar className="h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center gap-1" data-testid="text-read-time">
            <Clock className="h-4 w-4" />
            {readTime}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
