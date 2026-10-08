import React from 'react';
import { Sparkles, Compass, Target, Layers, Briefcase, Zap, RotateCcw } from 'lucide-react';
import { CareerRoadmapData } from '../types/career';

interface NavbarProps {
  currentRoadmap: CareerRoadmapData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenWizard: () => void;
  onSwitchDemo: (demoId: 'fintech' | 'aiml' | 'uiux') => void;
  onReset: () => void;
  onOpenDemoTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoadmap,
  activeTab,
  setActiveTab,
  onOpenWizard,
  onSwitchDemo,
  onReset,
  onOpenDemoTour,
}) => {
  const isAiMl = currentRoadmap.profile.dreamRole.toLowerCase().includes('ai') || currentRoadmap.profile.dreamRole.toLowerCase().includes('ml');
  const isUiUx = currentRoadmap.profile.dreamRole.toLowerCase().includes('design') || currentRoadmap.profile.dreamRole.toLowerCase().includes('ui');

  let activeDemo: 'fintech' | 'aiml' | 'uiux' = 'fintech';
  if (isAiMl) activeDemo = 'aiml';
  if (isUiUx) activeDemo = 'uiux';

  return (
    <header className="sticky top-0 z-40 bg-[#08090D]/90 backdrop-blur-xl border-b border-forge-border px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F0FF] via-[#38BDF8] to-[#6366F1] flex items-center justify-center font-black text-slate-950 shadow-lg shadow-[#00F0FF]/20">
            <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base md:text-lg">CAREERFORGE</span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 px-2 py-0.5 rounded-full">
                AI Career Intelligence
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden md:block">Reverse-engineer your dream career.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E111B] border border-forge-border p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'landing' ? 'bg-[#192033] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            How it works
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard' ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Roadmap Graph
          </button>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'skill-gap' ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Skill Gap
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'projects' ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Project Forge
          </button>
          <button
            onClick={() => setActiveTab('stepping-stones')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'stepping-stones' ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Stepping Stones
          </button>
        </nav>

        {/* Right side Actions & Quick Demo Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Switcher Dropdown / Pills for Hackathon Judges */}
          <div className="hidden sm:flex items-center bg-[#0E111B] border border-forge-border rounded-lg p-0.5 text-[11px]">
            <span className="text-[10px] text-slate-500 font-mono uppercase px-2">Demo:</span>
            <button
              onClick={() => onSwitchDemo('fintech')}
              className={`px-2 py-1 rounded transition-colors ${
                activeDemo === 'fintech' ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Frontend Engineer at Fintech Startup"
            >
              Fintech Frontend
            </button>
            <button
              onClick={() => onSwitchDemo('aiml')}
              className={`px-2 py-1 rounded transition-colors ${
                activeDemo === 'aiml' ? 'bg-[#6366F1]/25 text-[#818CF8] font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="AI/ML Engineer at Research Lab"
            >
              AI / ML
            </button>
            <button
              onClick={() => onSwitchDemo('uiux')}
              className={`px-2 py-1 rounded transition-colors ${
                activeDemo === 'uiux' ? 'bg-[#EC4899]/20 text-[#F472B6] font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="UI/UX Designer at SaaS"
            >
              UI / UX
            </button>
          </div>

          <button
            onClick={onOpenDemoTour}
            className="hidden md:flex items-center gap-1.5 bg-[#131826] hover:bg-[#192033] text-[#00F0FF] border border-[#00F0FF]/40 font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-md"
            title="Start 2-minute Hackathon Demo Tour"
          >
            <Zap className="w-3.5 h-3.5 fill-[#00F0FF]" />
            <span>2-Min Pitch</span>
          </button>

          <button
            onClick={onOpenWizard}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#6366F1] text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-lg shadow-[#00F0FF]/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Forge New</span>
          </button>
        </div>
      </div>
    </header>
  );
};
