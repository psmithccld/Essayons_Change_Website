import { useState } from "react";
import GameGate, { GATE_SESSION_KEY } from "@/components/GameGate";
import { gtag } from "@/lib/gtag";
import LeadershipToolboxGame from "@/components/LeadershipToolboxGame";
import LeadershipReadinessQuiz from "@/components/LeadershipReadinessQuiz";
import LeadershipStyleQuiz from "@/components/LeadershipStyleQuiz";
import ChangeReadinessQuiz from "@/components/ChangeReadinessQuiz";
import { Gamepad2, Play, ClipboardCheck, Compass, Layers } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ActiveView = "list" | "board-game" | "quiz" | "style-quiz" | "change-readiness-quiz";

interface PendingGame {
  view: ActiveView;
  name: string;
  description: string;
  sourcePage: string;
}

export default function Games() {
  const [activeView, setActiveView] = useState<ActiveView>("list");
  const [pendingGame, setPendingGame] = useState<PendingGame | null>(null);

  function openGate(view: ActiveView, name: string, description: string, sourcePage: string) {
    if (sessionStorage.getItem(GATE_SESSION_KEY) === "true") {
      gtag.gameGateSkipped(sourcePage);
      gtag.gameStart(name);
      setActiveView(view);
      return;
    }
    setPendingGame({ view, name, description, sourcePage });
  }

  function proceedToGame() {
    if (!pendingGame) return;
    gtag.gameStart(pendingGame.name);
    setActiveView(pendingGame.view);
    setPendingGame(null);
  }

  function cancelGate() {
    setPendingGame(null);
  }

  if (pendingGame) {
    return (
      <GameGate
        gameName={pendingGame.name}
        gameDescription={pendingGame.description}
        sourcePage={pendingGame.sourcePage}
        onProceed={proceedToGame}
        onBack={cancelGate}
      />
    );
  }

  if (activeView === "board-game") {
    return (
      <div className="container py-8">
        <Button
          variant="outline"
          onClick={() => setActiveView("list")}
          className="mb-4"
          data-testid="button-back-to-games"
        >
          Back to Games
        </Button>
        <LeadershipToolboxGame />
      </div>
    );
  }

  if (activeView === "quiz") {
    return (
      <div className="container py-8">
        <Button
          variant="outline"
          onClick={() => setActiveView("list")}
          className="mb-4"
          data-testid="button-back-to-games"
        >
          Back to Games
        </Button>
        <LeadershipReadinessQuiz />
      </div>
    );
  }

  if (activeView === "style-quiz") {
    return (
      <div className="container py-8">
        <Button
          variant="outline"
          onClick={() => setActiveView("list")}
          className="mb-4"
          data-testid="button-back-to-games"
        >
          Back to Games
        </Button>
        <LeadershipStyleQuiz />
      </div>
    );
  }

  if (activeView === "change-readiness-quiz") {
    return (
      <div className="container py-8">
        <Button
          variant="outline"
          onClick={() => setActiveView("list")}
          className="mb-4"
          data-testid="button-back-to-games"
        >
          Back to Games
        </Button>
        <ChangeReadinessQuiz />
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Free Tools and Assessments
        </h1>
        <p className="text-lg text-muted-foreground">
          Free assessments and interactive tools to check your organization's readiness for change
          and sharpen your leadership.
        </p>
      </div>

      <div className="border-t border-border" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Featured Experiences</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
                <Layers className="w-6 h-6" />
                Change Readiness Quiz
              </CardTitle>
              <CardDescription>
                Self-assessment based on the four pillars of the Essayons Change Method to evaluate your organization's readiness and find its most likely point of failure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">What You'll Discover:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Score four pillars: Lens of Experience, Trust, Stakeholder Clarity, and Intent</li>
                  <li>See which pillar is your weakest before a change begins</li>
                  <li>Get a full breakdown of what your results mean for your organization</li>
                  <li>12 questions, 5 minutes to complete</li>
                </ul>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full gap-2"
                data-testid="button-take-change-readiness-quiz"
              >
                <Link href="/change-readiness-quiz">
                  <Layers className="w-5 h-5" />
                  Take Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
                <Gamepad2 className="w-6 h-6" />
                Leadership Toolbox - Board Game
              </CardTitle>
              <CardDescription>
                Play an interactive board game to build leadership skills and practice change management concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">How to Play:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Play solo or against up to 3 AI opponents</li>
                  <li>Roll the dice to navigate a 30-tile board</li>
                  <li>Draw cards to earn skills and points</li>
                  <li>First to finish with 15+ points wins!</li>
                </ul>
              </div>

              <Button
                onClick={() => openGate(
                  "board-game",
                  "Leadership Toolbox Board Game",
                  "Build leadership skills through strategic play on a 30-tile board.",
                  "game_board_game"
                )}
                size="lg"
                className="w-full gap-2"
                data-testid="button-play-game"
              >
                <Play className="w-5 h-5" />
                Play Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
                <ClipboardCheck className="w-6 h-6" />
                Leadership Readiness Quiz
              </CardTitle>
              <CardDescription>
                Self-assessment based on the 5 Ws of Leadership to evaluate your readiness and identify growth areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">What You'll Discover:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Evaluate Who, What, When, Where, and Why dimensions</li>
                  <li>Get personalized feedback on each category</li>
                  <li>Receive actionable tips to strengthen your leadership</li>
                  <li>10 questions, 5 minutes to complete</li>
                </ul>
              </div>

              <Button
                onClick={() => openGate(
                  "quiz",
                  "Leadership Readiness Quiz",
                  "Measure your leadership readiness across the 5 Ws framework.",
                  "game_readiness_quiz"
                )}
                size="lg"
                className="w-full gap-2"
                data-testid="button-take-quiz"
              >
                <ClipboardCheck className="w-5 h-5" />
                Take Quiz
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
                <Compass className="w-6 h-6" />
                Leadership Style Quiz
              </CardTitle>
              <CardDescription>
                Discover your dominant leadership style and understand your unique strengths as a leader
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">What You'll Learn:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Identify your primary leadership style from 7 models</li>
                  <li>Understand your secondary style influence</li>
                  <li>Discover key strengths and approaches</li>
                  <li>14 questions, 5 minutes to complete</li>
                </ul>
              </div>

              <Button
                onClick={() => openGate(
                  "style-quiz",
                  "Leadership Style Quiz",
                  "Discover your dominant leadership style from 7 proven models.",
                  "game_style_quiz"
                )}
                size="lg"
                className="w-full gap-2"
                data-testid="button-take-style-quiz"
              >
                <Compass className="w-5 h-5" />
                Discover Your Style
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>

    </div>
  );
}
