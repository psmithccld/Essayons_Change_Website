import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Link } from "wouter";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  seats: string;
  fileSize: string;
  storage: string;
  orgs: string;
  specs: { label: string; value: string }[];
  features: PricingFeature[];
  highlighted?: boolean;
  minSeats?: string;
}

export default function PricingCard({ 
  title, 
  price, 
  period, 
  seats,
  fileSize,
  storage,
  orgs,
  specs,
  features, 
  highlighted = false,
  minSeats
}: PricingCardProps) {
  return (
    <Card className={highlighted ? "border-primary shadow-lg" : ""} data-testid={`card-pricing-${title.toLowerCase()}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl mb-4">{title}</CardTitle>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="destructive">Active</Badge>
          <Badge variant="secondary">{seats}</Badge>
          <Badge variant="secondary">{fileSize}</Badge>
          <Badge variant="secondary">{orgs}</Badge>
        </div>
        {minSeats && (
          <p className="text-xs text-muted-foreground mt-2">{minSeats}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm border-b pb-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2" data-testid={`feature-${index}`}>
              {feature.included ? (
                <Check className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
              ) : (
                <X className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
              )}
              <span className="text-sm">{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/contact" className="w-full">
          <Button variant={highlighted ? "default" : "outline"} className="w-full" data-testid="button-contact-sales">
            Contact Sales
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
