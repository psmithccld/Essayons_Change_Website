import GameCard from "@/components/GameCard";
import { Gamepad2, Brain, Users, Target, TrendingUp, CheckSquare } from "lucide-react";

const games = [
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
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Interactive Learning
        </h1>
        <p className="text-lg text-muted-foreground">
          Engage with interactive tools and gamified experiences designed to enhance your change management skills.
        </p>
        <div className="inline-block px-4 py-2 bg-muted rounded-lg">
          <p className="text-sm font-medium">These features are currently in development and will be available soon!</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  );
}
