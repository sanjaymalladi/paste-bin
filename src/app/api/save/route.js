import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  
  // Save the HTML to Redis with the ID as the key
  // We set an expiration of 30 days (2592000 seconds) to keep it clean, 
  // or remove 'ex' to keep it forever.
  await kv.set(body.id, body.html, { ex: 2592000 });
  
  return NextResponse.json({ success: true });
}

