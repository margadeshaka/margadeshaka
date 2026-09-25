import type { Metadata } from 'next';
import LegalLayout from '../../components/LegalLayout';
import SakhaLegalNav from '../../components/SakhaLegalNav';
import { ROUTES } from '../../lib/routes';

export const metadata: Metadata = {
  title: 'Sakha Terms of Service',
  description: 'Terms of Service for using Sakha, the AI wellness companion app by Margadeshaka.',
  alternates: { canonical: ROUTES.sakhaTerms },
};

/**
 * Sakha's own terms of service, distinct from the corporate /terms page.
 *
 * Ported verbatim (same sections and wording) from the last published text in
 * margadeshaka/sakha-web-app at src/features/legal/Terms.tsx (main, commit
 * 92c8fae, 2026-06-27 — the only version that ever existed on any branch).
 * See app/sakha/privacy/page.tsx for the provenance note and the sibling
 * "now factually wrong" list.
 */
export default function SakhaTermsPage() {
  return (
    <LegalLayout title="Sakha Terms of Service" path={ROUTES.sakhaTerms} lastUpdated="June 2026">
      <p>Please read these terms carefully before using Sakha.</p>

      <h2 data-reveal="up">Acceptance of terms</h2>
      <p>By using Sakha, you agree to these Terms of Service. If you do not agree, please do not use the app.</p>

      <h2 data-reveal="up">What Sakha is</h2>
      <p>
        Sakha is an AI companion offering emotional support and Vedic astrology guidance for reflection and
        personal growth.
      </p>
      <p>Sakha is provided for informational and self-reflection purposes only.</p>

      <h2 data-reveal="up">Not professional advice</h2>
      <p>
        Sakha is not a substitute for professional medical, mental-health, legal, or financial advice. Do not use
        Sakha to diagnose, treat, or manage any medical or psychological condition.
      </p>
      <p>
        Always seek the advice of a qualified professional with any questions about your health or wellbeing. If
        you are in crisis, contact a licensed professional or emergency services.
      </p>

      <h2 data-reveal="up">Your responsibilities</h2>
      <p>You agree to provide accurate information and to use Sakha lawfully and respectfully.</p>
      <p>You are responsible for keeping your account credentials secure.</p>

      <h2 data-reveal="up">Content &amp; AI responses</h2>
      <p>
        AI responses are generated automatically and may be inaccurate or incomplete. Use your own judgment before
        acting on any guidance.
      </p>
      <p>
        You retain ownership of the content you submit; you grant us a limited license to process it to provide
        the service.
      </p>

      <h2 data-reveal="up">Limitation of liability</h2>
      <p>
        Sakha is provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted by
        law, we are not liable for any decisions made based on guidance from the app.
      </p>

      <h2 data-reveal="up">Changes &amp; contact</h2>
      <p>We may update these terms from time to time. Continued use after changes constitutes acceptance.</p>
      <p>
        Questions? Contact <a href="mailto:contact@margadeshaka.com">contact@margadeshaka.com</a>.
      </p>

      <SakhaLegalNav current="terms" />
    </LegalLayout>
  );
}
