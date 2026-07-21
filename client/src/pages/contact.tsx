import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSULTATION_URL } from "@/lib/booking";

export default function Contact() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Tell us about the change you are working through. The fastest way to start is a
          30-minute introductory call.
        </p>
        <div className="pt-2">
          <Button size="lg" className="gap-2" asChild data-testid="button-contact-consultation">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="w-4 h-4" />
              Schedule a Consultation
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              <a href="mailto:psmith@essayonschange.com" className="hover:text-foreground transition-colors">
                psmith@essayonschange.com
              </a>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Phone</CardTitle>
            <CardDescription>
              <a href="tel:+12404461093" className="hover:text-foreground transition-colors">
                240-446-1093
              </a>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Location</CardTitle>
            <CardDescription>
              Greater St. Louis Area
              <br />
              Serving clients nationwide
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <ContactForm />
    </div>
  );
}
