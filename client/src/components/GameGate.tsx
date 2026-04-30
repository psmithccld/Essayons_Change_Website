import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gtag } from "@/lib/gtag";

const SUBSCRIBE_URL = "https://app.essayonschange.com/api/public/subscribe";

interface GameGateProps {
  gameName: string;
  sourcePage: string;
  onProceed: () => void;
  onBack: () => void;
}

export default function GameGate({ gameName, sourcePage, onProceed, onBack }: GameGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body: Record<string, string> = { email, sourcePage };
      if (firstName.trim()) body.firstName = firstName.trim();
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) gtag.newsletterSignup(sourcePage);
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
            <CardTitle className="text-2xl">Ready to play?</CardTitle>
            <CardDescription>
              Enter your email to receive insights based on your {gameName} results. Takes 10 seconds and you can skip anytime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Pre-game signup">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-40 space-y-1">
                  <Label htmlFor="gate-firstname" className="sr-only">First name</Label>
                  <Input
                    id="gate-firstname"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    data-testid="input-gate-firstname"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label htmlFor="gate-email" className="sr-only">Email address</Label>
                  <Input
                    id="gate-email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    data-testid="input-gate-email"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={submitting || !email.trim()}
                data-testid="button-gate-submit"
              >
                {submitting ? "Starting..." : "Start Playing"}
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
