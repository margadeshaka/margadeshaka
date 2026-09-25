import type { Metadata } from 'next';
import LegalLayout from '../../components/LegalLayout';
import SakhaLegalNav from '../../components/SakhaLegalNav';
import { ROUTES } from '../../lib/routes';

export const metadata: Metadata = {
  title: 'Sakha Privacy Policy',
  description:
    "Privacy policy for Sakha, the AI wellness companion app by Margadeshaka: what we collect, how it's used, and your choices.",
  alternates: { canonical: ROUTES.sakhaPrivacy },
};

/**
 * Sakha's own privacy policy, distinct from the corporate /privacy page.
 *
 * Ported verbatim (same sections and wording) from the last published text in
 * margadeshaka/sakha-web-app at src/features/legal/Privacy.tsx (main, commit
 * 92c8fae, 2026-06-27 — the only version that ever existed on any branch).
 * That source rendered each `body` array entry as its own paragraph, which
 * this port preserves rather than collapsing into bulleted lists. This page
 * exists because sakha.live (Azure-hosted) went dark ~2026-08-20, taking the
 * store-listed privacy URL down with it — moved here per founder decision.
 *
 * Do not edit the wording below without legal/founder sign-off: several
 * statements in it no longer match the current backend (Vertex AI, not a
 * generic "our AI"; astrology-specific data collection may be stale) — see
 * the "now factually wrong" list in the PR/commit that added this page.
 */
export default function SakhaPrivacyPage() {
  return (
    <LegalLayout title="Sakha Privacy Policy" path={ROUTES.sakhaPrivacy} lastUpdated="June 2026">
      <p>Your trust matters. This policy describes how Sakha handles your information.</p>

      <h2 data-reveal="up">Who we are</h2>
      <p>
        Sakha is an AI-powered emotional support and Vedic astrology companion from the Margadeshaka family. This
        policy explains what we collect, how it is used, and the choices you have.
      </p>

      <h2 data-reveal="up">Information we collect</h2>
      <p>Account details you provide, such as your name, email, and (optionally) a short bio.</p>
      <p>Birth details you share — date, time, and place — used to personalize astrological guidance.</p>
      <p>Conversations with Sakha, and any facts you allow Sakha to remember, to keep responses relevant.</p>

      <h2 data-reveal="up">How your data is used</h2>
      <p>
        Your messages and context are sent to our AI (&quot;Sakha AI&quot;) solely to generate responses. Your data
        is not used to train AI models and is not stored permanently after processing.
      </p>
      <p>
        We use birth details only to compute charts and tailor guidance. We never sell or share your data for
        advertising.
      </p>

      <h2 data-reveal="up">Data protection</h2>
      <p>All data is encrypted in transit over HTTPS. Access is restricted and audited.</p>
      <p>
        You can clear stored memories or delete your account at any time from Settings &rarr; Data &amp; privacy.
      </p>

      <h2 data-reveal="up">Your choices</h2>
      <p>
        You can disable memory, export a copy of your data, or permanently delete your account whenever you like.
      </p>
      <p>
        For privacy questions, contact <a href="mailto:contact@margadeshaka.com">contact@margadeshaka.com</a>.
      </p>

      <h2 data-reveal="up">Important</h2>
      <p>
        Sakha is not a medical or mental-health service and is not a substitute for professional care. If you are
        in crisis, please contact a licensed professional or a local crisis helpline.
      </p>

      <SakhaLegalNav current="privacy" />
    </LegalLayout>
  );
}
