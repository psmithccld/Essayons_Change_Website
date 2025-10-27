import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export default function PricingCard({ title, price, period, description, features, highlighted = false }: PricingCardProps) {
  return (
    <Card className={highlighted ? "border-primary shadow-lg" : ""} data-testid={`card-pricing-${title.toLowerCase()}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2" data-testid={`feature-${index}`}>
              <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/contact" className="w-full">
          <Button variant={highlighted ? "default" : "outline"} className="w-full" data-testid="button-choose-plan">
            Choose Plan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
