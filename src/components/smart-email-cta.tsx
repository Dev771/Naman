'use client';

import { useState } from 'react';

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

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailto = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={mailto}
      onClick={handleClick}
      className={className}
      title="Opens mail client & copies email to clipboard"
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
