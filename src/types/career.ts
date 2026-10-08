export type CompanyType =
  | 'Startup'
  | 'Product Company'
  | 'Big Tech'
  | 'Consulting'
  | 'Research Lab'
  | 'Agency'
  | 'Any';

export type StartingPoint =
  | 'Beginner'
  | 'College Student'
  | 'Some Projects'
  | 'Internship Experience'
  | 'Working Professional';

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  name: string;
  level: SkillProficiency;
}

export interface UserProfile {
  dreamRole: string;
  companyType: CompanyType;
  startingPoint: StartingPoint;
  currentSkills: UserSkill[];
  weeklyHours: number;
  targetTimelineMonths: number;
}

export type RecruiterSignal = 'CRITICAL' | 'HIGH' | 'MEDIUM';
export type MilestoneStatus = 'completed' | 'in-progress' | 'locked' | 'recommended';
export type MilestoneDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type BranchTrack = 'core' | 'technical' | 'experience';

export interface ResourceLink {
  name: string;
  type: 'documentation' | 'repo' | 'guide' | 'practice' | 'book';
  description: string;
  url?: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle?: string;
  category: 'foundation' | 'technical-depth' | 'portfolio' | 'real-world' | 'interview' | 'target';
  phaseId: string;
  phaseName: string;
  status: MilestoneStatus;
  whyThisMatters: string;
  recruiterSignal: RecruiterSignal;
  skillsDemonstrated: string[];
  estimatedWeeks: string;
  recommendedResources: ResourceLink[];
  suggestedProject: string;
  evidenceOfCompletion: string;
  prerequisites: string[];
  difficulty: MilestoneDifficulty;
  branch: BranchTrack;
  position: { x: number; y: number };
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  durationWeeks: string;
  description: string;
  unlockCondition: string;
  milestoneIds: string[];
}

export interface SkillGap {
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'Data' | 'System Design' | 'Testing' | 'Communication' | 'Projects' | 'Experience';
  currentScore: number; // 0-100
  requiredScore: number; // 0-100
  gap: number;
  unlocksCount: number;
  urgency: 'Highest' | 'Medium' | 'Low';
  recommendedSprintAction: string;
}

export interface ProjectBrief {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Production-Grade';
  estimatedTime: string;
  skills: string[];
  recruiterSignalStars: number;
  portfolioValue: 'CRITICAL' | 'VERY HIGH' | 'HIGH';
  overview: string;
  architecture: string[];
  keyFeatures: string[];
  recruiterChecklist: string[];
  deliverables: string[];
  techStack: string[];
}

export interface CareerSteppingStone {
  id: string;
  role: string;
  companyProfile: string;
  order: number;
  isTargetRole?: boolean;
  isCurrent?: boolean;
  readinessScoreRequired: number;
  typicalCompensation: string;
  typicalSkills: string[];
  experienceGained: string[];
  whatItUnlocksNext: string;
  recruiterExpectations: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  impact: 'HIGH' | 'MEDIUM';
  reason: string;
  actionLabel: string;
  targetNodeId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progressPercent: number;
  badgeCode: string;
}

export interface CareerRoadmapData {
  profile: UserProfile;
  readinessScore: number;
  currentMilestoneTitle: string;
  phases: Phase[];
  milestones: Milestone[];
  skillGaps: SkillGap[];
  radarCategories: {
    category: string;
    current: number;
    required: number;
    fullMark: number;
  }[];
  highestImpactSkill: {
    name: string;
    reason: string;
    unlocksCount: number;
    sprintDuration: string;
    sprintTasks: string[];
  };
  projects: ProjectBrief[];
  steppingStones: CareerSteppingStone[];
  recommendations: CareerRecommendation[];
  achievements: Achievement[];
  metrics: {
    skillsCompleted: number;
    skillsTotal: number;
    projectsCompleted: number;
    projectsTotal: number;
    credentialsCompleted: number;
    credentialsTotal: number;
    experienceCompleted: number;
    experienceTotal: number;
    milestonesCompleted: number;
    milestonesTotal: number;
  };
}
