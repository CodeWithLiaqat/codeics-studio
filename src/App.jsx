import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AIAgent = lazy(() => import("./components/ai/AIAgent"));

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        } else if (tries++ < 30) {
          requestAnimationFrame(seek);
        }
      };
      seek();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function RouteFallback() {
  return (
    <div 
      aria-hidden="true" 
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      {/* Accessible Skip Link with visible focus ring */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-emerald-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#050505] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#030303]"
      >
        Skip to main content
      </a>

      <Header />

      {/* Single Source of Truth Main Landmark */}
      <main 
        id="main" 
        tabIndex={-1} 
        className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#050505] pt-16 text-zinc-100 focus:outline-none"
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <aside aria-label="Interactive AI Assistant">
          <AIAgent />
        </aside>
      </Suspense>
    </BrowserRouter>
  );
}