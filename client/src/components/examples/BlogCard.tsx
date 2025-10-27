import BlogCard from '../BlogCard'

export default function BlogCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto p-6">
      <BlogCard
        title="Understanding Change Readiness in Organizations"
        excerpt="Learn how to assess and improve your organization's readiness for transformational change through proven frameworks and methodologies."
        category="Change Management"
        date="Oct 20, 2024"
        readTime="5 min read"
        slug="understanding-change-readiness"
      />
      <BlogCard
        title="The Role of Leadership in Successful Change"
        excerpt="Discover how effective leadership drives change adoption and creates sustainable transformation in complex organizations."
        category="Leadership"
        date="Oct 15, 2024"
        readTime="7 min read"
        slug="leadership-in-change"
      />
      <BlogCard
        title="Measuring Change Impact: Metrics That Matter"
        excerpt="Explore key performance indicators and measurement frameworks to track the success of your change initiatives."
        category="Analytics"
        date="Oct 10, 2024"
        readTime="6 min read"
        slug="measuring-change-impact"
      />
    </div>
  )
}
