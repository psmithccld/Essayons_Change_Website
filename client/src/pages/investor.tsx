import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const differentiators = [
  {
    title: "Live, Production-Ready Platform",
    description:
      "CMIS is not a concept deck or prototype — it is a fully built, tested, and stable platform actively used by the founding team to manage Essayons Change's own launch. Core workflows are complete and informing real iteration.",
  },
  {
    title: "PhD-Level Research Foundation",
    description:
      "CMIS is architected from original doctoral research in organizational leadership and change implementation science. This creates a defensible, research-validated core that competitors built on practitioner intuition cannot replicate.",
  },
  {
    title: "Category Creation Opportunity",
    description:
      "No existing product combines readiness assessment, stakeholder communication, and execution tracking into a single system. Methodologies guide. Tools track. CMIS executes. Essayons Change has a first-mover window to define this category.",
  },
  {
    title: "PE Portfolio Land-and-Expand Model",
    description:
      "Private equity firms increasingly demand predictable execution across portfolio companies. Winning one PE relationship opens doors to dozens of companies — creating a high-leverage, low-CAC expansion engine with strong gross margins.",
  },
];

const fundingUses = [
  {
    category: "Product & Platform",
    percentage: "40%",
    description: "Platform hardening, feature completion, and enterprise scalability for early commercial customers.",
  },
  {
    category: "Go-to-Market",
    percentage: "30%",
    description: "Founder-led sales, PE outreach, and direct acquisition of 12–15 paying logos in 12 months.",
  },
  {
    category: "Team & Operations",
    percentage: "20%",
    description: "Key hires in customer success and engineering to support the Founding Member program.",
  },
  {
    category: "Market Education",
    percentage: "10%",
    description: "Thought leadership, category positioning, and advisory firm partnerships to establish CMIS as a recognized category.",
  },
];

export default function Investor() {
  const handleContactClick = () => {
    window.location.href = "mailto:psmith@essayonschange.com?subject=Investment%20Inquiry%20-%20Essayons%20Change";
  };

  const handleCalendlyClick = () => {
    window.open("https://calendly.com/psmith-essayonschange/investor", "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20 md:py-28">
          <div className="max-w-4xl space-y-6">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 text-sm px-4 py-1"
            >
              Seed Round — Raising $1,000,000
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-tight">
              The System of Record for
              <br />
              Organizational Change Execution.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl leading-relaxed">
              Essayons Change is building CMIS — a live, production-ready platform that turns leadership intent
              into coordinated execution. Built by operators. Grounded in research. Designed for execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleContactClick}
                className="font-semibold text-base px-8"
              >
                Request Investor Deck
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCalendlyClick}
                className="font-semibold text-base px-8 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule a Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$120B", label: "Total Addressable Market" },
              { value: "70%", label: "Change Initiatives That Fail" },
              { value: "$2–3T", label: "Annual Enterprise Value at Risk" },
              { value: "$20M", label: "ARR Target (3–5 Year)" },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-16 space-y-20">
        {/* The Problem */}
        <section className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-5">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              The Problem
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Change Fails at the Execution Layer, Not the Strategy Layer
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Organizations spend $3–4 trillion annually on transformation — and lose $2–3 trillion of that to
                execution failure. The culprit is not bad strategy. It is invisible adoption risk.
              </p>
              <p>
                Leaders lack real-time visibility into how change is landing on their teams. Employees do not
                receive timely, actionable guidance. Readiness and adoption are not measured consistently.
                And the tools organizations use — project software, spreadsheets, static frameworks — were never
                built to manage human adoption.
              </p>
              <p>
                The result: Strategic changes take longer, cost more, and fail more often — delaying value creation,
                increasing execution risk, and eroding organizational trust.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-2">
            {[
              { label: "Annual global transformation spend", value: "$3–4 Trillion" },
              { label: "Annual change support tool spend", value: "$80–120 Billion" },
              { label: "Initiatives failing to meet objectives", value: "~70%" },
              { label: "Enterprise value at risk annually", value: "$2–3 Trillion" },
            ].map((item) => (
              <Card key={item.label} className="border-border">
                <CardContent className="pt-5 pb-5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground max-w-xs">{item.label}</span>
                  <span className="font-semibold text-sm text-foreground ml-4 shrink-0">{item.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Market Opportunity
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              A Definable Market. A Winnable Beachhead.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "TAM",
                value: "$120B",
                desc: "Global enterprise transformation & change support spend — recurring enterprise spend driven by structural transformation cycles.",
              },
              {
                label: "SAM",
                value: "$20B",
                desc: "Mid-market & PE-backed enterprise transformation segment — organizations with the highest execution risk and the clearest ROI for CMIS.",
              },
              {
                label: "SOM",
                value: "$20M ARR",
                desc: "3–5 year beachhead target via PE portfolio expansion — 140–180 customers at $15K blended ACV.",
              },
            ].map((item) => (
              <Card key={item.label} className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</div>
                  <div className="text-4xl font-bold text-foreground">{item.value}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              The Solution
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              CMIS — Change Management Intelligence System
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              CMIS is the system of record for organizational change execution. It identifies adoption risk before
              value is lost, quantifies readiness in real time, synchronizes leadership intent with field execution,
              and monitors portfolio-wide execution health — replacing reactive change management with controlled, measurable execution.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: "Identify Adoption Risk", desc: "Surface invisible execution risk before initiatives stall or derail." },
              { icon: "📊", title: "Quantify Readiness", desc: "Real-time organizational readiness scoring at team and portfolio level." },
              { icon: "🔗", title: "Synchronize Execution", desc: "Connect leadership intent directly to field-level action and communication." },
              { icon: "🎯", title: "Monitor Portfolio Health", desc: "Track execution health across multiple concurrent initiatives." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6 space-y-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="font-semibold text-base">{item.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6 pb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Platform Status</div>
                  <div className="font-semibold text-foreground">Live & Production-Ready</div>
                  <p className="text-sm text-muted-foreground">Core workflows built, tested, and stable. Actively used by the founding team to manage Essayons Change's own launch.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Launch Readiness</div>
                  <div className="font-semibold text-foreground">GTM-Ready</div>
                  <p className="text-sm text-muted-foreground">Founding Member program finalized. Pricing, onboarding, and sales motion are prepared for immediate deployment.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Revenue Model</div>
                  <div className="font-semibold text-foreground">$15K Blended ACV · 75–80% GM</div>
                  <p className="text-sm text-muted-foreground">Annual contracts. Land-and-expand within PE-backed portfolios drives capital-efficient growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Target Customer */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-5">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Target Customer
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              The Operations Leader Carrying Execution Risk
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Our buyer is an operations leader accountable for executing multiple concurrent initiatives — often
                during ERP rollouts, M&A integration, or organizational restructuring — who lacks real-time visibility
                into readiness, adoption, and risk.
              </p>
              <p>
                CMIS becomes the connective tissue between leadership decisions and daily execution: something no
                current tool provides.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Primary Acquisition Channel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Direct PE firm relationships — winning one PE relationship opens portfolio-wide deployment across dozens of companies.</p>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                  {[
                    { label: "PE Portfolio Targets", value: "100" },
                    { label: "Year 1 Discovery Calls", value: "40" },
                    { label: "Year 1 Closed Customers", value: "10" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-2xl font-bold text-primary">{m.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Founding Member Program</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Limited to 15 seats. Annual contracts ($12–18K). Target: 12–15 logos in the first 12 months.</p>
                <p className="text-foreground font-medium">Secondary channel: Consulting & advisory firm partnerships for accelerated market entry.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Now */}
        <section className="space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why Now
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              The CMIS Category Doesn't Exist Yet. It Should.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Change Saturation",
                desc: "Organizations face unprecedented overlapping initiatives, overwhelmed teams, and rising failure rates — creating acute, immediate demand for a system that manages human adoption at scale.",
              },
              {
                title: "PE Execution Demands",
                desc: "Private equity increasingly requires predictable execution to protect and accelerate value creation across portfolio companies. CMIS directly addresses this growing institutional need.",
              },
              {
                title: "No Existing Solution",
                desc: "Project tools don't manage human adoption. No system today connects strategy → readiness → communication → execution at scale. That gap is our opportunity.",
              },
              {
                title: "First-Mover Advantage",
                desc: "No defined CMIS category exists. Essayons Change has the research foundation, live platform, and go-to-market motion to define and own this space before competitors can respond.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitive Landscape */}
        <section className="space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Competitive Landscape
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Methodologies Guide. Tools Track. CMIS Executes.
            </h2>
            <p className="text-base text-muted-foreground">
              The market is fragmented across consulting methodologies and generic project tools. No existing player
              combines readiness, communication, and execution in a single system.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pr-6 font-semibold text-foreground">Capability</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary">CMIS</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Prosci</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Kotter</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-foreground">PM Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Real-time adoption risk visibility", "✓", "✗", "✗", "✗"],
                  ["Readiness quantification", "✓", "Partial", "✗", "✗"],
                  ["Leadership-to-field execution sync", "✓", "✗", "✗", "Partial"],
                  ["Portfolio-wide execution health", "✓", "✗", "✗", "Partial"],
                  ["Scalable SaaS platform", "✓", "✗", "✗", "✓"],
                  ["Independent of consulting hours", "✓", "✗", "✗", "✓"],
                  ["Built on change research", "✓", "Partial", "Partial", "✗"],
                ].map(([capability, ...cols]) => (
                  <tr key={capability} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 pr-6 text-muted-foreground">{capability}</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">{cols[0]}</td>
                    {cols.slice(1).map((c, i) => (
                      <td key={i} className="py-3 px-4 text-center text-muted-foreground">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Prosci ~$650–700M annual revenue · Kotter ~$700M–1B annual revenue · Global change management market $8.7B · Project management software $7–10B
          </p>
        </section>

        {/* Use of Funds */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Use of Funds
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              $1,000,000 Seed Round — Go-to-Market Fuel
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              This raise funds 15 months of operating runway, launches and scales the Founding Member program,
              and positions Essayons Change to reach $175–225K MRR — the milestone that triggers a priced institutional round.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fundingUses.map((item) => (
              <Card key={item.category}>
                <CardContent className="pt-6 space-y-3">
                  <div className="text-4xl font-bold text-primary">{item.percentage}</div>
                  <div className="font-semibold text-foreground text-base">{item.category}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-6 pb-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { label: "Operating Runway", value: "15 Months" },
                  { label: "Next Raise Milestone", value: "$175–225K MRR" },
                  { label: "Customers at Target MRR", value: "140–180" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* The Team */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              The Team
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Operators and Researchers. Built to Execute.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="space-y-1">
                  <div className="font-semibold text-xl text-foreground">Phil Smith</div>
                  <div className="text-sm text-primary font-medium">Founder & CEO · PMP | PhD Candidate, Organizational Leadership</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Operator with deep experience leading complex enterprise initiatives. Designed and built CMIS from doctoral research in organizational leadership and change implementation science.</p>
                  <p>Owns product vision, technical architecture, and founder-led enterprise sales execution.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="space-y-1">
                  <div className="font-semibold text-xl text-foreground">Dan Rausch</div>
                  <div className="text-sm text-primary font-medium">Co-Founder & Chief Business Officer</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Leads GTM and partnership strategy with a focus on PE and advisory relationship development.</p>
                  <p>Drives founder-led enterprise sales execution and channel partnership strategy to accelerate portfolio-level penetration.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-muted/30">
              <CardContent className="pt-5 pb-5">
                <div className="text-sm font-semibold text-foreground mb-1">Technical & Enterprise Advisory</div>
                <p className="text-sm text-muted-foreground">
                  Contract Software Developer supporting architecture review, QA, and platform scalability.
                  Enterprise CIO Advisor guiding IT governance, security posture, and enterprise readiness.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Differentiators */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              Why Essayons Change Wins
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Four Structural Advantages
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Interested in Learning More?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            We are actively meeting with investors who believe enterprise technology can transform how organizations
            execute change. Request our full investor deck or schedule a conversation with our founder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              size="lg"
              variant="secondary"
              onClick={handleContactClick}
              className="font-semibold text-base px-10"
            >
              Request Investor Deck
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCalendlyClick}
              className="font-semibold text-base px-10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Schedule a Call
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 pt-2">
            psmith@essayonschange.com · Phil Smith, PMP · 240-446-1093
          </p>
        </section>

        {/* Legal disclaimer */}
        <section className="text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This page contains forward-looking statements and information intended solely for prospective investors
            evaluating a potential investment in Essayons Change. This content does not constitute an offer to sell
            or a solicitation of an offer to buy any securities. All investment involves risk.
          </p>
        </section>
      </div>
    </div>
  );
}
