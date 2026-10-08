import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  FolderGit2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Milestone, RecruiterSignal } from '../types/career';

interface RoadmapNodeDetailModalProps {
  milestone: Milestone | null;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
  onOpenSkillSprint?: (skillName: string) => void;
}

export const RoadmapNodeDetailModal: React.FC<RoadmapNodeDetailModalProps> = ({
  milestone,
  onClose,
  onToggleComplete,
  onOpenSkillSprint,
}) => {
  if (!milestone) return null;

  const isCompleted = milestone.status === 'completed';

  const handleToggle = () => {
    if (!isCompleted) {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#38BDF8', '#818CF8', '#10B981'],
      });
    }
    onToggleComplete(milestone.id);
  };

  const getSignalBadge = (sig: RecruiterSignal) => {
    switch (sig) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            CRITICAL SIGNAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
            <Zap className="w-3.5 h-3.5 fill-[#00F0FF]" />
            HIGH SIGNAL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            MEDIUM SIGNAL
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E111B] border border-forge-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-left">
        
        {/* Top Header */}
        <div className="p-6 border-b border-forge-border bg-[#121624] flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded-full">
                {milestone.phaseName}
              </span>
              {getSignalBadge(milestone.recruiterSignal)}
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                {milestone.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {milestone.title}
            </h2>
            {milestone.subtitle && (
              <p className="text-xs font-mono text-[#00F0FF]">
                {milestone.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* SECTION 7 DIFFERENTIATOR: "WHY THIS MATTERS" */}
          <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/40 rounded-xl p-4 sm:p-5 shadow-lg shadow-[#00F0FF]/5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#00F0FF]">
                WHY THIS STEP MATTERS (REVERSE-ENGINEERED RATIONALE)
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {milestone.whyThisMatters}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#131826] border border-forge-border rounded-xl p-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Estimated Time
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                {milestone.estimatedWeeks}
              </div>
            </div>

            <div className="bg-[#131826] border border-forge-border rounded-xl p-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Recruiter Signal
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {milestone.recruiterSignal} Priority
              </div>
            </div>

            <div className="bg-[#131826] border border-forge-border rounded-xl p-3 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Branch Track
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase font-mono">
                <Layers className="w-3.5 h-3.5 text-[#818CF8]" />
                {milestone.branch}
              </div>
            </div>
          </div>

          {/* Skills Demonstrated */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Skills Demonstrated:
            </span>
            <div className="flex flex-wrap gap-2">
              {milestone.skillsDemonstrated.map((sk) => (
                <span
                  key={sk}
                  className="bg-[#131826] border border-forge-border hover:border-[#00F0FF]/40 text-slate-200 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Project Challenge */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Suggested Concrete Project / Challenge:
            </span>
            <div className="bg-[#131826] border border-forge-border rounded-xl p-4 text-xs text-slate-200 flex items-start gap-3">
              <FolderGit2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white mb-1">{milestone.suggestedProject}</p>
                <p className="text-[11px] text-slate-400">
                  Build this isolated challenge before combining into your flagship application.
                </p>
              </div>
            </div>
          </div>

          {/* Evidence of Completion Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Verifiable Evidence of Completion:
            </span>
            <div className="bg-[#131826] border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">Proof Criteria:</span>
                <span>{milestone.evidenceOfCompletion}</span>
              </div>
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              High-Signal Recommended Resources:
            </span>
            <div className="space-y-2">
              {milestone.recommendedResources.map((res) => (
                <div
                  key={res.name}
                  className="bg-[#131826] border border-forge-border hover:border-slate-600 rounded-xl p-3 text-xs flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">{res.name}</div>
                      <div className="text-[11px] text-slate-400">{res.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 uppercase shrink-0">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-forge-border bg-[#121624] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <span
              className={`text-xs font-bold uppercase px-2 py-0.5 rounded font-mono ${
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : milestone.status === 'in-progress'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {milestone.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isCompleted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Mark as In Progress' : 'Mark as Complete (Verify)'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#131826] hover:bg-slate-800 text-slate-300 border border-forge-border transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
