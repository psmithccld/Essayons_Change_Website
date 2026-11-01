import { Link } from "wouter";
import EditorialSection from "@/components/EditorialSection";
import { CONSULTATION_URL } from "@/lib/booking";
import philSmithImage from "@assets/Author Picture_1761601756882.jpg";
import danRauschImage from "@assets/image_1762711078959.png";

const h2 = "text-[28px] font-bold leading-tight tracking-tight md:text-[34px]";
const body = "text-lg leading-[1.75] text-foreground/85";

const BELIEFS = [
  {
    title: "Intent beats directive.",
    text: "People who understand why can adapt when the plan meets reality. People who only know what to do stop at the edge of their instructions.",
  },
  {
    title: "Read the room before you announce.",
    text: "Every employee brings the last change into the next one. Find out what they carry before the first message goes out.",
  },
  {
    title: "Adoption needs an owner.",
    text: "Projects have managers. Adoption usually has no one. We fill that seat or build the capability into your team.",
  },
  {
    title: "Measure understanding, not activity.",
    text: "Emails sent and trainings held are activity. Readiness, sentiment and adoption are the signal.",
  },
];

export default function About() {
  return (
    <div>
      <section>
        <div className="container max-w-6xl py-14 md:py-20">
          <div className="flex flex-col gap-6">
            <p className="text-[15px] font-semibold text-primary">About Essayons Change</p>
            <h1 className="max-w-4xl text-[38px] font-extrabold leading-[1.08] tracking-tight md:text-[56px]">
              Change fails in the space between the plan and the people. We work in that space.
            </h1>
            <p className="max-w-2xl text-[19px] leading-relaxed text-foreground/85">
              Essayons Change is a veteran-owned change management practice and platform, built on
              doctoral research into how employees experience change.
            </p>
          </div>
        </div>
      </section>

      <EditorialSection
        number="01"
        label="Why I built it"
        labelledBy="story-heading"
        aside={
          <div className="hidden flex-col gap-2 md:flex">
            <img
              src={philSmithImage}
              alt="Dr. Philip Smith"
              className="h-60 w-[200px] rounded-lg object-cover"
              loading="lazy"
            />
            <span className="text-[13px] leading-snug text-muted-foreground">
              Dr. Philip Smith, PMP
              <br />
              Founder and CEO
            </span>
          </div>
        }
      >
        <div className="flex max-w-[700px] flex-col gap-5">
          <h2 id="story-heading" className={h2}>
            The same failure, in different uniforms.
          </h2>
          <p className="text-[21px] leading-relaxed text-foreground">
            For more than 20 years, in the Army and in construction, I watched good plans fail in
            the same place: the gap between what leaders intended and what the people doing the
            work understood.
          </p>
          <p className={body}>
            In the Army, orders worked when everyone knew the commander's intent. People knew what
            success looked like and why it mattered, so they could adapt when the plan met reality.
            In construction, I watched changes stall when people got the directive without the why.
          </p>
          <p className={body}>
            My doctoral research put evidence behind what I had seen. Directive orders produced
            limited shared understanding. Top-level directional guidance produced greater alignment
            and change acceptance. People carried their last change into the next one, and leaders
            who ignored that were surprised by resistance they could have predicted.
          </p>
          <p className={body}>
            So I built Essayons Change to work in that gap: a method, a platform, and a team that
            stays in the change with you.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Research: Smith, P. R. (2026).{" "}
            <em>
              Integrated Communication and Organizational Guidance in Construction: A
              Phenomenological Study of Employee Experiences During Change
            </em>{" "}
            (Order No. 32785526). ProQuest Dissertations &amp; Theses Global.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection number="02" label="The name" labelledBy="name-heading">
        <div className="flex max-w-3xl flex-col gap-6">
          <h2 id="name-heading" className={h2}>
            Essayons: let us try.
          </h2>
          <p className={body}>
            Essayons is the motto of the U.S. Army Corps of Engineers. "You go try" puts the risk on
            your team. "Let us try" means the leader stands in the change with them. That is the
            standard we hold ourselves to with every client.
          </p>
          <div className="grid gap-x-10 gap-y-7 pt-2 sm:grid-cols-2">
            <div className="flex flex-col gap-2.5 border-t-2 border-foreground pt-4">
              <span className="text-[13px] font-bold text-primary">Our mission</span>
              <p className="text-[21px] font-semibold leading-snug">
                Let us clear the obstacles that stop an organization from changing: not the leader
                alone, not the team alone, together.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 border-t-2 border-foreground pt-4">
              <span className="text-[13px] font-bold text-primary">Our vision</span>
              <p className="text-[21px] font-semibold leading-snug">
                Every change lands on people who understand why it is happening and have a hand in
                making it work.
              </p>
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection number="03" label="What we believe" labelledBy="beliefs-heading">
        <div className="flex flex-col gap-5">
          <h2 id="beliefs-heading" className={h2}>
            Four things we won't compromise on
          </h2>
          <ol className="border-b">
            {BELIEFS.map((b, i) => (
              <li key={b.title} className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-t py-5">
                <span className="w-7 shrink-0 text-[13px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-72 shrink-0 text-lg font-bold">{b.title}</span>
                <span className="min-w-[260px] flex-1 text-base leading-relaxed text-foreground/85">
                  {b.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </EditorialSection>

      <EditorialSection number="04" label="The team" labelledBy="team-heading">
        <div className="flex flex-col gap-5">
          <h2 id="team-heading" className={h2}>
            Who you'll work with
          </h2>
          <div className="border-b">
            <div className="flex flex-wrap items-start gap-x-7 gap-y-5 border-t py-7">
              <img
                src={philSmithImage}
                alt="Dr. Philip Smith"
                className="h-36 w-[120px] shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex min-w-[260px] flex-1 flex-col gap-2.5">
                <div>
                  <h3 className="text-[21px] font-bold" data-testid="text-team-member-phil-name">
                    Dr. Philip Smith, PMP
                  </h3>
                  <p className="text-[15px] font-semibold text-primary" data-testid="text-team-member-phil-role">
                    Founder and Chief Executive Officer
                  </p>
                </div>
                <p className="text-base leading-relaxed text-foreground/85">
                  PhD in Organizational Leadership from National University (2026). U.S. Army
                  veteran with more than 20 years in project and organizational leadership. Author
                  of <em>Leadership Toolbox</em> (2023) and a member of the ACMP Webinar Task Force.
                </p>
                <div className="flex flex-wrap gap-5 text-[15px] font-semibold">
                  <Link href="/method" className="text-primary underline">
                    The Essayons Change Method
                  </Link>
                  <a
                    href="https://www.amazon.com/dp/B0CTP624BK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Leadership Toolbox
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-x-7 gap-y-5 border-t py-7">
              <img
                src={danRauschImage}
                alt="Dan Rausch"
                className="h-36 w-[120px] shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex min-w-[260px] flex-1 flex-col gap-2.5">
                <div>
                  <h3 className="text-[21px] font-bold" data-testid="text-team-member-dan-name">
                    Dan Rausch
                  </h3>
                  <p className="text-[15px] font-semibold text-primary" data-testid="text-team-member-dan-role">
                    Co-Founder and Chief Business Officer
                  </p>
                </div>
                <p className="text-base leading-relaxed text-foreground/85">
                  More than 20 years in sales, recruiting and strategic partnerships across
                  engineering, construction and professional services. Dan builds the relationships
                  that turn a change plan into a working partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection number="05" label="Partners" labelledBy="partners-heading">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2 id="partners-heading" className="text-xl font-bold">
            Certified partners
          </h2>
          <p className="text-[17px] leading-relaxed text-foreground/85">
            Certified practitioners, starting with Roslen Global, deliver the Essayons Change Method
            and CMIS under their own names.{" "}
            <Link href="/partners" className="font-semibold text-primary underline">
              Meet our partners or become one
            </Link>
            .
          </p>
        </div>
      </EditorialSection>

      <section aria-labelledby="about-closing-heading">
        <div className="container max-w-6xl pb-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-7 rounded-2xl bg-muted/60 px-8 py-11 md:px-12">
            <div className="flex min-w-[280px] flex-1 flex-col gap-3">
              <h2
                id="about-closing-heading"
                className="text-[28px] font-extrabold leading-tight tracking-tight md:text-[38px]"
              >
                Start with your own room.
              </h2>
              <p className="text-lg leading-relaxed text-foreground/85">
                Take the 5-minute Change Readiness Check and see which of the four pillars is
                weakest in your organization, before your next announcement.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="/change-readiness-quiz"
                className="inline-flex min-h-[50px] items-center rounded-md bg-primary px-6 text-[17px] font-bold text-primary-foreground hover:bg-primary/90"
              >
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
