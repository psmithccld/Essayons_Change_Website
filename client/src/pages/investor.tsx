import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const differentiators = [
  {
    title: "Live, Production-Ready Platform",
    description: "CMIS is fully built, tested, and stable — not a prototype. Core workflows are complete and actively used by the founding team.",
  },
  {
    title: "PhD-Level Research Foundation",
    description: "Built on original doctoral research in organizational leadership and change implementation science — a defensible core competitors cannot quickly replicate.",
  },
  {
    title: "First-Mover Category Opportunity",
    description: "No existing product unifies readiness, communication, and execution tracking. Methodologies guide. Tools track. CMIS executes. The category is ours to define.",
  },
  {
    title: "PE Land-and-Expand Model",
    description: "One PE firm relationship opens portfolio-wide deployment — a high-leverage, low-CAC growth engine with 75–80% gross margins.",
  },
];

const fundingUses = [
  { category: "Product & Platform", percentage: "40%", description: "Platform hardening and enterprise scalability for early customers." },
  { category: "Go-to-Market", percentage: "30%", description: "Founder-led PE outreach and acquisition of 12–15 paying logos." },
  { category: "Team & Operations", percentage: "20%", description: "Key hires in customer success and engineering." },
  { category: "Market Education", percentage: "10%", description: "Category positioning and advisory firm partnerships." },
];

export default function Investor() {
  const handleDataRoomClick = () => {
    window.open("https://wefindinvestors.app/data-room/30554b62729630b87ee22a910eb94556f05ccd4d82b2817c", "_blank");
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
              CMIS is a live, production-ready platform that turns leadership intent into coordinated execution.
              Built by operators. Grounded in research. Designed for execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" onClick={handleDataRoomClick} className="font-semibold text-base px-8">
                View Data Room
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
              { value: "$2–3T", label: "Enterprise Value at Risk Annually" },
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

        {/* Problem + Market */}
        <section className="space-y-10">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="space-y-5">
              <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">The Problem</div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Change Fails at the Execution Layer
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Organizations spend $3–4 trillion annually on transformation and lose $2–3 trillion of that to execution failure.
                Leaders lack real-time visibility into adoption risk. Teams lack timely guidance. And the tools they use —
                project software, spreadsheets, static frameworks — were never built to manage human adoption.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                { label: "Annual global transformation spend", value: "$3–4 Trillion" },
                { label: "Annual change support tool spend", value: "$80–120 Billion" },
                { label: "Initiatives failing to meet objectives", value: "~70%" },
                { label: "Enterprise value at risk annually", value: "$2–3 Trillion" },
              ].map((item) => (
                <Card key={item.label} className="border-border">
                  <CardContent className="pt-4 pb-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-sm text-foreground ml-4 shrink-0">{item.value}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* TAM/SAM/SOM */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "TAM", value: "$120B", desc: "Global enterprise transformation & change support spend." },
              { label: "SAM", value: "$20B", desc: "Mid-market & PE-backed organizations with the highest execution risk and clearest ROI for CMIS." },
              { label: "SOM", value: "$20M ARR", desc: "3–5 year beachhead via PE portfolio expansion — 140–180 customers at $15K blended ACV." },
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

        {/* Solution + GTM */}
        <section className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">The Solution</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              CMIS — Change Management Intelligence System
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              CMIS is the system of record for organizational change execution — identifying adoption risk before value is lost,
              quantifying readiness in real time, and synchronizing leadership intent with field execution.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: "Identify Adoption Risk", desc: "Surface invisible execution risk before initiatives stall." },
              { icon: "📊", title: "Quantify Readiness", desc: "Real-time readiness scoring at team and portfolio level." },
              { icon: "🔗", title: "Synchronize Execution", desc: "Connect leadership intent to field-level action." },
              { icon: "🎯", title: "Monitor Portfolio Health", desc: "Track health across multiple concurrent initiatives." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6 space-y-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="font-semibold text-base">{item.title}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">Platform Status</div>
                <div className="font-semibold text-foreground">Live & Production-Ready</div>
                <p className="text-sm text-muted-foreground">Built, tested, and stable. Actively used to manage our own launch.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">Target Customer</div>
                <div className="font-semibold text-foreground">Operations Leaders</div>
                <p className="text-sm text-muted-foreground">Accountable for concurrent initiatives — ERP rollouts, M&A integration, restructuring — without real-time adoption visibility.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">Revenue Model</div>
                <div className="font-semibold text-foreground">$15K Blended ACV · 75–80% GM</div>
                <p className="text-sm text-muted-foreground">Annual contracts. Founding Member program: 15 seats, $12–18K, targeting 12–15 logos in year one.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Go-to-Market */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-5">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">Go-to-Market</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              PE Relationships as the Growth Engine
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              One PE firm relationship opens portfolio-wide deployment across dozens of companies. Private equity
              increasingly demands predictable execution to protect value creation — CMIS directly addresses that need.
              Advisory firm partnerships serve as a secondary channel for accelerated market entry.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Year 1 Sales Funnel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
                {[
                  { label: "PE Portfolio Targets", value: "100" },
                  { label: "Discovery Calls", value: "40" },
                  { label: "Closed Customers", value: "10" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-bold text-primary">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <p>Target: 12–15 total logos in 12 months across PE and advisory channels.</p>
            </CardContent>
          </Card>
        </section>

        {/* Competitive Landscape */}
        <section className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">Competitive Landscape</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Methodologies Guide. Tools Track. CMIS Executes.
            </h2>
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
            Prosci ~$650–700M revenue · Kotter ~$700M–1B revenue · Global change management market $8.7B · PM software $7–10B
          </p>
        </section>

        {/* Why We Win */}
        <section className="space-y-8">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">Why Essayons Change Wins</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Four Structural Advantages</h2>
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

        {/* Use of Funds */}
        <section className="space-y-8">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">Use of Funds</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">$1,000,000 Seed Round</h2>
            <p className="text-base text-muted-foreground">
              15 months of runway. Target: $175–225K MRR and 140–180 customers before a priced institutional round.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fundingUses.map((item) => (
              <Card key={item.category}>
                <CardContent className="pt-6 space-y-2">
                  <div className="text-4xl font-bold text-primary">{item.percentage}</div>
                  <div className="font-semibold text-foreground">{item.category}</div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-8">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block text-xs font-semibold uppercase tracking-widest text-primary">The Team</div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Operators and Researchers. Built to Execute.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="font-semibold text-xl text-foreground">Phil Smith</div>
                <div className="text-sm text-primary font-medium">Founder & CEO · PMP | PhD Candidate, Organizational Leadership</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enterprise operator who designed and built CMIS from doctoral research in organizational leadership and change implementation science. Owns product, architecture, and founder-led sales.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="font-semibold text-xl text-foreground">Dan Rausch</div>
                <div className="text-sm text-primary font-medium">Co-Founder & Chief Business Officer</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Leads GTM and partnership strategy, focused on PE firm relationships and advisory channel development to drive portfolio-level penetration.
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-muted/30">
              <CardContent className="pt-4 pb-4">
                <span className="text-sm font-semibold text-foreground">Advisory: </span>
                <span className="text-sm text-muted-foreground">Contract Software Developer (architecture, QA, scalability) · Enterprise CIO Advisor (IT governance, security, enterprise readiness)</span>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Go Deeper?</h2>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Access our full investor data room or schedule a conversation directly with our founder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" variant="secondary" onClick={handleDataRoomClick} className="font-semibold text-base px-10">
              View Data Room
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

        {/* Legal Disclaimer */}
        <section className="border-t border-border pt-10 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Important Disclosures</p>
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed max-w-4xl">
            <p>
              Essayons Change, LLC is conducting a private securities offering pursuant to Rule 506(c) of Regulation D under the Securities Act of 1933, as amended. This page constitutes general solicitation as permitted under Rule 506(c) and is intended solely for informational purposes. It does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any offer or sale of securities will be made only by means of official offering documents delivered to eligible investors.
            </p>
            <p>
              <strong className="text-foreground">This offering is open exclusively to verified accredited investors.</strong> Participation is limited to individuals or entities that qualify as "accredited investors" as defined under Rule 501(a) of Regulation D. Prior to accepting any investment, Essayons Change will take reasonable steps to verify each investor's accredited status in accordance with Rule 506(c), which may include review of financial statements, tax returns, third-party verification letters from licensed attorneys or CPAs, or other documentation as required.
            </p>
            <p>
              The securities offered have not been registered under the Securities Act of 1933 or any state securities laws and are being offered in reliance on the exemption provided by Rule 506(c) of Regulation D. These securities may not be resold or transferred without registration or an applicable exemption. A Form D has been filed with the U.S. Securities and Exchange Commission in connection with this offering.
            </p>
            <p>
              Investing in early-stage private company securities is highly speculative and involves a high degree of risk. An investment in Essayons Change should only be considered by persons who can afford a total loss of their investment. Private company securities are illiquid — there is no established public trading market, and there is no guarantee that any such market will develop. You should be prepared to hold any investment for an indefinite period of time.
            </p>
            <p>
              Nothing on this page constitutes investment, legal, or tax advice. Essayons Change makes no representation or warranty, express or implied, regarding the accuracy, completeness, or adequacy of the information presented. Prospective investors are strongly encouraged to conduct independent due diligence, review all offering documents carefully, and consult with qualified legal, financial, and tax advisors before making any investment decision. This page may contain forward-looking statements and projections that are subject to risks and uncertainties; actual results may differ materially.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
