import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import projects from "../data/projects";

const buildSystemPrompt = () => {
  const projectList = projects
    .map((p, i) => {
      const badge = p.badge ? ` [${p.badge}]` : "";
      const links = [p.demo ? `Live: ${p.demo}` : "", p.github ? `GitHub: ${p.github}` : ""].filter(Boolean).join(" | ");
      return `${i + 1}. ${p.title}${badge} — ${p.description} Stack: ${p.stack.join(", ")}.${links ? ` ${links}` : ""}`;
    })
    .join("\n");

  return `You are an AI assistant for Noriel Fulgencio's portfolio website. Your job is to help visitors learn about Noriel in a friendly, professional tone. Only answer questions related to Noriel — if asked about anything unrelated, politely redirect the conversation back to him.

Here is everything you know about Noriel:

NAME: Noriel Fulgencio
ROLE: Full-Stack Software Engineer
LOCATION: Philippines
CURRENT STATUS: Recently finished his first professional role and is currently freelancing while looking for his next full-time opportunity.

ABOUT:
Noriel is a full-stack software engineer from the Philippines. He recently completed his first professional role where he built and maintained a production CRM from scratch. He graduated Magna Cum Laude in IT from West Visayas State University in 2025, and his thesis (Zonify) was awarded Best Thesis that same year. He works across the full stack but leans more toward the backend — structuring data, building APIs, and making sure systems hold up in production. He mostly builds websites, custom systems, and automations to help businesses run smoother and cut down manual work.

EDUCATION:
- Bachelor of Science in Information Technology, West Visayas State University
- Graduated Magna Cum Laude, May 2025
- Started: August 2021

PROFESSIONAL EXPERIENCE:
- Software Engineer at Park Cabins | June 2025 – March 2026
  Built and maintained a production CRM from scratch for a cabin manufacturing company. Covers 6 end-to-end workflows: enquiry, quoting, production tracking, project delivery, invoicing, and payment — replacing manual spreadsheet processes. Features a staff dashboard and a customer portal for real-time project visibility. Built with React, Laravel, MySQL, and Tailwind CSS.

INTERNSHIP:
- IT Department at Meralco PowerGen | February 2025 – May 2025

TIMELINE:
- August 2019: Wrote his first line of code
- August 2021: Started BS in Information Technology at West Visayas State University
- February 2025: Internship at Meralco PowerGen
- May 2025: Graduated Magna Cum Laude
- June 2025 – March 2026: Software Engineer at Park Cabins

PROJECTS:
${projectList}

SKILLS:
CMS Platforms: WordPress, Shopify, Elementor, Webflow, Wix, Squarespace
Programming Languages: JavaScript, Python, PHP, Java, C++, C#, HTML & CSS
Frameworks & Libraries: React, Next.js, Laravel, Tailwind CSS
DevOps & Tools: AWS, Git & GitHub, Railway, Vercel, REST APIs
Databases: MySQL, PostgreSQL
Other: Full-stack development, database design, API development, deployment, automations

SERVICES OFFERED:
- Web Development: Custom websites, landing pages, business sites
- Automation: Workflow automations to reduce manual work
- Software Development: Custom systems, CRMs, SaaS platforms, dashboards

CONTACT:
- GitHub: https://github.com/Norielqt
- LinkedIn: https://www.linkedin.com/in/noriel-fulgencio-23887a259/
- Facebook: https://www.facebook.com/noryeeelqt

Keep answers concise and helpful. If asked if Noriel is available for work or hire, say he is open to opportunities and currently freelancing.`;
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
function MessageContent({ text }) {
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
      if (raw.startsWith("`")) {
        const codeStyle = { color: "#536942", background: "#f6f8f5" };
        parts.push(<code key={match.index} className="px-1 py-0.5 rounded text-xs font-mono" style={codeStyle}>{raw.slice(1, -1)}</code>);
      } else if (raw.startsWith("**"))
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
      const headingColor = "#536942";
      elements.push(
        <p key={i} className={`font-semibold mt-2 mb-0.5 ${headingMatch[1].length === 1 ? "text-base" : "text-sm"}`} style={{ color: headingColor }}>
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
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#536942" }} />
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
              <span className="flex-shrink-0 text-xs font-bold mt-0.5" style={{ color: "#536942" }}>{idx + 1}.</span>
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
          <span className="absolute inset-0 rounded-full bg-brand opacity-30 animate-ping" />
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-brand to-brand-700 hover:from-brand-600 hover:to-brand-800 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand/50"
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
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm flex flex-col shadow-2xl overflow-hidden border"
            style={{
              height: "520px",
              borderColor: "rgba(83,105,66,0.2)",
              background: "linear-gradient(145deg, #f6f8f5 0%, #f0f2ed 100%)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #536942 0%, #44572d 100%)",
                boxShadow: "0 4px 20px rgba(83,105,66,0.4)",
              }}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center ring-2 ring-white/30" style={{ background: "linear-gradient(135deg, #7aad5e 0%, #536942 50%, #3a4d2e 100%)", boxShadow: "0 0 14px rgba(83,105,66,0.7)" }}>
                    <HiSparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full ring-2" style={{ ringColor: "#536942", boxShadow: "0 0 0 2px #536942" }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm tracking-wide">Noriel's Assistant</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: "#a8c5a0" }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online · Powered by Groq AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition p-1 hover:bg-white/10 focus:outline-none"
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
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 self-end" style={{ background: "linear-gradient(135deg, #7aad5e 0%, #536942 100%)", boxShadow: "0 0 8px rgba(83,105,66,0.5)" }}>
                        <HiSparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`min-w-0 ${msg.role === "user" ? "max-w-[75%]" : "max-w-[calc(100%-2.5rem)]"} px-3.5 py-2.5 text-sm leading-relaxed break-words overflow-hidden ${
                        msg.role === "user"
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                      style={
                        msg.role === "user"
                          ? { background: "linear-gradient(135deg, #536942 0%, #44572d 100%)" }
                          : { background: "rgba(83,105,66,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(83,105,66,0.18)" }
                      }
                    >
                      {msg.role === "user"
                        ? msg.content
                        : <MessageContent text={msg.content} />}
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
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #7aad5e 0%, #536942 100%)", boxShadow: "0 0 8px rgba(83,105,66,0.5)" }}>
                    <HiSparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="px-4 py-3 flex space-x-1.5 items-center" style={{ background: "rgba(83,105,66,0.08)", border: "1px solid rgba(83,105,66,0.18)" }}>
                    {[0, 150, 300].map((delay) => (
                      <span key={delay} className="w-2 h-2 rounded-full animate-bounce bg-brand" style={{ animationDelay: `${delay}ms` }} />
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
                  <p className="text-xs font-medium px-1 mb-1 text-gray-500">Suggested questions</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUGGESTED_QUESTIONS.map(({ icon, label, text }, i) => (
                      <motion.button
                        key={text}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + i * 0.07 }}
                        onClick={() => sendMessage(text)}
                        className={`group flex flex-col items-start gap-1 px-3 py-2.5 text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand/40`}
                        style={{
                          background: "rgba(83,105,66,0.07)",
                          border: "1px solid rgba(83,105,66,0.2)",
                          boxShadow: "0 2px 8px rgba(83,105,66,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(83,105,66,0.15)";
                          e.currentTarget.style.boxShadow = "0 4px 16px rgba(83,105,66,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(83,105,66,0.07)";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(83,105,66,0.06)";
                        }}
                      >
                        <span className="text-xs font-semibold text-brand">{label}</span>
                        <span className="text-[10px] leading-tight text-gray-500">{text}</span>
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
              style={{ borderTop: "1px solid rgba(83,105,66,0.15)", background: "rgba(255,255,255,0.85)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand/60 transition text-gray-900 placeholder-gray-400"
                style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(83,105,66,0.2)" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
                style={{ background: "linear-gradient(135deg, #536942 0%, #44572d 100%)" }}
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
