import { ExternalLink, Mail, BookOpen, Users, Mic, Users2, ClipboardCheck, LayoutDashboard, CalendarCheck } from 'lucide-react';
import { Link } from 'wouter';
import { CONSULTATION_URL } from '@/lib/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Offerings() {
  return (
    <div className="container py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="heading-offerings">
          Offerings
        </h1>
        <p className="text-lg text-muted-foreground">
          Senior change leadership, sized to what you actually need.
        </p>
        <p className="text-base text-muted-foreground">
          Most organizations do not need a full-time change management department. They need
          experienced judgment at the right moments, a method their people can follow, and a way to
          see whether the change is taking hold. That is what we provide.
        </p>
        <div className="pt-2">
          <Button size="lg" className="gap-2" asChild data-testid="button-offerings-consultation">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Fractional Change Management */}
      <Card className="max-w-4xl mx-auto border-primary/40" data-testid="card-fractional">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <Users2 className="w-6 h-6" />
            Fractional Change Management
          </CardTitle>
          <CardDescription className="text-base italic">
            An embedded change leader without a full-time hire.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We become part of your team on a recurring basis, carrying the change work that
            typically has no owner. You get senior change leadership at a fraction of the cost of a
            full-time hire, and because much of the work runs asynchronously, progress continues
            between our sessions rather than waiting on the next meeting.
          </p>
          <p className="font-medium">A typical engagement includes:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Stakeholder mapping, sentiment tracking, and engagement strategy</li>
            <li>Readiness assessment and ongoing adoption risk monitoring</li>
            <li>Communication planning aligned to each phase of the change</li>
            <li>Execution discipline: RAID logs, milestones, and progress reporting</li>
            <li>Leadership coaching to keep intent coherent as it moves down the organization</li>
          </ul>
          <p>
            Engagements are structured monthly and scale with the size of your change portfolio.
            Platform access is part of how we deliver the work, and it continues at standard
            licensing rates when the engagement concludes, so your team keeps the system of record
            and the history behind it.
          </p>
          <Button className="gap-2" asChild data-testid="button-fractional-contact">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Change Readiness Assessment */}
      <Card className="max-w-4xl mx-auto" data-testid="card-readiness">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <ClipboardCheck className="w-6 h-6" />
            Change Readiness Assessment
          </CardTitle>
          <CardDescription className="text-base italic">
            Know where you stand before you commit resources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A structured evaluation of how prepared your organization actually is for the change in
            front of it. The assessment measures both organizational capability and individual
            readiness, drawn from doctoral research on change acceptance and decision coherence.
          </p>
          <p className="font-medium">You receive:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>A readiness profile across organizational and individual dimensions</li>
            <li>Stakeholder sentiment and influence analysis</li>
            <li>Specific adoption risks ranked by likelihood and impact</li>
            <li>A prioritized set of actions to close the gaps before execution begins</li>
          </ul>
          <p>
            This is often the right first engagement. It is bounded, it produces something you can
            act on immediately, and it tells us both whether a longer engagement makes sense.
          </p>
          <Button variant="outline" className="gap-2" asChild data-testid="button-readiness-contact">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Request an Assessment
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* CMIS Platform */}
      <Card className="max-w-4xl mx-auto" data-testid="card-cmis">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <LayoutDashboard className="w-6 h-6" />
            Change Management Information System
          </CardTitle>
          <CardDescription className="text-base italic">
            The system of record for organizational change.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Project management tools track tasks. Methodologies describe what should happen. Neither
            tells you whether people are actually adopting the change. CMIS connects readiness,
            communication, and execution in one platform so adoption risk becomes visible while
            there is still time to act on it.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Initiative and portfolio management across concurrent changes</li>
            <li>Stakeholder directory with sentiment, influence, and engagement tracking</li>
            <li>Readiness surveys with analysis and response tracking</li>
            <li>RAID logs, timelines, and phase-aligned communication planning</li>
            <li>Reporting across initiatives, users, and readiness data</li>
          </ul>
          <p>
            Available on its own or included with a fractional engagement, which is how most
            organizations get the most out of it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" asChild data-testid="button-cmis-demo">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <CalendarCheck className="w-4 h-4" />
                Request a Demo
              </a>
            </Button>
            <Link href="/pricing">
              <Button variant="ghost" data-testid="button-cmis-pricing">
                View Pricing
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="border-t border-border" />

      {/* Leadership Toolbox */}
      <Card className="max-w-4xl mx-auto" data-testid="card-leadership-toolbox">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6" />
            Leadership Toolbox
          </CardTitle>
          <CardDescription className="text-base italic">
            Essential Skills and Strategies for Today's Leaders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Available in <strong>eBook, Paperback, and Hardcover</strong>, <em>Leadership Toolbox</em> equips leaders with actionable tools to strengthen emotional intelligence, communication, coaching, and motivation. Rooted in practical experience and supported by leadership research, the book serves as an accessible resource for professionals at every level.
          </p>
          <Button 
            asChild 
            className="gap-2"
            data-testid="button-amazon-link"
          >
            <a 
              href="https://www.amazon.com/dp/B0CTP624BK" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <BookOpen className="w-4 h-4" />
              View on Amazon
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Consulting & Organizational Development */}
      <Card className="max-w-4xl mx-auto" data-testid="card-consulting">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <Users className="w-6 h-6" />
            Consulting &amp; Organizational Development
          </CardTitle>
          <CardDescription className="text-base italic">
            Guiding organizations through complex change.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Beyond recurring engagements, we take on defined projects: organizational design work,
            post-acquisition integration, leadership alignment, and sustainment planning after a
            change has launched.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Organizational change readiness assessments</li>
            <li>Leadership alignment and coaching</li>
            <li>Communication and stakeholder engagement strategies</li>
            <li>Implementation and sustainment planning</li>
          </ul>
          <p className="text-sm font-semibold">
            Availability: Limited project engagements opening for 2026.
          </p>
          <Button 
            variant="outline" 
            asChild 
            className="gap-2"
            data-testid="button-consulting-contact"
          >
            <a href="/contact">
              <Mail className="w-4 h-4" />
              Discuss a Project
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Speaking & Education */}
      <Card className="max-w-4xl mx-auto" data-testid="card-speaking">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
            <Mic className="w-6 h-6" />
            Speaking &amp; Education
          </CardTitle>
          <CardDescription className="text-base italic">
            Translating research into actionable insight.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our founder, <strong>Phil Smith</strong>, brings together military decision-making principles and organizational leadership research to inspire leaders to act decisively and communicate effectively. Engagements range from academic seminars to executive briefings.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Applying military principles to organizational change</li>
            <li>Building shared understanding and intent in complex environments</li>
            <li>Leading teams through disruption and uncertainty</li>
          </ul>
          <Button 
            variant="outline" 
            asChild 
            className="gap-2"
            data-testid="button-speaking-inquiry"
          >
            <a href="mailto:psmith@essayonschange.com">
              <Mic className="w-4 h-4" />
              Inquire About Speaking Engagements
            </a>
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
