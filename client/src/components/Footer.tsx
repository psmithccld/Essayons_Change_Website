import { Link } from "wouter";
import logoImage from "@assets/image_1758211685824_1761593188026.png";
import EmailCaptureForm from "@/components/EmailCaptureForm";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Essayons Change logo" className="h-10 object-contain" />
            </div>
            <div className="mt-4 text-sm font-medium">Essayons Change Corp</div>
            <div className="mt-2 text-sm text-muted-foreground">
              <div>Worden, IL</div>
              <div>Serving Greater St. Louis and clients nationwide</div>
              <div className="mt-2">psmith@essayonschange.com</div>
              <div>240-446-1093</div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/method" className="transition-colors hover:text-foreground">
                  The Essayons Change Method
                </Link>
              </li>
              <li>
                <Link href="/offerings" className="transition-colors hover:text-foreground">
                  Offerings
                </Link>
              </li>
              <li>
                <Link href="/change-readiness-quiz" className="transition-colors hover:text-foreground">
                  Free Readiness Check
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/partners" className="transition-colors hover:text-foreground">
                  Certified Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/company/essayons-change/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  data-testid="link-linkedin"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground"
                  data-testid="link-contact-footer"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-foreground" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-foreground" data-testid="link-terms">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 space-y-3 border-t pt-8">
          <p className="text-sm font-medium text-foreground">
            Let us change the way you change. One practical change leadership article a week.
          </p>
          <EmailCaptureForm sourcePage="footer" />
        </div>

        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Essayons Change Corp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
