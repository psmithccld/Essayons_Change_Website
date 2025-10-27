import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, BarChart3, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Design",
    description: "Create initiatives, roles, and plans aligned to outcomes. Build comprehensive change strategies with our intuitive planning tools.",
  },
  {
    icon: BarChart3,
    title: "Measure",
    description: "Track readiness, tasks, and impact with built-in surveys & reports. Data-driven insights for informed decision making.",
  },
  {
    icon: Zap,
    title: "Sustain",
    description: "Embed practices with coaching and development maps. Ensure lasting transformation through continuous support.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="container py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
