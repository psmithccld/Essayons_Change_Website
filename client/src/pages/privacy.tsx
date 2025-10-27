export default function Privacy() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2" data-testid="text-privacy-title">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Effective Date: October 27, 2025<br />
        Last Updated: October 27, 2025
      </p>

      <div className="prose prose-slate max-w-none space-y-6">
        <p>
          Essayons Change LLC ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website 
          www.essayonschange.com, use our services, or interact with our content.
        </p>
        <p>
          By using our website, you agree to the terms of this Privacy Policy.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We may collect the following types of information from visitors and users:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">A. Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Information:</strong> such as your name, email address, phone number, or organization when you fill out a contact form, request information, or subscribe to communications.</li>
            <li><strong>Transaction Information:</strong> if you purchase products, consulting services, or software subscriptions, we may collect billing details and payment information (processed securely by third-party payment providers).</li>
            <li><strong>Communications:</strong> messages or information you submit through forms, comments, or direct contact.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">B. Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> pages visited, time spent on pages, browser type, and referring website.</li>
            <li><strong>Device Data:</strong> IP address, operating system, and device identifiers.</li>
            <li><strong>Cookies:</strong> small data files used to improve user experience and analyze website traffic. You can control cookie settings through your browser preferences.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">C. Information from Third Parties</h3>
          <p>We may receive analytics data or advertising metrics from partners such as Google Analytics or LinkedIn.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Respond to inquiries, comments, or customer service requests.</li>
            <li>Send administrative information such as confirmations, updates, or policy changes.</li>
            <li>Improve website functionality, performance, and user experience.</li>
            <li>Conduct research and data analysis to enhance our content and services.</li>
            <li>Comply with legal obligations and enforce our Terms of Use.</li>
          </ul>
          <p className="mt-4">We do not sell or rent your personal information to third parties.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p>We may share your information only in the following limited circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>With Service Providers:</strong> such as email marketing, analytics, payment processors, or hosting partners who assist in website operations.</li>
            <li><strong>For Legal Reasons:</strong> if required to comply with applicable law, court order, or to protect our legal rights and users' safety.</li>
            <li><strong>In Business Transfers:</strong> if we undergo a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
          </ul>
          <p className="mt-4">All third parties are required to protect your data and use it only for the purposes specified.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes described in this Policy, 
            unless a longer retention period is required by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and request a copy of your personal data.</li>
            <li>Request correction or deletion of inaccurate or unnecessary data.</li>
            <li>Opt out of marketing communications at any time using the "unsubscribe" link or by contacting us directly.</li>
            <li>Restrict or object to certain data uses where permitted by law.</li>
          </ul>
          <p className="mt-4">To exercise these rights, contact us at psmith@essayonschange.com.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to safeguard your information, including secure hosting, 
            encrypted transmission (SSL), and restricted access. However, no online system is completely secure, and we cannot 
            guarantee absolute protection.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p>
            Our website and services are not directed to children under 16, and we do not knowingly collect information from minors. 
            If we learn we have collected data from a child, we will delete it promptly.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
          <p>
            If you access our site from outside the United States, please note that your data may be processed in the U.S., 
            where privacy laws may differ from those in your country.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Links to Other Websites</h2>
          <p>
            Our site may contain links to external websites. We are not responsible for the privacy practices or content of 
            third-party sites. Please review their privacy policies separately.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">10. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. The "Effective Date" at the top of this page reflects the most recent version. 
            Material changes will be announced on this page.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
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
