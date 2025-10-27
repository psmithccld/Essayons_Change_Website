import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import abstractImage from "@assets/image_1761605800665.png";
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
                alt="Puzzle pieces representing organizational integration and change"
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
        </div>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-32 w-32 flex-shrink-0">
                  <AvatarImage 
                    src={philSmithImage} 
                    alt="Phil Smith"
                    className="object-cover object-center"
                  />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-bold" data-testid="text-team-member-name">
                      Phil Smith, PMP, Ph.D. Candidate
                    </h3>
                    <p className="text-lg text-muted-foreground" data-testid="text-team-member-role">
                      Founder & President
                    </p>
                  </div>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Phil Smith is a leadership consultant, educator, and doctoral researcher focused on organizational readiness for change. A U.S. Army veteran with over 20 years of experience in project and organizational leadership, he brings a unique perspective that integrates military precision, academic research, and practical management application.
                    </p>
                    <p>
                      His work bridges theory and practice — developing frameworks and systems that help leaders design, measure, and sustain transformational change.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
