import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Hero />
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
