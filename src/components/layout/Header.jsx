import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, Phone, MessageCircle, Mail } from "lucide-react";
import { siteConfig, navigation } from "../../data/siteConfig";

function MagneticLink({ to, children, className = "", onClick }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px, 0)`;
  };
  const onLeave = () => ref.current && (ref.current.style.transform = "translate3d(0,0,0)");
  return (
    <Link
      ref={ref}
      to={to}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-[#050505] transition-[transform,background-color] duration-300 ease-out will-change-transform hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      const sw = window.innerWidth - root.clientWidth;
      root.style.overflow = "hidden";
      root.style.paddingRight = sw > 0 ? `${sw}px` : "";
    } else {
      root.style.overflow = "";
      root.style.paddingRight = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      root.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => mq.matches && setOpen(false);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const desktopLink = ({ isActive }) =>
    `relative inline-flex min-h-[44px] items-center text-sm tracking-wide transition-colors duration-200 hover:text-zinc-50 ${
      isActive ? "text-zinc-50 after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:bg-emerald-500" : "text-zinc-400"
    }`;
  const desktopPlain = "inline-flex min-h-[44px] items-center text-sm tracking-wide text-zinc-400 transition-colors duration-200 hover:text-zinc-50";
  const mobileCls = "flex min-h-[56px] items-center rounded-xl px-4 text-2xl font-medium tracking-tight text-zinc-100 active:bg-white/[0.04]";

  const renderItem = (item, mobile = false) => {
    if (item.href.includes("#")) {
      const [path, id] = item.href.split("#");
      const samePage = (path || "/") === pathname;
      return samePage ? (
        <a href={`#${id}`} onClick={() => setOpen(false)} className={mobile ? mobileCls : desktopPlain}>{item.label}</a>
      ) : (
        <Link to={item.href} className={mobile ? mobileCls : desktopPlain}>{item.label}</Link>
      );
    }
    return (
      <NavLink to={item.href} end={item.href === "/"} className={mobile ? `${mobileCls} aria-[current=page]:text-emerald-400` : desktopLink}>
        {item.label}
      </NavLink>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-stroke bg-obsidian/70 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link to="/" aria-label={`${siteConfig.name} home`} className="flex min-h-[44px] items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_2px_rgba(16,185,129,0.6)]" aria-hidden="true" />
          <span className="font-display text-lg font-semibold tracking-tight text-zinc-50">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.primary.map((item) => <li key={item.href}>{renderItem(item)}</li>)}
        </ul>

        <div className="hidden md:block">
          <MagneticLink to={navigation.cta.href}>{navigation.cta.label}</MagneticLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.07] bg-[#0b0b0f] text-zinc-200 md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-16 z-30 bg-black/60 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-16 z-40 flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-t border-white/[0.07] bg-[#050505]/95 pb-[max(24px,env(safe-area-inset-bottom))] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 pt-6">
          {navigation.primary.map((item) => <li key={item.href}>{renderItem(item, true)}</li>)}
        </ul>
        <div className="mt-6 flex flex-col gap-3 px-4">
          <MagneticLink to={navigation.cta.href} onClick={() => setOpen(false)} className="w-full py-4 text-base">
            {navigation.cta.label}
          </MagneticLink>
          <div className="grid grid-cols-3 gap-2">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.07] bg-[#0b0b0f] text-xs text-zinc-300">
              <Phone className="h-4 w-4 text-emerald-400" aria-hidden="true" />Call
            </a>
            <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.07] bg-[#0b0b0f] text-xs text-zinc-300">
              <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" />WhatsApp
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.07] bg-[#0b0b0f] text-xs text-zinc-300">
              <Mail className="h-4 w-4 text-emerald-400" aria-hidden="true" />Email
            </a>
          </div>
          <p className="mt-2 break-all text-sm text-zinc-500">{siteConfig.contact.email}</p>
        </div>
      </div>
    </header>
  );
}
