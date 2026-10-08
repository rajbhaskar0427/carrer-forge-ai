import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Target, Zap, ArrowRight, Sparkles, CheckCircle2, Clock, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CareerRoadmapData } from '../types/career';

interface SkillGapAnalysisProps {
  roadmap: CareerRoadmapData;
  onNavigateMilestone?: (milestoneId: string) => void;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  roadmap,
  onNavigateMilestone,
}) => {
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [completedSprintTasks, setCompletedSprintTasks] = useState<number[]>([]);

  const highest = roadmap.highestImpactSkill;

  const toggleTask = (index: number) => {
    if (completedSprintTasks.includes(index)) {
      setCompletedSprintTasks((prev) => prev.filter((i) => i !== index));
    } else {
      setCompletedSprintTasks((prev) => [...prev, index]);
      if (completedSprintTasks.length + 1 === highest.sprintTasks.length) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#00F0FF', '#38BDF8', '#10B981'],
        });
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E111B] border border-forge-border p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
              COMPETENCY GAP AUDIT
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Your Skill Gap Analysis</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Benchmarked directly against verified job offers and hiring manager requirements for{' '}
            <span className="text-[#00F0FF] font-semibold">{roadmap.profile.dreamRole}</span> at a{' '}
            <span className="text-white font-semibold">{roadmap.profile.companyType}</span>.
          </p>
        </div>

        <div className="bg-[#131826] border border-forge-border p-3.5 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Critical Gaps</span>
            <span className="text-xl font-black text-rose-400">
              {roadmap.skillGaps.filter((g) => g.urgency === 'Highest').length} Urgent
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Readiness</span>
            <span className="text-xl font-black text-[#00F0FF]">
              {roadmap.readinessScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Next Best Move */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Competency Radar Map */}
        <div className="lg:col-span-7 bg-[#0E111B] border border-forge-border rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00F0FF]" />
                Multivariate Competency Radar
              </h3>
              <p className="text-xs text-slate-400">Current candidate capabilities vs target role requirements</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                Your Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                Target Standard
              </span>
            </div>
          </div>

          <div className="w-full h-80 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={roadmap.radarCategories} outerRadius="75%">
                <PolarGrid stroke="#1F273E" />
                <PolarAngleAxis dataKey="category" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#1F273E" tick={false} />
                <Radar
                  name="Current Capability"
                  dataKey="current"
                  stroke="#00F0FF"
                  fill="#00F0FF"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Role Target Required"
                  dataKey="required"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.15}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E111B',
                    borderColor: '#1F273E',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: NEXT BEST MOVE AI Recommendation Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0E111B] via-[#131826] to-[#0A0D15] border-2 border-[#00F0FF]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-xs font-mono font-bold text-[#00F0FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            NEXT BEST MOVE
          </div>

          <h3 className="text-xl font-extrabold text-white leading-tight">
            {highest.name}
          </h3>

          <div className="mt-3 bg-[#08090D]/80 border border-forge-border rounded-xl p-3.5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#00F0FF] block">
              Why this specific move?
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {highest.reason}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-[#121624] p-3 rounded-xl border border-forge-border">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Unlocks</span>
              <span className="text-sm font-bold text-white">{highest.unlocksCount} Milestones</span>
            </div>
            <div className="bg-[#121624] p-3 rounded-xl border border-forge-border">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Recommended Sprint</span>
              <span className="text-sm font-bold text-[#00F0FF]">{highest.sprintDuration}</span>
            </div>
          </div>

          <button
            onClick={() => setSprintModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs shadow-lg shadow-[#00F0FF]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Start Skill Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Detailed Skill Gap Percentage Bars */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
          <span>Individual Competency Deficits</span>
          <span className="text-xs font-mono text-slate-400 font-normal">
            Priority Ranked by Career Unlock Leverage
          </span>
        </h3>

        <div className="space-y-5">
          {roadmap.skillGaps.map((gap) => (
            <div key={gap.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{gap.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {gap.category}
                  </span>
                  {gap.urgency === 'Highest' && (
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase font-bold">
                      Critical Gap
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="text-slate-400">Current: <strong className="text-white">{gap.currentScore}%</strong></span>
                  <span className="text-slate-400">Required: <strong className="text-[#00F0FF]">{gap.requiredScore}%</strong></span>
                  <span className="text-rose-400 font-bold">Deficit: -{gap.gap}%</span>
                </div>
              </div>

              {/* Multi-layered progress bar */}
              <div className="relative w-full h-3 bg-[#08090D] rounded-full overflow-hidden border border-forge-border">
                {/* Target required marker background */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-[#6366F1]/20 border-r border-[#6366F1]"
                  style={{ width: `${gap.requiredScore}%` }}
                />
                {/* Current level fill */}
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#00F0FF] rounded-full transition-all duration-500"
                  style={{ width: `${gap.currentScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                <span>Action: {gap.recommendedSprintAction}</span>
                <span className="text-[#00F0FF] cursor-pointer hover:underline" onClick={() => setSprintModalOpen(true)}>
                  Unlocks {gap.unlocksCount} steps →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APPLICANT POOL BENCHMARK MATRIX (Elevating Information Density) */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              Applicant Pool Benchmark Matrix (1,400+ Candidates)
            </h3>
            <p className="text-xs text-slate-400">
              Where your profile currently ranks compared to typical applicant rejections vs hired candidates
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/25 uppercase font-bold">
            Live Percentile Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-[#131826] p-4 rounded-xl border border-forge-border">
            <span className="text-slate-500 block text-[10px] uppercase mb-1">Applicant Pool Median</span>
            <div className="text-xl font-black text-slate-300">41% Match</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Most students get stuck in the 40% band by learning syntax but skipping type contracts and system design.
            </p>
          </div>

          <div className="bg-[#131826] p-4 rounded-xl border border-[#00F0FF]/30">
            <span className="text-[#00F0FF] block text-[10px] uppercase mb-1 font-bold">Your Current Profile</span>
            <div className="text-xl font-black text-[#00F0FF]">{roadmap.readinessScore}% Match</div>
            <p className="text-[11px] text-slate-300 mt-1 font-sans">
              Currently positioned above absolute beginners, but missing the strict production proof required by hiring leads.
            </p>
          </div>

          <div className="bg-[#131826] p-4 rounded-xl border border-emerald-500/40">
            <span className="text-emerald-400 block text-[10px] uppercase mb-1 font-bold">Hired Cohort Threshold</span>
            <div className="text-xl font-black text-emerald-300">85%+ Match</div>
            <p className="text-[11px] text-slate-300 mt-1 font-sans">
              Passing threshold reached once you close the TypeScript contract gap and deploy FinTrack SaaS.
            </p>
          </div>
        </div>
      </div>

      {/* Skill Sprint Modal */}
      {sprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0E111B] border border-forge-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-forge-border bg-[#121624] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-[#00F0FF]">
                  STRUCTURED SPRINT PLAN
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{highest.name}</h3>
              </div>
              <button
                onClick={() => setSprintModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl p-4 text-xs text-slate-200">
                <span className="font-bold text-[#00F0FF] block mb-1">Sprint Objective:</span>
                Complete the following tactical milestones to close the competency deficit and increase hiring probability.
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
                  Daily Execution Steps ({completedSprintTasks.length}/{highest.sprintTasks.length} Completed):
                </span>
                {highest.sprintTasks.map((task, idx) => {
                  const done = completedSprintTasks.includes(idx);
                  return (
                    <div
                      key={task}
                      onClick={() => toggleTask(idx)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        done
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-[#131826] border-forge-border hover:border-slate-600 text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {done && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs ${done ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-forge-border bg-[#121624] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Estimated Commitment: {highest.sprintDuration}
              </span>
              <button
                onClick={() => setSprintModalOpen(false)}
                className="bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
