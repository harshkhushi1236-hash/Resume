import React, { useState } from 'react';
import {
  Cpu,
  Shield,
  BookOpen,
  Mail,
  ChevronRight,
  ArrowLeft,
  Sliders,
  Award,
  Wrench,
  ExternalLink,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';
import RoboticCanvas from './components/RoboticCanvas';
import {
  PROFILE,
  PROJECTS,
  EXPERIENCE_TIMELINE,
  CREDENTIALS,
  SKILL_GROUPS
} from './data/portfolioData';

export default function App() {
  // 'hero' (100vh God-of-War front screen) | 'armory' (Projects & 3D inspection) | 'codex' (Experience, GATE AIR 1110 & Contact)
  const [activeView, setActiveView] = useState('hero');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [flexAngle, setFlexAngle] = useState(0.32);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  const currentProject = PROJECTS[selectedProjectIndex];

  const handleEnterArmory = (projectIdx = 0) => {
    setSelectedProjectIndex(projectIdx);
    setActiveView('armory');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07090d] text-slate-100 overflow-x-hidden">
      {/* Persistent Hardware-Accelerated 3D WebGL Viewport */}
      <RoboticCanvas
        mode={activeView === 'hero' ? 'hero' : 'armory'}
        activeModel={activeView === 'armory' ? currentProject.modelType : 'finger'}
        flexAngle={flexAngle}
        onHoverChange={setIsCenterHovered}
        onSelectCenterpiece={() => handleEnterArmory(0)}
      />

      {/* Atmospheric Vignette Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            'radial-gradient(circle at 62% 48%, transparent 25%, rgba(7, 9, 13, 0.78) 85%, rgba(4, 6, 9, 0.96) 100%)'
        }}
      />

      {/* =====================================================================
          VIEW 1: FRONT HERO SCREEN ("THE FORGE" — GOD OF WAR STYLE MENU)
         ===================================================================== */}
      {activeView === 'hero' && (
        <main className="relative z-20 flex min-h-screen w-full flex-col justify-between px-6 py-8 md:px-14 md:py-12 pointer-events-none">
          {/* Top Header Bar */}
          <header className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-amber-500 shadow-[0_0_12px_#f59e0b]" />
              <span className="font-tech text-xs md:text-sm font-semibold tracking-[0.28em] text-amber-400/90 uppercase">
                {PROFILE.badge}
              </span>
            </div>

            <button
              onClick={() => setActiveView('codex')}
              className="font-tech text-xs tracking-[0.22em] uppercase px-4 py-2 rounded border border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-amber-500/60 hover:text-amber-300 transition"
            >
              Dossier & Contact
            </button>
          </header>

          {/* Left Diegetic Title & Menu Stack */}
          <div className="my-auto max-w-xl pointer-events-auto">
            <p className="font-tech text-sm md:text-base font-semibold tracking-[0.32em] text-cyan-400 uppercase mb-2">
              {PROFILE.title}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]">
              {PROFILE.name}
            </h1>
            <div className="mt-3 h-[2px] w-44 bg-gradient-to-r from-amber-500 via-amber-400/60 to-transparent" />

            <p className="mt-5 text-sm md:text-base text-slate-300/90 leading-relaxed max-w-md">
              Mechanical design, prosthetic robotics, and industrial production engineering.
              Hover or click the <span className="text-cyan-400 font-medium">3D Robotic Finger</span> to actuate tendons and enter the build armory.
            </p>

            {/* God-of-War Inspired Vertical Command List */}
            <nav className="mt-9 flex flex-col space-y-3 max-w-sm" aria-label="Main Forge Navigation">
              <button
                onClick={() => handleEnterArmory(0)}
                className="group relative flex items-center justify-between px-5 py-3.5 text-left transition-all duration-300 rounded-r border-l-2 border-amber-500 bg-gradient-to-r from-amber-500/15 via-slate-900/60 to-transparent hover:from-amber-500/25 hover:pl-7"
              >
                <div>
                  <span className="block font-display text-lg font-bold tracking-[0.16em] text-amber-300 group-hover:text-white">
                    ENTER THE ARMORY
                  </span>
                  <span className="block font-tech text-xs tracking-[0.18em] text-slate-400 uppercase">
                    4 Interactive 3D Engineering Builds
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 transition-transform group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={() => setActiveView('codex')}
                className="group flex items-center justify-between px-5 py-3 text-left transition-all duration-300 rounded-r border-l-2 border-slate-700 bg-slate-900/40 hover:border-cyan-400 hover:bg-slate-900/75 hover:pl-7"
              >
                <div>
                  <span className="block font-display text-base font-bold tracking-[0.16em] text-slate-200 group-hover:text-cyan-300">
                    SERVICE RECORD & CODEX
                  </span>
                  <span className="block font-tech text-xs tracking-[0.18em] text-slate-400 uppercase">
                    Railway Ops • KNIT Sultanpur • GATE AIR 1110
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={() => handleEnterArmory(1)}
                className="group flex items-center justify-between px-5 py-3 text-left transition-all duration-300 rounded-r border-l-2 border-slate-700 bg-slate-900/40 hover:border-amber-400 hover:bg-slate-900/75 hover:pl-7"
              >
                <div>
                  <span className="block font-display text-base font-bold tracking-[0.16em] text-slate-200 group-hover:text-amber-300">
                    AUTOMOTIVE & ENERGY LAB
                  </span>
                  <span className="block font-tech text-xs tracking-[0.18em] text-slate-400 uppercase">
                    Go-Kart Chassis & Water Fuel Cell
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1.5" />
              </button>
            </nav>
          </div>

          {/* Bottom Interactive Telemetry Prompt */}
          <footer className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 bg-slate-950/75 backdrop-blur-md">
              <span
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  isCenterHovered
                    ? 'bg-cyan-400 shadow-[0_0_12px_#06b6d4] scale-125'
                    : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span className="font-tech text-xs tracking-[0.2em] uppercase text-slate-300">
                {isCenterHovered
                  ? 'ACTUATOR ENGAGED — CLICK FINGER TO INSPECT PROTOTYPE'
                  : 'HOVER OVER 3D ROBOTIC FINGER TO TEST TENDON GRIP'}
              </span>
            </div>

            <div className="font-tech text-xs tracking-[0.2em] text-slate-400 uppercase">
              KNIT SULTANPUR • B.TECH MECHANICAL ENGINEERING
            </div>
          </footer>
        </main>
      )}

      {/* =====================================================================
          VIEW 2: THE ARMORY (INTERACTIVE 3D PROJECT SHOWCASE)
         ===================================================================== */}
      {activeView === 'armory' && (
        <section className="relative z-20 flex min-h-screen w-full flex-col justify-between px-6 py-7 md:px-12 md:py-10 pointer-events-none">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
            <button
              onClick={() => setActiveView('hero')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded border border-amber-500/40 bg-slate-950/80 text-amber-300 hover:bg-amber-500/15 font-tech text-sm tracking-[0.2em] uppercase transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Forge
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('codex')}
                className="px-4 py-2 rounded border border-slate-700 bg-slate-950/80 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 font-tech text-xs tracking-[0.2em] uppercase transition"
              >
                Service Record & Credentials
              </button>
            </div>
          </div>

          {/* Main Split HUD: Left Artifact Selector, Right Engineering Lore Panel */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-6">
            {/* Left Column: Artifact Selector Pedestal List */}
            <div className="lg:col-span-4 space-y-3 pointer-events-auto">
              <div className="mb-3">
                <p className="font-tech text-xs tracking-[0.28em] text-amber-400 uppercase">
                  ENGINEERING ARMORY
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wider text-white">
                  SELECT ARTIFACT
                </h2>
              </div>

              {PROJECTS.map((proj, idx) => {
                const active = idx === selectedProjectIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectIndex(idx)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
                      active
                        ? 'forge-panel border-amber-500/70 translate-x-1.5'
                        : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-tech text-xs tracking-[0.2em] text-cyan-400 uppercase">
                        {proj.code}
                      </span>
                      <span className="font-tech text-xs text-slate-400">{proj.period}</span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-bold text-white mt-1">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{proj.role}</p>
                  </button>
                );
              })}

              {/* Interactive Tendon Flexion Control when Robotic Finger is Active */}
              {currentProject.modelType === 'finger' && (
                <div className="forge-panel p-4 rounded-lg mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 font-tech text-xs tracking-[0.2em] text-cyan-300 uppercase">
                      <Sliders className="w-3.5 h-3.5" />
                      Tendon Joint Flexion (DIP / PIP)
                    </span>
                    <span className="font-tech text-xs font-bold text-amber-400">
                      {Math.round(flexAngle * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.05"
                    step="0.01"
                    value={flexAngle}
                    onChange={(e) => setFlexAngle(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Center Spacer so 3D Model remains unobstructed */}
            <div className="hidden lg:block lg:col-span-3" />

            {/* Right Column: Detailed Technical Spec Sheet */}
            <div className="lg:col-span-5 forge-panel rune-border rounded-xl p-6 md:p-7 pointer-events-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-tech text-xs tracking-[0.24em] text-amber-400 uppercase">
                    {currentProject.org} • {currentProject.period}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {currentProject.name}
                  </h3>
                </div>
              </div>

              {/* 3-Metric Telemetry Grid */}
              <div className="grid grid-cols-3 gap-3 my-5">
                {currentProject.stats.map((st) => (
                  <div
                    key={st.label}
                    className="rounded-lg bg-slate-950/80 border border-slate-800/90 p-3"
                  >
                    <span className="block font-tech text-[11px] tracking-[0.18em] text-slate-400 uppercase">
                      {st.label}
                    </span>
                    <span className="block font-tech text-sm font-bold text-cyan-300 mt-1">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Engineering Execution Bullets */}
              <div className="space-y-3">
                <h4 className="font-tech text-xs tracking-[0.22em] text-amber-400 uppercase">
                  Engineering Execution & Findings
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300 leading-relaxed">
                  {currentProject.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-amber-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Tags */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-tech tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center font-tech text-xs tracking-[0.22em] text-slate-500 uppercase">
            REAL-TIME WEBGL RENDER • ROTATING INSPECTION PEDESTAL
          </div>
        </section>
      )}

      {/* =====================================================================
          VIEW 3: SERVICE RECORD, CODEX & CONTACT
         ===================================================================== */}
      {activeView === 'codex' && (
        <section className="relative z-20 min-h-screen w-full bg-[#07090d]/90 backdrop-blur-md px-6 py-8 md:px-14 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <button
                onClick={() => setActiveView('hero')}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded border border-amber-500/40 bg-slate-900/90 text-amber-300 hover:bg-amber-500/15 font-tech text-sm tracking-[0.2em] uppercase transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Forge
              </button>

              <button
                onClick={() => handleEnterArmory(0)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 font-tech text-sm tracking-[0.2em] uppercase transition"
              >
                <Cpu className="w-4 h-4" />
                Open 3D Armory
              </button>
            </div>

            {/* Profile Summary Banner */}
            <div className="mt-8 forge-panel rune-border rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 font-tech text-xs tracking-[0.26em] text-amber-400 uppercase">
                    <Sparkles className="w-4 h-4" />
                    {PROFILE.badge}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-black text-white mt-1">
                    {PROFILE.name}
                  </h2>
                  <p className="mt-3 text-slate-300 max-w-3xl leading-relaxed text-sm md:text-base">
                    {PROFILE.summary}
                  </p>
                </div>

                {/* Direct Contact Card */}
                <div className="shrink-0 space-y-2.5 bg-slate-950/90 p-5 rounded-lg border border-slate-800 text-sm">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="flex items-center gap-2.5 text-slate-200 hover:text-amber-400 transition"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    {PROFILE.email}
                  </a>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="flex items-center gap-2.5 text-slate-200 hover:text-cyan-400 transition"
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    {PROFILE.phone}
                  </a>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {PROFILE.location}
                  </div>
                  <div className="pt-2 flex gap-3">
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-tech tracking-widest uppercase text-cyan-400 hover:underline"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-tech tracking-widest uppercase text-amber-400 hover:underline"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Service Timeline & Credentials */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Timeline */}
              <div className="forge-panel rounded-xl p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-xl font-bold tracking-wider text-white">
                    SERVICE RECORD
                  </h3>
                </div>
                <div className="space-y-5 border-l-2 border-slate-800 pl-5 ml-2">
                  {EXPERIENCE_TIMELINE.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[27px] top-1.5 h-3 w-3 rotate-45 bg-amber-500" />
                      <span className="font-tech text-xs tracking-[0.2em] text-cyan-400 uppercase">
                        {exp.period}
                      </span>
                      <h4 className="font-display text-base font-bold text-white mt-0.5">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-medium text-amber-300/90">{exp.org}</p>
                      <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{exp.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="forge-panel rounded-xl p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-xl font-bold tracking-wider text-white">
                    CREDENTIALS & HONORS
                  </h3>
                </div>
                <div className="space-y-3.5">
                  {CREDENTIALS.map((cred, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        cred.highlight
                          ? 'bg-amber-500/10 border-amber-500/50'
                          : 'bg-slate-950/75 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-sm md:text-base font-bold text-white">
                          {cred.title}
                        </h4>
                        <span className="font-tech text-xs text-amber-400 shrink-0">
                          {cred.year}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{cred.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Skill Matrix */}
            <div className="mt-8 forge-panel rounded-xl p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-xl font-bold tracking-wider text-white">
                  TECHNICAL ARSENAL
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SKILL_GROUPS.map((grp) => (
                  <div
                    key={grp.category}
                    className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-4"
                  >
                    <h4 className="font-tech text-xs tracking-[0.2em] text-cyan-400 uppercase mb-3">
                      {grp.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {grp.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs rounded bg-slate-900 text-slate-200 border border-slate-700/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
