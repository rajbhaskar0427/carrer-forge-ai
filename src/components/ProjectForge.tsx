import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Terminal,
  X,
  FileCode,
  Zap,
  FolderGit2
} from 'lucide-react';
import { CareerRoadmapData, ProjectBrief } from '../types/career';

interface ProjectForgeProps {
  roadmap: CareerRoadmapData;
  onNavigateMilestone?: (milestoneId: string) => void;
}

export const ProjectForge: React.FC<ProjectForgeProps> = ({ roadmap }) => {
  const [selectedBrief, setSelectedBrief] = useState<ProjectBrief | null>(null);
  const [isGeneratingNew, setIsGeneratingNew] = useState(false);
  const [projectList, setProjectList] = useState<ProjectBrief[]>(roadmap.projects);

  const handleGenerateAnother = () => {
    setIsGeneratingNew(true);
    setTimeout(() => {
      const newProj: ProjectBrief = {
        id: `gen-proj-${Date.now()}`,
        title: `Synthetix — Automated Micro-Service Benchmark & Load Injector`,
        tagline: `High-frequency synthetic transaction generator designed to stress-test financial payment APIs under network latency.`,
        difficulty: 'Production-Grade',
        estimatedTime: '2.5 weeks',
        skills: ['TypeScript', 'k6', 'WebSockets', 'Concurrency', 'Docker', 'Grafana'],
        recruiterSignalStars: 5,
        portfolioValue: 'CRITICAL',
        overview: `A specialized load-injection and verification engine. Directly proves you understand high throughput, edge-case network partitions, and resilience under burst traffic.`,
        architecture: [
          'Master-worker architecture with coordinated virtual user spikes.',
          'Real-time streaming telemetry sent to a local InfluxDB & Grafana dashboard.',
          'Zero-copy payload buffering to minimize benchmark runner overhead.',
        ],
        keyFeatures: [
          'Programmable traffic ramp-up scenarios via YAML configs',
          'Automated percentile latency report generation (p50, p95, p99)',
          'Simulated jitter and packet loss injection to test idempotent rollback',
        ],
        recruiterChecklist: [
          'Demonstrates real backend and systems-level thinking',
          'Contains comprehensive benchmark assertions with Docker Compose setup',
        ],
        deliverables: ['GitHub repository', 'Grafana dashboard screenshot exports', 'Technical report'],
        techStack: ['TypeScript', 'Go', 'Docker', 'Grafana', 'InfluxDB'],
      };

      setProjectList((prev) => [newProj, ...prev]);
      setIsGeneratingNew(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E111B] border border-forge-border p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
              REVERSE-ENGINEERED PORTFOLIO PROOF
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Project Forge</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Generic clones (Todo apps, Netflix replicas) are discarded by hiring managers in seconds.
            Project Forge synthesizes bespoke production platforms that mathematically prove competencies required for{' '}
            <span className="text-[#00F0FF] font-semibold">{roadmap.profile.dreamRole}</span>.
          </p>
        </div>

        <button
          onClick={handleGenerateAnother}
          disabled={isGeneratingNew}
          className="flex items-center gap-2 bg-[#131826] hover:bg-[#192033] border border-forge-border hover:border-[#00F0FF]/40 text-slate-200 font-semibold px-4 py-3 rounded-xl text-xs transition-all shadow-md shrink-0"
        >
          <Sparkles className={`w-4 h-4 text-[#00F0FF] ${isGeneratingNew ? 'animate-spin' : ''}`} />
          <span>{isGeneratingNew ? 'Synthesizing Spec...' : 'Generate Another Project'}</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectList.map((project, idx) => (
          <div
            key={project.id}
            className="bg-[#0E111B] border border-forge-border hover:border-[#00F0FF]/40 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-full font-bold">
                  {project.difficulty}
                </span>

                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400 text-xs">
                    {[...Array(project.recruiterSignalStars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase font-bold">
                    {project.portfolioValue} SIGNAL
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>

              {/* Skills demonstrated chips */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">
                  Skills Proven to Recruiter:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#131826] border border-forge-border text-slate-300 text-[11px] px-2 py-0.5 rounded-md font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-forge-border flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                {project.estimatedTime}
              </span>

              <button
                onClick={() => setSelectedBrief(project)}
                className="flex items-center gap-1.5 bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs transition-all border border-[#00F0FF]/30"
              >
                <span>View Project Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Project Specification Modal */}
      {selectedBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#0E111B] border border-forge-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-forge-border bg-[#121624] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-2 py-0.5 rounded">
                    PRODUCTION SPECIFICATION
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {selectedBrief.portfolioValue} RECRUITER VALUE
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedBrief.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedBrief.tagline}</p>
              </div>

              <button
                onClick={() => setSelectedBrief(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Executive Overview */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1.5">
                  Project Overview & Scope
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#131826] p-4 rounded-xl border border-forge-border">
                  {selectedBrief.overview}
                </p>
              </div>

              {/* Technical Architecture */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  Architectural Pillars
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedBrief.architecture.map((arch, idx) => (
                    <li key={idx} className="bg-[#131826] p-3 rounded-xl border border-forge-border flex items-start gap-2.5">
                      <span className="text-[#00F0FF] font-mono font-bold">0{idx + 1}.</span>
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
                  High-Impact Production Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {selectedBrief.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="bg-[#131826] p-3 rounded-xl border border-forge-border flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Evaluation Checklist */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  What Engineering Hiring Managers Specifically Inspect
                </h4>
                <div className="space-y-1.5 bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-300">
                  {selectedBrief.recruiterChecklist.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Required Deliverables for 100% Verification
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedBrief.deliverables.map((del, idx) => (
                    <span key={idx} className="bg-[#192033] border border-forge-border text-slate-200 px-3 py-1.5 rounded-lg font-mono">
                      📁 {del}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-forge-border bg-[#121624] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Recommended Timeline: {selectedBrief.estimatedTime}
              </span>
              <button
                onClick={() => setSelectedBrief(null)}
                className="bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Close Specification
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
