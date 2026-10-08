# CAREERFORGE
> **Tagline:** *"Reverse-engineer your dream career."*  
> **Type:** College Hackathon Prototype & AI Career Intelligence Platform  
> **Live Local Dev Server:** `http://localhost:3001` (or `http://localhost:3000`)

---

## ⚡ The Core Problem CareerForge Solves

Most career advice given to college students is painfully generic: *"Learn React and build a portfolio."*

In reality, the journey to landing a specific role at a specific type of company involves nuanced, high-leverage steps:
- Strict micro-credentials and contracts
- Intermediate stepping stone roles (OSS contributor, seed-stage intern)
- Niche, production-grade proof-of-work projects
- Real-world hiring manager evaluation rubrics

**CareerForge solves this by taking a user's exact dream role and reverse-engineering it into a personalized, highly interactive roadmap.**

---

## 🚀 Key Features

### 1. Interactive AI Onboarding Wizard & Reverse-Engineering Engine
- **Step 1:** Target Destination Role (`"Frontend Engineer at a product-based fintech startup"`, `"AI/ML Engineer at a research-focused company"`, `"UI/UX Designer at a top SaaS company"`, or custom).
- **Step 2:** Company Type (Startup, Product Company, Big Tech, Research Lab, Consulting, Agency).
- **Step 3:** Baseline Starting Point (Beginner, College Student, Some Projects, Internship, Professional).
- **Step 4:** Interactive Skill Chips with proficiency levels (Beginner, Intermediate, Advanced).
- **Step 5 & 6:** Time commitment (hrs/week) & Target timeline (months).
- **AI Synthesis Animation:** High-tech radar scanner with rotating intelligence status messages.

### 2. Main Interactive Roadmap Dashboard (Dual View)
- **Visual Career Graph / Skill Tree:** Multi-branch nodes (Core Spine, Technical Depth Track, Real-World Experience Track) connected with glowing connection lines.
- **Structured Phases View:** Phase 01 Foundation to Phase 06 Target Role with unlock conditions and duration budgets.
- **"Why This Step Matters" Feature (Crucial Differentiator):** Every milestone has an explicit "Why?" button detailing:
  - Reverse-engineered rationale
  - Recruiter signal level (`CRITICAL`, `HIGH`, `MEDIUM`)
  - Specific skills demonstrated
  - Verifiable evidence of completion
  - High-signal curated resources
  - Interactive "Mark Complete" toggle that dynamically triggers confetti and recalculates career readiness!

### 3. Multivariate Skill Gap Radar & Skill Sprint
- Visual radar chart comparing current capability against the role's target rubric.
- Detailed competency deficit percentage bars (Current vs Required vs Deficit).
- **Next Best Move Card:** AI recommendation detailing the single highest-leverage skill that unlocks the most milestones.
- **Skill Sprint Modal:** 10-day actionable execution plan with interactive checkboxes.

### 4. Project Forge (Bespoke Proof-of-Work Generator)
- Generates production-grade SaaS platforms tailored to the target role (e.g., *FinTrack — Real-Time Fintech Analytics Platform*).
- Star ratings for recruiter signals, difficulty, and portfolio impact.
- **View Project Brief Modal:** Complete architectural specification, key features, and what hiring leads inspect.
- **"Generate Another Project" Button:** Live AI generation animation synthesizing fresh project specifications.

### 5. The Realistic Path (Career Stepping Stones)
- Horizontal visual timeline showing realistic intermediate roles (e.g. *Student → OSS Contributor → Startup Intern → Associate Engineer → Target Role*).
- Clickable roles revealing typical compensation ranges, experience gained, recruiter mental models, and what each step unlocks.

### 6. CareerForge AI Advisor & Interactive Chat
- Live readiness score gauge and 3 strategic recommendations.
- Context-aware **"Ask CareerForge"** conversational interface with prompt pills:
  - *"What should I learn next?"*
  - *"Can I skip this step?"*
  - *"How can I become job-ready faster?"*
  - *"Which project would strengthen my portfolio?"*
  - *"Why do I need this skill?"*

### 7. Professional Gamification & Progress Tracking
- Career Readiness %, Skills (4/12), Projects (1/4), Credentials (1/3), Experience (0/2), Milestones (5/18).
- Professional achievement badges with unlock criteria and progress bars.

### 8. 1-Click Hackathon Demo Switcher
- Instant toggle between 3 primary demo goals for seamless judge evaluations:
  1. **Frontend Engineer @ Fintech Startup**
  2. **AI/ML Engineer @ Research Lab**
  3. **UI/UX Designer @ SaaS**

---

## 🛠️ Technical Architecture

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom dark-mode-first aesthetic (Linear/Vercel inspired)
- **Animations:** Framer Motion + Canvas Confetti
- **Icons:** Lucide React
- **Charts:** Recharts (Radar, PolarGrid, ResponsiveContainer)
- **Intelligence Layer:** Modular deterministic Career Intelligence Engine (`src/lib/careerEngine.ts`) and AI Chat Engine (`src/lib/mockAiChat.ts`), architected for straightforward drop-in LLM API integration.

---

## 🏃 Running the Application

1. Ensure Node.js (v18+) is installed.
2. In the project directory (`careerforge`):
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` (or the port indicated in terminal) in your browser.
4. Build for production:
   ```bash
   npm run build
   ```
