import { CareerRoadmapData } from '../types/career';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionPill?: {
    label: string;
    actionType: 'navigate-node' | 'open-project' | 'open-gap';
    targetId?: string;
  };
}

export function generateAiResponse(
  userQuery: string,
  roadmapData: CareerRoadmapData
): { text: string; actionPill?: ChatMessage['actionPill'] } {
  const queryLower = userQuery.toLowerCase().trim();
  const role = roadmapData.profile.dreamRole;
  const company = roadmapData.profile.companyType;
  const readiness = roadmapData.readinessScore;
  const highestSkill = roadmapData.highestImpactSkill.name;

  // Question: What should I learn next?
  if (queryLower.includes('learn next') || queryLower.includes('what next') || queryLower.includes('start next')) {
    return {
      text: `Based on your goal of **${role}** at a **${company}**, your highest-leverage move right now is **${highestSkill}**. \n\nClosing this specific gap unlocks **${roadmapData.highestImpactSkill.unlocksCount} roadmap milestones** and transforms your profile from a generic applicant into a candidate with verifiable production credentials.`,
      actionPill: {
        label: `Start ${highestSkill} Sprint →`,
        actionType: 'open-gap',
      },
    };
  }

  // Question: Can I skip this step?
  if (queryLower.includes('skip') || queryLower.includes('bypass') || queryLower.includes('necessary')) {
    return {
      text: `In CareerForge's reverse-engineered model, foundational steps (like strict type contracts or system design) aren't arbitrary chores—they are **risk mitigations for hiring managers**. \n\nIf you already have verifiable proof (e.g., an active production app or public open-source PR), you can mark the node complete. However, skipping without proof leaves a **credibility gap** that causes 78% of resume rejections during technical screening.`,
      actionPill: {
        label: 'Inspect Milestone Proof Requirements',
        actionType: 'navigate-node',
        targetId: roadmapData.milestones[2]?.id || 'm-3',
      },
    };
  }

  // Question: How can I become job-ready faster?
  if (queryLower.includes('faster') || queryLower.includes('speed') || queryLower.includes('accelerate') || queryLower.includes('timeline')) {
    return {
      text: `To compress your timeline from ${roadmapData.profile.targetTimelineMonths} months down by 30–40%: \n\n1. **Stop building generic tutorial clones** (Todo apps, weather widgets). They provide near-zero recruiter signal.\n2. **Anchor your portfolio around 1 flagship production app** with real-time state and testing (e.g. *${roadmapData.projects[0]?.title || 'Flagship Platform'}*).\n3. **Increase weekly focused hours** to 18–20 hrs/week and execute the daily 10-day skill sprints.`,
      actionPill: {
        label: 'View Flagship Project Brief →',
        actionType: 'open-project',
        targetId: roadmapData.projects[0]?.id,
      },
    };
  }

  // Question: Which project would strengthen my portfolio?
  if (queryLower.includes('project') || queryLower.includes('portfolio') || queryLower.includes('strengthen')) {
    const flagship = roadmapData.projects[0];
    return {
      text: `Your strongest portfolio anchor is **${flagship?.title}** (${flagship?.difficulty}). \n\nWhy? Because recruiters at **${company}** specifically look for candidates who can solve real domain challenges: **${flagship?.skills.slice(0, 4).join(', ')}**. Building this immediately proves you can contribute on day one without hand-holding.`,
      actionPill: {
        label: `Explore ${flagship?.title} →`,
        actionType: 'open-project',
        targetId: flagship?.id,
      },
    };
  }

  // Question: Why do I need this skill? / Why this skill?
  if (queryLower.includes('why do i need') || queryLower.includes('why this skill') || queryLower.includes('importance')) {
    return {
      text: `Every skill in your CareerForge roadmap was reverse-engineered from actual hiring manager evaluations at **${company}** organizations. \n\nFor example, while generic courses teach only baseline syntax, modern teams require **${highestSkill}** because production codebases operate under strict reliability and collaboration standards.`,
      actionPill: {
        label: 'Review Skill Gap Breakdown →',
        actionType: 'open-gap',
      },
    };
  }

  // Question: Stepping stones / realistic path
  if (queryLower.includes('stepping stone') || queryLower.includes('path') || queryLower.includes('roles') || queryLower.includes('intermediate')) {
    return {
      text: `Most students believe the journey is a straight jump: *Student → Dream Role*. In reality, successful engineers navigate **2–3 tactical stepping stones** (such as open-source contributor or technical intern). \n\nEach intermediate step buys you the credibility, PR review habits, and reference signals needed to unlock your target offer at **${roadmapData.profile.dreamRole}**.`,
    };
  }

  // Fallback customized AI response
  return {
    text: `Analyzing your trajectory for **${role}** at **${company}** (Current Readiness: **${readiness}%**). \n\nTo maximize your hiring probability, prioritize closing your **${roadmapData.skillGaps[0]?.name || 'primary skill gap'}** and deploying your flagship **${roadmapData.projects[0]?.title}** proof of work. What specific aspect of your roadmap would you like to drill into?`,
    actionPill: {
      label: 'Explore Recommended Milestone',
      actionType: 'navigate-node',
      targetId: roadmapData.milestones[2]?.id,
    },
  };
}
