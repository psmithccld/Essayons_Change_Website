import PricingCard from '../PricingCard'

export default function PricingCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto p-6">
      <PricingCard
        title="Starter"
        price="$499"
        period="month"
        description="Perfect for small teams getting started"
        features={[
          "Up to 10 users",
          "Basic change initiatives",
          "Email support",
          "Monthly reports",
        ]}
      />
      <PricingCard
        title="Professional"
        price="$999"
        period="month"
        description="For growing organizations"
        features={[
          "Up to 50 users",
          "Advanced analytics",
          "Priority support",
          "Custom reports",
          "API access",
        ]}
        highlighted
      />
      <PricingCard
        title="Enterprise"
        price="Custom"
        period="contact us"
        description="For large-scale transformation"
        features={[
          "Unlimited users",
          "Dedicated success manager",
          "Custom integrations",
          "On-premise deployment",
          "24/7 support",
        ]}
      />
    </div>
  )
}
