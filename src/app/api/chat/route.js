import { createClient } from '@supabase/supabase-js';
import { extractTextFromPDF } from '@/lib/parsePdf';
import { callGemini } from '@/lib/geminiApi';

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return new Response('Unauthorized: No token', { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      console.error('User auth error:', error);
      return new Response('Unauthorized: Invalid token', { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const userPrompt = formData.get('userPrompt');

    if (!file) return new Response('No file provided', { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfText = await extractTextFromPDF(buffer);

    const finalPrompt = `${pdfText}\n\nUser question: ${userPrompt}`;
    const response = await callGemini(finalPrompt);

    await supabase.from('messages').insert({
      user_id: user.id,
      question: userPrompt,
      answer: response,
    });

    return Response.json({ response });
  } catch (e) {
    console.error('Error handling POST /api/chat:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
