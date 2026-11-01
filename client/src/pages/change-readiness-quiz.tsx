import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import GameGate, { GATE_SESSION_KEY } from "@/components/GameGate";
import ChangeReadinessQuiz from "@/components/ChangeReadinessQuiz";
import { gtag } from "@/lib/gtag";

const QUIZ_NAME = "Change Readiness Quiz";
const SOURCE_PAGE = "game_change_readiness_quiz";

/**
 * Standalone, indexable home for the Change Readiness Quiz. Same quiz and the
 * same optional email gate as the Free Tools page, but at its own URL so it can
 * be linked from every call to action and found in search.
 */
export default function ChangeReadinessQuizPage() {
  const [, navigate] = useLocation();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(GATE_SESSION_KEY) === "true") {
        gtag.gameGateSkipped(SOURCE_PAGE);
        gtag.gameStart(QUIZ_NAME);
        setStarted(true);
      }
    } catch {
      // Storage unavailable: show the gate, which also offers a skip.
    }
  }, []);

  return (
    <div className="container max-w-5xl py-10">
      <div className="mx-auto mb-6 max-w-4xl space-y-3 px-6">
        <p className="text-[15px] font-semibold text-primary">Free Change Readiness Check</p>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Where will your next change break?
        </h1>
        <p className="text-lg leading-relaxed text-foreground/85">
          Twelve statements, about five minutes. You get a score for each of the four pillars of the
          Essayons Change Method and see which one is your most likely point of failure before the
          change begins.
        </p>
      </div>

      {started ? (
        <ChangeReadinessQuiz />
      ) : (
        <GameGate
          gameName={QUIZ_NAME}
          gameDescription="Evaluate your organization's readiness across the four pillars of the Essayons Change Method."
          sourcePage={SOURCE_PAGE}
          onProceed={() => {
            gtag.gameStart(QUIZ_NAME);
            setStarted(true);
          }}
          onBack={() => navigate("/games")}
        />
      )}
    </div>
  );
}
