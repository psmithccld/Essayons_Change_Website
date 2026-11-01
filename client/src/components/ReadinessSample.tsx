import { useState } from "react";
import { Link } from "wouter";

/**
 * A four-question sample of the Change Readiness Quiz, one statement per pillar.
 * Statements and tips are taken verbatim from ChangeReadinessQuiz so the sample
 * and the full quiz always say the same thing.
 */
const SAMPLE = [
  {
    pillar: "Lens of Experience",
    text: "The last major change here ended the way people were told it would.",
    tip: "Before your next announcement, talk to the person most likely to be skeptical. Ask what the last change taught them to expect.",
  },
  {
    pillar: "Trust Climate",
    text: "When leadership announces something, people take it at face value rather than looking for a hidden reason.",
    tip: "Name one commitment leadership made and kept, and one it did not. People are already keeping this ledger; make sure you are too.",
  },
  {
    pillar: "Stakeholder Clarity",
    text: "The people who could block a change are identified and engaged before the design is finished.",
    tip: "Build your next stakeholder list from what the change touches, not who you know. For every system and process it changes, ask which functions interact with it.",
  },
  {
    pillar: "Intent vs. Directive",
    text: "People affected by a change understand why it is happening, not just what they have to do.",
    tip: "Open your next change message with the purpose and end-state before the task list, so people can make aligned decisions when conditions shift.",
  },
];

export default function ReadinessSample() {
  const [answers, setAnswers] = useState<number[]>([]);
  const done = answers.length >= SAMPLE.length;
  const idx = Math.min(answers.length, SAMPLE.length - 1);
  const q = SAMPLE[idx];

  let weakIdx = 0;
  answers.forEach((a, i) => {
    if (a < answers[weakIdx]) weakIdx = i;
  });
  const weak = SAMPLE[weakIdx];
  const progress = done ? 100 : ((idx + 1) / SAMPLE.length) * 100;

  return (
    <div
      className="w-full rounded-xl border bg-white p-6 shadow-sm"
      data-testid="readiness-sample"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[15px] font-semibold">Try 4 of the 12 questions</span>
        {!done && (
          <span className="text-sm text-muted-foreground">Question {idx + 1} of 4</span>
        )}
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-muted" aria-hidden="true">
        <div
          className="h-1.5 rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!done ? (
        <div className="mt-4 space-y-4">
          <span className="text-sm font-semibold text-primary">{q.pillar}</span>
          <p className="min-h-[78px] text-lg font-semibold leading-snug">{q.text}</p>
          <div className="flex gap-2" role="group" aria-label="Rate from 1, strongly disagree, to 5, strongly agree">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setAnswers((prev) => [...prev, n])}
                aria-label={`Score ${n} of 5`}
                className="min-h-[48px] min-w-[44px] flex-1 rounded-md border border-input bg-white text-base font-semibold transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-testid={`sample-score-${n}`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3" aria-live="polite">
          <span className="text-sm font-semibold text-muted-foreground">
            Your weakest pillar so far
          </span>
          <p className="text-2xl font-extrabold text-primary">{weak.pillar}</p>
          <p className="text-[15px] leading-relaxed">
            This is your most likely point of failure. {weak.tip}
          </p>
          <Link
            href="/change-readiness-quiz"
            className="mt-1 inline-flex min-h-[46px] w-full items-center justify-center rounded-md bg-primary px-4 text-[15px] font-bold text-primary-foreground hover:bg-primary/90"
            data-testid="link-sample-full-quiz"
          >
            Finish all 12 for your full breakdown
          </Link>
          <button
            type="button"
            onClick={() => setAnswers([])}
            className="py-2 text-sm text-muted-foreground underline"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
