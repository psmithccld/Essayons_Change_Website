import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gtag } from "@/lib/gtag";

const SUBSCRIBE_URL = "https://app.essayonschange.com/api/public/subscribe";

interface GameLeadCaptureProps {
  sourcePage: string;
  resultLine?: string;
}

export default function GameLeadCapture({ sourcePage, resultLine }: GameLeadCaptureProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "dismissed">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (status === "dismissed") return null;

  if (status === "success") {
    return (
      <div className="border rounded-md p-5 bg-card text-center space-y-1" role="status" data-testid="text-game-subscribe-success">
        <p className="font-semibold text-foreground">You are in.</p>
        <p className="text-sm text-muted-foreground">Watch your inbox for insights that actually move the needle.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const body: Record<string, string> = { email, sourcePage };
      if (firstName.trim()) body.firstName = firstName.trim();
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      gtag.newsletterSignup(sourcePage);
    } catch {
      setStatus("idle");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="border rounded-md p-5 bg-card space-y-4" data-testid="section-game-lead-capture">
      <div className="space-y-1">
        {resultLine && (
          <p className="text-sm font-medium text-primary" data-testid="text-game-result-line">{resultLine}</p>
        )}
        <p className="font-semibold text-foreground">Get leadership insights delivered to you.</p>
        <p className="text-sm text-muted-foreground">
          Join leaders using the CMIS platform to drive real change. No spam, unsubscribe any time.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Game newsletter signup" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="sm:w-40"
            data-testid="input-game-firstname"
          />
          <Input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="flex-1"
            data-testid="input-game-email"
          />
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0"
            data-testid="button-game-subscribe"
          >
            {status === "submitting" ? "Joining..." : "Join the List"}
          </Button>
        </div>
        {errorMsg && (
          <p className="text-xs text-destructive" role="alert" data-testid="text-game-error">
            {errorMsg}
          </p>
        )}
      </form>

      <button
        type="button"
        onClick={() => setStatus("dismissed")}
        className="text-xs text-muted-foreground underline-offset-2 hover:underline"
        data-testid="button-game-skip"
      >
        No thanks
      </button>
    </div>
  );
}
