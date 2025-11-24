import { kv } from '@vercel/kv';

export default async function Page({ params }) {
  // ⬇️ FIX: Await params before using them (Next.js 15 requirement)
  const { id } = await params; 

  // Now we can safely get the HTML using the ID
  const html = await kv.get(id);

  if (!html) return <div>Not Found or Expired</div>;

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
