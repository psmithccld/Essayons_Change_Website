import { useEffect } from "react";
import PricingCard from "@/components/PricingCard";
import { gtag } from "@/lib/gtag";

export default function Pricing() {
  useEffect(() => {
    gtag.pricingView();
  }, []);
  const allFeatures = [
    "Communications",
    "Reporting",
    "GPT Integration",
    "Surveys",
    "Change Artifacts",
    "Cost Module",
    "Multi-tier Organizational Structure",
  ];

  const basicIncluded = new Set<string>();

  const professionalIncluded = new Set([
    "Communications",
    "Reporting",
    "GPT Integration",
    "Surveys",
    "Change Artifacts",
  ]);

  const enterpriseIncluded = new Set(allFeatures);

  const basicFeatures = allFeatures.map((name) => ({
    name,
    included: basicIncluded.has(name),
  }));

  const professionalFeatures = allFeatures.map((name) => ({
    name,
    included: professionalIncluded.has(name),
  }));

  const enterpriseFeatures = allFeatures.map((name) => ({
    name,
    included: enterpriseIncluded.has(name),
  }));

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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <PricingCard
          title="Basic"
          price="$1,000"
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
        <PricingCard
          title="Professional"
          price="$1,500"
          period="month"
          seats="50 seats"
          fileSize="10 MB files"
          storage="5 GB"
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
          title="Enterprise"
          price="Custom"
          period="month"
          seats="Unlimited"
          fileSize="100 MB files"
          storage="100 GB"
          orgs="1 org"
          customBadge="Enterprise Custom"
          isEnterprise
          specs={[
            { label: "Individual File Size", value: "100 MB" },
            { label: "Storage", value: "100 GB" },
            { label: "Currency", value: "USD" },
            { label: "Billing Interval", value: "month" },
          ]}
          features={enterpriseFeatures}
        />
      </div>

      <div className="text-center mt-12 space-y-4 max-w-2xl mx-auto">
        <p className="text-muted-foreground">
          Discounts may be available for longer contract terms. <a href="/contact" className="text-primary hover:underline">Contact our sales team</a> to discuss your needs.
        </p>
      </div>
    </div>
  );
}
