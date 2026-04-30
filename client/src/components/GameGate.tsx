import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gtag } from "@/lib/gtag";

const SUBSCRIBE_URL = "https://app.essayonschange.com/api/public/subscribe";
export const GATE_SESSION_KEY = "gameGateSubmitted";

interface GameGateProps {
  gameName: string;
  gameDescription: string;
  sourcePage: string;
  onProceed: () => void;
  onBack: () => void;
}

export default function GameGate({ gameName, gameDescription, sourcePage, onProceed, onBack }: GameGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = firstName.trim().length > 0 && email.trim().length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName.trim(), sourcePage }),
      });
      if (res.ok) {
        gtag.newsletterSignup(sourcePage);
        sessionStorage.setItem(GATE_SESSION_KEY, "true");
      }
    } catch {
      // best-effort: proceed regardless
    }
    onProceed();
  }

  return (
    <div className="container py-8">
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6"
        data-testid="button-gate-back"
      >
        Back to Games
      </Button>

      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{gameName}</CardTitle>
            <CardDescription>{gameDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Enter your details to receive personalized insights based on your results.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Pre-game signup">
              <div className="space-y-2">
                <Label htmlFor="gate-firstname">First Name</Label>
                <Input
                  id="gate-firstname"
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                  data-testid="input-gate-firstname"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gate-email">Email Address</Label>
                <Input
                  id="gate-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  data-testid="input-gate-email"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!canSubmit}
                data-testid="button-gate-submit"
              >
                {submitting ? "Starting..." : "Play Now"}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={onProceed}
                className="text-sm text-muted-foreground underline-offset-2 hover:underline"
                data-testid="button-gate-skip"
              >
                Skip, just play
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
