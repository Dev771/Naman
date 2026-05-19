'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface SmartEmailCtaProps {
  email: string;
  label?: string;
  subject?: string;
  body?: string;
  className?: string;
}

export function SmartEmailCta({
  email,
  label = 'Email',
  subject = "Hey Naman! Let's connect",
  body = "Hi Naman,\n\nI came across your portfolio and would love to chat about...\n\nBest,\n",
  className = "group inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
}: SmartEmailCtaProps) {
  const [copied, setCopied] = useState(false);

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto` +
    `&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    trackEvent('cta_click_email', { name: label, email, type: 'clipboard_copy' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={gmailUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      title="Opens Gmail compose & copies email to clipboard"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a8e0b6]">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 transition-transform group-hover:scale-110">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )}
      <span className={copied ? "text-[#a8e0b6]" : ""}>{copied ? 'Copied!' : label}</span>
    </a>
  );
}
