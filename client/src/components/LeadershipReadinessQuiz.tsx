import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import GameCompletionPanel from "@/components/GameCompletionPanel";
import { gtag } from "@/lib/gtag";

const CATS = ["WHO", "WHAT", "WHEN", "WHERE", "WHY"] as const;
type Category = typeof CATS[number];

interface Question {
  id: string;
  cat: Category;
  text: string;
}

const QUESTIONS: Question[] = [
  // WHO (1–2)
  {
    id: "q1",
    cat: "WHO",
    text: "I understand the strengths, motivations, and constraints of the people involved in my work.",
  },
  {
    id: "q2",
    cat: "WHO",
    text: "Before delegating, I confirm shared understanding by asking others to restate the outcome in their own words.",
  },

  // WHAT (3–4)
  {
    id: "q3",
    cat: "WHAT",
    text: "My team has a clear definition of success (outcomes, not tasks) for our current effort.",
  },
  {
    id: "q4",
    cat: "WHAT",
    text: "I routinely connect tasks to the bigger mission so people know why their work matters.",
  },

  // WHEN (5–6)
  {
    id: "q5",
    cat: "WHEN",
    text: "We set milestone dates and decision gates that prevent last-minute surprises.",
  },
  {
    id: "q6",
    cat: "WHEN",
    text: "I adjust cadence (meetings, check-ins) to match project risk and urgency.",
  },

  // WHERE (7–8)
  {
    id: "q7",
    cat: "WHERE",
    text: "The working environment (tools, access, channels) supports fast, clear communication.",
  },
  {
    id: "q8",
    cat: "WHERE",
    text: "Stakeholders know where to find single-source-of-truth information (docs, plans, dashboards).",
  },

  // WHY (9–10)
  {
    id: "q9",
    cat: "WHY",
    text: "I can clearly express the purpose and intended end-state (commander's intent) for our initiatives.",
  },
  {
    id: "q10",
    cat: "WHY",
    text: "When priorities shift, I communicate the reasoning so people can make aligned decisions.",
  },
];

const FEEDBACK = {
  high: "Strong foundation. Sustain it by coaching others and stress-testing assumptions during change.",
  medium: "Solid base. Identify 1-2 specific habits to sharpen this dimension over the next sprint.",
  low: "Growth opportunity. Choose one small practice to apply this week to move the needle.",
};

function bucketFeedback(avg: number): string {
  if (avg >= 4.2) return FEEDBACK.high;
  if (avg >= 3.2) return FEEDBACK.medium;
  return FEEDBACK.low;
}

interface Results {
  sums: Record<Category, number>;
  counts: Record<Category, number>;
  avgs: Record<Category, number>;
  overall: number;
}

export default function LeadershipReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>(() =>
    QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: 0 }), {})
  );
  const [submitted, setSubmitted] = useState(false);

  const totalAnswered = useMemo(
    () => Object.values(answers).filter((v) => v > 0).length,
    [answers]
  );

  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100);

  const canSubmit = totalAnswered === QUESTIONS.length;

  const results = useMemo<Results | null>(() => {
    if (!submitted) return null;

    const sums: Record<Category, number> = { WHO: 0, WHAT: 0, WHEN: 0, WHERE: 0, WHY: 0 };
    const counts: Record<Category, number> = { WHO: 0, WHAT: 0, WHEN: 0, WHERE: 0, WHY: 0 };

    QUESTIONS.forEach((q) => {
      const v = Number(answers[q.id] || 0);
      sums[q.cat] += v;
      counts[q.cat] += 1;
    });

    const avgs = Object.fromEntries(
      CATS.map((c) => [c, sums[c] / (counts[c] || 1)])
    ) as Record<Category, number>;

    const overall = Object.values(avgs).reduce((a, b) => a + b, 0) / CATS.length;

    return { sums, counts, avgs, overall };
  }, [submitted, answers]);

  function handleChange(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers(QUESTIONS.reduce((acc, q) => ({ ...acc, [q.id]: 0 }), {}));
    setSubmitted(false);
  }

  useEffect(() => {
    if (submitted && results) {
      gtag.gameComplete("Leadership Readiness Quiz", {
        overall_score: parseFloat(results.overall.toFixed(2)),
      });
      gtag.gameCompleted("Leadership Readiness Quiz", parseFloat(results.overall.toFixed(2)));
    }
  }, [submitted, results]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Leadership Readiness Quiz</CardTitle>
          <CardDescription>
            Rate each statement from <strong>1</strong> (Strongly Disagree) to{" "}
            <strong>5</strong> (Strongly Agree). Based on the 5 Ws of Leadership:
            Who, What, When, Where, and Why.
          </CardDescription>
        </CardHeader>
      </Card>

      {!submitted ? (
        <>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span data-testid="text-progress">
                  {totalAnswered}/{QUESTIONS.length} ({progress}%)
                </span>
              </div>
              <Progress value={progress} data-testid="progress-bar" />
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {QUESTIONS.map((q, idx) => (
              <Card key={q.id}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="font-medium mb-2">
                      {idx + 1}. {q.text}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Category: <strong>{q.cat}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-3">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <label
                        key={v}
                        className={`flex flex-col items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all ${
                          answers[q.id] === v
                            ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2"
                            : "border-border hover-elevate"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={v}
                          className="sr-only"
                          checked={answers[q.id] === v}
                          onChange={(e) => handleChange(q.id, Number(e.target.value))}
                          aria-label={`Rate ${v} for question ${idx + 1}`}
                          data-testid={`input-${q.id}-${v}`}
                        />
                        <span className="text-lg font-semibold">{v}</span>
                      </label>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>1 = Strongly Disagree</span>
                    <span>5 = Strongly Agree</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={!canSubmit}
                data-testid="button-submit"
              >
                See Results
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                data-testid="button-reset"
              >
                Reset
              </Button>
            </div>
          </form>
        </>
      ) : (
        <ResultsPanel results={results!} onReset={handleReset} />
      )}
    </div>
  );
}

function getReadinessInsight(overall: number): string {
  if (overall >= 4.2) {
    return "Your scores reflect a leader who operates with intention across all five dimensions. Research consistently shows that leaders who understand their 'why' and can adapt across context, timing, and relationships are the ones who make change stick. Your next step is turning this awareness into documented practices your team can see and trust.";
  }
  if (overall >= 3.2) {
    return "You have a solid foundation to build from. The leaders who grow fastest pick one dimension and go deep rather than spreading development energy thin. Look at your lowest category score and start there. Small, consistent improvements in a single area compound faster than trying to move everything at once.";
  }
  return "Early awareness is a competitive advantage. Most leaders do not discover their readiness gaps until they are mid-way through a failed initiative. You now have a head start. Change management skills are learnable and your scores can look very different in 90 days with deliberate practice.";
}

function getReadinessLinkedIn(overall: number): string {
  const score = overall.toFixed(2);
  if (overall >= 4.2) {
    return `I just scored ${score}/5 on the Leadership Readiness Quiz from Essayons Change Management.\n\nStrong readiness across all five leadership dimensions (Who, What, When, Where, Why) reflects years of intentional practice.\n\nTake the quiz and see where you stand: https://essayonschange.com/games\n\n#LeadershipDevelopment #ChangeManagement`;
  }
  if (overall >= 3.2) {
    return `I just took the Leadership Readiness Quiz from Essayons Change Management and scored ${score}/5.\n\nKnowing your readiness gaps before a change initiative starts is a competitive advantage.\n\nTake the quiz: https://essayonschange.com/games\n\n#LeadershipDevelopment #ChangeManagement`;
  }
  return `I just took the Leadership Readiness Quiz from Essayons Change Management.\n\nAwareness is the first step in leadership growth. Take the quiz and discover your readiness score: https://essayonschange.com/games\n\n#LeadershipDevelopment #ChangeManagement`;
}

function ResultsPanel({ results, onReset }: { results: Results; onReset: () => void }) {
  const { avgs, overall } = results;

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
            Scores are averages per dimension (max 5). Use the feedback to pick
            one habit to practice this week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-lg">
            Overall Readiness:{" "}
            <strong className="text-primary" data-testid="text-overall-score">
              {overall.toFixed(2)} / 5
            </strong>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {CATS.map((cat) => (
          <Card key={cat}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{labelFor(cat)}</CardTitle>
                <span className="text-primary font-semibold" data-testid={`text-score-${cat}`}>
                  {avgs[cat].toFixed(2)} / 5
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={(avgs[cat] / 5) * 100} />
              
              <p className="text-sm">{bucketFeedback(avgs[cat])}</p>
              
              <p className="text-xs text-muted-foreground italic">
                <strong>Tip:</strong> {tipFor(cat)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <GameCompletionPanel
        insight={getReadinessInsight(overall)}
        linkedInText={getReadinessLinkedIn(overall)}
        sourcePage="game_readiness_quiz_completion"
      />

      <div>
        <Button onClick={onReset} variant="outline" data-testid="button-take-again">
          Take Again
        </Button>
      </div>
    </section>
  );
}

function labelFor(cat: Category): string {
  switch (cat) {
    case "WHO":
      return "Who (People & Stakeholders)";
    case "WHAT":
      return "What (Outcomes & Intent)";
    case "WHEN":
      return "When (Cadence & Timing)";
    case "WHERE":
      return "Where (Channels & Environment)";
    case "WHY":
      return "Why (Purpose & Meaning)";
  }
}

function tipFor(cat: Category): string {
  switch (cat) {
    case "WHO":
      return "Run a quick stakeholder scan and note influence, interest, and preferred communication.";
    case "WHAT":
      return "Write a one-sentence outcome for your next task; ask a teammate to restate it.";
    case "WHEN":
      return "Add a decision gate and a short sync where risk is high; cancel a low-value meeting.";
    case "WHERE":
      return "Pick a single source of truth and link it in your meeting invites and signatures.";
    case "WHY":
      return "Open your next meeting with the purpose and end-state before diving into tasks.";
  }
}
