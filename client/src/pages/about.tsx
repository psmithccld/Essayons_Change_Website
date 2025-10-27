import TeamMember from "@/components/TeamMember";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import abstractImage from "@assets/generated_images/Organizational_change_abstract_illustration_cfc71091.png";

export default function About() {
  return (
    <div className="container py-12 space-y-16">
      <section>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Essayons Change
            </h1>
            <p className="text-lg text-muted-foreground">
              Founded on the Army Engineer Corps' motto "Essayons" (Let Us Try), we believe in bridging the gap between research and practice in organizational change management.
            </p>
            <p className="text-base text-muted-foreground">
              Our mission is to empower leaders with the tools, frameworks, and insights they need to design, implement, and sustain transformational change in their organizations.
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

      <section>
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Our Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Change management is both an art and a science. We combine evidence-based research with practical, battle-tested methodologies to help organizations navigate complexity and achieve lasting transformation.
            </p>
            <p className="text-muted-foreground">
              Through our Change Management Information System (CMIS), we provide integrated tools for planning, measurement, and sustainment — ensuring that change initiatives don't just launch, but succeed and endure.
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
