import { kv } from '@vercel/kv';
import Link from 'next/link';

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
    <>
      {/* ─── Top Bar ─── */}
      <nav
        className="animate-fade-rise"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 2rem',
          background: 'rgba(0, 20, 40, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '1.2rem',
            fontWeight: 400,
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          paste<span style={{ color: 'var(--muted-foreground)' }}>.</span>
        </Link>

        <Link
          href="/"
          className="liquid-glass"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            letterSpacing: '0.04em',
            padding: '5px 14px',
            borderRadius: '9999px',
          }}
        >
          + new paste
        </Link>
      </nav>

      {/* ─── Content ─── */}
      <div
        className="animate-fade-rise-d1"
        style={{ paddingTop: '4rem', background: '#fff', minHeight: '100dvh' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
