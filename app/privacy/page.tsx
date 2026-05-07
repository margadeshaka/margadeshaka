import type { Metadata } from 'next';
import LegalLayout from '../components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Margadeshaka privacy policy: what data we collect, how we use it, and your rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 7, 2026">
      <p>
        Margadeshaka (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This policy describes
        what information we collect when you visit <a href="https://margadeshaka.com">margadeshaka.com</a> or
        use our products (Sakha, Dronacharya), how we use it, and the choices you have.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Information you provide directly</h3>
      <ul>
        <li><strong>Account information:</strong> name, email, and password when you sign up for our products.</li>
        <li><strong>Birth details</strong> (Sakha only): birth date, time, and place — used to compute your astrological chart. These are required for core functionality.</li>
        <li><strong>Conversations and feedback</strong> with our AI companions, used to provide the service and improve responses.</li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Usage data:</strong> pages visited, features used, approximate location (city-level).</li>
        <li><strong>Device data:</strong> browser, operating system, IP address.</li>
        <li><strong>Cookies and analytics:</strong> we use Vercel Analytics (privacy-friendly, no cross-site tracking) and Microsoft Application Insights for service health monitoring.</li>
      </ul>

      <h2>2. How We Use Information</h2>
      <ul>
        <li>Provide, maintain, and improve our products.</li>
        <li>Personalize AI responses based on your birth chart, preferences, and feedback.</li>
        <li>Send important service notices (security, account, policy changes).</li>
        <li>Detect and prevent fraud, abuse, and crisis situations (Sakha includes crisis-keyword detection that may trigger safety resources).</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>We do not sell or rent your personal information. We share data only with:</p>
      <ul>
        <li><strong>Service providers</strong> who run our infrastructure: Microsoft Azure (cloud hosting, OpenAI), MongoDB Atlas / Azure Cosmos DB (database), Vercel (web hosting), Resend (transactional email).</li>
        <li><strong>Legal authorities</strong> when required by law or to protect rights and safety.</li>
      </ul>

      <h2>4. AI Processing</h2>
      <p>
        Conversations with our AI companions are sent to Azure OpenAI for response generation. Microsoft processes
        this data under their commitment that prompts and responses are not used to train OpenAI&apos;s public models.
        Conversations may be retained by Microsoft for up to 30 days for abuse monitoring.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Correct or update inaccurate information.</li>
        <li>Delete your account and associated data.</li>
        <li>Export your data in a portable format.</li>
        <li>Opt out of non-essential communications.</li>
      </ul>
      <p>
        To exercise any of these rights, email <a href="mailto:founder@margadeshaka.com">founder@margadeshaka.com</a>.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your account and chart data for as long as your account is active. When you delete your
        account, we delete personal data within 30 days, except where retention is required by law.
      </p>

      <h2>7. Security</h2>
      <p>
        We use HTTPS everywhere, encrypted databases, JWT-based authentication, and rate limiting on sensitive
        endpoints. No method is 100% secure, but we work to protect your data and will notify affected users of
        any material breach within 72 hours.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        Our products are not directed to children under 13 (or 16 in some jurisdictions). We do not knowingly
        collect data from children. If you believe a child has provided us data, contact us and we will delete it.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy. Material changes will be communicated by email or in-product notice. The
        &quot;Last updated&quot; date at the top reflects the most recent version.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions or requests: <a href="mailto:founder@margadeshaka.com">founder@margadeshaka.com</a>
      </p>
      <p>Margadeshaka, India.</p>
    </LegalLayout>
  );
}
