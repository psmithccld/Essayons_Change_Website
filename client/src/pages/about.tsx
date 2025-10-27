import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import abstractImage from "@assets/generated_images/Organizational_change_abstract_illustration_cfc71091.png";
import philSmithImage from "@assets/Author Picture_1761601756882.jpg";

export default function About() {
  return (
    <div className="container py-12 space-y-16">
      <section>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Essayons Change
            </h1>
            <p className="text-base text-muted-foreground">
              In researching change management, our founder identified a critical gap.
            </p>
            <p className="text-base text-muted-foreground">
              Most change models focus on either the organization or the individual. Experience in the U.S. Army provided a key insight; everyone must understand what, why, and how change is occurring.
            </p>
            <p className="text-base text-muted-foreground">
              No existing framework effectively integrated the individual into the organization's broader change process. Yet it's within this nexus, where individual understanding meets organizational intent, that real transformation happens.
            </p>
            <p className="text-base text-muted-foreground">
              Essayons Change was created to bridge that gap.
            </p>
            <p className="text-base text-muted-foreground">
              Leveraging principles from Project Management Information Systems (PMIS), the Change Management Information System (CMIS) connects people, purpose, and performance. CMIS integrates those affected by change as active stakeholders in each initiative — ensuring alignment, engagement, and measurable progress.
            </p>
            <p className="text-base text-muted-foreground">
              Our name, drawn from the Army Engineer Corps' motto "Essayons" — Let Us Try, reflects our philosophy of adaptive, evidence-based leadership and the relentless pursuit of improvement through understanding.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-lg border shadow-lg">
              <img
                src={abstractImage}
                alt="Organizational change visualization"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Mission Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower leaders and organizations to design, measure, and sustain transformational change through research-driven tools, practical frameworks, and integrated systems that connect individual understanding with organizational intent.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Vision Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To redefine how organizations manage change, creating a world where leaders and teams embrace transformation with clarity, confidence, and shared purpose.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Led by experienced professionals with deep expertise in change management, organizational development, and technology.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <TeamMember
            name="Dr. Patricia Smith"
            role="Founder & CEO"
            bio="Former Army Engineer with 20+ years of experience in organizational change and leadership development."
            initials="PS"
          />
          <TeamMember
            name="Michael Johnson"
            role="Chief Technology Officer"
            bio="Technology leader specializing in enterprise software and data analytics for change management."
            initials="MJ"
          />
          <TeamMember
            name="Sarah Williams"
            role="Head of Client Success"
            bio="Dedicated to ensuring organizations achieve transformational results through our platform."
            initials="SW"
          />
        </div>
      </section>
    </div>
  );
}
