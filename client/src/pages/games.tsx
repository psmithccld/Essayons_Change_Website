import { useState } from "react";
import GameCard from "@/components/GameCard";
import LeadershipToolboxGame from "@/components/LeadershipToolboxGame";
import { Gamepad2, Brain, Users, Target, TrendingUp, CheckSquare, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingGames = [
  {
    icon: Gamepad2,
    title: "Change Readiness Quiz",
    description: "Interactive assessment to evaluate your organization's readiness for transformation and identify improvement areas.",
  },
  {
    icon: Brain,
    title: "Leadership Scenarios",
    description: "Gamified scenarios to practice change leadership skills in realistic situations with instant feedback.",
  },
  {
    icon: Users,
    title: "Stakeholder Mapping",
    description: "Interactive tool to visualize and analyze stakeholder relationships, influence, and engagement strategies.",
  },
  {
    icon: Target,
    title: "Change Strategy Builder",
    description: "Guided experience to craft comprehensive change strategies aligned with your organizational goals.",
  },
  {
    icon: TrendingUp,
    title: "Impact Simulator",
    description: "Simulate different change scenarios and visualize their potential impact on your organization.",
  },
  {
    icon: CheckSquare,
    title: "Change Champion Certification",
    description: "Complete interactive challenges to earn certification as a change management champion.",
  },
];

export default function Games() {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return (
      <div className="container py-8">
        <Button
          variant="outline"
          onClick={() => setShowGame(false)}
          className="mb-4"
          data-testid="button-back-to-games"
        >
          ← Back to Games
        </Button>
        <LeadershipToolboxGame />
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Interactive Learning
        </h1>
        <p className="text-lg text-muted-foreground">
          Engage with interactive tools and gamified experiences designed to enhance your change management skills.
        </p>
      </div>

      <div className="border-t border-border" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Featured Game</h2>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
              <Gamepad2 className="w-6 h-6" />
              Leadership Toolbox – Board Game
            </CardTitle>
            <CardDescription className="text-base">
              Play an interactive board game to build leadership skills and practice change management concepts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">How to Play:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Play solo or against up to 3 AI opponents</li>
                <li>Roll the dice to navigate a 30-tile board</li>
                <li>Draw cards to earn skills and points</li>
                <li>Pass challenges by building required skill levels</li>
                <li>First to finish with 15+ points wins!</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">What You'll Learn:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Emotional intelligence skills (active listening, empathy, validation)</li>
                <li>Technical and presentation skills</li>
                <li>Job cost management and motivation strategies</li>
                <li>Relationship awareness and self-control</li>
              </ul>
            </div>

            <Button
              onClick={() => setShowGame(true)}
              size="lg"
              className="w-full gap-2"
              data-testid="button-play-game"
            >
              <Play className="w-5 h-5" />
              Play Now
            </Button>
          </CardContent>
        </Card>
      </section>

      <div className="border-t border-border" />

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Coming Soon</h2>
          <p className="text-muted-foreground">Additional interactive learning experiences in development</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingGames.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </section>
    </div>
  );
}
