import HeroCarousel from "@/components/HeroCarousel";
import FeatureGrid from "@/components/FeatureGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { ArrowRight, CalendarCheck, ClipboardCheck, Users2 } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/booking";

export default function Home() {
  return (
    <div>
      {/* Positioning: practice first, software as the flagship tool */}
      <section className="container pt-8 pb-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            A Change Management and Leadership Practice
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Essayons Change helps mid-market and private equity-backed organizations plan, lead, and
            sustain organizational change. We pair fractional change management with the Change
            Management Information System, our platform for running change as a measurable process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="gap-2" asChild data-testid="button-hero-consultation">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <CalendarCheck className="w-4 h-4" />
                Schedule a Consultation
              </a>
            </Button>
            <Link href="/offerings">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-offerings">
                See How We Work
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <HeroCarousel />

      {/* The problem */}
      <section className="bg-primary/5 border-y py-10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Change Rarely Fails on Strategy. It Fails on Execution.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Leaders set direction, then watch it fragment as it moves through the organization.
              Readiness goes unmeasured, adoption risk stays invisible, and the initiative quietly
              stalls. Our work closes the gap between what leadership intends and what the
              organization actually understands.
            </p>
          </div>
        </div>
      </section>

      {/* How we engage */}
      <section className="container py-14">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">How We Work With You</h2>
          <p className="text-base text-muted-foreground">
            Three ways to engage, built to match where you are in the change.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          <Card data-testid="card-service-fractional">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Fractional Change Management</CardTitle>
              <CardDescription className="text-base">
                An embedded change leader without a full-time hire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We join your team on a recurring basis to run the change: stakeholder strategy,
                readiness, communications, and execution discipline. You get senior change
                leadership at a fraction of the cost, working asynchronously so progress continues
                between sessions.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-service-assessment">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Change Readiness Assessment</CardTitle>
              <CardDescription className="text-base">
                Know where you stand before you commit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                A structured evaluation of organizational and individual readiness, drawn from
                doctoral research on change acceptance. You receive a clear picture of adoption
                risk, stakeholder sentiment, and the specific gaps that will slow execution.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-service-cmis">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">CMIS Platform</CardTitle>
              <CardDescription className="text-base">
                The system of record for your change portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                The Change Management Information System connects readiness, communication, and
                execution in one place. Initiatives, stakeholders, RAID logs, surveys, and reporting
                stay tied together so you can see adoption risk while there is still time to act.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/offerings">
            <Button variant="outline" className="gap-2" data-testid="button-view-offerings">
              Explore All Offerings
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* The model */}
      <section className="bg-muted/30 border-y py-14">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Built on Research, Not Opinion</h2>
            <p className="text-base text-muted-foreground">
              Our five-phase change model runs organizational and individual work in parallel, so
              the people affected by change are treated as participants rather than recipients. It
              comes out of doctoral research on organizational readiness and decision coherence,
              combined with military decision-making principles applied to enterprise leadership.
            </p>
            <p className="text-base font-medium">
              Identify Need &rarr; Stakeholders &rarr; Develop &rarr; Implement &rarr; Reinforce
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid />

      {/* Regional presence */}
      <section className="container py-12">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Serving the Midwest and Beyond</CardTitle>
            <CardDescription className="text-base">
              We work with organizations across the Greater St. Louis area, Northwest Indiana, and
              Evansville, and support clients nationwide through remote and asynchronous
              engagements. Construction, government contracting, and private equity portfolio
              companies are where our experience runs deepest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="gap-2" asChild data-testid="button-regional-contact">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <CalendarCheck className="w-4 h-4" />
                Schedule a Consultation
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Email capture */}
      <section className="bg-primary py-16 px-4" data-testid="section-homepage-subscribe">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Reduce Resistance. Lead Change That Sticks.
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Join leaders who are closing the gap between strategy and execution. Most change fails
              not because of bad strategy, but because resistance goes unaddressed. Get
              research-backed insights that help you change that.
            </p>
          </div>
          <EmailCaptureForm sourcePage="homepage" />
        </div>
      </section>
    </div>
  );
}
