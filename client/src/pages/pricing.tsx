import PricingCard from "@/components/PricingCard";

export default function Pricing() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose the plan that's right for your organization. All plans include our core change management features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        <PricingCard
          title="Starter"
          price="$499"
          period="month"
          description="Perfect for small teams getting started with change management"
          features={[
            "Up to 10 users",
            "Basic change initiatives",
            "Email support",
            "Monthly reports",
            "Readiness surveys",
          ]}
        />
        <PricingCard
          title="Professional"
          price="$999"
          period="month"
          description="For growing organizations with complex change needs"
          features={[
            "Up to 50 users",
            "Advanced analytics dashboard",
            "Priority support",
            "Custom reports & dashboards",
            "API access",
            "Stakeholder mapping",
            "RAID log management",
          ]}
          highlighted
        />
        <PricingCard
          title="Enterprise"
          price="Custom"
          period="contact us"
          description="For large-scale organizational transformation"
          features={[
            "Unlimited users",
            "Dedicated success manager",
            "Custom integrations",
            "On-premise deployment option",
            "24/7 priority support",
            "Advanced security features",
            "Custom training programs",
          ]}
        />
      </div>

      <div className="text-center mt-12 space-y-4">
        <p className="text-muted-foreground">
          All plans include a 30-day money-back guarantee. Need help choosing? <a href="/contact" className="text-primary hover:underline">Contact us</a> for a personalized demo.
        </p>
      </div>
    </div>
  );
}
