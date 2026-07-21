import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CONSULTATION_URL } from "@/lib/booking";
import {
  CalendarCheck,
  Eye,
  Compass,
  Radio,
  Search,
  Users,
  PencilRuler,
  Rocket,
  Anchor,
} from "lucide-react";

const ICMM_STEPS = [
  {
    n: 1,
    icon: Search,
    name: "Identify the Need to Change",
    org: "Define the business problem precisely enough that it survives a two-sentence explanation.",
    ind: "Answer the question every employee is already asking: why is this happening, and why now?",
  },
  {
    n: 2,
    icon: Users,
    name: "Identify the Stakeholders",
    org: "Map who is actually affected and who holds decision authority at each stage, not who you assume is affected.",
    ind: "Treat the people the change lands on as participants with a perspective, not recipients of a decision.",
  },
  {
    n: 3,
    icon: PencilRuler,
    name: "Develop the Change",
    org: "Design the solution and the path to it, accounting for the journey rather than only the destination.",
    ind: "Build the transition people will actually live through, including what they lose along the way.",
  },
  {
    n: 4,
    icon: Rocket,
    name: "Implement the Change",
    org: "Move when the plan is good enough to start, then adjust from real conditions.",
    ind: "Give people the clarity, support, and standing to act inside the change rather than around it.",
  },
  {
    n: 5,
    icon: Anchor,
    name: "Reinforce the Change",
    org: "Treat implementation as the midpoint. Measure whether the change held and correct where it did not.",
    ind: "Confirm the new way of working is understood, supported, and sustainable before attention moves on.",
  },
];

const LENS_COMPONENTS = [
  {
    n: 1,
    title: "Past Experience",
    question: "What parallel will my team draw?",
    body: "Name the prior change in this organization most similar to what you are about to launch. If your people draw a straight line from that change to this one, what conclusion do they reach? If the answer is unfavorable, the announcement is not ready.",
  },
  {
    n: 2,
    title: "Existing Conflict and Group Dynamics",
    question: "What does the room already contain?",
    body: "Map the informal landscape before the announcement. Who are the informal leaders whose reaction carries disproportionate weight? Which unresolved tensions will this change activate rather than resolve? This is intelligence gathering, not soft work.",
  },
  {
    n: 3,
    title: "Trust",
    question: "What is the actual balance, not the assumed one?",
    body: "Assess the trust climate honestly. What recent events made deposits into the trust account, and what made withdrawals? A communication mode that works in a high-trust environment can be a match to dry paper in a low-trust one.",
  },
  {
    n: 4,
    title: "The Leader's Own Lens",
    question: "What do you bring into this room?",
    body: "Turn the diagnostic on yourself. What is your default communication mode under pressure, and does it serve this change? Leaders who communicate well at the outset and turn directive when resistance appears are watching their own lens activate under stress.",
  },
];

export default function Model() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl" data-testid="heading-model">
          The Integrated Change Management Model
        </h1>
        <p className="text-lg text-muted-foreground">
          A five-step framework that holds the organizational and individual perspectives at the
          same time, grounded in doctoral research on employee experience during change.
        </p>
        <div className="pt-2">
          <Button size="lg" className="gap-2" asChild data-testid="button-model-consultation">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
        </div>
      </section>

      {/* Direct answer up front */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          What is the Integrated Change Management Model?
        </h2>
        <p className="text-base text-muted-foreground">
          The Integrated Change Management Model, or ICMM, is a five-step change framework that
          manages the organizational and individual dimensions of change simultaneously rather than
          choosing one at the expense of the other. The five steps are: identify the need to change,
          identify the stakeholders, develop the change, implement the change, and reinforce the
          change. At each step, the model requires leaders to address both what the organization
          must do and what the people affected by the change need to understand.
        </p>
        <p className="text-base text-muted-foreground">
          Most established change models do one dimension well. Process-driven models describe what
          the organization should do and treat adoption as a downstream consequence. Individually
          focused models describe how people move through transition and leave the operational work
          unspecified. The ICMM was developed to close that gap, because in practice the two
          dimensions fail together.
        </p>
      </section>

      {/* Three layers */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Three Layers, One System</h2>
          <p className="text-base text-muted-foreground">
            The full framework operates in three layers. Each is necessary. None is sufficient
            alone.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          <Card data-testid="card-layer-lens">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Lens of Experience</CardTitle>
              <CardDescription className="text-base">The diagnostic layer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                What you are walking into before the first communication goes out. Nobody comes to
                change neutral.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-layer-icmm">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">The Five Steps</CardTitle>
              <CardDescription className="text-base">The execution layer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                What to do once you understand the terrain, with organizational and individual work
                running in parallel.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-layer-intent">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Commander's Intent</CardTitle>
              <CardDescription className="text-base">The communication layer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                How the leader communicates throughout, so direction and understanding are built
                simultaneously rather than sequentially.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lens of Experience */}
      <section className="space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">What is the Lens of Experience?</h2>
          <p className="text-base text-muted-foreground">
            The Lens of Experience is the accumulated weight of prior events that every employee
            brings into a change initiative before a single word has been communicated. It is
            invisible to the leader and completely real to the employee. Every change announcement
            lands on people who have been through change before, and their prior experience shapes
            what they hear regardless of what was said.
          </p>
          <p className="text-base text-muted-foreground">
            Four components make up the lens. Each one requires a question the leader must answer
            honestly before the change begins.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {LENS_COMPONENTS.map((c) => (
            <Card key={c.n} data-testid={`card-lens-${c.n}`}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {c.n}. {c.title}
                </CardTitle>
                <CardDescription className="text-base italic">{c.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Discovering group dynamics after the announcement is significantly more expensive than
          discovering them before.
        </p>
      </section>

      {/* Five steps */}
      <section className="space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            What are the five steps of the ICMM?
          </h2>
          <p className="text-base text-muted-foreground">
            Each step carries two tracks that run in parallel. The organizational track is the work
            the business must do. The individual track is what the people affected need in order to
            move with the change rather than around it.
          </p>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto">
          {ICMM_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.n} data-testid={`card-step-${s.n}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    Step {s.n}: {s.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold mb-1">Organizational</p>
                    <p className="text-sm text-muted-foreground">{s.org}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Individual</p>
                    <p className="text-sm text-muted-foreground">{s.ind}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Commander's Intent */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          What is the difference between Commander's Intent and Commander's Directive?
        </h2>
        <p className="text-base text-muted-foreground">
          A Commander's Directive communicates the task and the method: what to do and how to do it.
          A Commander's Intent communicates the end state and the reason for it: what success looks
          like and why it matters. A directive produces compliance. An intent produces
          understanding.
        </p>
        <p className="text-base text-muted-foreground">
          The distinction matters because compliance does not survive contact with conditions the
          plan did not anticipate. When people understand the intent behind a change, they can make
          sound decisions in situations nobody scripted. When they have only been given the method,
          they stop at the edge of their instructions. In organizational change, where conditions
          shift constantly and no plan survives intact, compliance is not enough.
        </p>
      </section>

      {/* Research grounding */}
      <section className="bg-muted/30 border-y py-12 -mx-4 px-4 md:rounded-lg md:mx-0">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Where does this framework come from?</h2>
          <p className="text-base text-muted-foreground">
            The model comes out of a phenomenological study of employee experiences during
            disruptive organizational change in construction companies, conducted for a Ph.D. in
            Organizational Leadership at National University. The research examined how integrated communication
            and organizational guidance through Commander's Intent shape employee experience and
            change acceptance.
          </p>
          <p className="text-base text-muted-foreground">
            The findings were consistent. Directive orders produced limited shared understanding.
            Top-level directional guidance produced greater alignment and change acceptance. The
            people who had been through change before carried that experience into the next one, and
            leaders who did not account for it were surprised by resistance that had been
            predictable from the start.
          </p>
          <p className="text-sm text-muted-foreground border-l-4 border-primary pl-4">
            Smith, P. R. (2026). <em>Integrated Communication and Organizational Guidance in
            Construction: A Phenomenological Study of Employee Experiences During Change</em>{" "}
            (Order No. 32785526). ProQuest Dissertations &amp; Theses Global.
          </p>
        </div>
      </section>

      {/* From model to practice */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">How does the model get used in practice?</h2>
        <p className="text-base text-muted-foreground">
          A framework that lives in a binder does not change anything. The ICMM is built into the
          Change Management Information System, our platform for running change as a measurable
          process. Each phase in the platform carries the organizational and individual work
          side by side, and readiness surveys, stakeholder sentiment, and adoption tracking make the
          diagnostic layer something you can see rather than something you infer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button className="gap-2" asChild data-testid="button-model-consult">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
          <Link href="/offerings">
            <Button variant="outline" data-testid="button-model-offerings">
              See How We Work
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
