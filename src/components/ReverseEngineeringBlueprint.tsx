import React from 'react';
import {
  GitPullRequest,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { CareerRoadmapData } from '../types/career';

interface ReverseEngineeringBlueprintProps {
  roadmap: CareerRoadmapData;
  onNavigateToGraph: () => void;
}

export const ReverseEngineeringBlueprint: React.FC<ReverseEngineeringBlueprintProps> = ({
  roadmap,
  onNavigateToGraph,
}) => {
  const steps = [
    {
      num: '01',
      phase: 'DECONSTRUCT TARGET ROLE',
      title: 'Analyze Real Hiring Rubrics',
      description: `We extract non-negotiable competencies from real hiring managers at ${roadmap.profile.companyType} organizations—not course catalogs.`,
      highlight: 'Filtered: Zero buzzwords. Only verifiable production constraints.',
      icon: Search,
      color: 'text-[#00F0FF]',
      border: 'border-[#00F0FF]/30',
    },
    {
      num: '02',
      phase: 'REVERSE TRAJECTORY MAPPING',
      title: 'Map Intermediate Stepping Stones',
      description: 'We identify the 2–3 intermediate stepping stone roles (OSS contributor, seed-stage intern) that buy industry trust before the dream offer.',
      highlight: 'Solves the "Need experience to get experience" catch-22.',
      icon: GitPullRequest,
      color: 'text-violet-400',
      border: 'border-violet-500/30',
    },
    {
      num: '03',
      phase: 'GAP DISCOVERY & AUDIT',
      title: 'Audit Candidate Deficit',
      description: `Cross-examines your verified background (${roadmap.profile.startingPoint}) against the hiring standard to calculate exact percentage deficits.`,
      highlight: `Identified ${roadmap.skillGaps.length} critical competency gaps requiring resolution.`,
      icon: Filter,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
    },
    {
      num: '04',
      phase: 'PROOF-OF-WORK SYNTHESIS',
      title: 'Generate Bespoke Portfolio Spec',
      description: `Generates production-grade projects like ${roadmap.projects[0]?.title} specifically architected to prove missing skills to hiring leads.`,
      highlight: 'Substitutes 2 years of credentials with unassailable public proof.',
      icon: Layers,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
  ];

  return (
    <div className="bg-[#0A0D15] border border-forge-border rounded-2xl p-6 sm:p-8 shadow-xl text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-forge-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-mono font-bold uppercase mb-1">
            <Zap className="w-3 h-3 fill-[#00F0FF]" />
            THE CORE METHODOLOGY
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            How CareerForge Reverse-Engineers Your Trajectory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Forward career advice asks: <em>"What should I learn?"</em> CareerForge asks:{' '}
            <strong className="text-white">"What does the hiring manager look for on day one?"</strong>
          </p>
        </div>

        <button
          onClick={onNavigateToGraph}
          className="text-xs font-mono font-bold text-[#00F0FF] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View Resulting Graph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Steps Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className={`bg-[#0E111B] border ${st.border} rounded-xl p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#00F0FF] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {st.phase}
                  </span>
                  <span className={`text-xs font-mono font-black ${st.color}`}>
                    {st.num}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${st.color} shrink-0`} />
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {st.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-2 border-t border-forge-border/60">
                <span className="text-[11px] font-mono text-slate-300 block">
                  💡 {st.highlight}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
