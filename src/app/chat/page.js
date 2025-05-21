"use client";
import ChatWindow from "@/components/ChatWindow";
import PDFUploader from "@/components/PDFUploader";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else setLoading(false);
    };

    checkSession();
  }, [router]);

  const handleSignout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/login");
    setLoading(false);
  };

  const handleNewMessage = (q, a) => {
    setMessages((prev) => [...prev, { q, a }]);
  };

  const fetchMessages = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    const res = await fetch("/api/messages", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setMessages(data.map((msg) => ({ q: msg.question, a: msg.answer })));
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex flex-row justify-between text-gray-600 bg-gray-300 items-center p-2 shadow-lg">
        <h1 className="text-xl font-semibold">Chat</h1>
        <button
          className="bg-black text-white p-2 rounded-xl font-bold cursor-pointer hover:bg-gray-700"
          onClick={handleSignout}
        >
          {loading?(
            <div className="flex justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ):(<span>LogOut</span>)}
        </button>
      </nav>
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl font-bold text-gray-600 text-center py-5">
          Gemini-Chatbot
        </h1>
        <div className="flex flex-row justify-between">
          <PDFUploader onResponse={handleNewMessage} />
          <button
            onClick={fetchMessages}
            className="bg-blue-400 mt-24 p-2 rounded-xl"
          >
            <FaHistory className="text-white hover:text-gray-300 cursor-pointer size-7" />
          </button>
        </div>
        <ChatWindow messages={messages} />
      </div>
    </div>
  );
}
