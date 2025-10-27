import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function GameCard({ icon: Icon, title, description }: GameCardProps) {
  return (
    <Card className="hover-elevate cursor-pointer" data-testid={`card-game-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="outline" data-testid="badge-coming-soon">Coming Soon</Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
