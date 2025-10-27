import HeroCarousel from "@/components/HeroCarousel";
import FeatureGrid from "@/components/FeatureGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section className="container py-6">
        <p className="text-center text-base text-muted-foreground max-w-4xl mx-auto">
          Essayons Change provides organizational change management software and consulting services designed to improve readiness, communication, and leadership performance.
        </p>
      </section>
      
      <HeroCarousel />
      
      <section className="bg-primary/5 border-y py-8">
        <div className="container">
          <p className="text-center text-base md:text-lg font-medium text-foreground max-w-5xl mx-auto">
            Built for organizations that turn change into strategy using research-backed methods to measure progress, performance, and ROI.
          </p>
        </div>
      </section>
      
      <FeatureGrid />
      
      <section className="container py-12">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-2xl">Centralized Change Management</CardTitle>
            <CardDescription className="text-base">
              Initiative management, RAIDs, stakeholder maps, readiness surveys, and an AI coach — all connected to help your teams deliver and sustain change.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tutorials">
              <Button variant="outline" data-testid="button-view-tutorials">
                View Tutorials
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
