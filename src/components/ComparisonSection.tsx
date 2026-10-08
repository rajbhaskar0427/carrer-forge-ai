import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, TrendingUp, ShieldAlert } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const comparisons = [
    {
      category: 'TECHNICAL SKILL DEPTH',
      generic: {
        title: 'Learn React & Build a Portfolio',
        items: [
          'Watch 40 hours of beginner React tutorial videos',
          'Build a basic counter, todo app, and weather widget',
          'Memorize useState and useEffect without understanding memory leaks',
          'Rely on untyped vanilla JavaScript with silent runtime bugs',
        ],
        verdict: '78% of hiring managers instantly reject portfolios with tutorial clones.',
      },
      forge: {
        title: 'Master React + TypeScript System Mechanics',
        items: [
          'Master strict discriminated union types and runtime schema validation (Zod)',
          'Implement optimistic state mutations with TanStack Query and cache rollbacks',
          'Profile 60fps rendering using TanStack Virtual under 10,000+ data rows',
          'Eliminate race conditions and memory leaks in streaming WebSockets',
        ],
        verdict: 'Demonstrates immediate day-one production readiness in real codebases.',
      },
    },
    {
      category: 'PORTFOLIO PROOF OF WORK',
      generic: {
        title: 'Generic Side Projects',
        items: [
          'Netflix clone or Spotify clone with hardcoded dummy JSON data',
          'Zero automated tests or continuous integration (CI/CD)',
          'No authentication, error boundaries, or real deployment telemetry',
          'Untested accessibility (fails WCAG compliance audits)',
        ],
        verdict: 'Recruiters spend < 15 seconds reviewing and skip to the next candidate.',
      },
      forge: {
        title: 'Production-Spec SaaS Platform (FinTrack)',
        items: [
          'Multi-currency ledger with real-time WebSocket market feeds',
          'Automated Playwright E2E and Vitest unit testing suites running in GitHub Actions',
          'Keyboard-trap accessible modal flows with WCAG 2.1 AA compliance audit',
          'Architecture whitepaper explaining latency trade-offs and database decisions',
        ],
        verdict: 'Generates 4.8x higher response rate from engineering hiring managers.',
      },
    },
    {
      category: 'REAL-WORLD STEPPING STONES',
      generic: {
        title: 'Cold Applying to 500+ Dream Jobs',
        items: [
          'Mass apply on LinkedIn with generic one-page student resume',
          'Expect to jump directly from College Student to Senior / Mid Engineer',
          'Zero intermediate credibility or proof of collaborative code review',
          'Ignore domain stepping stones (internships, open source, freelance)',
        ],
        verdict: 'Yields < 2% interview callback rate and months of burnout.',
      },
      forge: {
        title: 'Reverse-Engineered Tactical Stepping Stones',
        items: [
          'Contribute verified pull requests to active open-source component ecosystems',
          'Secure high-signal Seed / Series A internship through targeted founder reach-out',
          'Master role-specific system design frameworks (RADIO framework)',
          'Target intermediate associate roles before advancing to flagship dream position',
        ],
        verdict: 'Proven sequential career progression path grounded in verified industry data.',
      },
    },
  ];

  return (
    <section className="py-20 bg-[#08090D] border-b border-forge-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
            <TrendingUp className="w-3.5 h-3.5 text-[#00F0FF]" />
            THE CAREERFORGE DIFFERENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career advice shouldn’t stop at <br />
            <span className="text-slate-400 font-normal">“learn these skills and build a portfolio.”</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            See how CareerForge transforms superficial, overwhelming advice into a high-leverage tactical blueprint designed to satisfy real hiring rubrics.
          </p>
        </div>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {comparisons.map((item, idx) => (
            <div
              key={item.category}
              className="bg-[#0E111B] border border-forge-border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Category Header */}
              <div className="bg-[#121624] px-5 py-3 border-b border-forge-border flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded">
                  0{idx + 1} / 03
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Generic Advice Box */}
                <div className="bg-red-950/15 border border-red-500/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                      Generic Advice
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 line-through opacity-80">
                    {item.generic.title}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {item.generic.items.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-red-300/80 font-mono pt-2 border-t border-red-500/20 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.generic.verdict}</span>
                  </div>
                </div>

                {/* CareerForge Reverse-Engineered Box */}
                <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/30 rounded-xl p-4 space-y-3 shadow-lg shadow-[#00F0FF]/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00F0FF] shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] font-mono">
                      CareerForge Intelligence
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {item.forge.title}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {item.forge.items.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-[#00F0FF] font-mono pt-2 border-t border-[#00F0FF]/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.forge.verdict}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
