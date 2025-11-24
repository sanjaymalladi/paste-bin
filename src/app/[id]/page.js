import { kv } from '@vercel/kv';

export default async function Page({ params }) {
  // Fetch the HTML raw from the database
  const html = await kv.get(params.id);

  if (!html) return <div>Not Found or Expired</div>;

  // Render it purely as raw HTML
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

