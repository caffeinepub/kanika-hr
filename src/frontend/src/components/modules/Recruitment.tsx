import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type Candidate, candidates } from "@/mockData";
import { AlertTriangle, Brain, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

type Stage = Candidate["stage"];

const stages: Stage[] = ["Applied", "Screened", "Interview", "Offer", "Hired"];

const stageColors: Record<Stage, string> = {
  Applied: "bg-slate-100 border-slate-200",
  Screened: "bg-blue-50 border-blue-200",
  Interview: "bg-amber-50 border-amber-200",
  Offer: "bg-purple-50 border-purple-200",
  Hired: "bg-emerald-50 border-emerald-200",
};

const stageHeaderColors: Record<Stage, string> = {
  Applied: "bg-slate-500",
  Screened: "bg-blue-500",
  Interview: "bg-amber-500",
  Offer: "bg-purple-500",
  Hired: "bg-emerald-500",
};

function getScoreBadge(score: number) {
  if (score >= 80)
    return (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        {score}
      </span>
    );
  if (score >= 60)
    return (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
        {score}
      </span>
    );
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
      {score}
    </span>
  );
}

function getRiskBadge(risk: number) {
  if (risk < 25)
    return (
      <span className="text-[10px] font-medium text-emerald-600">Low risk</span>
    );
  if (risk < 50)
    return (
      <span className="text-[10px] font-medium text-amber-600">Med risk</span>
    );
  return (
    <span className="text-[10px] font-medium text-red-600">High risk</span>
  );
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-xs p-3 hover:shadow-card transition-shadow cursor-pointer space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
            {candidate.avatar.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {candidate.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {candidate.role}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <div className="flex items-center gap-1">
            <Brain size={10} className="text-primary" />
            {getScoreBadge(candidate.aiScore)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px]">
        <span className="bg-muted rounded-full px-2 py-0.5 text-muted-foreground">
          {candidate.experience}
        </span>
        <div className="flex items-center gap-1">
          <AlertTriangle size={10} className="text-muted-foreground" />
          {getRiskBadge(candidate.attritionRisk)}
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        {candidate.department}
      </p>
    </div>
  );
}

export default function Recruitment() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = [
    "All",
    "Engineering",
    "Product",
    "Sales",
    "Marketing",
    "Finance",
    "HR",
    "Operations",
  ];

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || c.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const byStage = (stage: Stage) => filtered.filter((c) => c.stage === stage);

  return (
    <div className="p-6 space-y-5" data-ocid="recruitment.section">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm"
              data-ocid="recruitment.search_input"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            data-ocid="recruitment.filter.tab"
          >
            <Filter size={13} />
            Filter
          </Button>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          data-ocid="recruitment.primary_button"
        >
          <Plus size={14} />
          Post Job
        </Button>
      </div>

      {/* Dept filters */}
      <div className="flex gap-1.5 flex-wrap">
        {departments.map((dept) => (
          <button
            type="button"
            key={dept}
            onClick={() => setSelectedDept(dept)}
            data-ocid="recruitment.filter.tab"
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all",
              selectedDept === dept
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-3">
        {stages.map((stage) => {
          const count = byStage(stage).length;
          return (
            <div key={stage} className="text-center">
              <div
                className={`h-1.5 rounded-full ${stageHeaderColors[stage]} mb-2`}
              />
              <p className="text-xl font-bold font-display text-foreground">
                {count}
              </p>
              <p className="text-xs text-muted-foreground">{stage}</p>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-3 min-h-[500px]">
        {stages.map((stage) => (
          <div
            key={stage}
            data-ocid={`recruitment.pipeline.${stage.toLowerCase()}.panel`}
            className={`rounded-xl border-2 ${stageColors[stage]} p-3 space-y-2`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${stageHeaderColors[stage]}`}
                />
                <span className="text-xs font-semibold text-foreground">
                  {stage}
                </span>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground bg-white/60 rounded-full w-5 h-5 flex items-center justify-center">
                {byStage(stage).length}
              </span>
            </div>
            {byStage(stage).length === 0 ? (
              <div
                className="text-center py-6 text-xs text-muted-foreground/60"
                data-ocid={`recruitment.${stage.toLowerCase()}.empty_state`}
              >
                No candidates
              </div>
            ) : (
              byStage(stage).map((c) => (
                <CandidateCard key={c.id} candidate={c} />
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
