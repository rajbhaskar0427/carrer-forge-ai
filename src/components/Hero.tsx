import React from 'react';
import { Sparkles, ArrowRight, Compass, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onBuildRoadmap: () => void;
  onExploreDemo: () => void;
  onSelectPrompt: (role: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBuildRoadmap,
  onExploreDemo,
  onSelectPrompt,
}) => {
  const animatedNodes = [
    { title: 'Dream Role', subtitle: 'Frontend Engineer @ Fintech', status: 'target', glow: 'text-[#00F0FF]' },
    { title: 'Technical Depth', subtitle: 'Strict TypeScript & WebSockets', status: 'tech', glow: 'text-[#38BDF8]' },
    { title: 'Production Proof', subtitle: 'FinTrack SaaS Platform (Recharts + Auth)', status: 'project', glow: 'text-[#818CF8]' },
    { title: 'Real-World Proof', subtitle: 'Merged Open Source Pull Request', status: 'oss', glow: 'text-[#A78BFA]' },
    { title: 'Stepping Stone', subtitle: 'Frontend Engineering Intern', status: 'intern', glow: 'text-[#34D399]' },
    { title: 'Current Starting Point', subtitle: 'College Student (HTML/CSS/JS)', status: 'start', glow: 'text-slate-400' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-forge-border">
      {/* Background glow & subtle grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/25 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#00F0FF] font-mono">
                AI-POWERED CAREER INTELLIGENCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Don’t guess your career.{' '}
              <span className="text-gradient-cyan block mt-1">
                Reverse-engineer it.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              CareerForge transforms your exact dream role into an interactive roadmap of skills, production projects, micro-credentials, real-world experience, and realistic stepping stones.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBuildRoadmap}
                className="group flex items-center gap-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-[#00F0FF]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Build My Roadmap</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreDemo}
                className="flex items-center gap-2 bg-[#0E111B] hover:bg-[#192033] text-slate-200 border border-forge-border hover:border-slate-600 font-semibold px-5 py-3.5 rounded-xl text-sm transition-all"
              >
                <Compass className="w-4 h-4 text-[#00F0FF]" />
                <span>Explore Example Roadmap</span>
              </button>
            </div>

            {/* Quick Presets Pills */}
            <div className="pt-4">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2.5">
                Popular target roles to reverse-engineer:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectPrompt('Frontend Engineer at a product-based fintech startup')}
                  className="text-xs bg-[#0E111B] hover:bg-[#151B2E] border border-forge-border hover:border-[#00F0FF]/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span className="text-[#00F0FF]">⚡</span> Frontend Engineer @ Fintech Startup
                </button>
                <button
                  onClick={() => onSelectPrompt('AI/ML Engineer at a research-focused company')}
                  className="text-xs bg-[#0E111B] hover:bg-[#151B2E] border border-forge-border hover:border-[#818CF8]/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span className="text-[#818CF8]">🧠</span> AI/ML Engineer @ Research Lab
                </button>
                <button
                  onClick={() => onSelectPrompt('UI/UX Designer at a top SaaS company')}
                  className="text-xs bg-[#0E111B] hover:bg-[#151B2E] border border-forge-border hover:border-[#EC4899]/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span className="text-[#EC4899]">🎨</span> UI/UX Designer @ SaaS Firm
                </button>
              </div>
            </div>

            {/* Key Differentiator Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-forge-border/60">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">1,400+</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Career Paths Analyzed</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#00F0FF]">4.8x</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Placement Velocity</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#10B981]">100%</div>
                <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">Recruiter Signal Tested</div>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Miniature Roadmap Visualization */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[#0E111B]/95 border border-forge-border rounded-2xl p-6 shadow-2xl relative backdrop-blur-xl">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-forge-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-300">
                    Live Career Graph Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  28% Readiness
                </span>
              </div>

              {/* Animated Tree Stack */}
              <div className="relative space-y-3 py-1">
                {/* Glowing vertical line connecting nodes */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#818CF8] to-slate-700 opacity-60" />

                {animatedNodes.map((node, index) => (
                  <motion.div
                    key={node.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 }}
                    className="relative flex items-center gap-3 bg-[#131826]/80 hover:bg-[#192033] border border-forge-border hover:border-[#00F0FF]/40 rounded-xl p-3 transition-all cursor-pointer group"
                  >
                    {/* Circle Node on Timeline */}
                    <div className="w-6 h-6 rounded-full bg-[#08090D] border-2 border-[#00F0FF] flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                      {index === 0 ? (
                        <Zap className="w-3 h-3 text-[#00F0FF] fill-[#00F0FF]" />
                      ) : index >= 4 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#00F0FF]/80" />
                      )}
                    </div>

                    {/* Node Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          {node.title}
                        </span>
                        {index === 0 && (
                          <span className="text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] font-mono px-1.5 py-0.5 rounded">
                            DESTINATION
                          </span>
                        )}
                        {index === 1 && (
                          <span className="text-[10px] bg-amber-500/15 text-amber-300 font-mono px-1.5 py-0.5 rounded">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-white truncate group-hover:text-[#00F0FF] transition-colors">
                        {node.subtitle}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Insight Pill */}
              <div className="mt-4 pt-3 border-t border-forge-border flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
                  Recruiter-Validated Logic
                </span>
                <span className="text-[11px] font-mono text-[#00F0FF] underline cursor-pointer" onClick={onExploreDemo}>
                  Expand Full Graph →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
