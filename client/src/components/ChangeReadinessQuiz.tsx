import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import GameCompletionPanel from "@/components/GameCompletionPanel";
import { gtag } from "@/lib/gtag";

const CATS = ["LENS", "TRUST", "STAKEHOLDER", "INTENT"] as const;
type Category = typeof CATS[number];

interface Question {
  id: string;
  cat: Category;
  text: string;
}

const QUESTIONS: Question[] = [
  // LENS OF EXPERIENCE (1–3)
  {
    id: "q1",
    cat: "LENS",
    text: "The last major change here ended the way people were told it would.",
  },
  {
    id: "q2",
    cat: "LENS",
    text: "Leadership knows what past changes have taught our people to expect.",
  },
  {
    id: "q3",
    cat: "LENS",
    text: "Before we announce a change, someone talks to the people most likely to be skeptical.",
  },

  // TRUST CLIMATE (4–6)
  {
    id: "q4",
    cat: "TRUST",
    text: "When leadership announces something, people take it at face value rather than looking for a hidden reason.",
  },
  {
    id: "q5",
    cat: "TRUST",
    text: "People here give honest feedback about a change, not just the safe version.",
  },
  {
    id: "q6",
    cat: "TRUST",
    text: "Leaders here have done what they said they would the last few times it mattered.",
  },

  // STAKEHOLDER CLARITY (7–9)
  {
    id: "q7",
    cat: "STAKEHOLDER",
    text: "Our stakeholder list is built from every function a change touches, not just the people we already work with.",
  },
  {
    id: "q8",
    cat: "STAKEHOLDER",
    text: "The people who could block a change are identified and engaged before the design is finished.",
  },
  {
    id: "q9",
    cat: "STAKEHOLDER",
    text: "We rarely discover a critical stakeholder late, after decisions are already made.",
  },

  // INTENT VS. DIRECTIVE (10–12)
  {
    id: "q10",
    cat: "INTENT",
    text: "People affected by a change understand why it is happening, not just what they have to do.",
  },
  {
    id: "q11",
    cat: "INTENT",
    text: "Our change communication defines what success looks like, not just the next task and deadline.",
  },
  {
    id: "q12",
    cat: "INTENT",
    text: "When something unexpected comes up mid-change, people can reason toward the right call without escalating everything.",
  },
];

const FEEDBACK = {
  high: "Strong foundation. Sustain it by making this a documented, repeatable practice rather than something that depends on the current leaders.",
  medium: "Solid base. This dimension will hold under a small change but may strain under a large one. Pick one habit to sharpen before your next initiative.",
  low: "This is your most likely point of failure. Choose one concrete practice to apply before the next change begins, not after.",
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

export default function ChangeReadinessQuiz() {
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

    const sums: Record<Category, number> = { LENS: 0, TRUST: 0, STAKEHOLDER: 0, INTENT: 0 };
    const counts: Record<Category, number> = { LENS: 0, TRUST: 0, STAKEHOLDER: 0, INTENT: 0 };

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
      gtag.gameComplete("Change Readiness Quiz", {
        overall_score: parseFloat(results.overall.toFixed(2)),
      });
      gtag.gameCompleted("Change Readiness Quiz", parseFloat(results.overall.toFixed(2)));
    }
  }, [submitted, results]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Change Readiness Quiz</CardTitle>
          <CardDescription>
            Rate each statement from <strong>1</strong> (Strongly Disagree) to{" "}
            <strong>5</strong> (Strongly Agree). Based on the four pillars of the
            Essayons Change Method: the Lens of Experience, Trust Climate,
            Stakeholder Clarity, and Intent versus Directive.
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
                      Pillar: <strong>{labelFor(q.cat)}</strong>
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
    return "Your organization is carrying a strong foundation into its next change. Across all four pillars, the conditions that make change hold are largely in place. The risk now is complacency: strong readiness that lives in the current leaders rather than in documented practice can erode the moment those leaders move on. Your next step is to make what is working repeatable and visible, so the next change does not depend on the same people being in the room.";
  }
  if (overall >= 3.2) {
    return "You have real strengths and at least one pillar that will cost you. Most stalled changes look exactly like this: well-designed and well-intentioned, but weak on one dimension nobody was actively managing. Look at your lowest pillar score and start there. A change can survive a strong effort on three pillars and still unwind on the fourth, so closing that single gap does more for your odds than improving everything at once.";
  }
  return "Your next significant change is carrying more risk than the organization can currently see. That is not a verdict, it is a head start. Most leaders never discover these gaps until they are mid-way through a change that is already failing, when the cost of fixing them is highest. You have found them before launch, when they are still cheap to address. Every one of these pillars is diagnosable and improvable with deliberate practice. Start with your lowest.";
}

function getReadinessLinkedIn(overall: number): string {
  const score = overall.toFixed(2);
  if (overall >= 4.2) {
    return `My organization scored ${score}/5 on the Change Readiness Quiz from Essayons Change.\n\nStrong readiness across all four pillars (the Lens of Experience, Trust, Stakeholder Clarity, and Intent) is what makes change actually hold.\n\nSee where your organization stands: https://essayonschange.com/games\n\n#ChangeManagement #Leadership`;
  }
  if (overall >= 3.2) {
    return `I just took the Change Readiness Quiz from Essayons Change and scored ${score}/5.\n\nKnowing which pillar is your weakest before a change begins is a real advantage. Most organizations find out mid-initiative, when it is expensive.\n\nTake the quiz: https://essayonschange.com/games\n\n#ChangeManagement #Leadership`;
  }
  return `I just took the Change Readiness Quiz from Essayons Change.\n\nChange fails in the gap between what you design and what your people experience. Seeing that gap before you launch is the whole point.\n\nFind your readiness score: https://essayonschange.com/games\n\n#ChangeManagement #Leadership`;
}

function ResultsPanel({ results, onReset }: { results: Results; onReset: () => void }) {
  const { avgs, overall } = results;

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>
            Scores are averages per pillar (max 5). Your lowest pillar is your
            most likely point of failure in the next change. Use the feedback to
            decide where to focus first.
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
        sourcePage="game_change_readiness_quiz_completion"
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
    case "LENS":
      return "Lens of Experience";
    case "TRUST":
      return "Trust Climate";
    case "STAKEHOLDER":
      return "Stakeholder Clarity";
    case "INTENT":
      return "Intent vs. Directive";
  }
}

function tipFor(cat: Category): string {
  switch (cat) {
    case "LENS":
      return "Before your next announcement, talk to the person most likely to be skeptical. Ask what the last change taught them to expect.";
    case "TRUST":
      return "Name one commitment leadership made and kept, and one it did not. People are already keeping this ledger; make sure you are too.";
    case "STAKEHOLDER":
      return "Build your next stakeholder list from what the change touches, not who you know. For every system and process it changes, ask which functions interact with it.";
    case "INTENT":
      return "Open your next change message with the purpose and end-state before the task list, so people can make aligned decisions when conditions shift.";
  }
}
