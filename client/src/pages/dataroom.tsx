import { useEffect, useState, FormEvent } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, FileSpreadsheet, Presentation, File as FileIcon, Download, Eye, Lock, LogOut } from "lucide-react";

type DataRoomFile = { key: string; name: string; size: number; lastModified: string | null };
type Category = { name: string; files: DataRoomFile[] };

const CALENDLY_URL = "https://calendly.com/psmith-essayonschange/investor";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function iconFor(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pptx" || ext === "ppt") return Presentation;
  if (ext === "xlsx" || ext === "xls" || ext === "csv") return FileSpreadsheet;
  if (ext === "pdf" || ext === "docx" || ext === "doc") return FileText;
  return FileIcon;
}

function fileUrl(key: string, download: boolean) {
  return `/api/dataroom/file?key=${encodeURIComponent(key)}${download ? "&download=1" : ""}`;
}

export default function DataRoom() {
  const [status, setStatus] = useState<"loading" | "locked" | "open">("loading");
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filesError, setFilesError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [code, setCode] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function loadFiles() {
    setFilesError(null);
    try {
      const res = await fetch("/api/dataroom/files", { credentials: "include" });
      if (res.status === 401) {
        setStatus("locked");
        return;
      }
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { categories: Category[] };
      setCategories(data.categories);
    } catch {
      setFilesError("Documents could not be loaded. Please refresh the page or contact us.");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/dataroom/session", { credentials: "include" });
        const data = (await res.json()) as { granted: boolean; name: string | null };
        if (data.granted) {
          setVisitorName(data.name);
          setStatus("open");
          await loadFiles();
        } else {
          setStatus("locked");
        }
      } catch {
        setStatus("locked");
      }
    })();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!acknowledged) {
      setFormError("Please acknowledge the confidentiality terms.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/dataroom/access", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, firm, code, acknowledged }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setVisitorName(data.name ?? name);
      setStatus("open");
      await loadFiles();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/dataroom/logout", { method: "POST", credentials: "include" }).catch(() => {});
    setCategories([]);
    setCode("");
    setStatus("locked");
  }

  const totalFiles = categories.reduce((n, c) => n + c.files.length, 0);

  return (
    <div className="min-h-screen">
      {/* Header band */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 text-sm px-4 py-1"
            >
              Confidential
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl leading-tight">Investor Data Room</h1>
            <p className="text-base md:text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">
              Essayons Change Corp seed round documents: pitch deck, business plan, due diligence, and corporate
              records.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {status === "loading" && <p className="text-muted-foreground">Loading data room...</p>}

        {/* Access gate */}
        {status === "locked" && (
          <div className="grid gap-10 md:grid-cols-5">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="h-5 w-5" /> Request Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dr-name">Full name</Label>
                      <Input id="dr-name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dr-email">Email</Label>
                      <Input
                        id="dr-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dr-firm">Firm (optional)</Label>
                    <Input id="dr-firm" value={firm} onChange={(e) => setFirm(e.target.value)} autoComplete="organization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dr-code">Access code</Label>
                    <Input
                      id="dr-code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acknowledged}
                      onChange={(e) => setAcknowledged(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-primary"
                    />
                    <span>
                      I understand these materials are confidential, provided for evaluating a potential investment in
                      Essayons Change Corp, and are not to be shared without written consent.
                    </span>
                  </label>
                  {formError && <p className="text-sm font-medium text-destructive">{formError}</p>}
                  <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto px-8">
                    {submitting ? "Checking..." : "Enter Data Room"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold">Need an access code?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access is provided to prospective investors after an introductory conversation. Schedule a call or email
                the founder directly.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => window.open(CALENDLY_URL, "_blank")}>
                  Schedule a Call
                </Button>
                <Button variant="ghost" asChild>
                  <a href="mailto:psmith@essayonschange.com?subject=Data%20Room%20Access%20Request">
                    psmith@essayonschange.com
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                <Link href="/investor" className="underline underline-offset-4">
                  Back to investor overview
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Document list */}
        {status === "open" && (
          <div className="space-y-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {visitorName ? `Welcome, ${visitorName}. ` : ""}
                  {totalFiles > 0 ? `${totalFiles} documents in ${categories.length} sections.` : ""}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.open(CALENDLY_URL, "_blank")}>
                  Schedule a Call
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Exit
                </Button>
              </div>
            </div>

            {filesError && <p className="text-sm font-medium text-destructive">{filesError}</p>}

            {!filesError && totalFiles === 0 && (
              <p className="text-muted-foreground">Documents are being updated. Please check back shortly.</p>
            )}

            {categories.length > 1 && (
              <nav className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <a
                    key={c.name}
                    href={`#${encodeURIComponent(c.name)}`}
                    className="rounded-full border px-4 py-1.5 text-sm hover:bg-muted transition-colors"
                  >
                    {c.name} <span className="text-muted-foreground">({c.files.length})</span>
                  </a>
                ))}
              </nav>
            )}

            {categories.map((category) => (
              <section key={category.name} id={encodeURIComponent(category.name)} className="space-y-3 scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight">{category.name}</h2>
                <Card>
                  <ul className="divide-y">
                    {category.files.map((file) => {
                      const Icon = iconFor(file.name);
                      return (
                        <li key={file.key} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-3 min-w-0">
                            <Icon className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                            <div className="min-w-0">
                              <p className="font-medium break-words">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatSize(file.size)}
                                {file.lastModified ? ` · ${formatDate(file.lastModified)}` : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            {file.name.toLowerCase().endsWith(".pdf") && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={fileUrl(file.key, false)} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4 mr-1.5" /> View
                                </a>
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" asChild>
                              <a href={fileUrl(file.key, true)}>
                                <Download className="h-4 w-4 mr-1.5" /> Download
                              </a>
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              </section>
            ))}

            <p className="border-t pt-8 text-xs text-muted-foreground leading-relaxed max-w-4xl">
              These materials are confidential and provided solely to evaluate a potential investment in Essayons Change
              Corp. They do not constitute an offer to sell or a solicitation of an offer to buy securities. Any offer
              will be made only through official offering documents to verified accredited investors under Rule 506(c)
              of Regulation D.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
