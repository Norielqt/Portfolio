import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects";

const buildSystemPrompt = () => {
  const projectList = projects
    .map((p, i) => {
      const badge = p.badge ? ` [${p.badge}]` : "";
      return `${i + 1}. ${p.title}${badge} — ${p.description} Stack: ${p.stack.join(", ")}.`;
    })
    .join("\n");

  return `You are an AI assistant for Noriel Fulgencio's portfolio website. Your job is to help visitors learn about Noriel in a friendly, professional tone. Only answer questions related to Noriel — if asked about anything unrelated, politely redirect the conversation back to him.

Here is everything you know about Noriel:

NAME: Noriel Fulgencio
ROLE: Software Engineer

EDUCATION:
- Bachelor of Science in Information Technology, West Visayas State University
- Graduated Magna Cum Laude, May 2025
- Started: August 2021

PROFESSIONAL EXPERIENCE:
- Software Engineer | June 2025 – March 2026
  Developed and maintained the Park Cabins CRM — a full-stack web application managing the full customer lifecycle for a cabin manufacturing company: enquiries, quoting, production, project delivery, invoicing, payments, and a customer portal.

INTERNSHIP:
- Meralco PowerGen - IT Department | February 2025 – May 2025

PROJECTS:
${projectList}

SKILLS:
Languages: JavaScript, Python, PHP, Java, C++, C#, HTML & CSS
Frameworks/Libraries: React, Laravel, Tailwind CSS
Tools: Git, GitHub, REST APIs, MySQL, AWS
Other: Full-stack development, database design, API development, deployment & DevOps

CONTACT:
- GitHub: https://github.com/Norielqt
- LinkedIn: https://www.linkedin.com/in/noriel-fulgencio-23887a259/
- Facebook: https://www.facebook.com/noryeeelqt

Keep answers concise and helpful. If asked if Noriel is available for work or hire, say he is open to opportunities.`;
};

const SYSTEM_PROMPT = buildSystemPrompt();

const SUGGESTED_QUESTIONS = [
  { icon: "🚀", label: "Projects", text: "What projects has Noriel built?" },
  { icon: "⚡", label: "Skills", text: "What are his skills?" },
  { icon: "💼", label: "Experience", text: "Tell me about his experience" },
  { icon: "✉️", label: "Hire", text: "Is he available for hire?" },
];

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Renders assistant markdown-like responses with proper formatting
function MessageContent({ text, isDark }) {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  const renderInline = (str) => {
    const parts = [];
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let last = 0, match;
    while ((match = regex.exec(str)) !== null) {
      if (match.index > last) parts.push(str.slice(last, match.index));
      const raw = match[0];
      if (raw.startsWith("`"))
        parts.push(<code key={match.index} className={`px-1 py-0.5 rounded text-xs font-mono ${isDark ? "bg-white/10 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>{raw.slice(1, -1)}</code>);
      else if (raw.startsWith("**"))
        parts.push(<strong key={match.index} className="font-semibold">{raw.slice(2, -2)}</strong>);
      else
        parts.push(<em key={match.index}>{raw.slice(1, -1)}</em>);
      last = match.index + raw.length;
    }
    if (last < str.length) parts.push(str.slice(last));
    return parts.length ? parts : str;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines — add spacing via margin on previous element
    if (trimmed === "") { i++; continue; }

    // Heading: ### or ## or #
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      elements.push(
        <p key={i} className={`font-semibold mt-2 mb-0.5 ${headingMatch[1].length === 1 ? "text-base" : "text-sm"} ${isDark ? "text-indigo-200" : "text-indigo-700"}`}>
          {renderInline(headingMatch[2])}
        </p>
      );
      i++; continue;
    }

    // Bullet list block
    if (/^[-*•]\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="mt-1 mb-1 space-y-0.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? "bg-indigo-400" : "bg-indigo-500"}`} />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list block
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="mt-1 mb-1 space-y-0.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className={`flex-shrink-0 text-xs font-bold mt-0.5 ${isDark ? "text-indigo-400" : "text-indigo-500"}`}>{idx + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="leading-relaxed">{renderInline(trimmed)}</p>
    );
    i++;
  }

  return <div className="space-y-1 text-sm break-words">{elements}</div>;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Noriel's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GROQ_API_KEY;
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || `API error ${response.status}`;
        throw new Error(errMsg);
      }

      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("ChatBot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Something went wrong: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button with pulse ring */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping" />
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className={`fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm flex flex-col rounded-3xl shadow-2xl overflow-hidden border ${isDark ? "border-white/10" : "border-indigo-200"}`}
            style={{
              height: "520px",
              background: isDark
                ? "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)"
                : "linear-gradient(145deg, #f8faff 0%, #eef2ff 100%)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
              }}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/30">
                    N
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-indigo-600" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm tracking-wide">Noriel's Assistant</p>
                  <p className="text-indigo-200 text-xs flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online · Powered by Groq AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition p-1 rounded-lg hover:bg-white/10 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {/* Assistant avatar */}
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-0.5 self-end">
                        N
                      </div>
                    )}
                    <div
                      className={`min-w-0 ${msg.role === "user" ? "max-w-[75%]" : "max-w-[calc(100%-2.5rem)]"} px-3.5 py-2.5 text-sm leading-relaxed break-words overflow-hidden ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-sm text-white"
                          : `rounded-2xl rounded-bl-sm ${isDark ? "text-gray-100" : "text-gray-800"}`
                      }`}
                      style={
                        msg.role === "user"
                          ? { background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }
                          : isDark
                            ? { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }
                            : { background: "rgba(99,102,241,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(99,102,241,0.18)" }
                      }
                    >
                      {msg.role === "user"
                        ? msg.content
                        : <MessageContent text={msg.content} isDark={isDark} />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    N
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex space-x-1.5 items-center" style={isDark ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" } : { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-indigo-400" : "bg-indigo-500"}`} style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pt-1 space-y-2"
                >
                  <p className={`text-xs font-medium px-1 mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Suggested questions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTED_QUESTIONS.map(({ icon, label, text }, i) => (
                      <motion.button
                        key={text}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + i * 0.07 }}
                        onClick={() => sendMessage(text)}
                        className={`group flex flex-col items-start gap-1 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-400/40`}
                        style={{
                          background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.07)",
                          border: isDark ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(99,102,241,0.2)",
                          boxShadow: isDark ? "0 2px 12px rgba(99,102,241,0.12)" : "0 2px 8px rgba(99,102,241,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "rgba(99,102,241,0.24)" : "rgba(99,102,241,0.15)";
                          e.currentTarget.style.boxShadow = isDark ? "0 4px 20px rgba(99,102,241,0.25)" : "0 4px 16px rgba(99,102,241,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.07)";
                          e.currentTarget.style.boxShadow = isDark ? "0 2px 12px rgba(99,102,241,0.12)" : "0 2px 8px rgba(99,102,241,0.06)";
                        }}
                      >
                        <span className="text-base leading-none">{icon}</span>
                        <span className={`text-xs font-semibold ${isDark ? "text-indigo-200" : "text-indigo-700"}`}>{label}</span>
                        <span className={`text-[10px] leading-tight ${isDark ? "text-gray-400" : "text-gray-500"}`}>{text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex items-center gap-2 flex-shrink-0"
              style={isDark
                ? { borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)" }
                : { borderTop: "1px solid rgba(99,102,241,0.15)", background: "rgba(255,255,255,0.85)" }
              }
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={loading}
                className={`flex-1 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition ${isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`}
                style={isDark
                  ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }
                  : { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(99,102,241,0.2)" }
                }
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
