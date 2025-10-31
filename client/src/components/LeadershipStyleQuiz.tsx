import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

const STYLES = [
  "Authentic",
  "Servant",
  "Transformational",
  "Transactional",
  "Democratic",
  "Authoritarian",
  "Laissez-Faire",
] as const;

type LeadershipStyle = typeof STYLES[number];

interface Question {
  id: number;
  style: LeadershipStyle;
  text: string;
}

const QUESTIONS: Question[] = [
  { id: 1, style: "Authentic", text: "I lead by being transparent and consistent, even when it's uncomfortable." },
  { id: 2, style: "Authentic", text: "My team would describe me as genuine and self-aware." },
  { id: 3, style: "Servant", text: "I focus on removing barriers so my team can perform at their best." },
  { id: 4, style: "Servant", text: "I measure success by how well I develop others, not personal recognition." },
  { id: 5, style: "Transformational", text: "I communicate a vision that motivates others to achieve more than they thought possible." },
  { id: 6, style: "Transformational", text: "I challenge the status quo to drive positive change and innovation." },
  { id: 7, style: "Transactional", text: "I set clear expectations and reward performance according to results." },
  { id: 8, style: "Transactional", text: "I rely on structure, rules, and measurable outcomes to keep projects on track." },
  { id: 9, style: "Democratic", text: "I invite my team to contribute ideas before making major decisions." },
  { id: 10, style: "Democratic", text: "I balance group consensus with timely decision-making." },
  { id: 11, style: "Authoritarian", text: "In times of uncertainty, I prefer to make quick, decisive calls myself." },
  { id: 12, style: "Authoritarian", text: "I value discipline, order, and adherence to established procedures." },
  { id: 13, style: "Laissez-Faire", text: "I trust capable team members to determine their own methods for achieving goals." },
  { id: 14, style: "Laissez-Faire", text: "I prefer to provide minimal oversight and step in only when needed." },
];

interface StyleDescription {
  summary: string;
  strengths: string[];
}

const DESCRIPTIONS: Record<LeadershipStyle, StyleDescription> = {
  Authentic: {
    summary:
      "Authentic leaders are self-aware, transparent, and guided by integrity. You inspire trust by aligning actions with values.",
    strengths: [
      "High trust and credibility",
      "Consistent and values-driven",
      "Empowers open communication",
    ],
  },
  Servant: {
    summary:
      "Servant leaders prioritize the needs of others, focusing on developing their team and fostering growth from the ground up.",
    strengths: [
      "Builds loyalty through empathy",
      "Encourages collaboration",
      "Creates strong, people-centered culture",
    ],
  },
  Transformational: {
    summary:
      "Transformational leaders are visionaries who energize teams around a shared purpose, driving innovation and long-term change.",
    strengths: [
      "Inspires others toward a vision",
      "Encourages innovation",
      "Drives commitment and enthusiasm",
    ],
  },
  Transactional: {
    summary:
      "Transactional leaders thrive on structure, accountability, and measurable results. You ensure clarity and performance through systems.",
    strengths: [
      "Clear expectations and metrics",
      "Strong operational control",
      "Reward-based motivation",
    ],
  },
  Democratic: {
    summary:
      "Democratic leaders value collaboration and shared ownership. You balance diverse input with decisive action.",
    strengths: [
      "High engagement through participation",
      "Empowers team input",
      "Fosters buy-in and creativity",
    ],
  },
  Authoritarian: {
    summary:
      "Authoritarian leaders bring order and decisiveness, especially valuable in crisis or high-risk situations.",
    strengths: [
      "Strong direction and focus",
      "Effective in time-critical decisions",
      "Clear accountability structures",
    ],
  },
  "Laissez-Faire": {
    summary:
      "Laissez-Faire leaders empower independent thinkers and high performers, trusting them to self-direct toward outcomes.",
    strengths: [
      "High autonomy for skilled teams",
      "Encourages innovation through freedom",
      "Supports creative problem-solving",
    ],
  },
};

export default function LeadershipStyleQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qid: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const totalAnswered = Object.values(answers).filter(Boolean).length;
  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100);

  const results = useMemo(() => {
    if (!submitted) return null;
    
    const sums: Record<LeadershipStyle, number> = {
      Authentic: 0,
      Servant: 0,
      Transformational: 0,
      Transactional: 0,
      Democratic: 0,
      Authoritarian: 0,
      "Laissez-Faire": 0,
    };
    
    QUESTIONS.forEach((q) => {
      const val = answers[q.id] || 0;
      sums[q.style] += val;
    });
    
    const avgs: Record<LeadershipStyle, number> = Object.fromEntries(
      STYLES.map((s) => [s, sums[s] / QUESTIONS.filter((q) => q.style === s).length])
    ) as Record<LeadershipStyle, number>;
    
    const sorted = Object.entries(avgs).sort((a, b) => b[1] - a[1]);
    const topStyle = sorted[0][0] as LeadershipStyle;
    const secondary = sorted[1][0] as LeadershipStyle;
    
    return { avgs, topStyle, secondary };
  }, [submitted, answers]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3" data-testid="text-quiz-title">
          Leadership Style Quiz
        </h1>
        <p className="text-muted-foreground" data-testid="text-quiz-description">
          Rate each statement from <strong>1</strong> (Strongly Disagree) to{" "}
          <strong>5</strong> (Strongly Agree). Your responses will reveal your dominant leadership style and key strengths.
        </p>
      </div>

      {!submitted ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium" data-testid="text-progress-percent">{progress}%</span>
            </div>
            <Progress value={progress} data-testid="progress-quiz" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {QUESTIONS.map((q, i) => (
              <Card key={q.id} data-testid={`card-question-${q.id}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    {i + 1}. {q.text}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <label
                        key={v}
                        className={`relative flex flex-col items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-all ${
                          answers[q.id] === v
                            ? "bg-primary/90 dark:bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2 scale-105"
                            : "border-border hover-elevate active-elevate-2"
                        }`}
                        data-testid={`label-question-${q.id}-rating-${v}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={v}
                          className="sr-only"
                          checked={answers[q.id] === v}
                          onChange={() => handleChange(q.id, v)}
                          data-testid={`input-question-${q.id}-rating-${v}`}
                        />
                        {answers[q.id] === v && (
                          <Check className="absolute top-1 right-1 h-4 w-4" />
                        )}
                        <span className="text-lg font-semibold">{v}</span>
                      </label>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    1 = Strongly Disagree | 5 = Strongly Agree
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={totalAnswered < QUESTIONS.length}
                data-testid="button-view-results"
              >
                View Results
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
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

interface ResultsPanelProps {
  results: {
    avgs: Record<LeadershipStyle, number>;
    topStyle: LeadershipStyle;
    secondary: LeadershipStyle;
  };
  onReset: () => void;
}

function ResultsPanel({ results, onReset }: ResultsPanelProps) {
  const { avgs, topStyle, secondary } = results;
  const top = DESCRIPTIONS[topStyle];
  const sec = DESCRIPTIONS[secondary];

  return (
    <div className="space-y-6">
      <Card data-testid="card-primary-result">
        <CardHeader>
          <CardTitle className="text-2xl text-primary" data-testid="text-primary-style">
            Your Leadership Style: {topStyle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground" data-testid="text-primary-summary">
            {top.summary}
          </p>
          <div>
            <h3 className="font-semibold mb-2">Key Strengths:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {top.strengths.map((s, i) => (
                <li key={i} data-testid={`text-primary-strength-${i}`}>{s}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-secondary-result">
        <CardHeader>
          <CardTitle className="text-lg" data-testid="text-secondary-style">
            Secondary Influence: {secondary}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground" data-testid="text-secondary-summary">
            {sec.summary}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">All Leadership Styles</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(avgs).map(([style, score]) => (
            <Card key={style} data-testid={`card-style-${style.toLowerCase().replace('-', '')}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-medium">{style}</span>
                  <span className="text-sm text-muted-foreground" data-testid={`text-score-${style.toLowerCase().replace('-', '')}`}>
                    {score.toFixed(2)} / 5.00
                  </span>
                </div>
                <Progress value={(score / 5) * 100} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        data-testid="button-take-again"
      >
        Take Again
      </Button>
    </div>
  );
}
