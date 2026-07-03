'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PreviewPage() {
  const [html, setHtml] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('paste_preview');
    if (!stored) {
      router.replace('/');
    } else {
      setHtml(stored);
    }
  }, [router]);

  const handleGetLink = async () => {
    if (!html || loading) return;
    setLoading(true);

    const id = Math.random().toString(36).substring(2, 8);

    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, html }),
      });

      const url = `${window.location.origin}/${id}`;
      await navigator.clipboard.writeText(url);
      sessionStorage.removeItem('paste_preview');
      setCopied(true);

      setTimeout(() => {
        router.push(`/${id}`);
      }, 1400);
    } catch {
      setLoading(false);
    }
  };

  if (!html) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}>

      {/* ─── Navbar ─── */}
      <nav
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: '48px',
          background: 'rgba(0, 15, 30, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          zIndex: 100,
        }}
      >
        {/* Logo / back */}
        <Link
          href="/"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '1.15rem',
            fontWeight: 400,
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          paste<span style={{ color: 'rgba(255,255,255,0.35)' }}>.</span>
        </Link>

        {/* Preview label */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          preview — not saved
        </span>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              padding: '5px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease',
            }}
          >
            ← edit
          </Link>

          <button
            onClick={handleGetLink}
            disabled={loading || copied}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.03em',
              padding: '6px 18px',
              color: copied ? 'rgba(255,255,255,0.6)' : '#fff',
              background: copied
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '9999px',
              cursor: loading || copied ? 'default' : 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              if (!loading && !copied) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && !copied) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }
            }}
          >
            {copied ? '✓ link copied' : loading ? 'saving...' : 'get link →'}
          </button>
        </div>
      </nav>

      {/* ─── Full-screen iframe ─── */}
      <iframe
        srcDoc={html}
        sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
        title="Preview"
        style={{
          flex: 1,
          border: 'none',
          display: 'block',
          width: '100%',
        }}
      />
    </div>
  );
}
