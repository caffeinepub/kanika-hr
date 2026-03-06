import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  type PerformanceReview,
  performanceReviews,
  ratingDistribution,
} from "@/mockData";
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={
            s <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/30 fill-muted-foreground/10"
          }
        />
      ))}
    </div>
  );
}

function getRatingColor(rating: number) {
  if (rating === 5) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (rating === 4) return "bg-blue-100 text-blue-700 border-blue-200";
  if (rating === 3) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
}

function getGoalStatusColor(status: string) {
  if (status === "Completed")
    return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (status === "On Track") return "text-blue-600 bg-blue-50 border-blue-200";
  return "text-amber-600 bg-amber-50 border-amber-200";
}

interface ReviewRowProps {
  review: PerformanceReview;
  index: number;
}

function ReviewRow({ review, index }: ReviewRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`performance.review.item.${index}`}
    >
      <button
        type="button"
        className="flex items-center gap-4 p-4 bg-card cursor-pointer hover:bg-muted/20 transition-colors w-full text-left"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
          {review.avatar}
        </div>

        {/* Name + Dept */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground">
            {review.employeeName}
          </p>
          <p className="text-xs text-muted-foreground">
            {review.department} · {review.period}
          </p>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center gap-1">
          <StarRating rating={review.rating} />
          <Badge className={`text-[10px] ${getRatingColor(review.rating)}`}>
            {review.rating}.0 / 5
          </Badge>
        </div>

        {/* AI Summary excerpt */}
        <div className="hidden lg:flex items-start gap-1.5 max-w-xs">
          <Brain size={12} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground line-clamp-2">
            {review.aiSummary}
          </p>
        </div>

        <span className="text-muted-foreground ml-1 flex-shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/10 p-4 space-y-4">
          {/* Full AI Summary */}
          <div className="flex gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Brain size={13} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-1">
                AI Performance Review Summary
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {review.aiSummary}
              </p>
            </div>
          </div>

          {/* Goals */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target size={11} /> Goals & Progress
            </p>
            <div className="space-y-2">
              {review.goals.map((goal) => (
                <div
                  key={goal.title}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-card"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">
                      {goal.title}
                    </p>
                  </div>
                  <Progress
                    value={Math.min(goal.progress, 100)}
                    className="h-1.5 w-24 flex-shrink-0"
                  />
                  <span className="text-xs font-bold text-foreground w-9 text-right flex-shrink-0">
                    {Math.min(goal.progress, 100)}%
                  </span>
                  <Badge
                    className={`text-[10px] flex-shrink-0 ${getGoalStatusColor(goal.status)}`}
                  >
                    {goal.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Performance() {
  return (
    <div className="p-6 space-y-6" data-ocid="performance.section">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Rating Distribution Chart */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp size={15} className="text-primary" />
              Rating Distribution
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Q4 2024 performance review results
            </p>
          </CardHeader>
          <CardContent data-ocid="performance.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={ratingDistribution}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 285)"
                />
                <XAxis
                  dataKey="rating"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.88 0.02 285)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="oklch(0.52 0.26 290)"
                  radius={[4, 4, 0, 0]}
                  name="Employees"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Review Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {ratingDistribution.map((r) => {
                const total = ratingDistribution.reduce(
                  (s, x) => s + x.count,
                  0,
                );
                const pct = Math.round((r.count / total) * 100);
                return (
                  <div key={r.rating} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-14 flex-shrink-0">
                      {r.rating}
                    </span>
                    <Progress value={pct} className="h-2 flex-1" />
                    <span className="text-xs font-bold text-foreground w-12 text-right">
                      {r.count}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="bg-muted/30 rounded-xl p-3 text-center border border-border">
              <p className="text-2xl font-bold font-display text-foreground">
                4.1
              </p>
              <p className="text-xs text-muted-foreground">Average Rating</p>
              <div className="flex justify-center mt-1">
                <StarRating rating={4} />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full gap-1.5"
              data-ocid="performance.primary_button"
            >
              Start New Review Cycle
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-foreground">
            Performance Reviews
          </h2>
          <p className="text-xs text-muted-foreground">
            {performanceReviews.length} reviews · Q4 2024
          </p>
        </div>
        <div className="space-y-3">
          {performanceReviews.map((review, i) => (
            <ReviewRow key={review.id} review={review} index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
