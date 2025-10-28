import { ExternalLink, Mail, BookOpen, Users, Mic } from 'lucide-react';
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
          Empowering leaders and organizations to navigate change with confidence.
        </p>
        <p className="text-base text-muted-foreground">
          At <strong>Essayons Change</strong>, we combine evidence-based research with real-world leadership experience to help individuals and organizations succeed during transformation. Our offerings provide practical, scalable solutions for professionals seeking to strengthen leadership, communication, and change management capabilities.
        </p>
      </div>

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
            Essayons Change offers consulting services designed to help organizations assess, design, and sustain successful change initiatives. Our focus is on aligning people, processes, and purpose to create lasting impact.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Organizational change readiness assessments</li>
            <li>Leadership alignment and coaching</li>
            <li>Communication and stakeholder engagement strategies</li>
            <li>Implementation and sustainment planning</li>
          </ul>
          <p className="text-sm font-semibold">
            Availability: Limited consulting engagements opening for 2026.
          </p>
          <Button 
            variant="outline" 
            asChild 
            className="gap-2"
            data-testid="button-consulting-contact"
          >
            <a href="mailto:psmith@essayonschange.com">
              <Mail className="w-4 h-4" />
              Contact Us to Learn More
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
            Our founder, <strong>Dr. Philip Smith</strong>, brings together military decision-making principles and organizational leadership research to inspire leaders to act decisively and communicate effectively. Engagements range from academic seminars to executive briefings.
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

      <div className="border-t border-border" />

      {/* Looking Ahead */}
      <Card className="max-w-4xl mx-auto" data-testid="card-future-offerings">
        <CardHeader>
          <CardTitle className="text-xl">Looking Ahead</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Project Manager's Toolbox</strong> (Summer 2026)
            </li>
            <li>
              <strong>Change Management Toolbox</strong> (Winter 2026)
            </li>
            <li>
              <strong>CMIS (Change Management Information System)</strong> — a digital platform empowering organizations to plan, measure, and sustain change.
            </li>
          </ul>
          <p className="text-base font-medium text-foreground pt-4">
            Our mission is to help leaders and teams turn intent into action through integrated tools and shared understanding.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
