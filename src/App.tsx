import React, { useState, useEffect } from 'react';
import {
  demoFrontendFintechRoadmap,
  demoAiMlRoadmap,
  demoUiUxRoadmap,
  demoFrontendFintechProfile
} from './data/mockCareers';
import { CareerRoadmapData, Milestone, UserProfile } from './types/career';
import { generateCareerRoadmap, toggleMilestoneCompletion } from './lib/careerEngine';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ComparisonSection } from './components/ComparisonSection';
import { OnboardingWizard } from './components/OnboardingWizard';
import { RoadmapGraph } from './components/RoadmapGraph';
import { RoadmapNodeDetailModal } from './components/RoadmapNodeDetailModal';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { ProjectForge } from './components/ProjectForge';
import { CareerSteppingStones } from './components/CareerSteppingStones';
import { CareerIntelligencePanel } from './components/CareerIntelligencePanel';
import { ProgressGamification } from './components/ProgressGamification';
import { DemoSwitcher } from './components/DemoSwitcher';
import { ReverseEngineeringBlueprint } from './components/ReverseEngineeringBlueprint';
import { DemoTourModal } from './components/DemoTourModal';
import {
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Layers,
  Briefcase,
  Bot
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentRoadmap, setCurrentRoadmap] = useState<CareerRoadmapData>(demoFrontendFintechRoadmap);
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [wizardInitialRole, setWizardInitialRole] = useState<string>('Frontend Engineer at a product-based fintech startup');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Switch demo preset
  const handleSwitchDemo = (demoKey: 'fintech' | 'aiml' | 'uiux') => {
    if (demoKey === 'fintech') {
      setCurrentRoadmap(demoFrontendFintechRoadmap);
      setWizardInitialRole('Frontend Engineer at a product-based fintech startup');
    } else if (demoKey === 'aiml') {
      setCurrentRoadmap(demoAiMlRoadmap);
      setWizardInitialRole('AI/ML Engineer at a research-focused company');
    } else if (demoKey === 'uiux') {
      setCurrentRoadmap(demoUiUxRoadmap);
      setWizardInitialRole('UI/UX Designer at a top SaaS company');
    }
  };

  // Complete wizard flow
  const handleWizardComplete = (profile: UserProfile) => {
    const generated = generateCareerRoadmap(profile);
    setCurrentRoadmap(generated);
    setIsWizardOpen(false);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string) => {
    const { updatedData } = toggleMilestoneCompletion(currentRoadmap, milestoneId);
    setCurrentRoadmap(updatedData);

    if (selectedMilestone && selectedMilestone.id === milestoneId) {
      const updatedMilestone = updatedData.milestones.find((m) => m.id === milestoneId) || null;
      setSelectedMilestone(updatedMilestone);
    }
  };

  const handleOpenWizardWithRole = (role: string) => {
    setWizardInitialRole(role);
    setIsWizardOpen(true);
  };

  const handleExploreDemo = () => {
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToMilestone = (milestoneId: string) => {
    const m = currentRoadmap.milestones.find((node) => node.id === milestoneId);
    if (m) {
      setSelectedMilestone(m);
    }
    setActiveTab('dashboard');
  };

  const handleSimulateResolveGaps = () => {
    const updated: CareerRoadmapData = JSON.parse(JSON.stringify(currentRoadmap));
    updated.milestones = updated.milestones.map((m) => {
      if (m.id === 'm-3' || m.id === 'm-8' || m.id === 'aiml-3' || m.id === 'ux-2') {
        return { ...m, status: 'completed' };
      }
      return m;
    });
    updated.readinessScore = 84;
    updated.metrics.milestonesCompleted = Math.max(updated.metrics.milestonesCompleted + 2, 4);
    updated.metrics.skillsCompleted = Math.min(updated.metrics.skillsTotal, updated.metrics.skillsCompleted + 3);
    setCurrentRoadmap(updated);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col font-sans selection:bg-[#00F0FF]/20 selection:text-[#00F0FF]">
      
      {/* Top Navigation */}
      <Navbar
        currentRoadmap={currentRoadmap}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWizard={() => setIsWizardOpen(true)}
        onSwitchDemo={handleSwitchDemo}
        onReset={() => {
          setCurrentRoadmap(demoFrontendFintechRoadmap);
          setActiveTab('landing');
        }}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* -------------------------------------------------------- */}
        {/* VIEW 1: LANDING PAGE                                     */}
        {/* -------------------------------------------------------- */}
        {activeTab === 'landing' && (
          <div>
            <Hero
              onBuildRoadmap={() => setIsWizardOpen(true)}
              onExploreDemo={handleExploreDemo}
              onSelectPrompt={handleOpenWizardWithRole}
            />

            <ComparisonSection />

            {/* Quick Teaser for Interactive App Features */}
            <section className="py-20 bg-[#0A0D15] border-b border-forge-border">
              <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-12">
                <div className="max-w-3xl mx-auto space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF]">
                    <Sparkles className="w-3.5 h-3.5" />
                    BUILT FOR SERIOUS CAREER MOVES
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Start from the destination.
                  </h2>
                  <p className="text-sm text-slate-400">
                    See what stands between you and the role. Close the gap with verifiable proof, not tutorial clones.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                  <div
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-[#0E111B] border border-forge-border hover:border-[#00F0FF]/40 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                  >
                    <Compass className="w-8 h-8 text-[#00F0FF] mb-4" />
                    <h3 className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                      Interactive Career Graph
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Explore dynamic skill trees with branch tracks, difficulty ratings, and verifiable evidence of completion.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('skill-gap')}
                    className="bg-[#0E111B] border border-forge-border hover:border-[#00F0FF]/40 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                  >
                    <Target className="w-8 h-8 text-[#38BDF8] mb-4" />
                    <h3 className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                      Skill Gap Radar
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Visualize multivariate deficits and launch 10-day focused skill sprints targeting highest-leverage unlocks.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('projects')}
                    className="bg-[#0E111B] border border-forge-border hover:border-[#00F0FF]/40 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                  >
                    <Layers className="w-8 h-8 text-[#818CF8] mb-4" />
                    <h3 className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                      Project Forge
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Generate production-grade SaaS and systems projects specifically audited against real recruiter rubrics.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('stepping-stones')}
                    className="bg-[#0E111B] border border-forge-border hover:border-[#00F0FF]/40 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                  >
                    <Briefcase className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="font-bold text-white text-base group-hover:text-[#00F0FF] transition-colors">
                      The Realistic Path
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Inspect intermediate roles, compensation benchmarks, and prerequisite unlocks on the road to the target offer.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsWizardOpen(true)}
                    className="bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-xl shadow-[#00F0FF]/25 transition-all transform hover:scale-105"
                  >
                    Forge My Roadmap Now →
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* VIEW 2: ROADMAP DASHBOARD & SUB-VIEWS                    */}
        {/* -------------------------------------------------------- */}
        {activeTab !== 'landing' && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
            
            {/* Quick Demo Switcher Bar for Hackathon Judges */}
            <DemoSwitcher
              currentRole={currentRoadmap.profile.dreamRole}
              onSelectDemo={handleSwitchDemo}
              onOpenWizard={() => setIsWizardOpen(true)}
            />

            {/* SECTION 5 DASHBOARD HEADER: "YOUR CAREERFORGE ROADMAP" */}
            <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-forge-border">
                
                {/* Title & Target Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
                      YOUR CAREERFORGE ROADMAP
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {currentRoadmap.profile.dreamRole}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-mono text-slate-300 bg-[#131826] border border-forge-border px-2.5 py-1 rounded-md">
                      Target Company: <strong>{currentRoadmap.profile.companyType}</strong>
                    </span>
                    <span className="text-xs font-mono text-slate-300 bg-[#131826] border border-forge-border px-2.5 py-1 rounded-md">
                      Pacing: <strong>{currentRoadmap.profile.weeklyHours} hrs/week</strong>
                    </span>
                    <span className="text-xs font-mono text-slate-300 bg-[#131826] border border-forge-border px-2.5 py-1 rounded-md">
                      Timeline: <strong>{currentRoadmap.profile.targetTimelineMonths} Months</strong>
                    </span>
                  </div>
                </div>

                {/* Readiness Score Gauge */}
                <div className="flex items-center gap-4 bg-[#131826] border border-forge-border px-6 py-4 rounded-2xl shrink-0">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#00F0FF]"
                        strokeDasharray={`${currentRoadmap.readinessScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-sm font-black text-white font-mono">
                      {currentRoadmap.readinessScore}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Progress</span>
                    <span className="text-sm font-bold text-white">
                      Career Readiness
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 block">
                      {currentRoadmap.metrics.milestonesCompleted} of {currentRoadmap.metrics.milestonesTotal} verified
                    </span>
                  </div>
                </div>

              </div>

              {/* Path Indicator: Current Position → Next Milestone → Dream Role */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-[#131826] p-3.5 rounded-xl border border-forge-border">
                  <span className="text-slate-500 uppercase text-[10px] block mb-1">
                    01. Current Position
                  </span>
                  <div className="font-bold text-slate-200 truncate">
                    {currentRoadmap.profile.startingPoint}
                  </div>
                </div>

                <div className="bg-[#131826] p-3.5 rounded-xl border border-[#00F0FF]/40 shadow-sm shadow-[#00F0FF]/5">
                  <span className="text-[#00F0FF] uppercase text-[10px] block mb-1 font-bold">
                    02. Next High-Leverage Milestone
                  </span>
                  <div className="font-bold text-white truncate">
                    {currentRoadmap.currentMilestoneTitle}
                  </div>
                </div>

                <div className="bg-[#131826] p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-400 uppercase text-[10px] block mb-1 font-bold">
                    03. Target Dream Role
                  </span>
                  <div className="font-bold text-emerald-300 truncate">
                    {currentRoadmap.profile.dreamRole}
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-forge-border pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Interactive Skill Tree</span>
              </button>

              <button
                onClick={() => setActiveTab('skill-gap')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'skill-gap'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Skill Gap & Sprint</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Project Forge</span>
              </button>

              <button
                onClick={() => setActiveTab('stepping-stones')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'stepping-stones'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Career Stepping Stones</span>
              </button>

              <button
                onClick={() => setActiveTab('advisor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'advisor'
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>CareerForge AI Advisor</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <ProgressGamification roadmap={currentRoadmap} />
                <RoadmapGraph
                  roadmap={currentRoadmap}
                  onSelectMilestone={(m) => setSelectedMilestone(m)}
                  onToggleMilestoneStatus={handleToggleMilestone}
                  onSimulateResolveGaps={handleSimulateResolveGaps}
                />
                <ReverseEngineeringBlueprint
                  roadmap={currentRoadmap}
                  onNavigateToGraph={() => {
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {activeTab === 'skill-gap' && (
              <SkillGapAnalysis
                roadmap={currentRoadmap}
                onNavigateMilestone={handleNavigateToMilestone}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectForge
                roadmap={currentRoadmap}
                onNavigateMilestone={handleNavigateToMilestone}
              />
            )}

            {activeTab === 'stepping-stones' && (
              <CareerSteppingStones roadmap={currentRoadmap} />
            )}

            {activeTab === 'advisor' && (
              <CareerIntelligencePanel
                roadmap={currentRoadmap}
                onNavigateMilestone={handleNavigateToMilestone}
                onOpenProject={() => setActiveTab('projects')}
                onOpenSkillGap={() => setActiveTab('skill-gap')}
              />
            )}

          </div>
        )}

      </main>

      {/* Footer with Confident Microcopy */}
      <footer className="mt-20 border-t border-forge-border bg-[#06070B] py-12 px-4 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-tight text-lg">CAREERFORGE</span>
              <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                PROTOTYPE v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              “Your career isn't a checklist. It's a path. Start from the destination.”
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span>Close the gap.</span>
            <span>•</span>
            <span>Build proof, not just skills.</span>
            <span>•</span>
            <span>Every milestone has a reason.</span>
          </div>
        </div>
      </footer>

      {/* Onboarding Wizard Modal */}
      <OnboardingWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleWizardComplete}
        initialRole={wizardInitialRole}
      />

      {/* Node Detail / "Why this matters" Modal */}
      <RoadmapNodeDetailModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        onToggleComplete={handleToggleMilestone}
      />

      {/* 2-Minute Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onJumpToTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
};
