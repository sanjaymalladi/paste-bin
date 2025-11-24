'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!code) return;
    setLoading(true);
    
    // Generate a simple random ID (6 characters)
    const id = Math.random().toString(36).substring(2, 8);
    
    // Save to our API
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, html: code }),
    });

    // Redirect to the preview page
    router.push(`/${id}`);
  };

  return (
    <main className="p-10 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Notion HTML Embedder</h1>
      <textarea
        className="w-full h-96 p-4 border rounded bg-gray-50 font-mono text-sm"
        placeholder="Paste your raw HTML here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Get Embed Link'}
      </button>
    </main>
  );
}
