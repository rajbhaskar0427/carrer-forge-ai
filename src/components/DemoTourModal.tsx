import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Zap,
  Target,
  Compass,
  Layers,
  Briefcase,
  Play
} from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab: (tab: string) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToTab,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      timing: '00:00 – 00:30',
      tagline: 'THE HOOK & PROBLEM',
      headline: 'Generic Advice Is Failing College Students',
      body: 'Students are told: "Learn React and build a portfolio." They spend 3 months building Netflix clones, apply to 500 jobs, and get a 0% callback rate because hiring managers reject generic tutorial clones in seconds.',
      actionLabel: 'Inspect the Problem Breakdown →',
      targetTab: 'landing',
      keyPoint: 'CareerForge replaces vague checklists with reverse-engineered hiring criteria.',
    },
    {
      timing: '00:30 – 01:00',
      tagline: 'THE REVERSE-ENGINEERED GRAPH',
      headline: 'Deconstructing the Target Destination',
      body: 'Instead of starting from "what should I learn", CareerForge inputs the exact dream role ("Frontend Engineer @ Fintech Startup") and traces backward into an interactive branching skill tree: Technical Depth, Core Architecture, and Collaborative Experience.',
      actionLabel: 'View Branching Skill Tree →',
      targetTab: 'dashboard',
      keyPoint: 'Every node features an explicit "Why?" button detailing hiring manager rubrics.',
    },
    {
      timing: '01:00 – 01:45',
      tagline: 'THE "AHA!" INTERACTION',
      headline: 'The Recruiter Screening Simulator',
      body: 'Judges can run a simulated technical hiring manager audit. It analyzes the student\'s current background, exposes the exact 2 fatal bottlenecks (untyped state contracts & lack of collaborative PRs), and calculates real screening pass probability.',
      actionLabel: 'Test Recruiter Screening Simulator →',
      targetTab: 'dashboard',
      keyPoint: 'Transforms career planning from blind guesswork into quantifiable risk elimination.',
    },
    {
      timing: '01:45 – 02:00',
      tagline: 'ACTIONABLE PROOF & STEPPING STONES',
      headline: 'Bespoke Projects & Realistic Path',
      body: 'Project Forge synthesizes bespoke production platforms (FinTrack) rather than tutorial apps. Meanwhile, Stepping Stones maps intermediate milestones with real salary benchmarks and transition gates.',
      actionLabel: 'Explore Project Forge & Stepping Stones →',
      targetTab: 'projects',
      keyPoint: 'A complete, startup-ready AI career intelligence platform.',
    },
  ];

  const currentSlide = slides[activeStep];

  const handleJump = () => {
    onJumpToTab(currentSlide.targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0E111B] border-2 border-[#00F0FF]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-forge-border bg-[#121624] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#00F0FF]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#00F0FF] font-bold uppercase tracking-wider block">
                JUDGES & PRESENTERS WALKTHROUGH
              </span>
              <h3 className="text-base font-bold text-white">2-Minute Hackathon Demo Script</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-md border border-[#00F0FF]/30 font-bold">
              SLIDE 0{activeStep + 1} OF 04 • {currentSlide.timing}
            </span>
            <span className="text-slate-400 uppercase tracking-wider">
              {currentSlide.tagline}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {currentSlide.headline}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentSlide.body}
            </p>
          </div>

          <div className="bg-[#131826] border border-forge-border rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Judge Takeaway:</span>
              <p className="text-slate-300">{currentSlide.keyPoint}</p>
            </div>
          </div>

          <div>
            <button
              onClick={handleJump}
              className="w-full flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-[#00F0FF]/20"
            >
              <span>{currentSlide.actionLabel}</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-forge-border bg-[#121624] flex items-center justify-between">
          <button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeStep ? 'w-6 bg-[#00F0FF]' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            disabled={activeStep === slides.length - 1}
            onClick={() => setActiveStep((prev) => Math.min(slides.length - 1, prev + 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-200 hover:text-white disabled:opacity-30"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
