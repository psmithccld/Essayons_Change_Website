export default function Terms() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2" data-testid="text-terms-title">Terms of Use</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: October 27, 2025
      </p>

      <div className="prose prose-slate max-w-none space-y-6">
        <p>
          Welcome to Essayons Change LLC. By accessing or using our website and services, you agree to be bound by these Terms of Use. 
          If you do not agree with these terms, please do not use our website.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            These Terms of Use constitute a legally binding agreement between you and Essayons Change LLC. 
            We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p>
            You agree to use our website and services only for lawful purposes and in accordance with these Terms. 
            You may not use our services in any way that could damage, disable, or impair our website or interfere with any other party's use of our services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of Essayons Change LLC 
            and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create 
            derivative works without our express written permission.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p>
            Essayons Change LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use of or inability to use the website or services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
          <p>For questions about these Terms of Use, please contact us at:</p>
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
