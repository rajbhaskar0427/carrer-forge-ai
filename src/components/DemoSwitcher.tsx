import React from 'react';
import { Zap, Sparkles, Cpu, Palette } from 'lucide-react';

interface DemoSwitcherProps {
  currentRole: string;
  onSelectDemo: (demoKey: 'fintech' | 'aiml' | 'uiux') => void;
  onOpenWizard: () => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({
  currentRole,
  onSelectDemo,
  onOpenWizard,
}) => {
  const isAiMl = currentRole.toLowerCase().includes('ai') || currentRole.toLowerCase().includes('ml');
  const isUiUx = currentRole.toLowerCase().includes('design') || currentRole.toLowerCase().includes('ui');
  const isFintech = !isAiMl && !isUiUx;

  return (
    <div className="bg-[#0E111B] border border-forge-border rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono uppercase text-slate-400 font-bold px-2">
          Hackathon Demo Trajectories:
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSelectDemo('fintech')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isFintech
                ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm'
                : 'bg-[#131826] text-slate-300 hover:text-white border border-forge-border'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Frontend @ Fintech Startup</span>
          </button>

          <button
            onClick={() => onSelectDemo('aiml')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAiMl
                ? 'bg-[#6366F1]/20 text-[#818CF8] border border-[#6366F1]/40 shadow-sm'
                : 'bg-[#131826] text-slate-300 hover:text-white border border-forge-border'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#818CF8]" />
            <span>AI/ML @ Research Lab</span>
          </button>

          <button
            onClick={() => onSelectDemo('uiux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isUiUx
                ? 'bg-[#EC4899]/20 text-[#F472B6] border border-[#EC4899]/40 shadow-sm'
                : 'bg-[#131826] text-slate-300 hover:text-white border border-forge-border'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#F472B6]" />
            <span>UI/UX Designer @ SaaS</span>
          </button>
        </div>
      </div>

      <button
        onClick={onOpenWizard}
        className="text-xs text-[#00F0FF] hover:underline font-mono px-2 flex items-center gap-1"
      >
        <span>+ Forge Custom Dream Role</span>
      </button>
    </div>
  );
};
