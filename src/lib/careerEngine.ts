import {
  CareerRoadmapData,
  UserProfile,
  Milestone,
  SkillGap,
  CareerSteppingStone,
  ProjectBrief,
  Phase,
  CareerRecommendation,
  Achievement
} from '../types/career';
import {
  demoFrontendFintechProfile,
  demoFrontendFintechRoadmap,
  demoAiMlProfile,
  demoAiMlRoadmap,
  demoUiUxProfile,
  demoUiUxRoadmap
} from '../data/mockCareers';

/**
 * Intelligent deterministic career intelligence engine.
 * Takes a specific user profile and reverse-engineers a high-fidelity roadmap.
 */
export function generateCareerRoadmap(userProfile: UserProfile): CareerRoadmapData {
  const roleLower = userProfile.dreamRole.toLowerCase();

  // 1. Check for AI/ML target
  if (roleLower.includes('ai') || roleLower.includes('ml') || roleLower.includes('machine learning') || roleLower.includes('data science') || roleLower.includes('research')) {
    return adaptRoadmap(demoAiMlRoadmap, userProfile);
  }

  // 2. Check for UI/UX target
  if (roleLower.includes('ui') || roleLower.includes('ux') || roleLower.includes('design') || roleLower.includes('product design')) {
    return adaptRoadmap(demoUiUxRoadmap, userProfile);
  }

  // 3. Check for Frontend / Web target (Default flagship)
  if (roleLower.includes('front') || roleLower.includes('web') || roleLower.includes('react') || roleLower.includes('software') || roleLower.includes('fullstack') || roleLower.includes('full-stack')) {
    return adaptRoadmap(demoFrontendFintechRoadmap, userProfile);
  }

  // 4. Synthesize custom roadmap for any unique dream role!
  return synthesizeCustomRoadmap(userProfile);
}

/**
 * Adapt a baseline roadmap to specific user skills, starting point, and hours
 */
function adaptRoadmap(baseline: CareerRoadmapData, profile: UserProfile): CareerRoadmapData {
  // Deep clone baseline to avoid mutating templates
  const roadmap: CareerRoadmapData = JSON.parse(JSON.stringify(baseline));
  roadmap.profile = { ...profile };

  // Adjust starting score based on starting point
  let baseScore = 20;
  if (profile.startingPoint === 'Beginner') baseScore = 12;
  else if (profile.startingPoint === 'College Student') baseScore = 24;
  else if (profile.startingPoint === 'Some Projects') baseScore = 34;
  else if (profile.startingPoint === 'Internship Experience') baseScore = 52;
  else if (profile.startingPoint === 'Working Professional') baseScore = 64;

  // Bonus for current skills
  const skillNames = profile.currentSkills.map(s => s.name.toLowerCase());
  let skillBonus = 0;
  profile.currentSkills.forEach(s => {
    if (s.level === 'Advanced') skillBonus += 4;
    else if (s.level === 'Intermediate') skillBonus += 2.5;
    else skillBonus += 1;
  });

  const computedReadiness = Math.min(95, Math.max(10, Math.round(baseScore + skillBonus)));
  roadmap.readinessScore = computedReadiness;

  // Dynamically update milestones based on user skills
  roadmap.milestones = roadmap.milestones.map((m) => {
    const hasMatchingSkill = m.skillsDemonstrated.some(demSkill =>
      skillNames.some(userSkill => demSkill.toLowerCase().includes(userSkill) || userSkill.includes(demSkill.toLowerCase()))
    );

    if (hasMatchingSkill && m.category === 'foundation') {
      return { ...m, status: 'completed' };
    }
    return m;
  });

  // Recalculate metrics
  const completedMilestones = roadmap.milestones.filter(m => m.status === 'completed').length;
  roadmap.metrics.milestonesCompleted = completedMilestones;
  roadmap.metrics.milestonesTotal = roadmap.milestones.length;

  return roadmap;
}

/**
 * Synthesizes a completely dynamic reverse-engineered roadmap for any arbitrary custom role.
 */
function synthesizeCustomRoadmap(profile: UserProfile): CareerRoadmapData {
  const role = profile.dreamRole || 'Senior Cloud & Platform Engineer';
  const company = profile.companyType || 'Product Company';

  const phases: Phase[] = [
    {
      id: 'phase-custom-1',
      number: 'PHASE 01',
      title: 'Domain Foundations & Protocols',
      durationWeeks: '3–4 weeks',
      description: `Core primitives and architectural foundations required for ${role}.`,
      unlockCondition: 'Master core language runtimes and asynchronous workflows',
      milestoneIds: ['cm-1', 'cm-2'],
    },
    {
      id: 'phase-custom-2',
      number: 'PHASE 02',
      title: 'Technical Depth & Architecture',
      durationWeeks: '4–8 weeks',
      description: `Production-grade tooling, state management, and defensive systems design.`,
      unlockCondition: 'Build strict typed module with integration test suite',
      milestoneIds: ['cm-3', 'cm-4'],
    },
    {
      id: 'phase-custom-3',
      number: 'PHASE 03',
      title: 'Targeted Production Portfolio',
      durationWeeks: '4–6 weeks',
      description: `Build and deploy an enterprise-grade proof-of-work project tailored for ${company}.`,
      unlockCondition: 'Deploy production service with public health telemetry',
      milestoneIds: ['cm-5', 'cm-6'],
    },
    {
      id: 'phase-custom-4',
      number: 'PHASE 04',
      title: 'Real-World Experience & Signals',
      durationWeeks: '6–10 weeks',
      description: 'Collaborative code contributions, contract sprints, or technical fellowship.',
      unlockCondition: 'Verified pull requests merged in domain repositories',
      milestoneIds: ['cm-7'],
    },
    {
      id: 'phase-custom-5',
      number: 'PHASE 05',
      title: 'Interview Mastery & Placement',
      durationWeeks: 'Sprint',
      description: `Live pair-programming drills and role-specific system design defense for ${company}.`,
      unlockCondition: 'Score > 85% in mock technical evaluations',
      milestoneIds: ['cm-8'],
    },
  ];

  const milestones: Milestone[] = [
    {
      id: 'cm-1',
      title: `${role} Core Fundamentals`,
      subtitle: 'Engine Architecture & Runtimes',
      category: 'foundation',
      phaseId: 'phase-custom-1',
      phaseName: 'Domain Foundations & Protocols',
      status: 'completed',
      whyThisMatters: `Modern ${company} hiring managers test foundational understanding first. Without a rock-solid mental model of execution runtimes and memory management, candidates stumble in live rounds.`,
      recruiterSignal: 'HIGH',
      skillsDemonstrated: ['Core Architecture', 'Execution Protocols', 'Debugging'],
      estimatedWeeks: '3 weeks',
      recommendedResources: [
        { name: 'Official Architecture Documentation', type: 'documentation', description: 'In-depth runtime specifications and execution mechanics' },
      ],
      suggestedProject: 'Build a low-overhead profiling fixture for core operations',
      evidenceOfCompletion: 'Documented test harness with deterministic benchmarks',
      prerequisites: ['Basic programming fluency'],
      difficulty: 'Intermediate',
      branch: 'core',
      position: { x: 50, y: 50 },
    },
    {
      id: 'cm-2',
      title: 'Production Tooling & CI/CD Pipelines',
      subtitle: 'Automated Linting, Docker & Security Audits',
      category: 'foundation',
      phaseId: 'phase-custom-1',
      phaseName: 'Domain Foundations & Protocols',
      status: 'completed',
      whyThisMatters: 'Demonstrates professional standards. Code that isn’t automatically tested and linted is treated as student hobby work.',
      recruiterSignal: 'HIGH',
      skillsDemonstrated: ['Docker', 'GitHub Actions', 'Security Scanning'],
      estimatedWeeks: '2 weeks',
      recommendedResources: [
        { name: 'Modern CI/CD Engineering Blueprint', type: 'guide', description: 'Setting up automated preview deploys and static analysis' },
      ],
      suggestedProject: 'Containerized multi-stage Docker build with automated GitHub Action validation',
      evidenceOfCompletion: 'Passing CI badge on public GitHub repository',
      prerequisites: ['cm-1'],
      difficulty: 'Intermediate',
      branch: 'core',
      position: { x: 50, y: 140 },
    },
    {
      id: 'cm-3',
      title: 'Advanced Architecture & Scalability Patterns',
      subtitle: 'Concurrency, Data Pipelines & Failover',
      category: 'technical-depth',
      phaseId: 'phase-custom-2',
      phaseName: 'Technical Depth & Architecture',
      status: 'in-progress',
      whyThisMatters: `High-value roles at ${company} require engineers who design for edge cases: network partitions, high concurrency, and data loss prevention.`,
      recruiterSignal: 'CRITICAL',
      skillsDemonstrated: ['System Scalability', 'Fault Tolerance', 'Concurrency Control'],
      estimatedWeeks: '4 weeks',
      recommendedResources: [
        { name: 'High-Throughput Systems Handbook', type: 'guide', description: 'Design patterns for distributed nodes and data consistency' },
      ],
      suggestedProject: 'Fault-tolerant queue with dead-letter recovery and backpressure throttling',
      evidenceOfCompletion: 'Resilience test simulating 50% packet drop without data loss',
      prerequisites: ['cm-2'],
      difficulty: 'Advanced',
      branch: 'technical',
      position: { x: 30, y: 240 },
    },
    {
      id: 'cm-4',
      title: 'Observability & Distributed Tracing',
      subtitle: 'Prometheus, OpenTelemetry & Metrics',
      category: 'technical-depth',
      phaseId: 'phase-custom-2',
      phaseName: 'Technical Depth & Architecture',
      status: 'recommended',
      whyThisMatters: 'Production systems are only as good as their telemetry. Proving you can monitor latency percentiles (p99) signals senior engineering maturity.',
      recruiterSignal: 'HIGH',
      skillsDemonstrated: ['OpenTelemetry', 'Structured Logging', 'Latency Profiling'],
      estimatedWeeks: '2.5 weeks',
      recommendedResources: [
        { name: 'Distributed Systems Observability Guide', type: 'documentation', description: 'Instrumenting spans and context propagation' },
      ],
      suggestedProject: 'Instrument a microservice with OpenTelemetry and Jaeger trace visualizer',
      evidenceOfCompletion: 'Live trace visualization showing p99 latency decomposition',
      prerequisites: ['cm-3'],
      difficulty: 'Advanced',
      branch: 'technical',
      position: { x: 70, y: 240 },
    },
    {
      id: 'cm-5',
      title: `Flagship Portfolio: Production ${role} Platform`,
      subtitle: 'Full-Spec Domain Proof of Work',
      category: 'portfolio',
      phaseId: 'phase-custom-3',
      phaseName: 'Targeted Production Portfolio',
      status: 'locked',
      whyThisMatters: `Recruiters at ${company} reject generic classroom projects immediately. A single bespoke platform demonstrating real user traffic or realistic data payloads wins the interview.`,
      recruiterSignal: 'CRITICAL',
      skillsDemonstrated: ['Full Stack Execution', 'Domain Mastery', 'API Design', 'Cloud Deployment'],
      estimatedWeeks: '4 weeks',
      recommendedResources: [
        { name: 'CareerForge Project Architecture Blueprint', type: 'guide', description: 'Formatting architecture specs that recruiters review' },
      ],
      suggestedProject: `CloudForge — Scalable Platform tailored for ${company} standards`,
      evidenceOfCompletion: 'Public URL with demo credentials, GitHub CI/CD badges, and architectural whitepaper',
      prerequisites: ['cm-3', 'cm-4'],
      difficulty: 'Expert',
      branch: 'core',
      position: { x: 50, y: 350 },
    },
    {
      id: 'cm-6',
      title: 'Automated Verification & Resilience Testing',
      subtitle: 'Chaos Engineering & Load Injection',
      category: 'portfolio',
      phaseId: 'phase-custom-3',
      phaseName: 'Targeted Production Portfolio',
      status: 'locked',
      whyThisMatters: 'Proves the project is not just a surface-level demo, but can survive load spikes and invalid payloads.',
      recruiterSignal: 'HIGH',
      skillsDemonstrated: ['Load Testing', 'Chaos Engineering', 'Stress Profiling'],
      estimatedWeeks: '2 weeks',
      recommendedResources: [
        { name: 'k6 Performance Testing Masterclass', type: 'practice', description: 'Scripting realistic user load traffic' },
      ],
      suggestedProject: 'Simulate 1,000 concurrent users against CloudForge with k6 benchmark charts',
      evidenceOfCompletion: 'Automated performance report committed to repo',
      prerequisites: ['cm-5'],
      difficulty: 'Advanced',
      branch: 'technical',
      position: { x: 50, y: 440 },
    },
    {
      id: 'cm-7',
      title: 'Real-World Production Contributions',
      subtitle: 'Industry Collaboration / Contract Sprint',
      category: 'real-world',
      phaseId: 'phase-4',
      phaseName: 'Real-World Experience & Signals',
      status: 'locked',
      whyThisMatters: 'Validates that you can thrive in established developer teams, adhere to PR conventions, and communicate asynchronously.',
      recruiterSignal: 'CRITICAL',
      skillsDemonstrated: ['Cross-functional Collaboration', 'Code Reviews', 'Git PR Workflow'],
      estimatedWeeks: '6–8 weeks',
      recommendedResources: [
        { name: 'Open Source Contribution Guide', type: 'guide', description: 'Navigating large codebases and submitting accepted PRs' },
      ],
      suggestedProject: 'Contribute 2 impactful fixes or features to active open-source repositories',
      evidenceOfCompletion: 'Merged pull requests with maintainer reviews',
      prerequisites: ['cm-5'],
      difficulty: 'Advanced',
      branch: 'experience',
      position: { x: 50, y: 530 },
    },
    {
      id: 'cm-8',
      title: `Dream Role: ${role}`,
      subtitle: `Target Offer at ${company}`,
      category: 'target',
      phaseId: 'phase-5',
      phaseName: 'Interview Mastery & Placement',
      status: 'locked',
      whyThisMatters: 'The destination. Reverse-engineered through verifiable proof of work and realistic stepping stones.',
      recruiterSignal: 'CRITICAL',
      skillsDemonstrated: ['Domain Leadership', 'Engineering Craft', 'System Thinking'],
      estimatedWeeks: 'Target Placement',
      recommendedResources: [
        { name: 'Executive Technical Interview Framework', type: 'guide', description: 'Architectural storytelling and compensation negotiation' },
      ],
      suggestedProject: 'Complete 30-60-90 day onboarding impact plan',
      evidenceOfCompletion: 'Signed offer letter',
      prerequisites: ['cm-6', 'cm-7'],
      difficulty: 'Expert',
      branch: 'core',
      position: { x: 50, y: 620 },
    },
  ];

  const skillGaps: SkillGap[] = [
    {
      name: 'System Architecture & Concurrency',
      category: 'System Design',
      currentScore: 25,
      requiredScore: 85,
      gap: 60,
      unlocksCount: 3,
      urgency: 'Highest',
      recommendedSprintAction: 'Implement high-throughput queue with backpressure handling',
    },
    {
      name: 'Observability & Metrics Telemetry',
      category: 'Cloud',
      currentScore: 20,
      requiredScore: 80,
      gap: 60,
      unlocksCount: 2,
      urgency: 'Highest',
      recommendedSprintAction: 'Instrument services with OpenTelemetry traces',
    },
    {
      name: 'Automated CI/CD & Security Audits',
      category: 'Testing',
      currentScore: 30,
      requiredScore: 75,
      gap: 45,
      unlocksCount: 2,
      urgency: 'Medium',
      recommendedSprintAction: 'Configure GitHub Actions with automated vulnerability scanning',
    },
  ];

  const steppingStones: CareerSteppingStone[] = [
    {
      id: 'c-step-1',
      role: profile.startingPoint,
      companyProfile: 'Current Position',
      order: 1,
      isCurrent: true,
      readinessScoreRequired: 0,
      typicalCompensation: '$0 – Entry',
      typicalSkills: profile.currentSkills.map(s => s.name),
      experienceGained: ['Academic/Tutorial experience', 'Personal learning'],
      whatItUnlocksNext: 'Unlocks intermediate apprentice / open-source contributions.',
      recruiterExpectations: 'Strong hunger for learning, clear communication.',
    },
    {
      id: 'c-step-2',
      role: `Junior / Associate ${role}`,
      companyProfile: 'Seed to Series A Tech Startup',
      order: 2,
      readinessScoreRequired: 45,
      typicalCompensation: '$75,000 – $105,000',
      typicalSkills: ['Core Architecture', 'CI/CD Pipelines', 'Debugging', 'Team PRs'],
      experienceGained: ['Shipping sub-features', 'Resolving production tickets'],
      whatItUnlocksNext: `Unlocks mid-level engineering at ${company}.`,
      recruiterExpectations: 'Ability to independently complete assigned sprint tickets.',
    },
    {
      id: 'c-step-3',
      role: `${role} (Target Role)`,
      companyProfile: `${company} Ecosystem`,
      order: 3,
      isTargetRole: true,
      readinessScoreRequired: 88,
      typicalCompensation: '$125,000 – $180,000 + Equity',
      typicalSkills: ['System Design', 'Production Reliability', 'Cross-functional Ownership'],
      experienceGained: ['Architecting core platforms', 'Mentoring junior teammates'],
      whatItUnlocksNext: 'Senior & Staff Specialist engineering tracks.',
      recruiterExpectations: 'Proven track record of high-impact production delivery.',
    },
  ];

  const projects: ProjectBrief[] = [
    {
      id: 'c-proj-1',
      title: `CloudForge — Distributed ${role} Infrastructure Platform`,
      tagline: `Enterprise-grade platform built specifically to prove competencies required by ${company}.`,
      difficulty: 'Production-Grade',
      estimatedTime: '3–4 weeks',
      skills: ['Architecture', 'API Design', 'Docker', 'OpenTelemetry', 'Automated Testing'],
      recruiterSignalStars: 5,
      portfolioValue: 'CRITICAL',
      overview: `A complete, deployable platform mirroring modern ${company} standards with live metrics and automated CI/CD.`,
      architecture: [
        'Modular decoupled service design with clean separation of concerns.',
        'Structured logging and automated OpenTelemetry tracing.',
        'Docker containerized deployment with health check probes.',
      ],
      keyFeatures: [
        'Automated failover and queue retry mechanisms',
        'Real-time metrics visualizer dashboard',
        'End-to-end integration test suite running in GitHub Actions',
      ],
      recruiterChecklist: [
        'Demonstrates clean architecture without boilerplate clutter',
        'Comprehensive README with architecture rationale and trade-offs',
      ],
      deliverables: ['Live deployment URL', 'Public GitHub repo', 'Architecture documentation'],
      techStack: ['TypeScript / Go', 'Docker', 'PostgreSQL', 'Tailwind CSS'],
    },
  ];

  const recommendations: CareerRecommendation[] = [
    {
      id: 'c-rec-1',
      title: 'Close System Architecture Gap',
      impact: 'HIGH',
      reason: `Closing this unlocks the flagship portfolio milestone and proves you can operate at ${company} standards.`,
      actionLabel: 'Launch Architecture Sprint',
      targetNodeId: 'cm-3',
    },
    {
      id: 'c-rec-2',
      title: 'Build CloudForge Proof of Work',
      impact: 'HIGH',
      reason: 'Recruiters spend seconds scanning portfolios. A single bespoke platform provides 10x signal over tutorials.',
      actionLabel: 'View Project Specification',
      targetNodeId: 'cm-5',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 'c-ach-1',
      title: 'Foundation Verified',
      description: 'Mastered core platform runtimes and CI/CD basics.',
      iconName: 'ShieldCheck',
      unlocked: true,
      progressPercent: 100,
      badgeCode: 'FOUNDATION_VERIFIED',
    },
    {
      id: 'c-ach-2',
      title: 'Architect in Training',
      description: 'Built distributed state and concurrency handlers.',
      iconName: 'Cpu',
      unlocked: false,
      progressPercent: 40,
      badgeCode: 'ARCHITECT_PROGRESS',
    },
  ];

  return {
    profile,
    readinessScore: 30,
    currentMilestoneTitle: 'Advanced Architecture & Scalability Patterns',
    phases,
    milestones,
    skillGaps,
    radarCategories: [
      { category: 'Architecture', current: 35, required: 85, fullMark: 100 },
      { category: 'Tooling/CI', current: 40, required: 80, fullMark: 100 },
      { category: 'Observability', current: 20, required: 75, fullMark: 100 },
      { category: 'Testing', current: 30, required: 75, fullMark: 100 },
      { category: 'Portfolio Proof', current: 25, required: 90, fullMark: 100 },
      { category: 'Collaboration', current: 35, required: 80, fullMark: 100 },
    ],
    highestImpactSkill: {
      name: 'System Architecture & Concurrency',
      reason: `Unlocks 3 critical roadmap milestones and immediately differentiates you from generic applicants targeting ${company}.`,
      unlocksCount: 3,
      sprintDuration: '10-Day Focused Sprint',
      sprintTasks: [
        'Day 1-3: Concurrency models and backpressure handling',
        'Day 4-6: Distributed state contracts and idempotency keys',
        'Day 7-8: Telemetry instrumentation with OpenTelemetry',
        'Day 9-10: Stress-test service under synthetic load spikes',
      ],
    },
    projects,
    steppingStones,
    recommendations,
    achievements,
    metrics: {
      skillsCompleted: 3,
      skillsTotal: 9,
      projectsCompleted: 1,
      projectsTotal: 3,
      credentialsCompleted: 1,
      credentialsTotal: 2,
      experienceCompleted: 0,
      experienceTotal: 2,
      milestonesCompleted: 2,
      milestonesTotal: 8,
    },
  };
}

/**
 * Toggles a milestone completion status and dynamically updates the readiness score and metrics.
 */
export function toggleMilestoneCompletion(
  currentData: CareerRoadmapData,
  milestoneId: string
): { updatedData: CareerRoadmapData; newScore: number; wasCompleted: boolean } {
  const updatedData: CareerRoadmapData = JSON.parse(JSON.stringify(currentData));
  const target = updatedData.milestones.find((m) => m.id === milestoneId);
  if (!target) return { updatedData: currentData, newScore: currentData.readinessScore, wasCompleted: false };

  let wasCompleted = false;
  if (target.status === 'completed') {
    target.status = 'in-progress';
    wasCompleted = false;
  } else {
    target.status = 'completed';
    wasCompleted = true;
  }

  // Recalculate metrics
  const completedCount = updatedData.milestones.filter((m) => m.status === 'completed').length;
  const totalCount = updatedData.milestones.length;
  updatedData.metrics.milestonesCompleted = completedCount;

  // Recalculate score proportionally (base 20 + up to 75 points from milestones)
  const scorePercent = Math.round(20 + (completedCount / totalCount) * 75);
  const newScore = Math.min(100, Math.max(15, scorePercent));
  updatedData.readinessScore = newScore;

  // Update achievements
  if (completedCount >= 4) {
    const ach = updatedData.achievements.find(a => a.id.includes('ach-2') || a.id.includes('ach-1'));
    if (ach) ach.unlocked = true;
  }

  return { updatedData, newScore, wasCompleted };
}
