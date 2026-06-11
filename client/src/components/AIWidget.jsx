import { useEffect, useState, useRef } from "react";
import { X, Send } from "lucide-react";

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi — I'm Studio Assistant. Ask me for booking tips, pricing, or image enhancements." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    const opener = () => setOpen(true);
    window.addEventListener("open-ai", opener);
    return () => window.removeEventListener("open-ai", opener);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setMessages((m) => [...m, { from: "bot", text: "Thinking..." }]);

    // Try a server AI endpoint; fall back to a quick mock reply
    try {
      const res = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: text }) });
      if (res.ok) {
        const data = await res.json();
        setMessages((m) => [...m.slice(0, -1), { from: "bot", text: data.answer || JSON.stringify(data) }]);
        return;
      }
    } catch (e) {
      // ignore and use mock
    }

    // Simple mock reply
    setTimeout(() => {
      setMessages((m) => [...m.slice(0, -1), { from: "bot", text: `I can help with that. Quick tip: try offering a 10% weekday discount for bookings. (You asked: "${text}")` }]);
    }, 700);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white">
          <div className="font-semibold">Studio Assistant</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(false)} className="p-1 rounded-md bg-white/10 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={listRef} className="max-h-64 overflow-auto bg-gradient-to-b from-white/2 to-transparent p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
              <div className={`inline-block rounded-lg px-3 py-2 ${m.from === "user" ? "bg-sky-600 text-white" : "bg-white/5 text-slate-200"}`}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 bg-slate-900/70">
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask me about bookings or image tips..." className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none" />
            <button onClick={send} className="rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] px-3 py-2 text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
