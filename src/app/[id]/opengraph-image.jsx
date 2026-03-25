import { ImageResponse } from 'next/og';
import { kv } from '@vercel/kv';

export const runtime = 'edge';
export const alt = 'Paste Snippet Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { id } = await params;
  const html = await kv.get(id);

  let title = 'Code Snippet';
  if (html) {
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (match && match[1]) {
      title = match[1];
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#001428',
          backgroundImage: 'linear-gradient(to bottom, #001428, #000a14)',
          color: '#ffffff',
          fontFamily: 'serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px',
              fontFamily: 'sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            paste.
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 400,
              maxWidth: '800px',
              wordWrap: 'break-word',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
