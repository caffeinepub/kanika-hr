# Kanika-HR

## Current State
A single-page marketing website with sections: Hero, Features, How It Works, Dashboard Demo, Contact, and Footer. The backend exposes only a contact form submission and retrieval API. The frontend is a scrolling landing page with no navigation to separate modules.

## Requested Changes (Diff)

### Add
- Full HR platform with sidebar navigation replacing the single-page layout
- **Dashboard module**: KPI cards (headcount, open roles, attrition rate, avg performance score), recent activity feed, gamification stats (XP, level, badges earned), Recharts charts (headcount trend, department distribution, performance histogram)
- **Recruitment module**: Kanban-style pipeline (Applied, Screened, Interview, Offer, Hired), candidate cards with AI resume screening score, attrition risk indicator, job postings list
- **Onboarding module**: New hire checklist with progress tracking, onboarding tasks with completion status, welcome kit details, buddy assignment
- **Performance module**: Performance review list with AI-generated review summaries, rating distributions chart (Recharts), goal tracking cards, 360 feedback summary
- **Learning module**: Course catalog with personalized AI recommendations, progress bars, XP rewards per course, skill tags, daily quest integration
- **Recognition module**: Recognition Wall (social feed style), peer-to-peer kudos, badges showcase, top earners leaderboard
- **Analytics module**: HR analytics with Recharts charts (hiring funnel, attrition trend, engagement score over time, department headcount), AI attrition prediction widget
- **AI features**: Resume screening score on candidate cards, attrition prediction panel in Analytics, HR chatbot (floating button, slide-in panel with mock Q&A), personalized learning path suggestions, AI performance review summaries
- **Gamification system**: XP points display, badge collection, daily quests panel, leaderboard table, recognition wall with XP reactions
- Persistent sidebar nav with module icons, user profile widget, notification bell
- Realistic mock HR data (employees, candidates, courses, reviews, badges, quests)

### Modify
- App.tsx: Replace single-page layout with sidebar + main content router pattern using React state for active module
- Navbar: Convert to compact top bar inside the platform shell (keep existing landing page or replace with platform directly)
- Keep existing contact form backend API

### Remove
- Single-page scrolling sections (HeroSection, FeaturesSection, HowItWorksSection, DashboardSection, ContactSection, HowItWorksSection) replaced by the full platform
- Old Navbar/Footer replaced by platform shell

## Implementation Plan
1. Write spec.md (this file)
2. Select no new components (existing backend sufficient for contact; all new features use mock data)
3. Generate updated Motoko backend with employee, gamification, and HR data structures
4. Build frontend:
   - Platform shell: Sidebar + TopBar layout wrapper
   - Dashboard module with KPIs, charts, gamification snapshot
   - Recruitment module with pipeline board and AI screening scores
   - Onboarding module with task checklist and progress
   - Performance module with reviews list and charts
   - Learning module with course cards, XP, daily quests
   - Recognition module with wall feed, badges, leaderboard
   - Analytics module with multi-chart layout and AI attrition widget
   - AI Chatbot floating widget
   - Mock data file with realistic HR data
