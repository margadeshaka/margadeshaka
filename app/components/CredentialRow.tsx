'use client';

import { useState } from 'react';

interface CredentialRowProps {
  label: string;
  value: string;
  mono?: boolean;
  note?: string;
}

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function CredentialRow({ label, value, mono, note }: CredentialRowProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard API unavailable; fail silently
    }
  };

  return (
    <div
      className="flex flex-wrap justify-between items-center gap-2 py-4 border-b border-white/5 last:border-0"
    >
      <dt
        className="text-xs uppercase text-white/55"
        style={{ letterSpacing: '0.14em' }}
      >
        {label}
      </dt>
      <dd className="m-0 inline-flex items-center gap-2.5">
        <span
          className={`text-[14px] text-white break-all ${mono ? 'font-mono' : ''}`}
        >
          {value}
        </span>
        {note && <span className="text-[11px] text-white/55">· {note}</span>}
        {mono && (
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="p-1.5 rounded-md inline-flex border border-white/[0.08] transition-colors"
            style={{ color: copied ? '#4FE9C0' : 'rgb(var(--fg-rgb) / 0.45)' }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
      </dd>
    </div>
  );
}
