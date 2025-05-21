"use client";

import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";

export default function PDFUploader({ onResponse }) {
  const [file, setFile] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userPrompt) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userPrompt", userPrompt);

    setLoading(true);
    try {
      const {data:{session},} = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers:{
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      onResponse(userPrompt, data.response);
    } catch (e) {
      console.error(e)
    }finally{
    setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <input
        type="file"
        accept=".pdf"
        className="text-gray-600 cursor-pointer"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Ask a question to Gemini"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        className="text-gray-600 placeholder:text-gray-400 w-full border-2 p-2 rounded-xl"
      />
      <button
        type="submit"
        className="cursor-pointer hover:bg-blue-500 bg-blue-400 text-white px-4 py-2 rounded-xl"
      >
        Ask Gemini
      </button>
    </form>
  );
}
