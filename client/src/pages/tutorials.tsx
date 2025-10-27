import BlogCard from "@/components/BlogCard";

// TODO: Remove mock functionality - Replace with actual tutorial data from CMS or database
const tutorials = [
  {
    title: "Getting Started with CMIS",
    excerpt: "A comprehensive walkthrough of setting up your first change initiative in the Change Management Information System.",
    category: "Getting Started",
    date: "Oct 25, 2024",
    readTime: "10 min read",
    slug: "getting-started-cmis",
  },
  {
    title: "Creating Effective Readiness Surveys",
    excerpt: "Learn how to design and deploy readiness assessments that provide actionable insights for your change initiatives.",
    category: "Surveys",
    date: "Oct 18, 2024",
    readTime: "8 min read",
    slug: "effective-readiness-surveys",
  },
  {
    title: "RAID Log Management Tutorial",
    excerpt: "Master the art of tracking Risks, Assumptions, Issues, and Dependencies in your change programs.",
    category: "Project Management",
    date: "Oct 12, 2024",
    readTime: "12 min read",
    slug: "raid-log-management",
  },
  {
    title: "Building Stakeholder Maps",
    excerpt: "Step-by-step guide to creating comprehensive stakeholder maps and engagement strategies.",
    category: "Stakeholders",
    date: "Oct 8, 2024",
    readTime: "9 min read",
    slug: "building-stakeholder-maps",
  },
  {
    title: "Advanced Analytics & Reporting",
    excerpt: "Unlock the full potential of CMIS analytics to drive data-informed change decisions.",
    category: "Analytics",
    date: "Sep 30, 2024",
    readTime: "15 min read",
    slug: "advanced-analytics-reporting",
  },
  {
    title: "Integration Guide: API Basics",
    excerpt: "Connect CMIS with your existing tools and systems using our RESTful API.",
    category: "Technical",
    date: "Sep 22, 2024",
    readTime: "11 min read",
    slug: "api-integration-basics",
  },
];

export default function Tutorials() {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial) => (
          <BlogCard key={tutorial.slug} {...tutorial} />
        ))}
      </div>
    </div>
  );
}
