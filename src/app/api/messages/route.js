import { createClient } from '@supabase/supabase-js';

export async function GET(req) {
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
        }
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

    const { data: messages, error: dbError } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response('Failed to fetch messages', { status: 500 });
    }

    return Response.json(messages);
  } catch (e) {
    console.error('Error in GET /api/messages:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
