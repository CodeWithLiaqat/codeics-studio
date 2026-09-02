import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, X, Send, Sparkles, Mic, ArrowUpRight } from "lucide-react";
import { siteConfig, leadFormOptions } from "../../data/siteConfig";
import { faqData } from "../../data/faqData";
import { servicesData } from "../../data/servicesData";
import { insertLead } from "../../lib/supabaseClient";

const STOP = new Set(["the","a","an","is","are","do","does","you","your","i","we","my","of","to","in","for","on","with","how","what","much","can","it","and","or","me","us","about","tell"]);
const tokens = (s) => s.toLowerCase().replace(/[^a-z0-9\s$+]/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t));

const SYNONYMS = {
  price: ["pricing","cost","costs","budget","rate","rates","quote","expensive","cheap","$"],
  time: ["timeline","long","duration","weeks","months","fast","quick","deadline"],
  "3d": ["three","threejs","webgl","fiber","r3f","immersive","interactive"],
  ai: ["assistant","llm","gpt","chatbot","automation","intelligent"],
  seo: ["ranking","google","speed","performance","vitals","lighthouse"],
  start: ["begin","hire","kickoff","contact","work","together","project"],
};
const expand = (ts) => {
  const out = new Set(ts);
  for (const [root, syns] of Object.entries(SYNONYMS)) if (ts.some((t) => t === root || syns.includes(t))) { out.add(root); syns.forEach((s) => out.add(s)); }
  return [...out];
};

const INDEX = [
  ...faqData.map((f) => ({ kind: "faq", text: f.answer, terms: expand(tokens(f.question + " " + f.category + " " + f.answer.slice(0, 160))) })),
  ...servicesData.map((s) => ({
    kind: "service",
    text: `${s.title}: ${s.shortDescription} ${s.startingPrice}.`,
    href: `/services/${s.slug}`,
    terms: expand(tokens(s.title + " " + s.eyebrow + " " + s.techBadges.join(" "))),
  })),
];

export function matchQuery(q) {
  const qt = expand(tokens(q));
  if (!qt.length) return null;
  let best = null;
  for (const item of INDEX) {
    const hits = qt.filter((t) => item.terms.includes(t)).length;
    const score = hits / Math.sqrt(item.terms.length) + (hits === qt.length ? 0.5 : 0);
    if (hits >= 1 && (!best || score > best.score)) best = { ...item, score };
  }
  return best && best.score > 0.25 ? best : null;
}

const LEAD_WORDS = /\b(hire|quote|proposal|start( a)? project|work (with|together)|get started|book|talk to (someone|liaqat|human)|contact)\b/i;

const SUGGESTIONS = [
  faqData.find((f) => f.id === "pricing")?.question,
  faqData.find((f) => f.id === "timeline")?.question,
  faqData.find((f) => f.id === "3d-performance")?.question,
  "Start a project brief",
].filter(Boolean);

const greeting = `Hi, I'm the ${siteConfig.name} assistant. Ask about services, pricing or timelines, or say "start a project" and I'll take a brief for ${siteConfig.founder.name.split(" ")[0]}.`;

const LEAD_STEPS = [
  { key: "name", prompt: "Great. What's your name?", validate: (v) => v.trim().length >= 2 || "Please enter your full name." },
  { key: "email", prompt: "And the best email to reach you?", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "That email doesn't look right. Try again?" },
  {
    key: "serviceCategory",
    prompt: "Which service is this about? Pick one below.",
    options: leadFormOptions.serviceCategories,
  },
  { key: "budgetRange", prompt: "Rough budget range?", options: leadFormOptions.budgetRanges },
  { key: "timeline", prompt: "When do you want to launch?", options: leadFormOptions.timelines },
  { key: "message", prompt: "Last one. Describe the project in a sentence or two.", validate: (v) => v.trim().length >= 10 || "A little more detail helps us scope it (10+ characters)." },
];

function VoiceBars({ active }) {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 90}ms` }}
          className={`w-[3px] rounded-full bg-emerald-400 ${active ? "motion-safe:animate-[voice_900ms_ease-in-out_infinite]" : "h-1 opacity-40"}`}
        />
      ))}
    </span>
  );
}

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lead, setLead] = useState(null); // { step, values }
  const [messages, setMessages] = useState([{ id: 1, role: "bot", text: greeting }]);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(2);

  const push = (role, text, extra = {}) => setMessages((m) => [...m, { id: idRef.current++, role, text, ...extra }]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    if (mobile) document.documentElement.style.overflow = open ? "hidden" : "";
    if (open && !mobile) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const reply = (text, extra) => {
    setTyping(true);
    const delay = Math.min(1200, 300 + text.length * 6);
    setTimeout(() => { setTyping(false); push("bot", text, extra); }, delay);
  };

  const startLead = () => {
    setLead({ step: 0, values: { name: "", email: "", serviceCategory: "", budgetRange: "", timeline: "", message: "" } });
    reply(LEAD_STEPS[0].prompt);
  };

  const advanceLead = async (value) => {
    const step = LEAD_STEPS[lead.step];
    if (step.validate) {
      const ok = step.validate(value);
      if (ok !== true) return reply(ok);
    }
    const values = { ...lead.values, [step.key]: value.trim() };
    const nextIdx = lead.step + 1;
    if (nextIdx < LEAD_STEPS.length) {
      setLead({ step: nextIdx, values });
      const nxt = LEAD_STEPS[nextIdx];
      return reply(nxt.prompt, nxt.options ? { options: nxt.options, key: nxt.key } : {});
    }
    setLead(null);
    setTyping(true);
    const { error } = await insertLead({ ...values, source: "ai_agent" });
    setTyping(false);
    if (error) {
      push("bot", `I couldn't save that just now. Email ${siteConfig.contact.email} and you'll get a reply within 24 hours.`);
    } else {
      push("bot", `Thanks ${values.name.split(" ")[0]}. Your brief is with ${siteConfig.founder.name}. Expect a reply at ${values.email} within 24 hours.`);
    }
  };

  const handleSend = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    push("user", text);

    if (lead) return advanceLead(text);
    if (LEAD_WORDS.test(text)) return startLead();

    const hit = matchQuery(text);
    if (hit) return reply(hit.text, hit.href ? { href: hit.href, hrefLabel: "View service" } : {});
    reply(`I don't have a precise answer for that yet. Ask about services, pricing or timelines, or say "start a project" and I'll take a brief. You can also email ${siteConfig.contact.email}.`);
  };

  const pickOption = (key, opt) => {
    if (!lead || LEAD_STEPS[lead.step].key !== key) return;
    push("user", opt.label);
    advanceLead(opt.value);
  };

  const suggestions = useMemo(() => (lead ? [] : SUGGESTIONS), [lead]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="ai-agent-panel"
        aria-label={open ? "Close assistant" : "Open Codeics assistant"}
        className={`fixed bottom-[max(20px,env(safe-area-inset-bottom))] right-4 z-[66] inline-flex h-14 w-14 items-center justify-center rounded-full border border-stroke-hover bg-obsidian-100/80 text-emerald-400 shadow-float backdrop-blur-xl transition-transform duration-300 ease-spring hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 sm:bottom-6 sm:right-6 ${open ? "max-sm:hidden" : ""}`}
      >
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full border border-accent/50 motion-safe:animate-radar" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full border border-accent/40 motion-safe:animate-radar [animation-delay:0.8s]" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full border border-cyan-400/30 motion-safe:animate-radar [animation-delay:1.6s]" aria-hidden="true" />
          </>
        )}
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),rgba(16,185,129,0.35)_35%,rgba(3,3,3,0.95)_70%)] shadow-[inset_0_-6px_14px_rgba(0,0,0,0.6),inset_0_2px_6px_rgba(255,255,255,0.25),0_0_30px_6px_rgba(16,185,129,0.35)] motion-safe:animate-pulse [animation-duration:3s]" />
        {open ? <X className="relative h-5 w-5 text-zinc-50" aria-hidden="true" /> : <Bot className="relative h-6 w-6 text-zinc-50 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" aria-hidden="true" />}
      </button>

      <section
        id="ai-agent-panel"
        role="dialog"
        aria-modal="false"
        aria-label="Codeics assistant"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 z-[65] flex h-[85dvh] max-h-[85vh] w-full grain flex-col overflow-hidden rounded-t-2xl border border-stroke-hover bg-[linear-gradient(180deg,rgba(14,14,16,0.85),rgba(3,3,3,0.92))] pb-[env(safe-area-inset-bottom)] shadow-float backdrop-blur-2xl transition-[opacity,transform] duration-400 ease-spring sm:inset-x-auto sm:bottom-[92px] sm:right-6 sm:h-[min(620px,calc(100dvh-120px))] sm:w-96 sm:rounded-3xl sm:pb-0 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0 sm:translate-y-3"
        }`}
      >
        <header className="relative flex items-center justify-between border-b border-stroke px-4 py-3 sm:px-5 sm:py-4">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.15),rgba(16,185,129,0.25)_40%,rgba(3,3,3,0.9)_75%)] text-accent-soft shadow-aura">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-zinc-50">{siteConfig.name} Assistant</p>
              <p className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {typing ? "Thinking" : "Online · replies instantly"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <VoiceBars active={typing} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100 sm:hidden">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4 [scrollbar-width:thin]" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed motion-safe:animate-fade-up ${m.role === "user" ? "rounded-2xl rounded-br-md bg-gradient-to-br from-accent-soft to-accent text-obsidian shadow-aura" : "glass rounded-2xl rounded-bl-md text-zinc-200"}`}>
                <p>{m.text}</p>
                {m.href && (
                  <Link to={m.href} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                    {m.hrefLabel} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                )}
                {m.options && lead && LEAD_STEPS[lead.step]?.key === m.key && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.options.map((o) => (
                      <button key={o.value} type="button" onClick={() => pickOption(m.key, o)} className="min-h-[40px] rounded-full border border-white/10 bg-[#050505] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300">
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="glass flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ animationDelay: `${i * 150}ms` }} className="h-1.5 w-1.5 rounded-full bg-zinc-500 motion-safe:animate-bounce" />
                ))}
              </div>
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="flex gap-2 overflow-x-auto border-t border-stroke px-5 py-3 [scrollbar-width:none]">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => handleSend(s)} className="glass min-h-[40px] shrink-0 rounded-full px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-accent-soft">
                {s}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 border-t border-stroke px-4 py-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-500" aria-hidden="true">
            <Mic className="h-4 w-4" />
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type={lead && LEAD_STEPS[lead.step].key === "email" ? "email" : "text"}
            autoComplete={lead ? LEAD_STEPS[lead.step].key === "email" ? "email" : LEAD_STEPS[lead.step].key === "name" ? "name" : "off" : "off"}
            placeholder={lead ? "Type your answer…" : "Ask about services, pricing, timelines…"}
            aria-label="Message"
            className="h-11 min-w-0 flex-1 rounded-full border border-stroke bg-obsidian/80 px-4 text-base text-zinc-100 transition-[border-color,box-shadow] duration-300 placeholder:text-zinc-600 focus:border-accent/50 focus:shadow-aura focus:outline-none sm:text-sm"
          />
          <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-obsidian shadow-aura transition-[background-color,transform] duration-300 ease-spring hover:bg-accent-soft active:scale-95 disabled:opacity-40 disabled:shadow-none">
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </section>
    </>
  );
}
