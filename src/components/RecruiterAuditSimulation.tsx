import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  TrendingUp,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CareerRoadmapData } from '../types/career';

interface RecruiterAuditSimulationProps {
  roadmap: CareerRoadmapData;
  onSimulateResolve: () => void;
}

export const RecruiterAuditSimulation: React.FC<RecruiterAuditSimulationProps> = ({
  roadmap,
  onSimulateResolve,
}) => {
  const [auditState, setAuditState] = useState<'idle' | 'running' | 'rejected' | 'accepted'>('idle');
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    'Parsing resume against Fintech Series B hiring rubric...',
    'Checking type contract rigor & state management architectures...',
    'Auditing portfolio proof (testing clones vs production apps)...',
    'Verifying collaborative experience & team PR reviews...',
    'Calculating final technical screening probability...',
  ];

  const handleStartAudit = () => {
    setAuditState('running');
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Determine if candidate has high score
          if (roadmap.readinessScore >= 70) {
            setAuditState('accepted');
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#10B981', '#00F0FF', '#38BDF8'],
            });
          } else {
            setAuditState('rejected');
          }
          return prev;
        }
      });
    }, 600);
  };

  const handleFixAndRerun = () => {
    onSimulateResolve();
    setAuditState('running');
    setScanStep(0);

    setTimeout(() => {
      setAuditState('accepted');
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00F0FF', '#10B981', '#818CF8'],
      });
    }, 1500);
  };

  return (
    <div className="bg-[#0E111B] border-2 border-[#1F273E] hover:border-[#00F0FF]/40 rounded-2xl p-6 sm:p-7 shadow-2xl transition-all text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-forge-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              RECRUITER SCREENING SIMULATOR
            </span>
            <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/25">
              HACKATHON "AHA!" INTERACTION
            </span>
          </div>
          <h3 className="text-xl font-black text-white">
            Simulate Engineering Hiring Manager Screen
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test whether your current profile survives the first 30-second technical resume audit at a{' '}
            <span className="text-white font-semibold">{roadmap.profile.companyType}</span>.
          </p>
        </div>

        {auditState === 'idle' && (
          <button
            onClick={handleStartAudit}
            className="flex items-center gap-2 bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#6366F1] text-slate-950 font-black px-5 py-3 rounded-xl text-xs shadow-lg shadow-[#00F0FF]/25 transition-all transform hover:scale-105 shrink-0"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Run Recruiter Audit →</span>
          </button>
        )}
      </div>

      {/* State 1: Running Scan Animation */}
      {auditState === 'running' && (
        <div className="py-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#00F0FF] animate-spin" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#00F0FF] uppercase block">
                Scanning Applicant Credentials...
              </span>
              <p className="text-sm font-bold text-white min-h-[1.5rem]">
                {scanSteps[scanStep]}
              </p>
            </div>
          </div>

          <div className="w-full bg-[#08090D] h-2 rounded-full overflow-hidden border border-forge-border">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-[#00F0FF] transition-all duration-300"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* State 2: Simulated Technical Rejection (The Diagnostic Reveal) */}
      {auditState === 'rejected' && (
        <div className="pt-6 space-y-6">
          <div className="bg-red-950/25 border-2 border-red-500/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-red-400">
                    SCREENING VERDICT: REJECT AT RESUME STAGE
                  </span>
                  <span className="text-[10px] font-mono text-red-300 bg-red-500/15 px-2 py-0.5 rounded">
                    Pass Probability: {roadmap.readinessScore}%
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  Candidate eliminated due to 2 unmitigated hiring risks:
                </h4>
              </div>
            </div>

            <button
              onClick={handleFixAndRerun}
              className="flex items-center gap-1.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shrink-0"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Simulate Fixing Gaps →</span>
            </button>
          </div>

          {/* Diagnostic Bottlenecks List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#131826] border border-red-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-red-400 font-bold">
                  Bottleneck 01: Type Safety & Architecture
                </span>
                <span className="text-[10px] font-mono text-slate-400">Deficit: 60%</span>
              </div>
              <h5 className="text-xs font-bold text-white">
                Untyped / Naive React State
              </h5>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Hiring manager note: <em>"Fintech transaction contracts must be strictly validated. Untyped payloads cause runtime crashes in trading flows. Discarded."</em>
              </p>
              <div className="text-[10px] font-mono text-[#00F0FF] pt-1">
                Required Fix: Milestone m-3 (Strict TypeScript + Zod schemas)
              </div>
            </div>

            <div className="bg-[#131826] border border-red-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-red-400 font-bold">
                  Bottleneck 02: Collaborative Proof
                </span>
                <span className="text-[10px] font-mono text-slate-400">Zero Verified PRs</span>
              </div>
              <h5 className="text-xs font-bold text-white">
                Only Solo Tutorial Projects
              </h5>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Hiring manager note: <em>"Candidate has never merged code in a team repo or defended trade-offs during a code review. High risk for a series A startup."</em>
              </p>
              <div className="text-[10px] font-mono text-[#00F0FF] pt-1">
                Required Fix: Milestone m-8 (1 Open Source Contribution or Startup Internship)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* State 3: Technical Screening Passed! */}
      {auditState === 'accepted' && (
        <div className="pt-6 space-y-4">
          <div className="bg-emerald-950/25 border-2 border-emerald-500/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                    SCREENING VERDICT: FAST-TRACK TO TECHNICAL ROUND
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded">
                    Pass Probability: 89%
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  High Recruiter Signal: All core technical and collaborative risks eliminated.
                </h4>
              </div>
            </div>

            <button
              onClick={() => setAuditState('idle')}
              className="flex items-center gap-1.5 bg-[#131826] hover:bg-[#192033] border border-forge-border text-slate-300 px-3 py-2 rounded-xl text-xs transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Simulation</span>
            </button>
          </div>

          <div className="bg-[#131826] border border-emerald-500/30 rounded-xl p-4 text-xs text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold block">Hiring Lead Assessment:</span>
            <p>
              <em>"Candidate proves strict TypeScript generics, production virtualized data grids with FinTrack platform, and verified open-source collaboration. Low onboarding risk. Invite to 60-minute technical deep-dive."</em>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
