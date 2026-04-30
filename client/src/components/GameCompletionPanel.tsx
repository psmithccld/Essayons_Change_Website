import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Linkedin, Copy, Check } from "lucide-react";

const SUBSCRIBE_URL = "https://app.essayonschange.com/api/public/subscribe";
export const EC_GAME_EMAIL_KEY = "ec_game_email";

interface GameCompletionPanelProps {
  insight: string;
  linkedInText: string;
  sourcePage: string;
}

export default function GameCompletionPanel({ insight, linkedInText, sourcePage }: GameCompletionPanelProps) {
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailCaptured] = useState(() => sessionStorage.getItem(EC_GAME_EMAIL_KEY) === "true");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<"idle" | "success">("idle");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const body: Record<string, string> = { email, sourcePage };
      if (firstName.trim()) body.firstName = firstName.trim();
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        sessionStorage.setItem(EC_GAME_EMAIL_KEY, "true");
      }
    } catch (err) {
      console.error("[GameCompletionPanel] Email capture failed:", err);
    }
    setCaptureStatus("success");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(linkedInText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-muted/40 px-5 py-4 space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Change Management Insight
        </p>
        <p className="text-sm text-foreground leading-relaxed">{insight}</p>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => setShowLinkedIn(true)}
        data-testid="button-share-linkedin"
      >
        <Linkedin className="w-4 h-4" />
        Share on LinkedIn
      </Button>

      <Dialog open={showLinkedIn} onOpenChange={setShowLinkedIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your result on LinkedIn</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Copy the text below, then paste it into a new LinkedIn post.
            </p>
            <div className="rounded-md border bg-muted/40 p-4 text-sm whitespace-pre-wrap text-foreground leading-relaxed">
              {linkedInText}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="gap-2 flex-1"
                onClick={copyToClipboard}
                data-testid="button-copy-linkedin"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy text"}
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => window.open("https://www.linkedin.com/feed/", "_blank")}
                data-testid="button-open-linkedin"
              >
                <Linkedin className="w-4 h-4" />
                Open LinkedIn
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {!emailCaptured && captureStatus === "idle" && (
        <div className="rounded-md border bg-card p-5 space-y-3">
          <p className="font-semibold text-foreground">
            Get a full breakdown of what your results mean for your organization
          </p>
          <form
            onSubmit={handleEmailSubmit}
            noValidate
            className="space-y-3"
            aria-label="Post-game email capture"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                className="sm:w-36"
                data-testid="input-completion-firstname"
              />
              <Input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="flex-1"
                data-testid="input-completion-email"
              />
              <Button
                type="submit"
                disabled={submitting || !email.trim()}
                className="shrink-0"
                data-testid="button-completion-subscribe"
              >
                {submitting ? "Sending..." : "Send it"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {captureStatus === "success" && (
        <div
          className="rounded-md border bg-card p-4 text-center space-y-1"
          role="status"
          data-testid="text-completion-success"
        >
          <p className="font-semibold text-foreground">You are in.</p>
          <p className="text-sm text-muted-foreground">
            Watch your inbox for insights that actually move the needle.
          </p>
        </div>
      )}
    </div>
  );
}
