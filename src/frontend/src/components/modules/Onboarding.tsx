import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  type OnboardingTask,
  employees,
  onboardingTaskTemplates,
} from "@/mockData";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

const newHires = employees.filter((e) => e.isNewHire);

const categoryColors: Record<OnboardingTask["category"], string> = {
  IT: "bg-blue-100 text-blue-700",
  HR: "bg-purple-100 text-purple-700",
  Training: "bg-amber-100 text-amber-700",
  Social: "bg-emerald-100 text-emerald-700",
};

const categoryIcons: Record<OnboardingTask["category"], string> = {
  IT: "💻",
  HR: "📋",
  Training: "📚",
  Social: "🤝",
};

function getStatusBadge(progress: number) {
  if (progress === 100)
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px]">
        ✓ Complete
      </Badge>
    );
  if (progress >= 50)
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">
        In Progress
      </Badge>
    );
  return (
    <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[10px]">
      Getting Started
    </Badge>
  );
}

interface HireRowProps {
  hire: (typeof newHires)[0];
}

function HireRow({ hire }: HireRowProps) {
  const [expanded, setExpanded] = useState(false);

  // Generate tasks based on progress
  const tasksCompleted = Math.floor(
    (hire.onboardingProgress / 100) * onboardingTaskTemplates.length,
  );
  const tasks = onboardingTaskTemplates.map((t, i) => ({
    ...t,
    completed: i < tasksCompleted,
  }));

  const daysInRole = Math.floor(
    (new Date().getTime() - new Date(hire.hireDate).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="border border-border rounded-xl overflow-hidden hover:shadow-card transition-shadow">
      <button
        type="button"
        className="flex items-center gap-4 p-4 bg-card cursor-pointer w-full text-left hover:bg-muted/10 transition-colors"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
          {hire.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm text-foreground">{hire.name}</p>
            {getStatusBadge(hire.onboardingProgress)}
          </div>
          <p className="text-xs text-muted-foreground">
            {hire.role} · {hire.department} · Day {daysInRole}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0 w-40">
          <Progress value={hire.onboardingProgress} className="h-2 flex-1" />
          <span className="text-xs font-bold text-foreground w-9 text-right">
            {hire.onboardingProgress}%
          </span>
        </div>

        {/* Expand toggle */}
        <span className="text-muted-foreground ml-1">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Expanded task list */}
      {expanded && (
        <div className="border-t border-border bg-muted/20 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Onboarding Checklist
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg border bg-card",
                  task.completed
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-border",
                )}
              >
                {task.completed ? (
                  <CheckCircle2
                    size={14}
                    className="text-emerald-600 flex-shrink-0"
                  />
                ) : (
                  <Circle
                    size={14}
                    className="text-muted-foreground flex-shrink-0"
                  />
                )}
                <span className="text-xs flex-1 text-foreground">
                  {task.title}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    categoryColors[task.category]
                  }`}
                >
                  {categoryIcons[task.category]} {task.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Onboarding() {
  const totalTasks = onboardingTaskTemplates.length;
  const avgProgress = Math.round(
    newHires.reduce((sum, h) => sum + h.onboardingProgress, 0) /
      newHires.length,
  );

  return (
    <div className="p-6 space-y-6" data-ocid="onboarding.section">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-xs">
          <CardContent className="p-4">
            <p className="text-2xl font-bold font-display text-foreground">
              {newHires.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              New Hires This Month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardContent className="p-4">
            <p className="text-2xl font-bold font-display text-foreground">
              {avgProgress}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. Completion
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardContent className="p-4">
            <p className="text-2xl font-bold font-display text-foreground">
              {newHires.filter((h) => h.onboardingProgress === 100).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Fully Onboarded
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardContent className="p-4">
            <p className="text-2xl font-bold font-display text-foreground">
              {totalTasks}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Tasks per Hire</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-foreground">
            New Hire Pipeline
          </h2>
          <p className="text-xs text-muted-foreground">
            {newHires.length} active onboarding journeys
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          data-ocid="onboarding.primary_button"
        >
          <UserPlus size={14} />
          Add New Hire
        </Button>
      </div>

      {/* Hire List */}
      <div className="space-y-3">
        {newHires.map((hire) => (
          <HireRow key={hire.id} hire={hire} />
        ))}
      </div>

      {/* Task Category Guide */}
      <Card className="shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Onboarding Task Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(
              ["IT", "HR", "Training", "Social"] as OnboardingTask["category"][]
            ).map((cat) => {
              const catTasks = onboardingTaskTemplates.filter(
                (t) => t.category === cat,
              );
              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl border border-border bg-muted/20 text-center"
                >
                  <span className="text-2xl">{categoryIcons[cat]}</span>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {cat}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {catTasks.length} tasks
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
