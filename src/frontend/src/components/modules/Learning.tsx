import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { type Course, courses, dailyQuests } from "@/mockData";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

const categories = [
  "All",
  "Leadership",
  "Technical",
  "Soft Skills",
  "Process",
  "Finance",
  "Culture",
  "Sales",
];

const difficultyColors: Record<Course["difficulty"], string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

function CourseCard({ course }: { course: Course }) {
  return (
    <Card
      className={cn(
        "shadow-xs hover:shadow-card transition-all cursor-pointer relative overflow-hidden",
        course.aiRecommended && "ring-2 ring-primary/30",
      )}
    >
      {course.aiRecommended && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />
      )}
      <CardContent className="p-4 space-y-3">
        {/* Category + badges */}
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {course.category}
          </span>
          <div className="flex items-center gap-1">
            {course.aiRecommended && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                <Brain size={9} /> AI Pick
              </span>
            )}
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColors[course.difficulty]}`}
            >
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {course.title}
        </h3>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {course.skillTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {course.enrolled}
          </span>
        </div>

        {/* XP reward */}
        <div className="flex items-center gap-1.5">
          <Zap size={13} className="text-amber-500" />
          <span className="text-xs font-bold text-amber-600">
            +{course.xpReward} XP
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Progress</span>
            <span className="text-[10px] font-bold text-foreground">
              {course.progress}%
            </span>
          </div>
          <Progress value={course.progress} className="h-1.5" />
        </div>

        {/* CTA */}
        <Button
          size="sm"
          variant={
            course.progress === 0
              ? "default"
              : course.progress === 100
                ? "outline"
                : "secondary"
          }
          className="w-full text-xs h-8"
          data-ocid="learning.primary_button"
        >
          {course.progress === 0
            ? "Start Course"
            : course.progress === 100
              ? "✓ Completed"
              : "Continue"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Learning() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quests, setQuests] = useState(dailyQuests);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const toggleQuest = (id: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q)),
    );
  };

  const totalQuestXP = quests
    .filter((q) => q.completed)
    .reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <div className="p-6 space-y-5" data-ocid="learning.section">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-foreground">
                Course Catalog
              </h2>
              <p className="text-xs text-muted-foreground">
                {courses.length} courses available · AI-personalized for you
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-ocid="learning.filter.tab"
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course grid */}
          {filteredCourses.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="learning.empty_state"
            >
              <BookOpen size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No courses in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Daily Quests */}
        <div className="space-y-4">
          <Card className="shadow-xs bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy size={15} className="text-amber-500" />
                Daily Quests
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {quests.filter((q) => q.completed).length}/{quests.length}{" "}
                completed · {totalQuestXP} XP earned
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={cn(
                    "p-3 rounded-xl border bg-card space-y-2 transition-all",
                    quest.completed
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-border",
                  )}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={quest.completed}
                      onCheckedChange={() => toggleQuest(quest.id)}
                      className="mt-0.5"
                      data-ocid="learning.quest.checkbox"
                    />
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-xs font-semibold",
                          quest.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground",
                        )}
                      >
                        {quest.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {quest.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pl-6">
                    <Zap size={11} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-600">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                </div>
              ))}

              <div className="bg-card rounded-xl border border-border p-3 text-center">
                <p className="text-xs font-semibold text-foreground">
                  Quest Streak
                </p>
                <p className="text-2xl font-bold font-display text-amber-500 mt-1">
                  🔥 12
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Days in a row
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning stats */}
          <Card className="shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  label: "Courses in progress",
                  value: courses.filter(
                    (c) => c.progress > 0 && c.progress < 100,
                  ).length,
                },
                {
                  label: "Courses completed",
                  value: courses.filter((c) => c.progress === 100).length,
                },
                { label: "Total XP from learning", value: "1,850" },
                { label: "Hours learned this month", value: "12.5h" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
