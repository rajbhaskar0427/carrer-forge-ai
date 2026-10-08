import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  Layers,
  ChevronRight,
  GitBranch,
  ShieldCheck,
  Zap,
  Filter,
  Eye,
  ListOrdered,
  ArrowDown,
  ArrowUp,
  Cpu,
  Star
} from 'lucide-react';
import { CareerRoadmapData, Milestone, Phase } from '../types/career';
import { RecruiterAuditSimulation } from './RecruiterAuditSimulation';

interface RoadmapGraphProps {
  roadmap: CareerRoadmapData;
  onSelectMilestone: (milestone: Milestone) => void;
  onToggleMilestoneStatus: (id: string) => void;
  onSimulateResolveGaps?: () => void;
}

export const RoadmapGraph: React.FC<RoadmapGraphProps> = ({
  roadmap,
  onSelectMilestone,
  onToggleMilestoneStatus,
  onSimulateResolveGaps,
}) => {
  const [viewMode, setViewMode] = useState<'graph' | 'phases'>('graph');
  const [filterTrack, setFilterTrack] = useState<'all' | 'core' | 'technical' | 'experience'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const filteredMilestones = roadmap.milestones.filter((m) => {
    if (filterTrack === 'all') return true;
    return m.branch === filterTrack;
  });

  // Group milestones into tracks for the visual branching DAG tree
  const coreMilestones = roadmap.milestones.filter((m) => m.branch === 'core');
  const techMilestones = roadmap.milestones.filter((m) => m.branch === 'technical');
  const expMilestones = roadmap.milestones.filter((m) => m.branch === 'experience');

  const getStatusNodeStyles = (status: Milestone['status'], isHovered: boolean) => {
    switch (status) {
      case 'completed':
        return {
          cardBg: 'bg-[#0E1726] border-emerald-500/40 hover:border-emerald-400',
          dotBg: 'bg-emerald-500 text-slate-950',
          badge: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
          glow: isHovered ? 'ring-2 ring-emerald-400 shadow-xl shadow-emerald-500/20' : 'shadow-md shadow-emerald-500/10',
        };
      case 'in-progress':
        return {
          cardBg: 'bg-[#151722] border-amber-500/50 hover:border-amber-400',
          dotBg: 'bg-amber-500 text-slate-950',
          badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse',
          glow: isHovered ? 'ring-2 ring-amber-400 shadow-xl shadow-amber-500/20' : 'shadow-md shadow-amber-500/15 ring-1 ring-amber-500/30',
        };
      case 'recommended':
        return {
          cardBg: 'bg-[#0F1626] border-[#00F0FF]/60 hover:border-[#00F0FF]',
          dotBg: 'bg-[#00F0FF] text-slate-950',
          badge: 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40',
          glow: isHovered ? 'ring-2 ring-[#00F0FF] shadow-2xl shadow-[#00F0FF]/30' : 'shadow-xl shadow-[#00F0FF]/20 ring-1 ring-[#00F0FF]/40',
        };
      case 'locked':
      default:
        return {
          cardBg: 'bg-[#0C0E17] border-forge-border opacity-75 hover:opacity-100 hover:border-slate-700',
          dotBg: 'bg-slate-800 text-slate-400',
          badge: 'bg-slate-800 text-slate-400',
          glow: isHovered ? 'ring-1 ring-slate-600' : '',
        };
    }
  };

  const renderMilestoneCard = (m: Milestone) => {
    const isHovered = hoveredNodeId === m.id;
    const styles = getStatusNodeStyles(m.status, isHovered);

    return (
      <div
        key={m.id}
        onMouseEnter={() => setHoveredNodeId(m.id)}
        onMouseLeave={() => setHoveredNodeId(null)}
        onClick={() => onSelectMilestone(m)}
        className={`${styles.cardBg} ${styles.glow} border rounded-2xl p-4 sm:p-5 transition-all transform hover:-translate-y-1 cursor-pointer text-left relative overflow-hidden group`}
      >
        {/* Top Pill Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {m.phaseName}
          </span>
          
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${styles.badge}`}>
              {m.status}
            </span>

            {/* SECTION 7: "WHY?" BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectMilestone(m);
              }}
              className="bg-[#00F0FF]/15 hover:bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-colors"
              title="Open reverse-engineered rationale"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Why?</span>
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h4 className="text-sm font-bold text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
          {m.title}
        </h4>
        {m.subtitle && (
          <p className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
            {m.subtitle}
          </p>
        )}

        {/* Rationale Snippet */}
        <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
          {m.whyThisMatters}
        </p>

        {/* Bottom Info Bar */}
        <div className="mt-3.5 pt-2.5 border-t border-forge-border/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3 text-[#00F0FF]" />
            {m.estimatedWeeks}
          </span>

          <span className="text-[10px] font-mono text-[#818CF8] bg-[#818CF8]/10 px-1.5 py-0.5 rounded uppercase">
            {m.branch}
          </span>

          <span className="text-slate-400 group-hover:text-[#00F0FF] transition-colors flex items-center gap-0.5 font-semibold text-xs">
            Inspect <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      
      {/* 1. THE HACKATHON WOW MOMENT: Recruiter Screening Simulator */}
      <RecruiterAuditSimulation
        roadmap={roadmap}
        onSimulateResolve={onSimulateResolveGaps || (() => {})}
      />

      {/* 2. Graph Controls & View Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0E111B] border border-forge-border p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="flex bg-[#08090D] border border-forge-border p-1 rounded-xl">
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'graph'
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Branching Skill Tree</span>
            </button>
            <button
              onClick={() => setViewMode('phases')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'phases'
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Structured Phases</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Total Milestones: {roadmap.milestones.length}
          </span>
        </div>

        {/* Track Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase hidden sm:inline mr-1">
            Filter Track:
          </span>
          {(['all', 'core', 'technical', 'experience'] as const).map((track) => (
            <button
              key={track}
              onClick={() => setFilterTrack(track)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-colors ${
                filterTrack === track
                  ? 'bg-[#192033] text-white font-bold border border-forge-border'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------- */}
      {/* 3. VISUAL CAREER GRAPH / SKILL TREE VIEW (BRANCHING)     */}
      {/* -------------------------------------------------------- */}
      {viewMode === 'graph' && (
        <div className="relative bg-[#080A10] border border-forge-border rounded-2xl p-4 sm:p-8 overflow-hidden min-h-[700px]">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* TOP: TARGET DESTINATION NODE */}
          <div className="relative z-10 max-w-lg mx-auto mb-10 text-center">
            <div className="bg-gradient-to-b from-[#131826] to-[#0E111B] border-2 border-[#00F0FF] rounded-2xl p-5 shadow-2xl shadow-[#00F0FF]/15 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[10px] font-mono font-bold text-[#00F0FF] mb-2 uppercase">
                <Zap className="w-3 h-3 fill-[#00F0FF]" />
                REVERSE-ENGINEERED TARGET ROLE
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {roadmap.profile.dreamRole}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Organization Profile: {roadmap.profile.companyType}
              </p>
            </div>

            {/* Downward Branching Line Indicator */}
            <div className="flex justify-center my-3">
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#00F0FF] to-slate-700" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2">
              <span>← Technical Depth Track</span>
              <span>•</span>
              <span>Collaborative Track →</span>
            </div>
          </div>

          {/* 3-COLUMN BRANCHING TREE (Desktop) */}
          <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* Desktop Branch Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Technical Depth Track */}
              <div className="space-y-4">
                <div className="bg-[#121624] border border-forge-border px-3 py-2 rounded-xl flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-mono uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    Technical Depth Track
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {techMilestones.length} Steps
                  </span>
                </div>

                {techMilestones.map((m) => renderMilestoneCard(m))}
              </div>

              {/* Center Column: Core Architecture Spine */}
              <div className="space-y-4">
                <div className="bg-[#121624] border border-forge-border px-3 py-2 rounded-xl flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] font-mono uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                    Core Architecture Spine
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {coreMilestones.length} Steps
                  </span>
                </div>

                {coreMilestones.map((m) => renderMilestoneCard(m))}
              </div>

              {/* Right Column: Collaborative Experience Track */}
              <div className="space-y-4">
                <div className="bg-[#121624] border border-forge-border px-3 py-2 rounded-xl flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-violet-400 font-mono uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                    Real-World Experience Track
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {expMilestones.length} Steps
                  </span>
                </div>

                {expMilestones.map((m) => renderMilestoneCard(m))}
              </div>

            </div>

            {/* Upward Merging Line to Current Baseline */}
            <div className="flex justify-center mt-10 mb-3">
              <div className="w-0.5 h-8 bg-gradient-to-t from-emerald-500 to-slate-700" />
            </div>

            {/* BOTTOM: CURRENT STARTING BASELINE */}
            <div className="max-w-md mx-auto text-center bg-[#0E111B] border border-emerald-500/40 rounded-2xl p-4 shadow-xl">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1 font-bold">
                ✓ VERIFIED CANDIDATE STARTING POINT
              </span>
              <div className="text-base font-bold text-white flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{roadmap.profile.startingPoint}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                Calibrated to {roadmap.profile.weeklyHours} hours/week commitment
              </p>
            </div>

          </div>

        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* 4. STRUCTURED PHASES VIEW                                */}
      {/* -------------------------------------------------------- */}
      {viewMode === 'phases' && (
        <div className="space-y-6">
          {roadmap.phases.map((phase) => {
            const phaseMilestones = roadmap.milestones.filter((m) =>
              phase.milestoneIds.includes(m.id)
            );
            const completedCount = phaseMilestones.filter((m) => m.status === 'completed').length;
            const progress = phaseMilestones.length > 0
              ? Math.round((completedCount / phaseMilestones.length) * 100)
              : 0;

            return (
              <div
                key={phase.id}
                className="bg-[#0E111B] border border-forge-border rounded-2xl overflow-hidden shadow-xl text-left"
              >
                {/* Phase Header */}
                <div className="p-5 sm:p-6 bg-[#121624] border-b border-forge-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-full">
                        {phase.number}
                      </span>
                      <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400">{phase.description}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Duration
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        {phase.durationWeeks}
                      </span>
                    </div>

                    <div className="w-32">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-emerald-400">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#08090D] rounded-full overflow-hidden border border-forge-border">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-[#00F0FF] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase Unlock Condition */}
                <div className="px-6 py-2.5 bg-[#0A0D15] border-b border-forge-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-[#00F0FF]" />
                  <span>Unlock Condition:</span>
                  <span className="text-slate-300">{phase.unlockCondition}</span>
                </div>

                {/* Phase Milestones Grid */}
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phaseMilestones.map((m) => renderMilestoneCard(m))}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
