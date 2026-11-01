import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import EditorialSection from "@/components/EditorialSection";
import ReadinessSample from "@/components/ReadinessSample";
import { CONSULTATION_URL, DEMO_URL } from "@/lib/booking";
import cmisProcessFlow from "@assets/cmis-change-process-flow.jpg";
import philSmithImage from "@assets/Author Picture_1761601756882.jpg";

const QUIZ_PATH = "/change-readiness-quiz";

const h2 = "text-[28px] font-bold leading-tight tracking-tight md:text-[34px]";
const body = "text-lg leading-relaxed text-foreground/85";
const primaryButton =
  "inline-flex min-h-[50px] items-center gap-2 rounded-md bg-primary px-6 text-[17px] font-bold text-primary-foreground hover:bg-primary/90";

const PILLARS = [
  {
    name: "Lens of Experience",
    statement: "Leadership knows what past changes have taught our people to expect.",
  },
  {
    name: "Trust Climate",
    statement: "Leaders here have done what they said they would the last few times it mattered.",
  },
  {
    name: "Stakeholder Clarity",
    statement: "We rarely discover a critical stakeholder late, after decisions are already made.",
  },
  {
    name: "Intent vs. Directive",
    statement:
      "Our change communication defines what success looks like, not just the next task and deadline.",
  },
];

const STAGES = [
  {
    when: "Before you announce",
    title: "You can still see the room.",
    text: "You find the skeptics, the unresolved conflict and the trust gap. You adjust the plan and the message.",
    cost: "Cheapest point to act",
    bar: "border-[#C9D0CE]",
    costClass: "text-foreground",
  },
  {
    when: "The week you announce",
    title: "The story sets without you.",
    text: "Informal leaders frame the change before your second email lands. People compare it to the last one, and that comparison sticks.",
    cost: "The narrative locks in",
    bar: "border-[#B9837F]",
    costClass: "text-foreground",
  },
  {
    when: "After rollout",
    title: "You pay for it in rework.",
    text: "Workarounds, quiet non-use and lost champions. The sponsor asks why the plan slipped, and the next change starts with less trust.",
    cost: "Most expensive point",
    bar: "border-primary",
    costClass: "text-primary",
  },
];

const SERVICES = [
  {
    situation: "Announcing a change in the next 90 days?",
    name: "Change Readiness Assessment",
    text: "A fixed-fee read on organizational and individual readiness, stakeholder sentiment, ranked adoption risks, and the actions that close the gaps before launch.",
    pricing: "Fixed-fee project",
    cta: "Request an assessment",
    href: CONSULTATION_URL,
  },
  {
    situation: "Several changes running, and no one owns adoption?",
    name: "Fractional Change Management",
    text: "A senior change leader embedded on your team on a monthly retainer. Stakeholder strategy, readiness, communication and execution discipline, without a full-time hire.",
    pricing: "Monthly retainer",
    cta: "Discuss an engagement",
    href: CONSULTATION_URL,
  },
  {
    situation: "Need to see adoption risk across every initiative?",
    name: "CMIS Platform",
    text: "The system of record for organizational change: stakeholders, readiness surveys, RAID logs, communication plans and reporting, tied to each initiative.",
    pricing: "Annual license. Founding Member pricing available.",
    cta: "See a demo",
    href: DEMO_URL,
  },
];

const FAQ = [
  {
    q: "What is change management?",
    a: "Change management is the work of helping people understand, accept and adopt a change so the organization gets the result it planned. It runs alongside the project plan, not after it.",
  },
  {
    q: "What does a change readiness assessment include?",
    a: "A readiness profile across organizational and individual dimensions, stakeholder sentiment and influence analysis, adoption risks ranked by likelihood and impact, and prioritized actions to close the gaps before execution.",
  },
  {
    q: "What is fractional change management?",
    a: "An experienced change leader joins your team part time on a monthly retainer. You get senior judgment and execution discipline without the cost of a full-time hire.",
  },
  {
    q: "How much does change management consulting cost?",
    a: "Assessments are a fixed fee. Fractional work is a monthly retainer sized to the number of initiatives and people affected. CMIS is an annual license. The first 30-minute conversation costs nothing, and you receive a written, fixed-price proposal before any work begins.",
  },
  {
    q: "How is CMIS different from project management software?",
    a: "Project tools track tasks and dates. CMIS tracks adoption: readiness, stakeholder sentiment, communication and risk for each initiative, so you can act before a change stalls.",
  },
];

function Arrow() {
  return <ArrowRight className="h-4 w-4" aria-hidden="true" />;
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section>
        <div className="container max-w-6xl py-14 md:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
            <div className="flex flex-col gap-6">
              <p className="text-[15px] font-semibold text-primary">
                Change management for mid-market and PE-backed organizations
              </p>
              <h1 className="text-[40px] font-extrabold leading-[1.06] tracking-tight md:text-6xl">
                Your change will be decided before you announce it.
              </h1>
              <p className="max-w-xl text-[19px] leading-relaxed text-foreground/85">
                Every employee carries the last change into the next one. Essayons Change
                measures that risk before your announcement, then helps you run the change so
                adoption holds.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-1">
                <Link href={QUIZ_PATH} className={primaryButton} data-testid="button-hero-quiz">
                  Find your weak point in 5 minutes
                  <Arrow />
                </Link>
                <a
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold underline underline-offset-4"
                  data-testid="button-hero-consultation"
                >
                  Or talk through your change (30 min)
                </a>
              </div>
              <p className="border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                Built on doctoral research in organizational leadership · U.S. Army
                veteran-owned · Author of <em>Leadership Toolbox</em>
              </p>
            </div>
            <ReadinessSample />
          </div>
        </div>
      </section>

      {/* 01 Why now */}
      <EditorialSection id="why-now" number="01" label="Why now" labelledBy="why-now-heading">
        <div className="flex max-w-3xl flex-col gap-6">
          <h2 id="why-now-heading" className={h2}>
            More change. Less patience.
          </h2>
          <p className={body}>
            The average employee went through{" "}
            <strong className="text-foreground">22 enterprise changes in 2025</strong>, more than
            double the 10 they faced in 2022.<sup>1</sup> Willingness to support change was
            already falling, from{" "}
            <strong className="text-foreground">74% of employees in 2016 to 43% in 2022</strong>.
            <sup>2</sup> Now almost every organization is adding AI on top of everything else,
            and <strong className="text-foreground">79% report challenges adopting it</strong>.
            <sup>3</sup>
          </p>
          <figure className="flex flex-col gap-2.5">
            <figcaption className="text-sm font-semibold">
              Enterprise changes per employee, per year
            </figcaption>
            {[
              { year: "2016", value: 2, width: "8%", color: "bg-[#C9D0CE]" },
              { year: "2022", value: 10, width: "40%", color: "bg-[#B9837F]" },
              { year: "2025", value: 22, width: "88%", color: "bg-primary" },
            ].map((row) => (
              <div key={row.year} className="flex items-center gap-3">
                <span className="w-11 shrink-0 text-sm text-muted-foreground">{row.year}</span>
                <div className="flex flex-1 items-center gap-2.5">
                  <div className={`h-3.5 rounded-sm ${row.color}`} style={{ width: row.width }} />
                  <span className="text-sm font-semibold">{row.value}</span>
                </div>
              </div>
            ))}
          </figure>
          <p className="text-xl font-bold leading-snug">
            Your people aren't resisting this change. They're tired of the last twenty.
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-muted-foreground">
            <li>
              <a
                href="https://www.gartner.com/en/newsroom/press-releases/2026-10-27-gartner-hr-symposium-xpo-orlando-day-2-highlights"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Gartner, HR Symposium/Xpo, October 27, 2026
              </a>
              . 2016 figure:{" "}
              <a
                href="https://hbr.org/2023/05/employees-are-losing-patience-with-change-initiatives"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Gartner researchers in Harvard Business Review, May 2023
              </a>
              .
            </li>
            <li>
              <a
                href="https://www.gartner.com/en/webinar/462138/1090629"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Gartner, "How to Identify, Fix and Prevent Change Fatigue"
              </a>
              , 2022 data.
            </li>
            <li>
              <a
                href="https://writer.com/blog/enterprise-ai-adoption-2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WRITER, 2026 AI Adoption in the Enterprise survey
              </a>
              , April 2026.
            </li>
          </ol>
        </div>
      </EditorialSection>

      {/* 02 Cost of finding out late */}
      <EditorialSection
        id="cost"
        number="02"
        label="The cost of finding out late"
        labelledBy="cost-heading"
      >
        <div className="flex flex-col gap-8">
          <h2 id="cost-heading" className={`${h2} max-w-3xl`}>
            Found before the announcement, a problem costs a better message. Found after, it
            costs the rollout.
          </h2>
          <div className="grid gap-y-7 md:grid-cols-3">
            {STAGES.map((s) => (
              <div key={s.when} className={`border-t-[3px] ${s.bar} flex flex-col gap-2 pr-7 pt-4`}>
                <span className="text-[13px] font-semibold text-muted-foreground">{s.when}</span>
                <h3 className="text-[19px] font-bold">{s.title}</h3>
                <p className="text-base leading-relaxed text-foreground/85">{s.text}</p>
                <span className={`text-sm font-bold ${s.costClass}`}>{s.cost}</span>
              </div>
            ))}
          </div>
          <p className="max-w-2xl text-base italic leading-relaxed text-muted-foreground">
            "Discovering group dynamics after the announcement is significantly more expensive
            than discovering them before." From{" "}
            <Link href="/method" className="text-primary underline">
              the Essayons Change Method
            </Link>
            .
          </p>
        </div>
      </EditorialSection>

      {/* 03 Pillars and quiz */}
      <EditorialSection
        id="readiness-check"
        number="03"
        label="Free readiness check"
        labelledBy="pillars-heading"
      >
        <div className="flex flex-col gap-6">
          <h2 id="pillars-heading" className={h2}>
            Where will your change break?
          </h2>
          <p className={`${body} max-w-2xl`}>
            The Change Readiness Check scores your organization on the four pillars of the
            Essayons Change Method and names your weakest one before you commit people and
            budget.
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            One of the statements you'll rate for each pillar
          </p>
          <ol className="border-b">
            {PILLARS.map((p, i) => (
              <li
                key={p.name}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-t py-4"
              >
                <span className="w-7 shrink-0 text-[13px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-56 shrink-0 text-lg font-bold">{p.name}</span>
                <span className="min-w-[260px] flex-1 text-[17px] leading-relaxed text-foreground/85">
                  {p.statement}
                </span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={QUIZ_PATH} className={primaryButton} data-testid="button-pillars-quiz">
              Take the 5-minute check
            </Link>
            <span className="text-[15px] text-muted-foreground">
              12 questions. Free. Results and next steps by email.
            </span>
          </div>
        </div>
      </EditorialSection>

      {/* 04 Services */}
      <EditorialSection id="services" number="04" label="How we help" labelledBy="services-heading">
        <div className="flex flex-col gap-6">
          <h2 id="services-heading" className={h2}>
            Start where you are.
          </h2>
          <div className="border-b">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex flex-wrap items-start gap-x-8 gap-y-3 border-t py-6">
                <span className="min-w-[220px] flex-1 text-base font-bold leading-snug text-primary">
                  {s.situation}
                </span>
                <div className="flex min-w-[300px] flex-[2] flex-col gap-2">
                  <h3 className="text-[21px] font-bold">{s.name}</h3>
                  <p className="text-base leading-relaxed text-foreground/85">{s.text}</p>
                  <span className="text-sm text-muted-foreground">{s.pricing}</span>
                </div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-primary"
                >
                  {s.cta}
                  <Arrow />
                </a>
              </div>
            ))}
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/85">
            Based in the Greater St. Louis area and working with clients nationwide. Our
            experience runs deepest in construction, government contracting and private equity
            portfolio companies.{" "}
            <Link href="/offerings" className="font-semibold text-primary underline">
              See all offerings
            </Link>
            .
          </p>
        </div>
      </EditorialSection>

      {/* 05 Platform */}
      <EditorialSection id="cmis" number="05" label="The platform" labelledBy="cmis-heading">
        <div className="flex flex-col gap-6">
          <h2 id="cmis-heading" className={h2}>
            See adoption risk while there is still time to act.
          </h2>
          <p className={`${body} max-w-2xl`}>
            Project tools track tasks. The Change Management Information System tracks whether
            people are actually adopting the change, so you see the stall in week two, not month
            six.{" "}
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              See CMIS in a demo
            </a>
            .
          </p>
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b bg-muted/40 px-3.5 py-2.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-2 text-[13px] text-muted-foreground">app.essayonschange.com</span>
            </div>
            <img
              src={cmisProcessFlow}
              alt="CMIS Change Process Flow showing the five phases of the Essayons Change Method, with the organizational focus and individual support for the current phase"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[15px] leading-relaxed text-foreground/85">
            <span className="min-w-[180px] flex-1">
              <strong className="text-foreground">Readiness surveys</strong> with analysis and
              response tracking
            </span>
            <span className="min-w-[180px] flex-1">
              <strong className="text-foreground">Stakeholder directory</strong> with sentiment,
              influence and engagement
            </span>
            <span className="min-w-[180px] flex-1">
              <strong className="text-foreground">RAID logs and timelines</strong> aligned to each
              phase
            </span>
          </div>
        </div>
      </EditorialSection>

      {/* 06 Why Essayons */}
      <EditorialSection id="essayons" number="06" label="Why Essayons" labelledBy="essayons-heading">
        <div className="flex max-w-3xl flex-col gap-6">
          <h2 id="essayons-heading" className={h2}>
            "Essayons" means let us try. Not you go try. Let us.
          </h2>
          <p className={body}>
            It's the motto of the Army Corps of Engineers, and it's how we work. We stand in the
            change with you: adjusting, absorbing what the plan didn't predict, and still there
            when the rollout gets messy.
          </p>
          <p className={body}>
            Dr. Smith's doctoral research found that directive orders produced limited shared
            understanding, while top-level directional guidance produced greater alignment and
            change acceptance. That finding is built into every engagement and into CMIS.{" "}
            <Link href="/method" className="font-semibold text-primary underline">
              Read about the Essayons Change Method
            </Link>
            .
          </p>
          <div className="flex items-center gap-4 pt-1">
            <img
              src={philSmithImage}
              alt="Dr. Philip Smith"
              className="h-16 w-16 shrink-0 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold">Dr. Philip Smith, PMP</span>
              <span className="text-sm text-muted-foreground">
                Founder and CEO. PhD, Organizational Leadership. U.S. Army veteran. 20+ years
                leading projects and organizations.
              </span>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* FAQ */}
      <EditorialSection id="faq" number="Resources" label="Common questions" labelledBy="faq-heading">
        <div className="flex max-w-3xl flex-col gap-5">
          <h2 id="faq-heading" className={h2}>
            Questions leaders ask first
          </h2>
          <div className="border-b">
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-t py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-bold">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="font-normal text-muted-foreground group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-foreground/85">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="text-base text-foreground/85">
            More in{" "}
            <Link href="/blog" className="font-semibold text-primary underline">
              Insights
            </Link>
            : weekly articles on readiness, resistance and leading change.
          </p>
        </div>
      </EditorialSection>

      {/* Closing */}
      <section aria-labelledby="closing-heading">
        <div className="container max-w-6xl pb-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-7 rounded-2xl bg-muted/60 px-8 py-11 md:px-12">
            <div className="flex min-w-[280px] flex-1 flex-col gap-3">
              <h2
                id="closing-heading"
                className="text-[28px] font-extrabold leading-tight tracking-tight md:text-[38px]"
              >
                Your announcement date is the deadline.
              </h2>
              <p className="text-lg leading-relaxed text-foreground/85">
                Find your weakest pillar now, while fixing it costs a conversation instead of a
                rollout.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link href={QUIZ_PATH} className={primaryButton} data-testid="button-closing-quiz">
                Take the 5-minute check
              </Link>
              <a
                href={CONSULTATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-base font-semibold underline underline-offset-4"
              >
                Or talk through your change (30 min)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
