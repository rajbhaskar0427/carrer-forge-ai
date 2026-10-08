import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { CareerRoadmapData, CareerRecommendation } from '../types/career';
import { generateAiResponse, ChatMessage } from '../lib/mockAiChat';

interface CareerIntelligencePanelProps {
  roadmap: CareerRoadmapData;
  onNavigateMilestone?: (milestoneId: string) => void;
  onOpenProject?: (projectId?: string) => void;
  onOpenSkillGap?: () => void;
}

export const CareerIntelligencePanel: React.FC<CareerIntelligencePanelProps> = ({
  roadmap,
  onNavigateMilestone,
  onOpenProject,
  onOpenSkillGap,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Hello! I am **CareerForge AI**, your reverse-engineered career intelligence copilot. \n\nYou are currently **${roadmap.readinessScore}% ready** for your target role of **${roadmap.profile.dreamRole}** at a **${roadmap.profile.companyType}**. What strategic questions can I answer for you?`,
      timestamp: 'Just now',
      actionPill: {
        label: 'What should I learn next? →',
        actionType: 'open-gap',
      },
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const promptPills = [
    'What should I learn next?',
    'Can I skip this step?',
    'How can I become job-ready faster?',
    'Which project strengthens my portfolio?',
    'Why do I need this skill?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(query, roadmap);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        actionPill: response.actionPill,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionPillClick = (pill: NonNullable<ChatMessage['actionPill']>) => {
    if (pill.actionType === 'open-gap' && onOpenSkillGap) {
      onOpenSkillGap();
    } else if (pill.actionType === 'open-project' && onOpenProject) {
      onOpenProject(pill.targetId);
    } else if (pill.actionType === 'navigate-node' && onNavigateMilestone && pill.targetId) {
      onNavigateMilestone(pill.targetId);
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Readiness & 3 Recommendations Card */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forge-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF]">
                CAREERFORGE AI ADVISOR
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              You are {roadmap.readinessScore}% ready for your target role.
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Role: {roadmap.profile.dreamRole} • Organization: {roadmap.profile.companyType}
            </p>
          </div>

          {/* Readiness Meter Gauge */}
          <div className="flex items-center gap-4 bg-[#131826] border border-forge-border px-5 py-3.5 rounded-2xl shrink-0">
            <div className="relative w-14 h-14 flex items-center justify-center">
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
                  strokeDasharray={`${roadmap.readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-white font-mono">
                {roadmap.readinessScore}%
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Status</span>
              <span className="text-xs font-bold text-white">
                {roadmap.readinessScore > 70 ? 'Interview Ready' : roadmap.readinessScore > 40 ? 'Production Phase' : 'Foundation Phase'}
              </span>
            </div>
          </div>
        </div>

        {/* 3 AI Recommendations */}
        <div className="pt-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-4">
            3 High-Leverage Strategic Recommendations:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roadmap.recommendations.map((rec, idx) => (
              <div
                key={rec.id}
                className="bg-[#131826] border border-forge-border hover:border-[#00F0FF]/40 rounded-xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded font-bold">
                      REC 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase font-bold">
                      {rec.impact} IMPACT
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-forge-border/60">
                  <button
                    onClick={() => {
                      if (rec.targetNodeId && onNavigateMilestone) {
                        onNavigateMilestone(rec.targetNodeId);
                      } else if (onOpenSkillGap) {
                        onOpenSkillGap();
                      }
                    }}
                    className="text-xs font-semibold text-[#00F0FF] hover:underline flex items-center gap-1"
                  >
                    <span>{rec.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Ask CareerForge" AI Chat Interface */}
      <div className="bg-[#0E111B] border border-forge-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-[#121624] border-b border-forge-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F0FF] to-[#6366F1] flex items-center justify-center">
              <Bot className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ask CareerForge AI</h3>
              <p className="text-[11px] text-slate-400 font-mono">Context-aware reverse engineering assistant</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/25">
            Deterministic Engine Ready
          </span>
        </div>

        {/* Suggested Question Pills */}
        <div className="p-4 bg-[#0A0D15] border-b border-forge-border/60 overflow-x-auto">
          <span className="text-[10px] font-mono uppercase text-slate-500 block mb-2">
            Suggested Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {promptPills.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="text-xs bg-[#131826] hover:bg-[#192033] border border-forge-border hover:border-[#00F0FF]/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-[#08090D]/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-[#192033] border border-slate-700 text-white rounded-tr-none'
                    : 'bg-[#121624] border border-forge-border text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.actionPill && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleActionPillClick(m.actionPill!)}
                      className="inline-flex items-center gap-1.5 bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-[#00F0FF] hover:text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg border border-[#00F0FF]/30 transition-all"
                    >
                      <span>{m.actionPill.label}</span>
                    </button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#121624] border border-forge-border px-4 py-2.5 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              <span>CareerForge AI is reasoning...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#121624] border-t border-forge-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your roadmap, skill gaps, or interview readiness..."
              className="flex-1 bg-[#08090D] border border-forge-border focus:border-[#00F0FF] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="bg-[#00F0FF] hover:bg-[#38BDF8] disabled:opacity-50 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
