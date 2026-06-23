import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail, Phone, MapPin, GraduationCap, FileCheck2, Plane, HandHelping,
  Globe2, ArrowRight, Check, Sparkles, Menu, X, Star, Quote, ChevronDown,
  Clock, Award, Users, BookOpen,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import logo from "@/assets/hr-uk-logo.png";
import heroVideo from "@/assets/hero-campus.mp4";
import heroPoster from "@/assets/hero-poster.jpg";
import { submitContact } from "@/lib/contact.functions";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { rel: "icon", type: "image/png", href: new URL("../assets/favicon.png", import.meta.url).href },
      { name: "description", content: "Personalised guidance to leading UK universities. Applications, visas, accommodation and pre-departure support across London, Manchester, Birmingham, Leeds and Nottingham." },
      { property: "og:title", content: "hr.uk · Study in the UK" },
      { property: "og:description", content: "We connect international students with world-class UK universities." },
      { property: "og:image", content: heroPoster },
      { name: "twitter:image", content: heroPoster },
    ],
    links: [
      { rel: "preload", as: "image", href: heroPoster, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

type Course = {
  title: string;
  duration: string;
  level: string;
  blurb: string;
  modules: string[];
  outcomes: string[];
};

const courses: Course[] = [
  {
    title: "BA (Hons) Business Management with Foundation year",
    duration: "4 years",
    level: "Undergraduate",
    blurb: "A complete pathway into business leadership. The foundation year builds academic English, study skills and core business concepts before progressing into the full BA (Hons).",
    modules: ["Principles of Management", "Marketing Essentials", "Financial Accounting", "Organisational Behaviour", "Strategic Management", "Entrepreneurship", "Final Year Project"],
    outcomes: ["Graduate roles in consulting, marketing and operations", "Postgraduate study routes", "International business career mobility"],
  },
  {
    title: "BSc (Hons) Health and Social Sciences with Foundation year",
    duration: "4 years",
    level: "Undergraduate",
    blurb: "Designed for students aiming for healthcare, public health and social care careers. Combines biomedical foundations with social science research methods.",
    modules: ["Human Biology", "Public Health", "Research Methods", "Mental Health Studies", "Sociology of Health", "Ethics in Healthcare", "Dissertation"],
    outcomes: ["NHS and care sector roles", "Public health and policy roles", "Postgraduate routes into nursing, social work and public health"],
  },
  {
    title: "Pearson HND in Business and Computing",
    duration: "2 years",
    level: "Higher National Diploma",
    blurb: "A career focused diploma blending business strategy with applied computing. Recognised globally and a fast route into industry or top-up to a full degree.",
    modules: ["Business Environment", "Programming Fundamentals", "Database Design", "Project Management", "Web Development", "Business Analytics"],
    outcomes: ["Junior developer and analyst roles", "Top-up to a BA or BSc (Hons)", "Pathways into digital business careers"],
  },
  {
    title: "BA (Hons) Top-up",
    duration: "1 year",
    level: "Top-up Degree",
    blurb: "A single year that converts your HND or equivalent qualification into a full UK BA (Hons) honours degree. Intensive, research-led and career oriented.",
    modules: ["Advanced Strategy", "Leading People", "Applied Research Methods", "Capstone Dissertation"],
    outcomes: ["Full UK honours degree", "Eligibility for UK postgraduate study", "Skilled worker visa eligibility on graduate roles"],
  },
];

const services = [
  { icon: Globe2, title: "International Student Recruitment", body: "Find the right university and programme matched to your goals, qualifications and career path." },
  { icon: HandHelping, title: "University Partnerships", body: "We work directly with universities to recruit qualified international students and support enrollment." },
  { icon: FileCheck2, title: "Application Support", body: "Guidance on university selection, applications, documents, admission requirements and interviews." },
  { icon: GraduationCap, title: "Visa Assistance", body: "Step by step support for student visa applications and immigration requirements." },
  { icon: Plane, title: "Pre Departure Support", body: "Accommodation, travel, cultural prep and arrival guidance so you land ready to thrive." },
  { icon: Sparkles, title: "Personalised Mentorship", body: "One to one consultations with experienced advisors throughout your journey." },
];

const cities = ["London", "Manchester", "Birmingham", "Leeds", "Nottingham"];

const testimonials = [
  { name: "Ayesha K.", city: "Now in Manchester", text: "They turned a complicated process into a clear path. From shortlisting universities to my visa interview, every single step was handled with care.", rating: 5 },
  { name: "Daniel O.", city: "Now in London", text: "Genuinely the most responsive education consultants I worked with. My CAS letter and accommodation were sorted weeks before I flew.", rating: 5 },
  { name: "Mei L.", city: "Now in Birmingham", text: "I was rejected once before and almost gave up. The hr.uk team rebuilt my application and I got into my first choice university.", rating: 5 },
  { name: "Hassan R.", city: "Now in Leeds", text: "Honest advice, no pressure, no hidden fees. They told me which course actually fit me, not just what was easy to sell.", rating: 5 },
];

const process = [
  { step: "01", title: "Free Consultation", body: "Tell us your goals, grades and budget. We map out realistic options across UK universities." },
  { step: "02", title: "Course & University Match", body: "We shortlist programmes that fit your profile and recommend the strongest applications." },
  { step: "03", title: "Application & Offers", body: "We prepare your documents, personal statement and submit. You receive your offers." },
  { step: "04", title: "Visa & Pre Departure", body: "CAS, visa application, accommodation, travel and arrival support. We stay with you until you land." },
];

const faqs = [
  { q: "Do you charge students for your service?", a: "Our core consultation and application support for partner universities is free for students. Premium services such as visa specialist support are clearly priced upfront." },
  { q: "Which UK cities can I study in?", a: "We currently place students in London, Manchester, Birmingham, Leeds and Nottingham across our partner universities." },
  { q: "What are the entry requirements?", a: "Requirements vary by course and university. Most undergraduate programmes need completed secondary education and IELTS 5.5 to 6.0. Our advisors review your profile and tell you exactly what you need." },
  { q: "When are intakes?", a: "Most of our partner universities run September and January intakes. Some courses also offer May starts." },
  { q: "Can I work while studying?", a: "Yes. Student visa holders can typically work up to 20 hours per week during term time and full time during vacations." },
];

function Index() {
  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Toaster position="top-center" richColors />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Services />
      <Process />
      <Courses />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Mission />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#courses", label: "Courses" },
    { href: "#why", label: "Why Us" },
    { href: "#testimonials", label: "Stories" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"}`}>
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="hr.uk" className={`h-7 md:h-8 w-auto transition ${scrolled ? "" : "brightness-0 invert"}`} width={120} height={32} />
        </a>
        <nav
          className="hidden md:flex items-center relative"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white"}`}
            >
              {hovered === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full ${scrolled ? "bg-foreground/8" : "bg-white/15 backdrop-blur"}`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#contact" className={`hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${scrolled ? "bg-foreground text-background hover:bg-brand-deep" : "bg-white text-foreground hover:bg-brand hover:text-white"}`}>
          Apply now <ArrowRight className="h-4 w-4" />
        </a>
        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 -mr-2 ${scrolled ? "text-foreground" : "text-white"}`} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-base font-medium border-b border-border/50 last:border-0 text-foreground">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium">
                Apply now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    if (v.readyState >= 2) play();
    else v.addEventListener("loadeddata", play, { once: true });
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={heroPoster} alt="" aria-hidden width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          poster={heroPoster}
          autoPlay muted loop playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x relative z-10 pb-16 md:pb-24 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs md:text-sm font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            UK university admissions for ambitious international students
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl text-white leading-[1.02]">
            Your gateway to <em className="not-italic bg-gradient-to-r from-[#7cc1ec] to-white bg-clip-text text-transparent">world class</em> UK universities.
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl">
            We help international students secure places at leading universities across the United Kingdom with personalised guidance from application to arrival.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3 text-sm font-medium hover:bg-brand hover:text-white transition-all duration-300 shadow-elegant">
              Start your application <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
              Explore services
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-xs flex flex-col items-center gap-1"
      >
        <span>Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}

/* ---------------- Reveal helper ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [...cities, ...cities, ...cities];
  return (
    <div className="border-y border-border bg-cream py-5 overflow-hidden">
      <div className="marquee-track">
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-3 text-foreground/60">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="font-display text-2xl md:text-3xl whitespace-nowrap">{c}</span>
            <span className="text-brand">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { k: "98%", v: "Application success", icon: Award },
    { k: "50+", v: "University partners", icon: BookOpen },
    { k: "2,500+", v: "Students placed", icon: Users },
    { k: "24h", v: "Avg response time", icon: Clock },
  ];
  return (
    <section className="container-x py-16 md:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.v} delay={i * 0.08}>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 h-full hover:border-brand hover:shadow-card transition-all duration-300">
              <s.icon className="h-6 w-6 text-brand" />
              <p className="mt-4 font-display text-4xl md:text-5xl">{s.k}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="container-x py-20 md:py-28">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-brand">Welcome to hr.uk</p>
          <h2 className="mt-4 text-4xl md:text-6xl leading-[1.05]">
            Connecting international students with leading UK universities.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="space-y-5 text-lg text-muted-foreground">
          <p>
            At <strong className="text-foreground">hr.uk</strong>, we specialise in helping students achieve their educational goals by connecting them with leading universities in the United Kingdom and around the world.
          </p>
          <p>
            Our experienced team provides personalised guidance throughout the admissions process, making international education accessible, simple, and successful.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-foreground font-medium border-b-2 border-brand pb-1 hover:gap-3 transition-all">
            Speak to an advisor <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <section id="services" className="bg-ink text-white py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brand-soft">Our services</p>
            <h2 className="mt-3 text-4xl md:text-6xl text-white">Everything you need, end to end.</h2>
          </div>
          <p className="text-white/70 max-w-md">From choosing the right course to landing in your new city, we walk every step with you.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group bg-ink p-8 md:p-10 transition-colors hover:bg-brand-deep"
            >
              <s.icon className="h-9 w-9 text-brand-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              <h3 className="mt-6 text-2xl text-white">{s.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <Reveal className="max-w-2xl mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-brand">How it works</p>
          <h2 className="mt-4 text-4xl md:text-6xl leading-[1.05]">A simple four step journey.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-3xl bg-white border border-border p-7 hover:shadow-card transition-all"
            >
              <span className="font-display text-5xl text-brand/30">{p.step}</span>
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COURSES (with modal) ---------------- */
function Courses() {
  const [active, setActive] = useState<Course | null>(null);

  return (
    <section id="courses" className="container-x py-20 md:py-28">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <p className="text-sm font-medium uppercase tracking-widest text-brand">Courses we offer</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Programmes designed for global careers.</h2>
          <p className="mt-5 text-muted-foreground">Foundation, undergraduate, and top-up routes with leading UK institutions. Tap any course to see modules and outcomes.</p>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-brand-deep transition-colors">
            Check eligibility <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <ul className="space-y-4">
          {courses.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <button
                onClick={() => setActive(c)}
                className="group relative w-full text-left rounded-2xl border border-border bg-card p-6 md:p-8 hover:shadow-card hover:border-brand transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-3xl md:text-4xl text-brand/40 group-hover:text-brand transition-colors">
                    0{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.level} · {c.duration} · September & January starts</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-foreground/30 group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <CourseModal course={active} onClose={() => setActive(null)} />
    </section>
  );
}

function CourseModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [course, onClose]);

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-t-3xl sm:rounded-3xl border border-border shadow-elegant"
          >
            <div className="sticky top-0 flex items-center justify-between p-5 md:p-6 bg-background/95 backdrop-blur border-b border-border z-10">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand">
                <GraduationCap className="h-4 w-4" /> {course.level}
              </span>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 md:p-8 pt-2">
              <h3 className="text-2xl md:text-4xl leading-tight">{course.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-brand-soft text-brand-deep px-3 py-1">Duration: {course.duration}</span>
                <span className="rounded-full bg-cream text-foreground px-3 py-1">September & January intake</span>
                <span className="rounded-full bg-cream text-foreground px-3 py-1">International students welcome</span>
              </div>
              <p className="mt-5 text-muted-foreground leading-relaxed">{course.blurb}</p>

              <h4 className="mt-8 text-sm font-medium uppercase tracking-widest text-foreground/80">Indicative modules</h4>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {course.modules.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 text-sm font-medium uppercase tracking-widest text-foreground/80">Career outcomes</h4>
              <ul className="mt-3 space-y-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#contact" onClick={onClose} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-brand-deep transition-colors">
                  Apply for this course <ArrowRight className="h-4 w-4" />
                </a>
                <button onClick={onClose} className="rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-muted transition-colors">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const points = [
    "Strong network of UK university partners",
    "Experienced education consultants",
    "Personalised one to one student support",
    "High application success rates",
    "Global recruitment expertise",
    "End to end visa and arrival guidance",
  ];
  return (
    <section id="why" className="bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
              <img src={heroPoster} alt="International students at a UK university" loading="lazy" width={1200} height={1500} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Quote className="h-6 w-6 text-brand-soft mb-3" />
                <p className="font-display text-2xl md:text-3xl leading-snug">They turned a complicated process into a clear path. I am now studying in Manchester.</p>
                <p className="mt-3 text-sm text-white/70">Past student</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-sm font-medium uppercase tracking-widest text-brand">Why choose us</p>
            <h2 className="mt-4 text-4xl md:text-6xl leading-[1.05]">A team that makes the UK feel close.</h2>
            <ul className="mt-10 space-y-4">
              {points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-lg">{p}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  return (
    <section id="testimonials" className="container-x py-20 md:py-28">
      <Reveal className="max-w-2xl mb-12">
        <p className="text-sm font-medium uppercase tracking-widest text-brand">Student stories</p>
        <h2 className="mt-4 text-4xl md:text-6xl leading-[1.05]">Real students. Real UK degrees.</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-6 md:p-7 flex flex-col hover:shadow-card hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex gap-0.5 text-brand">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-foreground/90 leading-relaxed flex-1">{t.text}</p>
            <div className="mt-6 pt-5 border-t border-border">
              <p className="font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.city}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-ink text-white py-20 md:py-28">
      <div className="container-x grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-soft">Questions</p>
          <h2 className="mt-4 text-4xl md:text-5xl text-white leading-[1.05]">Frequently asked.</h2>
          <p className="mt-5 text-white/70">Can't see your question? Reach out and our advisors will reply within one working day.</p>
        </Reveal>
        <Reveal delay={0.1} className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span className="text-lg md:text-xl text-white group-hover:text-brand-soft transition-colors">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-white">
                    <span className="text-xl leading-none">+</span>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-white/70 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- MISSION ---------------- */
function Mission() {
  return (
    <section className="container-x py-20 md:py-28 text-center">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-brand">Our mission</p>
        <p className="mt-6 mx-auto max-w-4xl font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1]">
          To bridge the gap between <em className="not-italic bg-gradient-to-r from-brand to-brand-deep bg-clip-text text-transparent">talented students</em> and the world's leading universities, creating opportunities for academic success and global careers.
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const send = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          country: String(fd.get("country") || ""),
          course_interest: String(fd.get("course_interest") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      toast.success("Message sent! Our team will be in touch shortly.");
      form.reset();
    } catch {
      toast.error("Could not send. Please email Mohtashim@hr.uk.com directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="bg-gradient-to-b from-ink to-brand-deep text-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-brand-soft">Contact</p>
            <h2 className="mt-4 text-4xl md:text-6xl text-white leading-[1.05]">Start your UK journey today.</h2>
            <p className="mt-5 text-white/70 text-lg max-w-md">Send us a message and one of our advisors will get back to you within one working day.</p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 border border-white/15">
                  <Mail className="h-5 w-5 text-brand-soft" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-white/50">Email</p>
                  <a href="mailto:Mohtashim@hr.uk.com" className="text-lg text-white hover:text-brand-soft transition-colors break-all">Mohtashim@hr.uk.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 border border-white/15">
                  <Phone className="h-5 w-5 text-brand-soft" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Phone</p>
                  <a href="tel:+447472349596" className="text-lg text-white hover:text-brand-soft transition-colors">+44 7472 349596</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 border border-white/15">
                  <MapPin className="h-5 w-5 text-brand-soft" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">United Kingdom</p>
                  <p className="text-lg text-white">London · Nottingham · Birmingham · Leeds · Manchester</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-10 backdrop-blur">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" name="name" required placeholder="Your name" />
                <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
                <Field label="Phone" name="phone" placeholder="+44 …" />
                <Field label="Country" name="country" placeholder="e.g. Pakistan" />
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Course interest</label>
                <select name="course_interest" defaultValue="" className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-soft focus:bg-white/[0.1] transition-colors">
                  <option value="" className="bg-ink">Select a course…</option>
                  {courses.map((c) => <option key={c.title} value={c.title} className="bg-ink">{c.title}</option>)}
                  <option value="Other / Not sure yet" className="bg-ink">Other / Not sure yet</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Message</label>
                <textarea name="message" required rows={4} placeholder="Tell us about your goals…" className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-soft focus:bg-white/[0.1] transition-colors resize-none" />
              </div>
              <button disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink px-6 py-4 text-sm font-medium hover:bg-brand hover:text-white transition-all disabled:opacity-60">
                {loading ? "Sending…" : <>Send message <ArrowRight className="h-4 w-4" /></>}
              </button>
              <p className="mt-3 text-xs text-white/40 text-center">We respond within one working day.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">{label}{required && " *"}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-soft focus:bg-white/[0.1] transition-colors"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="hr.uk" className="h-7 w-auto" width={100} height={28} />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} hr.uk. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:Mohtashim@hr.uk.com" className="hover:text-foreground transition-colors">Mohtashim@hr.uk.com</a>
          <a href="tel:+447472349596" className="hover:text-foreground transition-colors">+44 7472 349596</a>
        </div>
      </div>
    </footer>
  );
}
