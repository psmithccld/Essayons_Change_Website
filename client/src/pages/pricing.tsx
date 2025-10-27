import PricingCard from "@/components/PricingCard";

export default function Pricing() {
  const professionalFeatures = [
    { name: "Communications", included: true },
    { name: "Reporting", included: true },
    { name: "GPT Integration", included: true },
    { name: "Surveys", included: true },
    { name: "Change Artifacts", included: true },
  ];

  const basicFeatures = [
    { name: "Communications", included: false },
    { name: "Reporting", included: false },
    { name: "GPT Integration", included: false },
    { name: "Surveys", included: false },
    { name: "Change Artifacts", included: false },
  ];

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose the plan that's right for your organization. All plans include secure access to the Change Management Information System (CMIS).
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        <PricingCard
          title="Professional"
          price="$50.00"
          period="seat/month"
          seats="20+ seats"
          fileSize="10 MB files"
          storage="5 GB"
          minSeats="20 seat minimum • Sold in blocks of 5"
          specs={[
            { label: "Individual File Size", value: "10 MB" },
            { label: "Storage", value: "5 GB" },
            { label: "Currency", value: "USD" },
            { label: "Billing Interval", value: "month" },
          ]}
          features={professionalFeatures}
          highlighted
        />
        <PricingCard
          title="Basic"
          price="$299.00"
          period="month"
          seats="10 seats"
          fileSize="10 MB files"
          storage="5 GB"
          specs={[
            { label: "Individual File Size", value: "10 MB" },
            { label: "Storage", value: "5 GB" },
            { label: "Currency", value: "USD" },
            { label: "Billing Interval", value: "month" },
          ]}
          features={basicFeatures}
        />
      </div>

      <div className="text-center mt-12 space-y-4 max-w-2xl mx-auto">
        <p className="text-muted-foreground">
          Custom solutions are available for organizations with unique requirements.
        </p>
        <p className="text-muted-foreground">
          Discounts may be available for longer contract terms. <a href="/contact" className="text-primary hover:underline">Contact our sales team</a> to discuss your needs.
        </p>
      </div>
    </div>
  );
}
