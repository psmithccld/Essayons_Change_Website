import { Link } from "wouter";
import logoImage from "@assets/image_1758211685824_1761593188026.png";
import EmailCaptureForm from "@/components/EmailCaptureForm";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Essayons Change logo" className="h-10 object-contain" />
            </div>
            <div className="mt-4 text-sm font-medium">
              Essayons Change Corp
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <div>Greater St. Louis Area</div>
              <div>Serving St. Louis, MO &middot; Munster, IN &middot; Evansville, IN</div>
              <div className="mt-2">psmith@essayonschange.com</div>
              <div>240-446-1093</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.linkedin.com/company/essayons-change/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-testid="link-linkedin">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-testid="link-youtube">
                  YouTube
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors" data-testid="link-contact-footer">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="link-terms">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 space-y-3">
          <p className="text-sm font-medium text-foreground">
            Let us change the way you change. Get new insights delivered to your inbox.
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
