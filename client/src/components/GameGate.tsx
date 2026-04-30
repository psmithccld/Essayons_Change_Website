import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    gtag.gameGateShown(sourcePage);
  }, [sourcePage]);

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
        gtag.gameGateCompleted(sourcePage);
        sessionStorage.setItem(GATE_SESSION_KEY, "true");
      }
    } catch (err) {
      console.error("[GameGate] Subscribe failed, proceeding anyway:", err);
    }
    onProceed();
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="container pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-gate-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center container py-10">
        <div className="w-full max-w-md">
          <Card className="overflow-hidden shadow-lg">
            <div className="bg-primary px-7 py-8 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
                  Leadership Challenge
                </span>
              </div>
              <h2 className="text-2xl font-bold text-primary-foreground leading-snug">
                {gameName}
              </h2>
              <p className="text-sm text-primary-foreground/75 leading-relaxed">
                {gameDescription}
              </p>
            </div>

            <CardContent className="px-7 py-7 space-y-6">
              <p className="text-sm text-muted-foreground">
                Enter your details and we will send your personalized results straight to your inbox.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
                aria-label="Pre-game signup"
              >
                <div className="space-y-1.5">
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

                <div className="space-y-1.5">
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
                  size="lg"
                  className="w-full gap-2"
                  disabled={!canSubmit}
                  data-testid="button-gate-submit"
                >
                  <Zap className="w-4 h-4" />
                  {submitting ? "Starting..." : "Play Now"}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onProceed}
                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                  data-testid="button-gate-skip"
                >
                  Skip, just play
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
