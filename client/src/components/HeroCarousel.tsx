import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import slide1Image from "@assets/image_1761593182537.png";
import slide2Image from "@assets/image_1761599726140.png";
import slide3Image from "@assets/image_1761599761478.png";
import slide4Image1 from "@assets/image_1761599774749.png";
import slide4Image2 from "@assets/image_1761599788619.png";

const slides = [
  {
    id: 1,
    image: slide1Image,
    headline: "Visualize and Lead the Change Process",
    subtext: "Map organizational and individual actions through every phase of change — from identifying needs to reinforcing success.",
    layout: "single"
  },
  {
    id: 2,
    image: slide2Image,
    headline: "Track and Manage Risks in Real Time",
    subtext: "Identify, prioritize, and assign risks, actions, and issues across initiatives — all in one connected workspace.",
    layout: "single"
  },
  {
    id: 3,
    image: slide3Image,
    headline: "Map and Engage Stakeholders Effectively",
    subtext: "Visualize influence, engagement, and communication preferences to strengthen alignment and reduce resistance.",
    layout: "single"
  },
  {
    id: 4,
    image: null,
    images: [slide4Image1, slide4Image2],
    headline: "Measure Readiness and Demonstrate Results",
    subtext: "Use surveys and analytics to assess readiness, track progress, and show ROI across your change initiatives.",
    layout: "split"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setFadeClass("opacity-0");
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFadeClass("opacity-100");
      }, 500);
    }, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, currentSlide]);

  const goToSlide = (index: number) => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setCurrentSlide(index);
      setFadeClass("opacity-100");
    }, 500);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="container py-16 md:py-24">
      <div className="relative">
        <div className={`transition-opacity duration-500 ${fadeClass}`}>
          <div className="space-y-8">
            {/* Image Section */}
            {slide.layout === "single" ? (
              <div className="w-full overflow-hidden rounded-lg border shadow-lg">
                <img
                  src={slide.image!}
                  alt={slide.headline}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg border shadow-lg">
                  <img
                    src={slide.images![0]}
                    alt={`${slide.headline} - Survey`}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg border shadow-lg">
                  <img
                    src={slide.images![1]}
                    alt={`${slide.headline} - Dashboard`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="space-y-4 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" data-testid={`text-slide-${slide.id}-headline`}>
                {slide.headline}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground" data-testid={`text-slide-${slide.id}-subtext`}>
                {slide.subtext}
              </p>

              <div className="flex flex-wrap gap-3 justify-center pt-4">
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
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            data-testid="button-prev-slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            data-testid="button-play-pause"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            data-testid="button-next-slide"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              data-testid={`button-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
