import React from 'react';
import {
  Award,
  CheckCircle2,
  Lock,
  Boxes,
  GitPullRequest,
  Cpu,
  ShieldCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { CareerRoadmapData } from '../types/career';

interface ProgressGamificationProps {
  roadmap: CareerRoadmapData;
}

export const ProgressGamification: React.FC<ProgressGamificationProps> = ({ roadmap }) => {
  const { metrics, achievements, readinessScore } = roadmap;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-[#00F0FF]" />;
      case 'GitPullRequest':
        return <GitPullRequest className="w-5 h-5 text-[#818CF8]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Award className="w-5 h-5 text-[#00F0FF]" />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Career Readiness
          </span>
          <span className="text-xl font-black text-[#00F0FF]">{readinessScore}%</span>
        </div>

        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Skills Verified
          </span>
          <span className="text-xl font-black text-white">
            {metrics.skillsCompleted} / {metrics.skillsTotal}
          </span>
        </div>

        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Production Projects
          </span>
          <span className="text-xl font-black text-white">
            {metrics.projectsCompleted} / {metrics.projectsTotal}
          </span>
        </div>

        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Credentials
          </span>
          <span className="text-xl font-black text-white">
            {metrics.credentialsCompleted} / {metrics.credentialsTotal}
          </span>
        </div>

        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Experience Signals
          </span>
          <span className="text-xl font-black text-white">
            {metrics.experienceCompleted} / {metrics.experienceTotal}
          </span>
        </div>

        <div className="bg-[#0E111B] border border-forge-border p-4 rounded-xl text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
            Milestones Cleared
          </span>
          <span className="text-xl font-black text-emerald-400">
            {metrics.milestonesCompleted} / {metrics.milestonesTotal}
          </span>
        </div>
      </div>

      {/* Professional Achievement Badges */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00F0FF]" />
              Verifiable Career Milestones & Badges
            </h3>
            <p className="text-xs text-slate-400">
              Recognized proof of competency grounded in real hiring signals
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border transition-all ${
                ach.unlocked
                  ? 'bg-[#131826] border-emerald-500/30 shadow-md'
                  : 'bg-[#0B0D15] border-forge-border opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    ach.unlocked ? 'bg-emerald-500/15' : 'bg-slate-800'
                  }`}
                >
                  {renderIcon(ach.iconName)}
                </div>

                {ach.unlocked ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white mb-1">{ach.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {ach.description}
              </p>

              <div className="w-full bg-[#08090D] h-1.5 rounded-full overflow-hidden border border-forge-border">
                <div
                  className={`h-full ${
                    ach.unlocked ? 'bg-emerald-400' : 'bg-slate-700'
                  }`}
                  style={{ width: `${ach.progressPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
