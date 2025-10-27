import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/image_1761593182537.png";

export default function Hero() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Essayons Change Management
          </h1>
          
          <p className="text-lg text-muted-foreground md:text-xl">
            Combining the Army Engineer Corps' philosophy: <span className="font-semibold text-foreground">Essayons, Let Us Try</span>, with data-driven research into change management.
          </p>

          <p className="text-base text-muted-foreground">
            Our Change Management Information System (CMIS) empowers organizations to design, measure, and sustain change through integrated leadership tools and evidence-based methodologies.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/pricing">
              <Button size="lg" data-testid="button-get-started">
                Get Started with CMIS
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-lg border shadow-lg">
            <img
              src={heroImage}
              alt="Essayons Change Process Flow Dashboard"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
