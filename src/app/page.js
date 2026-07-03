'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';

export default function Home() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!code.trim()) return;
    setLoading(true);

    const id = Math.random().toString(36).substring(2, 8);

    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, html: code }),
      });

      const url = `${window.location.origin}/${id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        router.push(`/${id}`);
      }, 1400);
    } catch {
      setLoading(false);
    }
  };

  const charCount = code.length;

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden' }}>
      {/* ─── Video Background ─── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* ─── Video Overlay ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1,
        }}
      />

      {/* ─── Content Layer ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: preview ? '2rem 1.5rem' : '2rem 1.5rem',
        }}
      >
        {/* ─── Glass Card ─── */}
        <div
          className="liquid-glass-solid animate-fade-rise"
          style={{
            width: '100%',
            maxWidth: preview ? 'min(95vw, 1380px)' : '720px',
            padding: '2.5rem',
            borderRadius: '24px',
            transition: 'max-width 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* ─── Header ─── */}
          <div
            className="animate-fade-rise-d1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              gap: '1rem',
            }}
          >
            <h1
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '2.4rem',
                fontWeight: 400,
                color: 'var(--foreground)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              paste<span style={{ color: 'var(--muted-foreground)' }}>.</span>
            </h1>

            {/* ─── Mode Toggle Pills ─── */}
            <div
              className="liquid-glass"
              style={{
                display: 'flex',
                borderRadius: '9999px',
                padding: '3px',
                gap: '2px',
              }}
            >
              <button
                onClick={() => setPreview(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  padding: '5px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: !preview ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: !preview ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                Code
              </button>
              <button
                onClick={() => setPreview(true)}
                disabled={!code.trim()}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  padding: '5px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: !code.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  background: preview ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: preview ? '#fff' : 'rgba(255,255,255,0.4)',
                  opacity: !code.trim() ? 0.35 : 1,
                }}
              >
                Preview
              </button>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 500,
                color: 'var(--muted-foreground)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              drop · share · done
            </span>
          </div>

          {/* ─── Main Panel ─── */}
          <div
            className="animate-fade-rise-d2"
            style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'stretch',
            }}
          >
            {/* Editor */}
            <div
              style={{
                flex: preview ? '0 0 42%' : '1',
                transition: 'flex 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: 0,
              }}
            >
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => Prism.highlight(code, Prism.languages.markup, 'markup')}
                padding={24}
                placeholder="paste your html here..."
                className="paste-textarea"
                textareaId="code-input"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  height: 340,
                  overflowY: 'auto',
                }}
              />
            </div>

            {/* ─── Live Preview Pane ─── */}
            {preview && (
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: '#fff',
                  position: 'relative',
                }}
              >
                {/* preview label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '12px',
                    zIndex: 10,
                    fontFamily: 'var(--font-body)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.25)',
                    pointerEvents: 'none',
                  }}
                >
                  live preview
                </div>
                <iframe
                  srcDoc={code}
                  sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
                  title="Live Preview"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '340px',
                    border: 'none',
                  }}
                />
              </div>
            )}
          </div>

          {/* ─── Action Row ─── */}
          <div
            className="animate-fade-rise-d3"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'var(--muted-foreground)',
                  letterSpacing: '0.04em',
                  opacity: charCount > 0 ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {charCount.toLocaleString()} chars
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                expires 30d
              </span>
            </div>

            <button
              id="save-button"
              onClick={handleSave}
              disabled={loading || !code.trim()}
              className="liquid-glass"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                padding: '0.65rem 2rem',
                color: 'var(--foreground)',
                borderRadius: '9999px',
                cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
                opacity: !code.trim() ? 0.3 : 1,
                transition: 'all 0.3s ease, transform 0.2s ease',
                transform: 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!loading && code.trim()) {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {loading ? 'saving...' : 'get link →'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className="animate-fade-rise-d4"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.2)',
            marginTop: '2rem',
            letterSpacing: '0.04em',
          }}
        >
          where code rests in silence
        </p>
      </div>

      {/* ─── Toast ─── */}
      {copied && (
        <div
          className="animate-toast"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.03em',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ opacity: 0.6 }}>✓</span> link copied to clipboard
        </div>
      )}
    </div>
  );
}
