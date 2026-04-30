import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gtag } from "@/lib/gtag";

const SUBSCRIBE_URL = "https://app.essayonschange.com/api/public/subscribe";
const SUCCESS_MESSAGE = "You are in. Watch your inbox for insights that actually move the needle.";

interface EmailCaptureFormProps {
  sourcePage: "footer" | "blog" | "homepage";
}

export default function EmailCaptureForm({ sourcePage }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const hasFirstName = sourcePage === "homepage";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const body: Record<string, string> = { email, sourcePage };
      if (hasFirstName && firstName.trim()) body.firstName = firstName.trim();

      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      gtag.newsletterSignup(sourcePage);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again shortly.");
    }
  }

  if (status === "success") {
    if (sourcePage === "footer") {
      return (
        <p className="text-sm text-foreground" role="status" data-testid="text-subscribe-success">
          {SUCCESS_MESSAGE}
        </p>
      );
    }
    if (sourcePage === "blog") {
      return (
        <p className="text-sm text-muted-foreground text-center" role="status" data-testid="text-subscribe-success">
          {SUCCESS_MESSAGE}
        </p>
      );
    }
    return (
      <p className="text-lg text-white/90 text-center" role="status" data-testid="text-subscribe-success">
        {SUCCESS_MESSAGE}
      </p>
    );
  }

  // Footer variant — minimal, one row on desktop
  if (sourcePage === "footer") {
    return (
      <form onSubmit={handleSubmit} noValidate aria-label="Newsletter signup">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Label htmlFor="footer-email" className="sr-only">Email address</Label>
            <Input
              id="footer-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-white"
              aria-describedby={status === "error" ? "footer-email-error" : undefined}
              data-testid="input-footer-email"
            />
          </div>
          <Button
            type="submit"
            disabled={status === "submitting"}
            data-testid="button-footer-subscribe"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        {status === "error" && (
          <p id="footer-email-error" className="mt-2 text-xs text-destructive" role="alert" data-testid="text-footer-error">
            {errorMsg}
          </p>
        )}
      </form>
    );
  }

  // Blog variant — card, centered, max-width 480px, email only
  if (sourcePage === "blog") {
    return (
      <div className="border rounded-md p-6 max-w-[480px] mx-auto space-y-4 bg-card">
        <div className="space-y-1 text-center">
          <p className="font-semibold text-foreground">Found this useful?</p>
          <p className="text-sm text-muted-foreground">
            Get new articles like this delivered directly to you.
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate aria-label="Blog newsletter signup" className="space-y-3">
          <div>
            <Label htmlFor="blog-email" className="sr-only">Email address</Label>
            <Input
              id="blog-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-describedby={status === "error" ? "blog-email-error" : undefined}
              data-testid="input-blog-email"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={status === "submitting"}
            data-testid="button-blog-subscribe"
          >
            {status === "submitting" ? "Sending..." : "Get Updates"}
          </Button>
          {status === "error" && (
            <p id="blog-email-error" className="text-xs text-destructive text-center" role="alert" data-testid="text-blog-error">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    );
  }

  // Homepage variant — full-width, brand bg, firstName + email
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Homepage newsletter signup"
      className="w-full space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <div className="w-full sm:w-48">
          <Label htmlFor="hp-firstname" className="sr-only">First name</Label>
          <Input
            id="hp-firstname"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white"
            data-testid="input-homepage-firstname"
          />
        </div>
        <div className="w-full sm:w-72">
          <Label htmlFor="hp-email" className="sr-only">Email address</Label>
          <Input
            id="hp-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white"
            aria-describedby={status === "error" ? "hp-email-error" : undefined}
            data-testid="input-homepage-email"
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={status === "submitting"}
          className="bg-white/10 border-white/40 text-white shrink-0"
          data-testid="button-homepage-subscribe"
        >
          {status === "submitting" ? "Joining..." : "Join the List"}
        </Button>
      </div>
      {status === "error" && (
        <p id="hp-email-error" className="text-sm text-white/80 text-center" role="alert" data-testid="text-homepage-error">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
