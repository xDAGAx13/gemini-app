# 📄 Gemini PDF Chatbot

A full-stack AI-powered chatbot that lets authenticated users upload PDF documents (e.g., resumes), ask contextual questions, and receive intelligent answers from Google's Gemini API. All user interactions are securely stored and fetched via Supabase.

---

## 🚀 Features

* ✅ **Authentication** with Supabase
* 📄 **PDF Upload** and server-side parsing
* 🤖 **AI Integration** with Gemini API (Google Generative AI)
* 💬 **Chat Interface** with loading indicators
* 🧠 **Chat History** stored and retrieved per user
* 🗄️ **PostgreSQL via Supabase**
* ☁️ Optional **Vercel deployment**

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14 App Router + Tailwind CSS
* **Backend**: Node.js API routes
* **Auth**: Supabase Auth (token-based, Firebase-style)
* **Database**: Supabase PostgreSQL
* **AI**: Gemini Pro (Google Generative AI)

---

## 🧪 Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/gemini-chatbot
cd gemini-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add `.env.local`

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run the App

```bash
npm run dev
```

---

## 🧾 Supabase Database Schema

```sql
create table messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  question text not null,
  answer text not null,
  created_at timestamp with time zone default now()
);
```

---

## 🔐 Authentication Strategy

* The frontend fetches the `access_token` using `supabase.auth.getSession()`.
* This token is passed as a `Bearer` token in API requests.
* API routes use the token to authorize users and fetch/store data securely — without relying on cookies.

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.js          # Handles PDF upload + Gemini
│   │   └── messages/route.js      # Returns user chat history
│   └── chat/page.js               # Main chat interface
├── components/
│   ├── PDFUploader.jsx            # File + prompt input
│   └── ChatWindow.jsx             # Display Q&A history
├── lib/
│   ├── parsePdf.js                # Server-side PDF parsing
│   ├── geminiApi.js               # Gemini API wrapper
│   └── supabaseClient.js          # Supabase client instance
│   └── server.js                  # Supabase client server
```

---

## 📄For Sample Chat Response see `test_prompts.txt`




## 🙏 Acknowledgements

* [Supabase](https://supabase.io) (for auth and database)
* [Google Generative AI SDK](https://github.com/google/generative-ai-js) (for gemini API)
* [Next.js](https://nextjs.org) (for Front-End Integration)
* [ChatGPT](https://chatgpt.com/)(for fixing minor bugs and this readme file)

---

## 🧑 Author

**Rohan Daga**
Full-Stack Developer — University of Toronto
[LinkedIn](https://www.linkedin.com/in/rohannnnnnn/) | [GitHub](https://github.com/your-username)
