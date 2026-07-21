import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CONSULTATION_URL } from "@/lib/booking";
import { CalendarCheck, Users2, ClipboardCheck, LayoutDashboard, Mic } from "lucide-react";

const ENGAGEMENTS = [
  {
    icon: Users2,
    title: "Fractional Change Management",
    structure: "Monthly retainer",
    body: "Scoped to the size of your change portfolio and the depth of involvement you need. A single initiative with an established team looks different from a portfolio of concurrent changes across business units.",
    drivers: [
      "Number and complexity of concurrent initiatives",
      "Size of the affected population",
      "Depth of involvement, from advisory to embedded",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Change Readiness Assessment",
    structure: "Fixed-fee project",
    body: "A bounded engagement with a defined deliverable. Cost depends primarily on the size of the organization and the number of stakeholder groups included in the assessment.",
    drivers: [
      "Organization size and number of business units",
      "Stakeholder groups surveyed and interviewed",
      "Depth of analysis and reporting",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "CMIS Platform",
    structure: "Annual license",
    body: "Licensed by tier based on organization size and feature requirements. Platform access is included during a fractional engagement and continues at standard licensing rates when the engagement concludes.",
    drivers: [
      "Number of users and business units",
      "Commercial or enterprise tier requirements",
      "Integration and support needs",
    ],
  },
  {
    icon: Mic,
    title: "Speaking and Training",
    structure: "Per engagement",
    body: "Keynotes, workshops, and executive briefings. Cost depends on format, length, audience size, and location.",
    drivers: [
      "Format: keynote, workshop, or multi-session training",
      "Length and audience size",
      "Location and travel requirements",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="heading-pricing">
          How Engagements Are Structured
        </h1>
        <p className="text-lg text-muted-foreground">
          Every organization arrives with a different change portfolio, a different level of
          internal capability, and a different amount of ground to cover. We scope to what you
          actually need rather than to a package.
        </p>
        <div className="pt-2">
          <Button size="lg" className="gap-2" asChild data-testid="button-pricing-consultation">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {ENGAGEMENTS.map((e) => {
          const Icon = e.icon;
          return (
            <Card key={e.title} data-testid={`card-pricing-${e.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{e.title}</CardTitle>
                <CardDescription className="text-base font-medium">{e.structure}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{e.body}</p>
                <div>
                  <p className="text-sm font-semibold mb-1">What shapes the cost:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {e.drivers.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight">What to Expect</h2>
        <p className="text-base text-muted-foreground">
          The first conversation is 30 minutes and costs nothing. We talk through the change you are
          working on, what has already been tried, and where it is getting stuck. If there is a fit,
          you receive a written proposal with defined scope and a fixed price before any work
          begins. If there is not a fit, we will tell you that directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button className="gap-2" asChild data-testid="button-pricing-consult-bottom">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
          <Link href="/offerings">
            <Button variant="outline" data-testid="button-pricing-offerings">
              See What We Do
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
