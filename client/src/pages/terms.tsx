import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2" data-testid="text-terms-title">Terms of Use</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Effective Date: October 27, 2025<br />
        Last Updated: October 27, 2025
      </p>

      <div className="prose prose-slate max-w-none space-y-6">
        <p>
          Welcome to Essayons Change LLC ("Essayons Change," "we," "our," or "us").
        </p>
        <p>
          These Terms of Use ("Terms") govern your access to and use of our website www.essayonschange.com, 
          associated applications (including CMIS), digital content, and services (collectively, the "Services").
        </p>
        <p>
          By using our website or Services, you agree to these Terms. If you do not agree, please do not use the Services.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Use of the Website and Services</h2>
          <p>You agree to use the Services only for lawful purposes and in accordance with these Terms. You may not use our website or software:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>In any way that violates applicable laws or regulations;</li>
            <li>To engage in fraudulent, deceptive, or harmful activity;</li>
            <li>To interfere with or damage the website, servers, or network security; or</li>
            <li>To attempt to access unauthorized areas or data.</li>
          </ul>
          <p className="mt-4">We reserve the right to suspend or terminate access to any user who violates these Terms.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
          <p>
            All content, materials, and intellectual property on this site and within CMIS — including but not limited to text, 
            graphics, logos, icons, software code, digital products, videos, and publications — are the property of Essayons Change LLC 
            or its licensors and are protected by copyright, trademark, and other laws.
          </p>
          <p className="mt-4">You may view, download, or print materials for personal, non-commercial use only.</p>
          <p className="mt-4">
            You may not modify, distribute, reproduce, sell, or create derivative works from any material without express written 
            consent from Essayons Change LLC.
          </p>
          <p className="mt-4">
            "Essayons Change," "CMIS," and the Essayons Change logo are trademarks of Essayons Change LLC. Unauthorized use is prohibited.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Educational and Informational Disclaimer</h2>
          <p>
            The content on this website, including leadership and change management resources, publications, and blog posts, 
            is provided for informational and educational purposes only.
          </p>
          <p className="mt-4">
            While developed using rigorous research, it does not constitute professional, legal, or financial advice. 
            Users should consult qualified professionals before making decisions based on the information provided.
          </p>
          <p className="mt-4">
            Essayons Change LLC assumes no responsibility for actions taken in reliance on the information contained on this 
            site or through the Services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Accounts and CMIS Access</h2>
          <p>Some Services, such as the Change Management Information System (CMIS), may require you to create an account.</p>
          <p className="mt-4">You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information;</li>
            <li>Maintain the confidentiality of your account credentials; and</li>
            <li>Accept responsibility for all activity under your account.</li>
          </ul>
          <p className="mt-4">
            We reserve the right to suspend or terminate accounts that violate these Terms, misuse data, or interfere with 
            system performance.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Purchases, Subscriptions, and Payments</h2>
          <p>
            If you purchase digital products, consulting services, or software subscriptions through our site, you agree to 
            provide accurate payment information and comply with any applicable payment terms.
          </p>
          <p className="mt-4">
            Payments are processed securely by third-party providers (e.g., Stripe, PayPal). Essayons Change LLC does not 
            store credit card details.
          </p>
          <p className="mt-4">Refunds, if applicable, will be handled according to the terms provided at the point of purchase.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Protection and Privacy</h2>
          <p>
            Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and protect 
            your information.
          </p>
          <p className="mt-4">By using our Services, you consent to our data practices as outlined in that Policy.</p>
          <p className="mt-4">
            <Link href="/privacy" className="text-primary hover:underline font-medium" data-testid="link-privacy-policy">
              View our Privacy Policy
            </Link>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. External Links</h2>
          <p>
            Our website may contain links to third-party websites or resources. Essayons Change LLC has no control over, 
            and assumes no responsibility for, the content, privacy policies, or practices of any third-party sites.
          </p>
          <p className="mt-4">Links are provided for convenience and do not imply endorsement.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Essayons Change LLC and its affiliates shall not be liable for any indirect, incidental, consequential, or 
              punitive damages arising from your use or inability to use the Services.
            </li>
            <li>
              We make no warranties regarding the accuracy, completeness, or reliability of information or functionality provided.
            </li>
            <li>All Services are provided "as is" and "as available."</li>
          </ul>
          <p className="mt-4">
            Certain jurisdictions do not allow limitations of liability; in such cases, our liability is limited to the maximum 
            extent permitted by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Essayons Change LLC, its affiliates, officers, employees, and partners 
            from any claims, damages, losses, or expenses arising from your violation of these Terms or misuse of the Services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          <p>
            We may terminate or restrict access to the Services, without notice, if you violate these Terms or engage in unlawful activity.
          </p>
          <p className="mt-4">
            Upon termination, your right to use the Services will immediately cease, and any ongoing obligations will survive as 
            applicable by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State of Maryland, without regard to 
            conflict-of-law principles.
          </p>
          <p className="mt-4">
            You agree to submit to the exclusive jurisdiction of courts located in that state for any disputes arising under these Terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to These Terms</h2>
          <p>
            We may update or modify these Terms periodically. Any changes will be posted here with a revised "Last Updated" date. 
            Continued use of the Services after updates constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p>If you have questions or concerns about these Terms or the Services, contact us at:</p>
          <div className="mt-4 pl-4 border-l-4 border-primary">
            <p className="font-semibold">Essayons Change LLC</p>
            <p>Email: <a href="mailto:psmith@essayonschange.com" className="text-primary hover:underline">psmith@essayonschange.com</a></p>
            <p>Website: <a href="https://www.essayonschange.com" className="text-primary hover:underline">www.essayonschange.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
