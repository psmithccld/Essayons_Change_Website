import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Have questions about our Change Management Information System? We're here to help.
        </p>
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
              Emmitsburg, MD 21727
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <ContactForm />
    </div>
  );
}
