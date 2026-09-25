import type { Metadata } from 'next';
import LegalLayout from '../../components/LegalLayout';
import SakhaLegalNav from '../../components/SakhaLegalNav';
import { ROUTES } from '../../lib/routes';

export const metadata: Metadata = {
  title: 'Delete Your Sakha Account',
  description:
    'How to permanently delete your Sakha account and data — in the app or by email — and what is deleted, kept, and for how long.',
  alternates: { canonical: ROUTES.sakhaDeleteAccount },
};

/**
 * Sakha's account-deletion page — required by Google Play's Data safety form
 * (which will not save without a working account-deletion URL) and by
 * Apple's equivalent App Store guideline. New page, not a port: every fact
 * below is derived from the current sakha-backend-py source (DELETE /user/me,
 * app/db/user_repository.py's USER_DATA_COLLECTIONS, the analyticsEvents
 * retention decision, deploy/vm/backup.sh) and from the current in-app delete
 * flows in sakha-ios-redesign and sakha-android. See the commit/PR that added
 * this page for the source citations and for facts that could not be
 * verified from code (offsite backup retention has no enforced lifecycle
 * rule as of writing).
 */
export default function SakhaDeleteAccountPage() {
  return (
    <LegalLayout title="Delete Your Sakha Account" path={ROUTES.sakhaDeleteAccount} lastUpdated="September 25, 2026">
      <p>
        This page explains how to permanently delete your account and data from{' '}
        <strong>Sakha — AI Wellness Companion</strong>, the mobile app by Margadeshaka AI Private Limited, and what
        happens to your data when you do.
      </p>

      <h2 data-reveal="up">Delete your account from the app</h2>
      <p>
        This is the fastest way, and it is in the same place on both iOS and Android:{' '}
        <strong>Settings &rarr; Data &rarr; &ldquo;Delete My Account&rdquo;</strong>.
      </p>
      <ol style={{ paddingLeft: 20 }}>
        <li>Open the Sakha app and sign in to your account.</li>
        <li>Tap the Settings (gear) icon.</li>
        <li>Scroll to the &ldquo;Data&rdquo; section.</li>
        <li>Tap &ldquo;Delete My Account.&rdquo;</li>
        <li>
          Confirm your identity: enter your account password, or, if you signed in with Google or Apple, type the
          confirmation phrase shown on screen. Check &ldquo;I understand this is permanent and cannot be
          undone.&rdquo;
        </li>
        <li>Tap the delete button. Your account and the data listed below are removed.</li>
      </ol>

      <h2 data-reveal="up">Request deletion without the app</h2>
      <p>
        If you no longer have the app installed or can&apos;t sign in, email{' '}
        <a href="mailto:contact@margadeshaka.com">contact@margadeshaka.com</a> from the email address registered to
        your Sakha account, with the subject &ldquo;Delete my Sakha account.&rdquo; We will verify the request and
        delete your account and data manually, and confirm by email once it is done.
      </p>

      <h2 data-reveal="up">What gets deleted</h2>
      <p>When your account is deleted, whether in the app or by request, we permanently remove:</p>
      <ul>
        <li>Your account and login credentials</li>
        <li>Your chat sessions and full conversation history</li>
        <li>
          Memories Sakha has extracted about you, and the knowledge graph of facts inferred from your
          conversations
        </li>
        <li>Feedback you gave us, including anything you typed in free text</li>
        <li>Birth-chart and other astrology-related data (charts, synastry, transits, dashas, muhurtas)</li>
        <li>Mood entries, goals, and self-guided exercise history</li>
        <li>Your personalization profile, achievements, usage stats, and in-app notifications</li>
        <li>Notification preferences and push tokens</li>
      </ul>

      <h2 data-reveal="up">What we keep, and for how long</h2>
      <p>A small amount of information survives account deletion, by design:</p>
      <ul>
        <li>
          <strong>Anonymous product analytics.</strong> We keep aggregate usage events for product analytics.
          These events never carry your name, email address, or message content, and once your account is deleted
          they can no longer be linked back to you.
        </li>
        <li>
          <strong>Routine database backups.</strong> To protect against data loss from technical failures, we keep
          routine encrypted backups of our database. We currently rotate these out after 14 days, so your data may
          exist in a backup for up to that long after deletion before it is gone from every copy.
        </li>
        <li>
          <strong>An anonymised deletion record.</strong> We keep a record that an account with a given ID was
          deleted and how many items were removed from each category, with no name or email attached, so we can
          demonstrate that the deletion happened.
        </li>
        <li>Anything we are legally required to retain, such as under applicable tax or accounting law.</li>
      </ul>

      <h2 data-reveal="up">Questions</h2>
      <p>
        For anything about your data or this page, contact{' '}
        <a href="mailto:contact@margadeshaka.com">contact@margadeshaka.com</a>.
      </p>

      <SakhaLegalNav current="delete-account" />
    </LegalLayout>
  );
}
