import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, BadgeCheck, Globe, TrendingUp } from "lucide-react";
import partnerBadge from "@assets/EC_Badge_Partner.png";
import roslenLogo from "@assets/roslen_global_logo.png";

const TEACHABLE_URL =
  "https://essayons-change.teachable.com/purchase?product_id=6856098";

const partners = [
  {
    name: "Guillermo Rosales",
    company: "Roslen Global",
    logo: roslenLogo,
    email: "guillermo@roslenglobal.com",
    credential: "Essayons Change Certified Practitioner",
  },
];

export default function Partners() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center">
          <img
            src={partnerBadge}
            alt="Essayons Change Certified Partner badge"
            className="h-28 w-28 object-contain"
            data-testid="img-partner-badge-hero"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Certified Partners
        </h1>
        <p className="text-lg text-muted-foreground">
          Our certified practitioners are authorized to represent, sell, and
          deliver the Essayons Change methodology and the CMIS platform. Every
          partner has completed the full certification program and leads change
          the way we do: as a measurable, evidence-based process.
        </p>
      </section>

      {/* Partner directory */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <Card key={partner.email} data-testid={`card-partner-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-6 items-center text-center">
                  <div className="flex h-32 items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.company} logo`}
                      className="max-h-32 w-auto object-contain"
                      data-testid={`img-partner-logo-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3
                        className="text-2xl font-bold"
                        data-testid={`text-partner-name-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {partner.name}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {partner.company}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                      <BadgeCheck className="h-4 w-4" />
                      {partner.credential}
                    </div>
                    <a
                      href={`mailto:${partner.email}`}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-partner-email-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Mail className="h-4 w-4" />
                      {partner.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why become a practitioner */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Become a Certified Practitioner
          </h2>
          <p className="text-lg text-muted-foreground">
            Change management is one of the fastest-growing advisory
            disciplines, and most organizations still run it on instinct. The
            Essayons Change Certified Practitioner program gives you a
            research-backed methodology, a platform to deliver it, and the
            authority to bring it to market under your own name.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-muted/30">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">A Credential That Means Something</CardTitle>
              <CardDescription>
                Earn the ECCP designation and an official partner badge,
                authorizing you to represent, sell, and deliver the Essayons
                Change methodology and CMIS.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">A Platform, Not Just a Framework</CardTitle>
              <CardDescription>
                Deliver engagements on the Change Management Information System,
                the same system of record we use to run change as a measurable
                process.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">A New Line of Business</CardTitle>
              <CardDescription>
                Add change management to your practice and get listed here as a
                certified partner, in front of the organizations already looking
                for one.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Lead Change That Sticks?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Enroll in the Essayons Change Certified Practitioner program and
              join a growing network of change leaders delivering measurable
              results.
            </p>
            <div className="pt-2">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                asChild
                data-testid="button-partner-enroll"
              >
                <a href={TEACHABLE_URL} target="_blank" rel="noopener noreferrer">
                  Start the Certification
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
