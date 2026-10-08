import React, { useState } from 'react';
import {
  Briefcase,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Key,
  Award,
  AlertTriangle,
  Zap,
  Clock
} from 'lucide-react';
import { CareerRoadmapData, CareerSteppingStone } from '../types/career';

interface CareerSteppingStonesProps {
  roadmap: CareerRoadmapData;
}

export const CareerSteppingStones: React.FC<CareerSteppingStonesProps> = ({ roadmap }) => {
  const [selectedStep, setSelectedStep] = useState<CareerSteppingStone>(
    roadmap.steppingStones[1] || roadmap.steppingStones[0]
  );

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-[#0E111B] border border-forge-border p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
              THE REALISTIC TRAJECTORY
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Career Stepping Stones</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Students fail when expecting an overnight leap from classroom to dream role.
            CareerForge maps the realistic intermediate milestones that buy trust and build industry pedigree.
          </p>
        </div>

        <div className="bg-[#131826] border border-forge-border px-4 py-3 rounded-xl text-xs font-mono text-slate-300 shrink-0">
          <span className="text-slate-500 block text-[10px] uppercase">Trajectory Span:</span>
          <strong className="text-white">{roadmap.steppingStones.length} Sequential Milestones</strong>
        </div>
      </div>

      {/* THE STUDENT TRAP VS STEPPING STONE COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>The Infinite Student Trap (0.8% Placement Rate)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            College Student applies directly to 500+ senior/mid postings with a one-page resume and tutorial clones. Hiring managers filter them out in 5 seconds because they lack proof of collaborative code review.
          </p>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <Zap className="w-4 h-4 shrink-0" />
            <span>The CareerForge Trajectory (4.8x Velocity)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            By landing 1 verified open-source PR and an intermediate startup internship, you prove asynchronous Git communication and team velocity—bypassing 95% of entry-level gatekeeping.
          </p>
        </div>
      </div>

      {/* Horizontal Interactive Timeline */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 shadow-xl overflow-x-auto">
        <span className="text-[11px] font-mono uppercase text-slate-400 block mb-6">
          Sequential Progression Timeline (Click to inspect stepping stone):
        </span>

        <div className="flex items-center min-w-[750px] justify-between relative pb-4">
          
          {/* Connector Line behind nodes */}
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-gradient-to-r from-slate-700 via-[#00F0FF] to-emerald-500 opacity-60 z-0" />

          {roadmap.steppingStones.map((stone, idx) => {
            const isSelected = selectedStep.id === stone.id;
            const isTarget = stone.isTargetRole;
            const isCurrent = stone.isCurrent;

            return (
              <div
                key={stone.id}
                onClick={() => setSelectedStep(stone)}
                className="relative z-10 flex flex-col items-center cursor-pointer group px-2"
                style={{ width: `${100 / roadmap.steppingStones.length}%` }}
              >
                {/* Step Circle Indicator */}
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#00F0FF] border-white text-slate-950 scale-110 shadow-lg shadow-[#00F0FF]/30'
                      : isTarget
                      ? 'bg-[#121624] border-emerald-400 text-emerald-300 group-hover:border-emerald-300'
                      : isCurrent
                      ? 'bg-[#121624] border-slate-500 text-slate-300'
                      : 'bg-[#0E111B] border-forge-border text-slate-400 group-hover:border-[#00F0FF]'
                  }`}
                >
                  {isTarget ? '🎯' : `0${stone.order}`}
                </div>

                {/* Role Pill Label */}
                <div className="text-center mt-3 max-w-[130px]">
                  <span
                    className={`text-xs font-semibold block leading-tight transition-colors ${
                      isSelected
                        ? 'text-[#00F0FF]'
                        : isTarget
                        ? 'text-emerald-400'
                        : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {stone.role}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5 truncate">
                    {stone.companyProfile}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stepping Stone Deep Dive Inspection Card */}
      {selectedStep && (
        <div className="bg-[#0E111B] border-2 border-[#00F0FF]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forge-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 px-2.5 py-0.5 rounded-full font-bold">
                  STEPPING STONE {selectedStep.order} OF {roadmap.steppingStones.length}
                </span>
                {selectedStep.isTargetRole && (
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    DREAM ROLE DESTINATION
                  </span>
                )}
                {selectedStep.isCurrent && (
                  <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                    CURRENT BASELINE
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-white">{selectedStep.role}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedStep.companyProfile}</p>
            </div>

            <div className="bg-[#131826] border border-forge-border p-3 rounded-xl flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Typical Compensation</span>
                <span className="text-sm font-bold text-white font-mono">{selectedStep.typicalCompensation}</span>
              </div>
            </div>
          </div>

          {/* Deep Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Typical Skills Required */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Typical Skills Expected at this Stage:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStep.typicalSkills.map((sk) => (
                  <span
                    key={sk}
                    className="bg-[#131826] border border-forge-border text-slate-200 text-xs px-2.5 py-1 rounded-lg font-mono"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Gained */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Pedigree & Experience Gained:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedStep.experienceGained.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hiring Manager Expectations */}
            <div className="bg-[#131826] border border-forge-border rounded-xl p-4 space-y-1.5 md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Recruiter & Hiring Lead Mental Model:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedStep.recruiterExpectations}
              </p>
            </div>

            {/* What this unlocks next */}
            <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl p-4 space-y-1.5 md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#00F0FF]">
                <Key className="w-4 h-4" />
                <span>What this Stepping Stone Unlocks Next:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedStep.whatItUnlocksNext}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
