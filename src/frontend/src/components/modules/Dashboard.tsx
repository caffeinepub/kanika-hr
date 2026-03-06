import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  departmentDistribution,
  headcountByMonth,
  recentActivity,
} from "@/mockData";
import {
  Briefcase,
  Flame,
  Star,
  TrendingDown,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpiCards = [
  {
    label: "Total Employees",
    value: "210",
    change: "+7 this month",
    positive: true,
    icon: <Users size={20} />,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Open Roles",
    value: "18",
    change: "5 urgent",
    positive: false,
    icon: <Briefcase size={20} />,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Attrition Rate",
    value: "2.7%",
    change: "−0.4% vs last month",
    positive: true,
    icon: <TrendingDown size={20} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Avg Performance",
    value: "4.1",
    change: "+0.2 vs last quarter",
    positive: true,
    icon: <Star size={20} />,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const activityTypeColor: Record<string, string> = {
  learning: "bg-blue-100 text-blue-700",
  onboarding: "bg-emerald-100 text-emerald-700",
  recognition: "bg-amber-100 text-amber-700",
  recruitment: "bg-purple-100 text-purple-700",
  performance: "bg-rose-100 text-rose-700",
  hr: "bg-cyan-100 text-cyan-700",
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6" data-ocid="dashboard.section">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.label}
            className="shadow-xs hover:shadow-card transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center ${kpi.color}`}
                >
                  {kpi.icon}
                </div>
                <Badge
                  variant="secondary"
                  className={`text-[10px] font-medium ${kpi.positive ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-amber-700 bg-amber-50 border-amber-200"}`}
                >
                  {kpi.positive ? "▲" : "●"} {kpi.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                {kpi.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Headcount Trend */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              Headcount Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Monthly employee count over 8 months
            </p>
          </CardHeader>
          <CardContent data-ocid="dashboard.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={headcountByMonth}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="headcountGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="oklch(0.52 0.26 290)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.52 0.26 290)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 285)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                  domain={[170, 215]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.88 0.02 285)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="oklch(0.52 0.26 290)"
                  strokeWidth={2}
                  fill="url(#headcountGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Pie */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              By Department
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Headcount distribution
            </p>
          </CardHeader>
          <CardContent data-ocid="dashboard.department.chart_point">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  stroke="none"
                >
                  {departmentDistribution.map((entry) => (
                    <Cell key={`dept-pie-${entry.name}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.88 0.02 285)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {departmentDistribution.slice(0, 4).map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: d.fill }}
                  />
                  <span className="text-muted-foreground flex-1 truncate">
                    {d.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                      activityTypeColor[item.type] || "bg-muted"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gamification Snapshot */}
        <Card className="shadow-xs bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Trophy size={16} className="text-amber-500" /> Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* XP */}
            <div className="bg-card rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Level 8</span>
                <span className="text-xs text-muted-foreground">
                  4,250 / 5,000 XP
                </span>
              </div>
              <Progress value={85} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">750 XP to Level 9</p>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  12 Day Streak
                </p>
                <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-card rounded-xl p-3 border border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Recent Badges
              </p>
              <div className="flex gap-2 flex-wrap">
                {["🏆 Top Performer", "🚀 Innovator", "🤝 Team Player"].map(
                  (b) => (
                    <span
                      key={b}
                      className="text-xs bg-muted rounded-full px-2 py-1 font-medium"
                    >
                      {b}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Daily Quest progress */}
            <div className="bg-card rounded-xl p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Zap size={13} className="text-primary" />
                  <p className="text-xs font-semibold text-foreground">
                    Daily Quests
                  </p>
                </div>
                <span className="text-xs font-bold text-primary">1/3 done</span>
              </div>
              <Progress value={33} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-1.5">
                +225 XP available today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
