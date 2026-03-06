import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

export type ModuleId =
  | "dashboard"
  | "recruitment"
  | "onboarding"
  | "performance"
  | "learning"
  | "recognition"
  | "analytics";

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "recruitment", label: "Recruitment", icon: <Users size={18} /> },
  { id: "onboarding", label: "Onboarding", icon: <UserCheck size={18} /> },
  { id: "performance", label: "Performance", icon: <TrendingUp size={18} /> },
  { id: "learning", label: "Learning", icon: <BookOpen size={18} /> },
  { id: "recognition", label: "Recognition", icon: <Award size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
];

interface SidebarProps {
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
}

export default function Sidebar({
  activeModule,
  onModuleChange,
}: SidebarProps) {
  const userXP = 4250;
  const userLevel = 8;
  const xpToNextLevel = 5000;
  const xpProgress = Math.round((userXP / xpToNextLevel) * 100);

  return (
    <aside className="sidebar-shell flex flex-col w-64 min-h-screen border-r border-border bg-card">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <Zap size={18} className="text-primary-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              Kanika<span className="text-primary">HR</span>
            </span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
              People Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Modules
        </p>
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`sidebar.${item.id}.link`}
              onClick={() => onModuleChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={14} className="opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* User Profile Widget */}
      <div className="px-3 pb-4 border-t border-border pt-4">
        <div className="bg-muted/50 rounded-xl p-3 space-y-3">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                Priya Sharma
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Senior Engineer
              </p>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>

          {/* XP & Level */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  Lv.{userLevel}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userXP.toLocaleString()} XP
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {xpToNextLevel.toLocaleString()} next
              </span>
            </div>
            <Progress value={xpProgress} className="h-1.5" />
          </div>

          {/* Badges quick view */}
          <div className="flex items-center gap-1 flex-wrap">
            {["🏆", "🚀", "🤝"].map((badge) => (
              <span
                key={badge}
                className="text-base leading-none hover:scale-110 transition-transform cursor-default"
                title="Badge"
              >
                {badge}
              </span>
            ))}
            <span className="text-xs text-muted-foreground ml-1">+0 more</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
