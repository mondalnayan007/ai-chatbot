import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setChatHistory((prev) => [...prev, userMessage]);
    
    const currentQuestion = question;
    setQuestion('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: currentQuestion,
      });

      const aiMessage = { sender: "ai", text: response.text };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [...prev, { sender: "ai", text: "Sorry, I faced an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // strict fixed positions grid
    <div className="fixed inset-0 grid grid-cols-5 text-white w-full h-full overflow-hidden bg-[#111333] select-none">
      
      {/* LEFT SIDEBAR: Pura fixed sidebar */}
      <div className="col-span-1 bg-[#1e2047] flex items-center justify-center border-r border-zinc-700 h-full overflow-hidden">
        <h2 className="text-xl font-bold">Hello Menu</h2>
      </div>

      {/* RIGHT SIDE: App Interface */}
      <div className="col-span-4 flex flex-col h-full overflow-hidden bg-[#15173c] relative">
        
        {/* 1. TOP BAR: Absolute Top positioning layout */}
        <div className="w-full h-[70px] px-6 bg-[#1e2047] border-b border-zinc-700 shadow-md flex flex-col justify-center flex-none">
          <h1 className="text-lg font-bold leading-tight">AI Chat Assistant</h1>
          <p className="text-xs text-green-400">Online</p>
        </div>

        {/* 2. MIDDLE CONTENT: Scroll dynamic area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col min-h-0 custom-scrollbar">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] p-3 rounded-2xl text-sm whitespace-pre-wrap block clear-both ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white self-end rounded-tr-none ml-auto"
                  : "bg-[#25285c] text-zinc-100 self-start rounded-tl-none border border-zinc-700 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="bg-[#25285c] text-zinc-400 text-sm p-3 rounded-2xl rounded-tl-none self-start max-w-[70%] animate-pulse mr-auto">
              AI is typing...
            </div>
          )}
        </div>

        {/* 3. BOTTOM INPUT BAR: Pure Fixed bottom area */}
        <div className="w-full bg-[#1e2047] border-t border-zinc-700 p-4 flex-none">
          <div className="max-w-[90%] md:max-w-[75%] m-auto bg-[#15173c] rounded-full border border-zinc-600 flex px-5 py-2.5 items-center">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
              className="w-full bg-transparent outline-none text-white text-sm placeholder-zinc-500 py-1"
              placeholder="Type a message..."
            />
            <button
              onClick={askQuestion}
              disabled={loading}
              className={`ml-3 px-5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                loading
                  ? "bg-zinc-600 text-zinc-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
              }`}
            >
              Send
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;