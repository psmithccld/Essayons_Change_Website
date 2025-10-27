import BlogCard from "@/components/BlogCard";

// TODO: Remove mock functionality - Replace with actual blog data from CMS or database
const blogPosts = [
  {
    title: "Understanding Change Readiness in Organizations",
    excerpt: "Learn how to assess and improve your organization's readiness for transformational change through proven frameworks and methodologies.",
    category: "Change Management",
    date: "Oct 20, 2024",
    readTime: "5 min read",
    slug: "understanding-change-readiness",
  },
  {
    title: "The Role of Leadership in Successful Change",
    excerpt: "Discover how effective leadership drives change adoption and creates sustainable transformation in complex organizations.",
    category: "Leadership",
    date: "Oct 15, 2024",
    readTime: "7 min read",
    slug: "leadership-in-change",
  },
  {
    title: "Measuring Change Impact: Metrics That Matter",
    excerpt: "Explore key performance indicators and measurement frameworks to track the success of your change initiatives.",
    category: "Analytics",
    date: "Oct 10, 2024",
    readTime: "6 min read",
    slug: "measuring-change-impact",
  },
  {
    title: "Stakeholder Engagement Best Practices",
    excerpt: "Master the art of identifying, analyzing, and engaging stakeholders throughout your change journey.",
    category: "Strategy",
    date: "Oct 5, 2024",
    readTime: "6 min read",
    slug: "stakeholder-engagement",
  },
  {
    title: "Building a Culture of Continuous Improvement",
    excerpt: "Learn how to embed change management practices into your organization's DNA for lasting results.",
    category: "Culture",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    slug: "continuous-improvement-culture",
  },
  {
    title: "Change Communication Strategies That Work",
    excerpt: "Effective communication is the cornerstone of successful change. Discover proven strategies to engage your teams.",
    category: "Communication",
    date: "Sep 20, 2024",
    readTime: "5 min read",
    slug: "change-communication-strategies",
  },
];

export default function Blog() {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
