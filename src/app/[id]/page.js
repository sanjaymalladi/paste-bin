import { kv } from '@vercel/kv';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const html = await kv.get(id);

  let title = 'Code Snippet';
  if (html) {
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (match && match[1]) {
      title = match[1];
    }
  }

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const html = await kv.get(id);

  if (!html) {
    return (
      <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden' }}>
        {/* Video Background */}
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

        <main
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            className="liquid-glass-solid animate-fade-rise"
            style={{
              padding: '3rem 4rem',
              borderRadius: '24px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '2rem',
                fontWeight: 400,
                color: 'var(--foreground)',
                marginBottom: '0.5rem',
              }}
            >
              lost in the void
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--muted-foreground)',
                marginBottom: '2rem',
              }}
            >
              this paste wasn't found or has expired
            </p>
            <Link
              href="/"
              className="liquid-glass"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--foreground)',
                textDecoration: 'none',
                padding: '0.6rem 2rem',
                borderRadius: '9999px',
                display: 'inline-block',
              }}
            >
              new paste →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={html}
      style={{
        display: 'block',
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
      title="Paste Preview"
    />
  );
}
