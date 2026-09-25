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
 * Ported (same sections, tone and wording) from the last published text in
 * margadeshaka/sakha-web-app at src/features/legal/Privacy.tsx (main, commit
 * 92c8fae, 2026-06-27 — the only version that ever existed on any branch).
 * That source rendered each `body` array entry as its own paragraph, which
 * this port preserves rather than collapsing into bulleted lists. This page
 * exists because sakha.live (Azure-hosted) went dark ~2026-08-20, taking the
 * store-listed privacy URL down with it — moved here per founder decision.
 *
 * 2026-09-25 fact-fix pass (founder decision: "Minimal fact fixes"). Four
 * facts only, matched against the in-app policies (sakha-ios-redesign
 * Screens/Legal/PrivacyPolicyView.swift, sakha-android
 * ui/screens/legal/PrivacyPolicyScreen.kt) and the current settings/chapters
 * code in both apps:
 *   1. Names the AI provider (Google Cloud Vertex AI), reusing the in-app
 *      policies' own phrasing ("Today that provider is Google Cloud's
 *      Vertex AI.").
 *   2. Replaces the "not stored permanently" claim: conversations and
 *      memories are stored on our servers until deleted (per-memory,
 *      per-chapter, or whole-account); the AI provider does not retain them
 *      for training.
 *   3. Replaces the data-export promise (no such feature exists in the
 *      current API) with an email request.
 *   4. Fixes the memory/account-deletion menu path to what both apps'
 *      current code actually has: Settings -> Data -> "What Sakha
 *      Remembers" (per-memory delete), the Chapters tab (per-chapter
 *      delete), and Settings -> Data -> "Delete My Account".
 *
 * Everything else — including the "Vedic astrology companion" framing — is
 * left exactly as ported. That framing, and the source's now-thin
 * astrology-related claims more broadly, remain on the list handed to
 * counsel/the founder (MAR-672); this pass does not resolve them.
 */
export default function SakhaPrivacyPage() {
  return (
    <LegalLayout title="Sakha Privacy Policy" path={ROUTES.sakhaPrivacy} lastUpdated="September 25, 2026">
      <p>Your trust matters. This policy describes how Sakha handles your information.</p>
      <p className="text-white/55 text-sm">
        First published: June 2026. Last updated: 25 September 2026 — to correct how we describe our AI
        provider, data retention, and account settings so they match the current Sakha apps.
      </p>

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
        Your messages and context are sent to a third-party cloud AI provider solely to generate responses. Today
        that provider is Google Cloud&apos;s Vertex AI. Conversations and memories are stored on our servers until
        you delete them &mdash; a single memory, a chapter, or your whole account &mdash; and the AI provider does
        not keep them for training.
      </p>
      <p>
        We use birth details only to compute charts and tailor guidance. We never sell or share your data for
        advertising.
      </p>

      <h2 data-reveal="up">Data protection</h2>
      <p>All data is encrypted in transit over HTTPS. Access is restricted and audited.</p>
      <p>
        You can delete a single memory from Settings &rarr; Data &rarr; &ldquo;What Sakha Remembers,&rdquo; delete
        a chapter from the Chapters tab, or delete your whole account from Settings &rarr; Data &rarr; &ldquo;Delete
        My Account&rdquo; &mdash; the same place on both iOS and Android.
      </p>

      <h2 data-reveal="up">Your choices</h2>
      <p>
        You can disable memory, request a copy of your data by emailing{' '}
        <a href="mailto:contact@margadeshaka.com">contact@margadeshaka.com</a>, or permanently delete your account
        whenever you like.
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
