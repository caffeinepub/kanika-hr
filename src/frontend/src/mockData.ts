// ── Mock HR Data for Kanika-HR Platform ─────────────────────────────────────

export type Department =
  | "Engineering"
  | "Product"
  | "Sales"
  | "Marketing"
  | "HR"
  | "Finance"
  | "Operations";

export interface MockEmployee {
  id: number;
  name: string;
  department: Department;
  role: string;
  xpPoints: number;
  level: number;
  badges: string[];
  attritionRiskScore: number; // 0-100
  performanceRating: number; // 1-5
  avatar: string;
  hireDate: string;
  onboardingProgress: number; // 0-100
  isNewHire: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  role: string;
  department: Department;
  stage: "Applied" | "Screened" | "Interview" | "Offer" | "Hired";
  aiScore: number; // 0-100
  attritionRisk: number; // 0-100
  appliedDate: string;
  avatar: string;
  experience: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  skillTags: string[];
  xpReward: number;
  progress: number; // 0-100
  aiRecommended: boolean;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  enrolled: number;
}

export interface RecognitionPost {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  badge: string;
  badgeColor: string;
  xpReactions: number;
  timestamp: string;
  senderAvatar: string;
  receiverAvatar: string;
}

export interface DailyQuest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

export interface PerformanceReview {
  id: number;
  employeeName: string;
  department: Department;
  period: string;
  rating: number; // 1-5
  aiSummary: string;
  goals: Goal[];
  avatar: string;
}

export interface Goal {
  title: string;
  progress: number; // 0-100
  status: "On Track" | "At Risk" | "Completed";
}

export interface OnboardingTask {
  id: string;
  title: string;
  completed: boolean;
  category: "IT" | "HR" | "Training" | "Social";
}

// ── Employees ────────────────────────────────────────────────────────────────

export const employees: MockEmployee[] = [
  {
    id: 1,
    name: "Priya Sharma",
    department: "Engineering",
    role: "Senior Software Engineer",
    xpPoints: 4250,
    level: 8,
    badges: ["🏆 Top Performer", "🚀 Innovator", "🤝 Team Player"],
    attritionRiskScore: 12,
    performanceRating: 5,
    avatar: "PS",
    hireDate: "2021-03-15",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    department: "Sales",
    role: "Account Executive",
    xpPoints: 3890,
    level: 7,
    badges: ["💰 Revenue Champ", "🎯 Goal Crusher"],
    attritionRiskScore: 28,
    performanceRating: 4,
    avatar: "MJ",
    hireDate: "2020-07-22",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 3,
    name: "Aisha Patel",
    department: "Product",
    role: "Product Manager",
    xpPoints: 5100,
    level: 10,
    badges: ["🏆 Top Performer", "🧠 Visionary", "🤝 Team Player", "⭐ Star"],
    attritionRiskScore: 8,
    performanceRating: 5,
    avatar: "AP",
    hireDate: "2019-11-05",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 4,
    name: "Daniel Chen",
    department: "Engineering",
    role: "DevOps Engineer",
    xpPoints: 2750,
    level: 5,
    badges: ["🔧 Builder", "🚀 Innovator"],
    attritionRiskScore: 45,
    performanceRating: 3,
    avatar: "DC",
    hireDate: "2022-01-10",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 5,
    name: "Sofia Torres",
    department: "Marketing",
    role: "Head of Marketing",
    xpPoints: 4600,
    level: 9,
    badges: ["🎨 Creative", "💡 Thought Leader", "🏆 Top Performer"],
    attritionRiskScore: 15,
    performanceRating: 5,
    avatar: "ST",
    hireDate: "2020-04-18",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 6,
    name: "James Wright",
    department: "Finance",
    role: "Financial Analyst",
    xpPoints: 1980,
    level: 4,
    badges: ["📊 Data Wizard"],
    attritionRiskScore: 62,
    performanceRating: 3,
    avatar: "JW",
    hireDate: "2023-02-01",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 7,
    name: "Nadia Okonkwo",
    department: "HR",
    role: "HR Business Partner",
    xpPoints: 3450,
    level: 6,
    badges: ["🤝 Team Player", "💙 Culture Champion"],
    attritionRiskScore: 10,
    performanceRating: 4,
    avatar: "NO",
    hireDate: "2021-09-14",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 8,
    name: "Raj Kapoor",
    department: "Engineering",
    role: "Principal Engineer",
    xpPoints: 6200,
    level: 12,
    badges: [
      "🏆 Top Performer",
      "🧠 Visionary",
      "🔧 Builder",
      "🚀 Innovator",
      "⭐ Star",
    ],
    attritionRiskScore: 5,
    performanceRating: 5,
    avatar: "RK",
    hireDate: "2018-06-20",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 9,
    name: "Emma Sullivan",
    department: "Operations",
    role: "Operations Manager",
    xpPoints: 2100,
    level: 4,
    badges: ["⚙️ Optimizer"],
    attritionRiskScore: 38,
    performanceRating: 3,
    avatar: "ES",
    hireDate: "2022-08-30",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 10,
    name: "Carlos Rivera",
    department: "Sales",
    role: "Sales Director",
    xpPoints: 5400,
    level: 11,
    badges: ["💰 Revenue Champ", "🎯 Goal Crusher", "🏆 Top Performer"],
    attritionRiskScore: 18,
    performanceRating: 5,
    avatar: "CR",
    hireDate: "2019-05-12",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 11,
    name: "Ting Zhang",
    department: "Engineering",
    role: "Frontend Engineer",
    xpPoints: 1500,
    level: 3,
    badges: ["🎨 Creative"],
    attritionRiskScore: 25,
    performanceRating: 4,
    avatar: "TZ",
    hireDate: "2024-01-15",
    onboardingProgress: 78,
    isNewHire: true,
  },
  {
    id: 12,
    name: "Amara Diallo",
    department: "Product",
    role: "Junior Product Designer",
    xpPoints: 820,
    level: 2,
    badges: ["🎨 Creative"],
    attritionRiskScore: 20,
    performanceRating: 4,
    avatar: "AD",
    hireDate: "2024-02-05",
    onboardingProgress: 55,
    isNewHire: true,
  },
  {
    id: 13,
    name: "Liam Novak",
    department: "Marketing",
    role: "Content Strategist",
    xpPoints: 680,
    level: 1,
    badges: [],
    attritionRiskScore: 32,
    performanceRating: 3,
    avatar: "LN",
    hireDate: "2024-02-20",
    onboardingProgress: 40,
    isNewHire: true,
  },
  {
    id: 14,
    name: "Sara Kim",
    department: "Finance",
    role: "Senior Accountant",
    xpPoints: 2850,
    level: 5,
    badges: ["📊 Data Wizard", "🤝 Team Player"],
    attritionRiskScore: 22,
    performanceRating: 4,
    avatar: "SK",
    hireDate: "2021-06-07",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 15,
    name: "Oliver Mensah",
    department: "Operations",
    role: "Supply Chain Analyst",
    xpPoints: 1650,
    level: 3,
    badges: ["⚙️ Optimizer"],
    attritionRiskScore: 55,
    performanceRating: 3,
    avatar: "OM",
    hireDate: "2023-04-11",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 16,
    name: "Isabelle Fontaine",
    department: "HR",
    role: "Talent Acquisition Lead",
    xpPoints: 3100,
    level: 6,
    badges: ["💙 Culture Champion", "🤝 Team Player"],
    attritionRiskScore: 14,
    performanceRating: 4,
    avatar: "IF",
    hireDate: "2020-12-01",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 17,
    name: "Ben Okafor",
    department: "Engineering",
    role: "Backend Engineer",
    xpPoints: 2200,
    level: 4,
    badges: ["🔧 Builder"],
    attritionRiskScore: 40,
    performanceRating: 3,
    avatar: "BO",
    hireDate: "2022-11-03",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 18,
    name: "Yuki Tanaka",
    department: "Product",
    role: "UX Researcher",
    xpPoints: 3300,
    level: 6,
    badges: ["🧠 Visionary", "🎨 Creative"],
    attritionRiskScore: 9,
    performanceRating: 5,
    avatar: "YT",
    hireDate: "2021-04-27",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 19,
    name: "Marco Rossi",
    department: "Sales",
    role: "Regional Sales Manager",
    xpPoints: 4100,
    level: 8,
    badges: ["💰 Revenue Champ", "🎯 Goal Crusher"],
    attritionRiskScore: 30,
    performanceRating: 4,
    avatar: "MR",
    hireDate: "2020-09-15",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 20,
    name: "Fatima Al-Hassan",
    department: "Marketing",
    role: "Growth Marketer",
    xpPoints: 2600,
    level: 5,
    badges: ["💡 Thought Leader"],
    attritionRiskScore: 28,
    performanceRating: 4,
    avatar: "FA",
    hireDate: "2022-03-22",
    onboardingProgress: 100,
    isNewHire: false,
  },
  {
    id: 21,
    name: "Kevin Park",
    department: "Engineering",
    role: "ML Engineer",
    xpPoints: 900,
    level: 2,
    badges: [],
    attritionRiskScore: 18,
    performanceRating: 4,
    avatar: "KP",
    hireDate: "2024-03-01",
    onboardingProgress: 25,
    isNewHire: true,
  },
];

// ── Candidates ───────────────────────────────────────────────────────────────

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Elena Vasquez",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    stage: "Applied",
    aiScore: 72,
    attritionRisk: 22,
    appliedDate: "2024-03-01",
    avatar: "EV",
    experience: "5 yrs",
  },
  {
    id: 2,
    name: "Michael Adeyemi",
    role: "Data Scientist",
    department: "Engineering",
    stage: "Applied",
    aiScore: 58,
    attritionRisk: 40,
    appliedDate: "2024-03-02",
    avatar: "MA",
    experience: "3 yrs",
  },
  {
    id: 3,
    name: "Clara Benoit",
    role: "Product Manager",
    department: "Product",
    stage: "Screened",
    aiScore: 91,
    attritionRisk: 10,
    appliedDate: "2024-02-25",
    avatar: "CB",
    experience: "7 yrs",
  },
  {
    id: 4,
    name: "Ahmed Hussain",
    role: "DevOps Engineer",
    department: "Engineering",
    stage: "Screened",
    aiScore: 84,
    attritionRisk: 15,
    appliedDate: "2024-02-28",
    avatar: "AH",
    experience: "4 yrs",
  },
  {
    id: 5,
    name: "Rachel Thompson",
    role: "Account Executive",
    department: "Sales",
    stage: "Interview",
    aiScore: 76,
    attritionRisk: 30,
    appliedDate: "2024-02-20",
    avatar: "RT",
    experience: "6 yrs",
  },
  {
    id: 6,
    name: "Ivan Petrov",
    role: "Backend Engineer",
    department: "Engineering",
    stage: "Interview",
    aiScore: 65,
    attritionRisk: 35,
    appliedDate: "2024-02-18",
    avatar: "IP",
    experience: "4 yrs",
  },
  {
    id: 7,
    name: "Grace Obi",
    role: "UX Designer",
    department: "Product",
    stage: "Interview",
    aiScore: 88,
    attritionRisk: 12,
    appliedDate: "2024-02-15",
    avatar: "GO",
    experience: "5 yrs",
  },
  {
    id: 8,
    name: "Thomas Müller",
    role: "Financial Controller",
    department: "Finance",
    stage: "Offer",
    aiScore: 93,
    attritionRisk: 8,
    appliedDate: "2024-02-10",
    avatar: "TM",
    experience: "8 yrs",
  },
  {
    id: 9,
    name: "Priyanka Singh",
    role: "Content Strategist",
    department: "Marketing",
    stage: "Offer",
    aiScore: 79,
    attritionRisk: 25,
    appliedDate: "2024-02-08",
    avatar: "PS",
    experience: "4 yrs",
  },
  {
    id: 10,
    name: "Lucas Fernandez",
    role: "HR Generalist",
    department: "HR",
    stage: "Hired",
    aiScore: 85,
    attritionRisk: 11,
    appliedDate: "2024-02-01",
    avatar: "LF",
    experience: "3 yrs",
  },
  {
    id: 11,
    name: "Mei Liu",
    role: "Operations Analyst",
    department: "Operations",
    stage: "Hired",
    aiScore: 77,
    attritionRisk: 20,
    appliedDate: "2024-01-28",
    avatar: "ML",
    experience: "2 yrs",
  },
  {
    id: 12,
    name: "Noah Bennett",
    role: "Marketing Manager",
    department: "Marketing",
    stage: "Applied",
    aiScore: 44,
    attritionRisk: 55,
    appliedDate: "2024-03-03",
    avatar: "NB",
    experience: "5 yrs",
  },
  {
    id: 13,
    name: "Chioma Eze",
    role: "Sales Engineer",
    department: "Sales",
    stage: "Screened",
    aiScore: 82,
    attritionRisk: 18,
    appliedDate: "2024-02-26",
    avatar: "CE",
    experience: "4 yrs",
  },
  {
    id: 14,
    name: "Felix Wagner",
    role: "Product Analyst",
    department: "Product",
    stage: "Interview",
    aiScore: 69,
    attritionRisk: 28,
    appliedDate: "2024-02-22",
    avatar: "FW",
    experience: "3 yrs",
  },
  {
    id: 15,
    name: "Amelia Park",
    role: "Software Engineer",
    department: "Engineering",
    stage: "Applied",
    aiScore: 51,
    attritionRisk: 45,
    appliedDate: "2024-03-04",
    avatar: "AP2",
    experience: "2 yrs",
  },
];

// ── Courses ──────────────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: 1,
    title: "Advanced Leadership & People Management",
    category: "Leadership",
    skillTags: ["Leadership", "Communication", "Strategy"],
    xpReward: 500,
    progress: 68,
    aiRecommended: true,
    duration: "6 hrs",
    difficulty: "Advanced",
    enrolled: 142,
  },
  {
    id: 2,
    title: "Data-Driven Decision Making with Python",
    category: "Technical",
    skillTags: ["Python", "Analytics", "Data Science"],
    xpReward: 600,
    progress: 30,
    aiRecommended: true,
    duration: "8 hrs",
    difficulty: "Intermediate",
    enrolled: 238,
  },
  {
    id: 3,
    title: "Effective Communication in Remote Teams",
    category: "Soft Skills",
    skillTags: ["Communication", "Remote Work", "Collaboration"],
    xpReward: 300,
    progress: 100,
    aiRecommended: false,
    duration: "3 hrs",
    difficulty: "Beginner",
    enrolled: 415,
  },
  {
    id: 4,
    title: "Agile & Scrum Masterclass",
    category: "Process",
    skillTags: ["Agile", "Scrum", "Project Management"],
    xpReward: 450,
    progress: 55,
    aiRecommended: true,
    duration: "5 hrs",
    difficulty: "Intermediate",
    enrolled: 312,
  },
  {
    id: 5,
    title: "Financial Modeling for Non-Finance Professionals",
    category: "Finance",
    skillTags: ["Finance", "Excel", "Modeling"],
    xpReward: 400,
    progress: 0,
    aiRecommended: false,
    duration: "4 hrs",
    difficulty: "Intermediate",
    enrolled: 88,
  },
  {
    id: 6,
    title: "Diversity, Equity & Inclusion Foundations",
    category: "Culture",
    skillTags: ["DEI", "Culture", "Inclusion"],
    xpReward: 350,
    progress: 80,
    aiRecommended: false,
    duration: "2.5 hrs",
    difficulty: "Beginner",
    enrolled: 520,
  },
  {
    id: 7,
    title: "Cloud Architecture on AWS",
    category: "Technical",
    skillTags: ["AWS", "Cloud", "Architecture"],
    xpReward: 700,
    progress: 15,
    aiRecommended: false,
    duration: "10 hrs",
    difficulty: "Advanced",
    enrolled: 176,
  },
  {
    id: 8,
    title: "Negotiation & Conflict Resolution",
    category: "Soft Skills",
    skillTags: ["Negotiation", "Conflict", "Diplomacy"],
    xpReward: 380,
    progress: 45,
    aiRecommended: false,
    duration: "3.5 hrs",
    difficulty: "Intermediate",
    enrolled: 203,
  },
  {
    id: 9,
    title: "Sales Psychology & Persuasion Techniques",
    category: "Sales",
    skillTags: ["Sales", "Psychology", "Persuasion"],
    xpReward: 420,
    progress: 0,
    aiRecommended: false,
    duration: "4 hrs",
    difficulty: "Intermediate",
    enrolled: 267,
  },
  {
    id: 10,
    title: "AI & Machine Learning for Business",
    category: "Technical",
    skillTags: ["AI", "ML", "Business Strategy"],
    xpReward: 650,
    progress: 10,
    aiRecommended: true,
    duration: "7 hrs",
    difficulty: "Advanced",
    enrolled: 194,
  },
];

// ── Recognition Posts ────────────────────────────────────────────────────────

export const recognitionPosts: RecognitionPost[] = [
  {
    id: 1,
    sender: "Aisha Patel",
    receiver: "Raj Kapoor",
    message:
      "Raj's architecture decisions on the Q1 platform migration saved us weeks of refactoring. Exceptional technical leadership!",
    badge: "🏆",
    badgeColor: "#f59e0b",
    xpReactions: 245,
    timestamp: "2 hours ago",
    senderAvatar: "AP",
    receiverAvatar: "RK",
  },
  {
    id: 2,
    sender: "Carlos Rivera",
    receiver: "Marcus Johnson",
    message:
      "Marcus closed the Stellar Corp deal that's been in pipeline for 6 months. Brilliant persistence and relationship building!",
    badge: "💰",
    badgeColor: "#10b981",
    xpReactions: 189,
    timestamp: "5 hours ago",
    senderAvatar: "CR",
    receiverAvatar: "MJ",
  },
  {
    id: 3,
    sender: "Nadia Okonkwo",
    receiver: "Sofia Torres",
    message:
      "Sofia's rebrand launch was executed flawlessly. The engagement metrics speak for themselves — 3x our target!",
    badge: "🎨",
    badgeColor: "#8b5cf6",
    xpReactions: 312,
    timestamp: "1 day ago",
    senderAvatar: "NO",
    receiverAvatar: "ST",
  },
  {
    id: 4,
    sender: "Raj Kapoor",
    receiver: "Daniel Chen",
    message:
      "Daniel set up our entire CI/CD pipeline from scratch in under a week. The deployment frequency has doubled since then.",
    badge: "🔧",
    badgeColor: "#3b82f6",
    xpReactions: 156,
    timestamp: "2 days ago",
    senderAvatar: "RK",
    receiverAvatar: "DC",
  },
  {
    id: 5,
    sender: "Isabelle Fontaine",
    receiver: "Nadia Okonkwo",
    message:
      "Nadia championed the new flexible work policy that has dramatically improved team morale. Thank you for advocating for everyone!",
    badge: "💙",
    badgeColor: "#06b6d4",
    xpReactions: 278,
    timestamp: "3 days ago",
    senderAvatar: "IF",
    receiverAvatar: "NO",
  },
  {
    id: 6,
    sender: "Sofia Torres",
    receiver: "Fatima Al-Hassan",
    message:
      "Fatima's SEO strategy drove a 45% increase in organic traffic this quarter. Absolutely phenomenal work!",
    badge: "💡",
    badgeColor: "#f97316",
    xpReactions: 203,
    timestamp: "4 days ago",
    senderAvatar: "ST",
    receiverAvatar: "FA",
  },
  {
    id: 7,
    sender: "Marcus Johnson",
    receiver: "Marco Rossi",
    message:
      "Marco mentored the entire new sales cohort and helped them hit quota in their first month. That's a rarity!",
    badge: "🎯",
    badgeColor: "#ef4444",
    xpReactions: 167,
    timestamp: "5 days ago",
    senderAvatar: "MJ",
    receiverAvatar: "MR",
  },
  {
    id: 8,
    sender: "Yuki Tanaka",
    receiver: "Priya Sharma",
    message:
      "Priya's code reviews are legendary — detailed, educational, and always kind. She's made our whole team better engineers.",
    badge: "⭐",
    badgeColor: "#eab308",
    xpReactions: 334,
    timestamp: "6 days ago",
    senderAvatar: "YT",
    receiverAvatar: "PS",
  },
];

// ── Daily Quests ─────────────────────────────────────────────────────────────

export const dailyQuests: DailyQuest[] = [
  {
    id: 1,
    title: "Complete a lesson",
    description: "Finish at least one module in any active course",
    xpReward: 100,
    completed: true,
  },
  {
    id: 2,
    title: "Give a colleague kudos",
    description: "Send a recognition post to a team member",
    xpReward: 75,
    completed: false,
  },
  {
    id: 3,
    title: "Update your goals",
    description: "Review and update progress on at least one performance goal",
    xpReward: 50,
    completed: false,
  },
];

// ── Performance Reviews ──────────────────────────────────────────────────────

export const performanceReviews: PerformanceReview[] = [
  {
    id: 1,
    employeeName: "Priya Sharma",
    department: "Engineering",
    period: "Q4 2024",
    rating: 5,
    aiSummary:
      "Exceptional technical contributions with consistent delivery excellence. Demonstrated strong mentorship capabilities and led two critical infrastructure projects to completion ahead of schedule.",
    goals: [
      { title: "Ship v2 API", progress: 100, status: "Completed" },
      { title: "Mentor 2 juniors", progress: 100, status: "Completed" },
      { title: "Reduce bug count by 30%", progress: 95, status: "On Track" },
    ],
    avatar: "PS",
  },
  {
    id: 2,
    employeeName: "Marcus Johnson",
    department: "Sales",
    period: "Q4 2024",
    rating: 4,
    aiSummary:
      "Strong pipeline management and client relationship skills. Exceeded Q4 targets by 15%. Opportunity to improve CRM hygiene and expand into new verticals identified by AI analysis.",
    goals: [
      { title: "Hit $2M ARR", progress: 115, status: "Completed" },
      { title: "3 new logos", progress: 67, status: "At Risk" },
      { title: "CRM adoption 90%", progress: 72, status: "At Risk" },
    ],
    avatar: "MJ",
  },
  {
    id: 3,
    employeeName: "Aisha Patel",
    department: "Product",
    period: "Q4 2024",
    rating: 5,
    aiSummary:
      "Visionary product leadership that aligned cross-functional teams around a cohesive roadmap. Launched 3 major features with measurable impact on retention metrics. Outstanding stakeholder management.",
    goals: [
      { title: "Launch mobile app", progress: 100, status: "Completed" },
      { title: "NPS improvement +10", progress: 80, status: "On Track" },
      { title: "OKR alignment 95%", progress: 95, status: "On Track" },
    ],
    avatar: "AP",
  },
  {
    id: 4,
    employeeName: "Daniel Chen",
    department: "Engineering",
    period: "Q4 2024",
    rating: 3,
    aiSummary:
      "Solid technical execution in DevOps transformation. Deployment frequency improved. AI identifies potential for stronger cross-team collaboration and more proactive communication with stakeholders.",
    goals: [
      { title: "CI/CD pipeline setup", progress: 100, status: "Completed" },
      { title: "Reduce deploy time 50%", progress: 60, status: "At Risk" },
      { title: "On-call rotation docs", progress: 40, status: "At Risk" },
    ],
    avatar: "DC",
  },
  {
    id: 5,
    employeeName: "Sofia Torres",
    department: "Marketing",
    period: "Q4 2024",
    rating: 5,
    aiSummary:
      "Transformative brand leadership with exceptional campaign execution. The Q4 relaunch exceeded all KPIs. Creative direction has elevated brand perception scores to an all-time high.",
    goals: [
      { title: "Brand relaunch", progress: 100, status: "Completed" },
      { title: "+3x organic traffic", progress: 100, status: "Completed" },
      { title: "Team of 5 built", progress: 100, status: "Completed" },
    ],
    avatar: "ST",
  },
  {
    id: 6,
    employeeName: "Carlos Rivera",
    department: "Sales",
    period: "Q4 2024",
    rating: 5,
    aiSummary:
      "Phenomenal sales leadership with consistent over-performance. Built a high-performing team culture. AI analysis indicates Carlos as a retention priority — compensation review recommended.",
    goals: [
      { title: "Team target $5M", progress: 118, status: "Completed" },
      { title: "Hire 3 AEs", progress: 100, status: "Completed" },
      { title: "Sales playbook v2", progress: 88, status: "On Track" },
    ],
    avatar: "CR",
  },
];

// ── Onboarding Tasks ──────────────────────────────────────────────────────────

export const onboardingTaskTemplates: OnboardingTask[] = [
  {
    id: "it-1",
    title: "Laptop & equipment setup",
    completed: true,
    category: "IT",
  },
  {
    id: "it-2",
    title: "Software access provisioning",
    completed: true,
    category: "IT",
  },
  {
    id: "it-3",
    title: "Security training & 2FA setup",
    completed: false,
    category: "IT",
  },
  {
    id: "hr-1",
    title: "Sign offer letter & NDA",
    completed: true,
    category: "HR",
  },
  {
    id: "hr-2",
    title: "Complete benefits enrollment",
    completed: true,
    category: "HR",
  },
  {
    id: "hr-3",
    title: "Upload ID documents",
    completed: false,
    category: "HR",
  },
  {
    id: "train-1",
    title: "Company culture orientation",
    completed: true,
    category: "Training",
  },
  {
    id: "train-2",
    title: "Role-specific onboarding track",
    completed: false,
    category: "Training",
  },
  {
    id: "social-1",
    title: "Meet your buddy/mentor",
    completed: false,
    category: "Social",
  },
  {
    id: "social-2",
    title: "Team lunch scheduled",
    completed: false,
    category: "Social",
  },
];

// ── Chart Data ───────────────────────────────────────────────────────────────

export const headcountByMonth = [
  { month: "Aug", count: 178 },
  { month: "Sep", count: 183 },
  { month: "Oct", count: 189 },
  { month: "Nov", count: 192 },
  { month: "Dec", count: 195 },
  { month: "Jan", count: 198 },
  { month: "Feb", count: 203 },
  { month: "Mar", count: 210 },
];

export const departmentDistribution = [
  { name: "Engineering", value: 68, fill: "oklch(0.52 0.26 290)" },
  { name: "Sales", value: 42, fill: "oklch(0.65 0.22 28)" },
  { name: "Product", value: 28, fill: "oklch(0.62 0.18 160)" },
  { name: "Marketing", value: 24, fill: "oklch(0.78 0.18 80)" },
  { name: "Finance", value: 18, fill: "oklch(0.55 0.2 220)" },
  { name: "HR", value: 15, fill: "oklch(0.68 0.22 300)" },
  { name: "Operations", value: 15, fill: "oklch(0.6 0.15 200)" },
];

export const engagementByMonth = [
  { month: "Aug", score: 72 },
  { month: "Sep", score: 74 },
  { month: "Oct", score: 71 },
  { month: "Nov", score: 76 },
  { month: "Dec", score: 75 },
  { month: "Jan", score: 79 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 85 },
];

export const hiringFunnelData = [
  { stage: "Applied", count: 312 },
  { stage: "Screened", count: 187 },
  { stage: "Interview", count: 94 },
  { stage: "Offer", count: 38 },
  { stage: "Hired", count: 22 },
];

export const attritionTrend = [
  { month: "Aug", rate: 4.2 },
  { month: "Sep", rate: 3.8 },
  { month: "Oct", rate: 4.5 },
  { month: "Nov", rate: 3.6 },
  { month: "Dec", rate: 3.2 },
  { month: "Jan", rate: 2.9 },
  { month: "Feb", rate: 3.1 },
  { month: "Mar", rate: 2.7 },
];

export const departmentAttritionRisk = [
  { department: "Finance", riskScore: 58, employees: 18 },
  { department: "Operations", riskScore: 47, employees: 15 },
  { department: "Sales", riskScore: 36, employees: 42 },
  { department: "Engineering", riskScore: 28, employees: 68 },
  { department: "Marketing", riskScore: 25, employees: 24 },
  { department: "Product", riskScore: 14, employees: 28 },
  { department: "HR", riskScore: 11, employees: 15 },
];

export const ratingDistribution = [
  { rating: "5 Stars", count: 42 },
  { rating: "4 Stars", count: 67 },
  { rating: "3 Stars", count: 38 },
  { rating: "2 Stars", count: 12 },
  { rating: "1 Star", count: 4 },
];

// ── Activity Feed ────────────────────────────────────────────────────────────

export const recentActivity = [
  {
    id: 1,
    text: "Raj Kapoor completed Advanced AWS course",
    time: "10m ago",
    icon: "📚",
    type: "learning",
  },
  {
    id: 2,
    text: "New hire Ting Zhang joined Engineering",
    time: "1h ago",
    icon: "🎉",
    type: "onboarding",
  },
  {
    id: 3,
    text: "Priya Sharma received 'Top Performer' badge",
    time: "2h ago",
    icon: "🏆",
    type: "recognition",
  },
  {
    id: 4,
    text: "Thomas Müller offer accepted — Finance",
    time: "3h ago",
    icon: "✅",
    type: "recruitment",
  },
  {
    id: 5,
    text: "Q4 performance reviews cycle closed",
    time: "5h ago",
    icon: "📊",
    type: "performance",
  },
  {
    id: 6,
    text: "Sofia Torres promoted to VP Marketing",
    time: "1d ago",
    icon: "🚀",
    type: "hr",
  },
];

export const badges = [
  {
    name: "🏆 Top Performer",
    color: "#f59e0b",
    description: "Exceptional performance rating",
    holders: 8,
  },
  {
    name: "🚀 Innovator",
    color: "#8b5cf6",
    description: "Drove breakthrough innovation",
    holders: 5,
  },
  {
    name: "🤝 Team Player",
    color: "#06b6d4",
    description: "Exceptional collaboration",
    holders: 12,
  },
  {
    name: "💰 Revenue Champ",
    color: "#10b981",
    description: "Top sales contributor",
    holders: 4,
  },
  {
    name: "🎯 Goal Crusher",
    color: "#ef4444",
    description: "Consistently exceeds targets",
    holders: 9,
  },
  {
    name: "🧠 Visionary",
    color: "#3b82f6",
    description: "Strategic & forward thinking",
    holders: 3,
  },
  {
    name: "🎨 Creative",
    color: "#ec4899",
    description: "Outstanding creative output",
    holders: 7,
  },
  {
    name: "🔧 Builder",
    color: "#f97316",
    description: "Technical craftsmanship",
    holders: 6,
  },
  {
    name: "📊 Data Wizard",
    color: "#6366f1",
    description: "Data mastery & insight",
    holders: 5,
  },
  {
    name: "💙 Culture Champion",
    color: "#0ea5e9",
    description: "Embodying company values",
    holders: 10,
  },
  {
    name: "⭐ Star",
    color: "#eab308",
    description: "All-round excellence",
    holders: 4,
  },
  {
    name: "⚙️ Optimizer",
    color: "#84cc16",
    description: "Process improvement expert",
    holders: 6,
  },
];
