import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  Building2,
  Clock,
  Calendar,
  Zap,
  Cpu,
  Compass,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompanyType, StartingPoint, SkillProficiency, UserProfile, UserSkill } from '../types/career';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
  initialRole?: string;
}

const defaultAvailableSkills = [
  'JavaScript',
  'React',
  'TypeScript',
  'HTML5/CSS3',
  'Python',
  'SQL',
  'Git & GitHub',
  'UI/UX Design',
  'Node.js',
  'Docker',
  'AWS/Cloud',
  'REST APIs',
  'GraphQL',
  'PyTorch',
  'Figma',
];

const companyOptions: { type: CompanyType; title: string; desc: string; icon: string }[] = [
  { type: 'Startup', title: 'Startup (Seed - Series B)', desc: 'Fast-paced, high ownership, broad stack responsibilities', icon: '🚀' },
  { type: 'Product Company', title: 'Growth Product Company', desc: 'Mature product squads, design systems, established users', icon: '📦' },
  { type: 'Big Tech', title: 'Big Tech (Tier 1)', desc: 'Massive scale, deep specialization, rigorous DS&A screening', icon: '🏛️' },
  { type: 'Research Lab', title: 'Research Lab / Frontier AI', desc: 'Novel architectures, mathematical rigor, publication benchmarks', icon: '🔬' },
  { type: 'Consulting', title: 'Consulting / Enterprise', desc: 'Client engagement, enterprise integrations, rapid delivery', icon: '💼' },
  { type: 'Agency', title: 'Creative / Digital Agency', desc: 'Rapid project turnaround, cutting-edge UI animations', icon: '🎨' },
  { type: 'Any', title: 'Open to Any Environment', desc: 'Optimize for fastest skill acquisition and market placement', icon: '🌐' },
];

const startingPoints: { type: StartingPoint; title: string; desc: string; icon: string }[] = [
  { type: 'Beginner', title: 'Absolute Beginner', desc: 'Starting from square one, curious and ready to build foundations', icon: '🌱' },
  { type: 'College Student', title: 'College Student', desc: 'Taking CS / STEM coursework, looking for real-world industry bridge', icon: '🎓' },
  { type: 'Some Projects', title: 'Built Some Projects', desc: 'Have completed small tutorial apps, need production-level proof', icon: '🔨' },
  { type: 'Internship Experience', title: 'Internship Experience', desc: 'Have completed at least one technical internship or freelance job', icon: '💼' },
  { type: 'Working Professional', title: 'Working Professional', desc: 'Transitioning careers or leveling up to a specialized dream role', icon: '⚡' },
];

const aiGeneratingSteps = [
  'Analyzing target role & market hiring rubrics...',
  'Mapping required competencies against industry benchmarks...',
  'Finding realistic stepping stones and intermediate roles...',
  'Identifying critical skill gaps and friction points...',
  'Designing portfolio proof-of-work project briefs...',
  'Synthesizing your interactive CareerForge graph...',
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialRole = 'Frontend Engineer at a product-based fintech startup',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingStepIndex, setGeneratingStepIndex] = useState(0);

  // Form State
  const [dreamRole, setDreamRole] = useState(initialRole);
  const [companyType, setCompanyType] = useState<CompanyType>('Startup');
  const [startingPoint, setStartingPoint] = useState<StartingPoint>('College Student');
  const [userSkills, setUserSkills] = useState<UserSkill[]>([
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'HTML5/CSS3', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Beginner' },
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [weeklyHours, setWeeklyHours] = useState<number>(15);
  const [targetTimelineMonths, setTargetTimelineMonths] = useState<number>(6);

  useEffect(() => {
    if (initialRole) {
      setDreamRole(initialRole);
    }
  }, [initialRole]);

  // Handle generation sequence
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGeneratingStepIndex((prev) => {
        if (prev < aiGeneratingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            onComplete({
              dreamRole: dreamRole.trim() || 'Frontend Engineer at a product-based fintech startup',
              companyType,
              startingPoint,
              currentSkills: userSkills,
              weeklyHours,
              targetTimelineMonths,
            });
          }, 800);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isGenerating, dreamRole, companyType, startingPoint, userSkills, weeklyHours, targetTimelineMonths, onComplete]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsGenerating(true);
      setGeneratingStepIndex(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleSkill = (skillName: string) => {
    const existing = userSkills.find((s) => s.name === skillName);
    if (existing) {
      setUserSkills((prev) => prev.filter((s) => s.name !== skillName));
    } else {
      setUserSkills((prev) => [...prev, { name: skillName, level: 'Intermediate' }]);
    }
  };

  const updateSkillLevel = (skillName: string, level: SkillProficiency) => {
    setUserSkills((prev) =>
      prev.map((s) => (s.name === skillName ? { ...s, level } : s))
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!userSkills.some((s) => s.name.toLowerCase() === newSkillInput.trim().toLowerCase())) {
      setUserSkills((prev) => [...prev, { name: newSkillInput.trim(), level: 'Intermediate' }]);
    }
    setNewSkillInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0E111B] border border-forge-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header / Progress Bar */}
        <div className="p-6 border-b border-forge-border bg-[#0E111B] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
                CAREERFORGE AI WIZARD
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Step {currentStep} of 6: {
                currentStep === 1 ? 'Target Destination' :
                currentStep === 2 ? 'Company Profile' :
                currentStep === 3 ? 'Starting Point' :
                currentStep === 4 ? 'Current Competencies' :
                currentStep === 5 ? 'Time Commitment' : 'Target Timeline'
              }
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i <= currentStep ? 'bg-[#00F0FF]' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-left">
          
          {/* AI Generating Animation Screen */}
          {isGenerating ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
              {/* Radar scanner visual */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#00F0FF]/30 animate-ping-slow" />
                <div className="absolute inset-2 rounded-full border border-[#38BDF8]/40 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#6366F1] flex items-center justify-center shadow-lg shadow-[#00F0FF]/30">
                  <Cpu className="w-8 h-8 text-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              <div className="space-y-3 max-w-md">
                <div className="inline-block px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-mono font-bold tracking-wider uppercase">
                  REVERSE-ENGINEERING IN PROGRESS
                </div>
                <h4 className="text-xl font-bold text-white min-h-[3.5rem] flex items-center justify-center">
                  {aiGeneratingSteps[generatingStepIndex]}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Synthesizing stepping stones for "{dreamRole}"
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#818CF8]"
                  initial={{ width: '10%' }}
                  animate={{ width: `${((generatingStepIndex + 1) / aiGeneratingSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Dream Role */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">What is your exact dream role?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Be as specific as possible. The more specific the goal, the more granular the stepping stones.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#00F0FF] uppercase tracking-wider mb-2">
                      TARGET ROLE TITLE & DOMAIN
                    </label>
                    <input
                      type="text"
                      value={dreamRole}
                      onChange={(e) => setDreamRole(e.target.value)}
                      placeholder="e.g. Frontend Engineer at a product-based fintech startup"
                      className="w-full bg-[#08090D] border-2 border-forge-border focus:border-[#00F0FF] rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
                      autoFocus
                    />
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block mb-2 font-mono uppercase">
                      Quick Suggestions:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Frontend Engineer at a product-based fintech startup',
                        'AI/ML Engineer at a research-focused company',
                        'UI/UX Designer at a top SaaS company',
                        'Full-Stack Engineer at Big Tech',
                        'Cloud & DevOps Engineer at Series B Startup',
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => setDreamRole(suggestion)}
                          className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                            dreamRole === suggestion
                              ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-medium'
                              : 'bg-[#131826] border-forge-border hover:border-slate-600 text-slate-300'
                          }`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Company Type */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">What kind of company are you targeting?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Startups prioritize rapid end-to-end execution; Big Tech evaluates algorithmic systems; Research labs demand theoretical papers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {companyOptions.map((opt) => (
                      <div
                        key={opt.type}
                        onClick={() => setCompanyType(opt.type)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          companyType === opt.type
                            ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                            : 'bg-[#131826] border-forge-border hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xl">{opt.icon}</span>
                          <span className="font-bold text-sm text-white">{opt.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Starting Point */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Where are you starting from?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      CareerForge reverse-engineers from the dream role back to your exact starting baseline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {startingPoints.map((pt) => (
                      <div
                        key={pt.type}
                        onClick={() => setStartingPoint(pt.type)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          startingPoint === pt.type
                            ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/10'
                            : 'bg-[#131826] border-forge-border hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xl">{pt.icon}</span>
                          <span className="font-bold text-sm text-white">{pt.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Current Skills & Levels */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">What is your current skill level?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Select what you already know. Click each skill to adjust your proficiency level.
                    </p>
                  </div>

                  {/* Add Custom Skill Form */}
                  <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      placeholder="Add another skill (e.g. Tailwind, Zustand, GraphQL)..."
                      className="flex-1 bg-[#08090D] border border-forge-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]"
                    />
                    <button
                      type="submit"
                      className="bg-[#192033] hover:bg-[#25304C] text-white px-4 py-2 rounded-xl text-xs font-semibold border border-forge-border flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </form>

                  {/* Skills Grid */}
                  <div className="space-y-4">
                    <span className="text-xs text-slate-400 font-mono uppercase block">
                      Selected Competencies ({userSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {userSkills.map((s) => (
                        <div
                          key={s.name}
                          className="bg-[#131826] border border-[#00F0FF]/40 rounded-xl p-2 flex items-center gap-2 shadow-sm"
                        >
                          <span className="text-xs font-semibold text-white pl-1">{s.name}</span>
                          <div className="flex items-center bg-[#08090D] rounded-lg p-0.5 border border-forge-border text-[10px]">
                            {(['Beginner', 'Intermediate', 'Advanced'] as SkillProficiency[]).map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => updateSkillLevel(s.name, lvl)}
                                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                                  s.level === lvl
                                    ? 'bg-[#00F0FF] text-slate-950 font-bold'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                {lvl.slice(0, 3)}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleSkill(s.name)}
                            className="text-slate-500 hover:text-red-400 p-0.5"
                            title="Remove skill"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <span className="text-xs text-slate-400 font-mono uppercase block pt-2">
                      Suggested to add:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {defaultAvailableSkills
                        .filter((s) => !userSkills.some((us) => us.name.toLowerCase() === s.toLowerCase()))
                        .map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleSkill(s)}
                            className="text-xs bg-[#0E111B] hover:bg-[#192033] border border-forge-border text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3 text-[#00F0FF]" />
                            {s}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Time Investment */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">How much time can you invest weekly?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      We calibrate milestone pacing, sprint tasks, and project complexity to your real availability.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { hours: 5, label: '5 hrs / week', desc: 'Casual sprint (1h / day)' },
                      { hours: 10, label: '10 hrs / week', desc: 'Consistent pace (1.5h / day)' },
                      { hours: 15, label: '15 hrs / week', desc: 'Recommended immersion (2h / day)' },
                      { hours: 25, label: '20+ hrs / week', desc: 'Intensive career acceleration' },
                    ].map((item) => (
                      <div
                        key={item.hours}
                        onClick={() => setWeeklyHours(item.hours)}
                        className={`p-5 rounded-xl border cursor-pointer text-center transition-all ${
                          weeklyHours === item.hours
                            ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/15'
                            : 'bg-[#131826] border-forge-border hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <Clock className={`w-6 h-6 mx-auto mb-2 ${weeklyHours === item.hours ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                        <div className="font-bold text-base text-white">{item.label}</div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Target Timeline */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">What is your target timeline?</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Realistic reverse-engineering builds honest phases rather than fake “learn in 14 days” promises.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { months: 3, label: '3 Months', desc: 'Fast-track (prior projects required)' },
                      { months: 6, label: '6 Months', desc: 'Optimal balanced runway' },
                      { months: 12, label: '12 Months', desc: 'Comprehensive domain transition' },
                      { months: 18, label: '18+ Months', desc: 'Multi-year college runway' },
                    ].map((item) => (
                      <div
                        key={item.months}
                        onClick={() => setTargetTimelineMonths(item.months)}
                        className={`p-5 rounded-xl border cursor-pointer text-center transition-all ${
                          targetTimelineMonths === item.months
                            ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-lg shadow-[#00F0FF]/15'
                            : 'bg-[#131826] border-forge-border hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <Calendar className={`w-6 h-6 mx-auto mb-2 ${targetTimelineMonths === item.months ? 'text-[#00F0FF]' : 'text-slate-500'}`} />
                        <div className="font-bold text-base text-white">{item.label}</div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#131826] border border-forge-border rounded-xl p-4 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#00F0FF] shrink-0" />
                    <p className="text-xs text-slate-300">
                      Ready to synthesize your reverse-engineered career graph. Clicking below initiates the AI Career Intelligence mapping engine.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {!isGenerating && (
          <div className="p-5 border-t border-forge-border bg-[#0E111B] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-forge-border hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-[#00F0FF]/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{currentStep === 6 ? 'Forge My Roadmap →' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
