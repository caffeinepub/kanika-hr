import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search } from "lucide-react";
import type { ModuleId } from "./Sidebar";

const moduleTitles: Record<ModuleId, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Welcome back, Priya 👋" },
  recruitment: {
    title: "Recruitment",
    subtitle: "Manage pipeline & candidates",
  },
  onboarding: { title: "Onboarding", subtitle: "New hire progress tracker" },
  performance: { title: "Performance", subtitle: "Reviews, ratings & goals" },
  learning: {
    title: "Learning & Development",
    subtitle: "Courses, quests & growth paths",
  },
  recognition: { title: "Recognition", subtitle: "Celebrate wins together" },
  analytics: { title: "Analytics", subtitle: "Data-driven HR insights" },
};

interface TopBarProps {
  activeModule: ModuleId;
}

export default function TopBar({ activeModule }: TopBarProps) {
  const { title, subtitle } = moduleTitles[activeModule];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border flex-shrink-0">
      {/* Module title */}
      <div>
        <h1 className="font-display font-bold text-lg text-foreground leading-tight">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search anything..."
            className="pl-8 h-8 w-56 text-sm bg-muted border-0 focus-visible:ring-1"
            data-ocid="topbar.search_input"
          />
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-muted transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            PS
          </div>
          <ChevronDown size={12} className="text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
