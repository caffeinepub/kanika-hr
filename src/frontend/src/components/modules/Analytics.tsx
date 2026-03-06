import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  attritionTrend,
  departmentAttritionRisk,
  departmentDistribution,
  engagementByMonth,
  headcountByMonth,
  hiringFunnelData,
} from "@/mockData";
import { AlertTriangle, Brain, TrendingDown, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function getRiskColor(score: number): string {
  if (score >= 50) return "oklch(0.577 0.245 27.325)";
  if (score >= 30) return "oklch(0.78 0.18 80)";
  return "oklch(0.62 0.18 160)";
}

function getRiskBadge(score: number) {
  if (score >= 50)
    return (
      <Badge className="bg-red-100 text-red-700 border-red-200 text-[10px]">
        High
      </Badge>
    );
  if (score >= 30)
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">
        Medium
      </Badge>
    );
  return (
    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px]">
      Low
    </Badge>
  );
}

export default function Analytics() {
  return (
    <div className="p-6 space-y-5" data-ocid="analytics.section">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Time to Hire",
            value: "18d",
            change: "−3d",
            positive: true,
            icon: <Users size={16} />,
          },
          {
            label: "Offer Accept Rate",
            value: "84%",
            change: "+4%",
            positive: true,
            icon: <TrendingDown size={16} />,
          },
          {
            label: "Eng. Score (Mar)",
            value: "85",
            change: "+3pts",
            positive: true,
            icon: <Brain size={16} />,
          },
          {
            label: "Attrition (Mar)",
            value: "2.7%",
            change: "−0.4%",
            positive: true,
            icon: <AlertTriangle size={16} />,
          },
        ].map((kpi) => (
          <Card key={kpi.label} className="shadow-xs">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {kpi.icon}
                </div>
                <Badge className="text-[10px] text-emerald-700 bg-emerald-50 border-emerald-200">
                  {kpi.change}
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

      {/* Chart Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hiring Funnel */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Hiring Funnel
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Candidate drop-off by stage
            </p>
          </CardHeader>
          <CardContent data-ocid="analytics.hiring.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={hiringFunnelData}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 285)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                  width={60}
                />
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
                  radius={[0, 4, 4, 0]}
                  name="Candidates"
                >
                  {hiringFunnelData.map((_entry, index) => (
                    <Cell
                      key={`hiring-cell-${_entry.stage}`}
                      fill={`oklch(${0.52 + index * 0.04} ${0.26 - index * 0.03} 290)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attrition Trend */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Attrition Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Monthly attrition rate (%)
            </p>
          </CardHeader>
          <CardContent data-ocid="analytics.attrition.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={attritionTrend}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
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
                  domain={[2, 5]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.88 0.02 285)",
                    fontSize: "12px",
                  }}
                  formatter={(v: number) => [`${v}%`, "Attrition Rate"]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="oklch(0.65 0.22 28)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "oklch(0.65 0.22 28)" }}
                  name="Attrition"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Chart Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Engagement Score */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Employee Engagement
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Monthly eNPS-style score (0-100)
            </p>
          </CardHeader>
          <CardContent data-ocid="analytics.engagement.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={engagementByMonth}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="engagementGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="oklch(0.62 0.18 160)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.62 0.18 160)"
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
                  domain={[60, 95]}
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
                  dataKey="score"
                  stroke="oklch(0.62 0.18 160)"
                  strokeWidth={2}
                  fill="url(#engagementGrad)"
                  name="Engagement"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Headcount */}
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Department Headcount
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Current distribution
            </p>
          </CardHeader>
          <CardContent data-ocid="analytics.headcount.chart_point">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={departmentDistribution}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.88 0.02 285)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "oklch(0.55 0.04 285)" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.88 0.02 285)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Employees">
                  {departmentDistribution.map((entry) => (
                    <Cell key={`dept-cell-${entry.name}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Attrition Prediction */}
      <Card className="shadow-xs border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                  <Brain size={13} className="text-primary-foreground" />
                </div>
                AI Attrition Prediction
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Risk scores by department · Updated daily by AI model
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart */}
            <div data-ocid="analytics.attrition_prediction.chart_point">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={departmentAttritionRisk}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0.02 285)"
                  />
                  <XAxis
                    dataKey="department"
                    tick={{ fontSize: 9, fill: "oklch(0.55 0.04 285)" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "oklch(0.55 0.04 285)" }}
                    domain={[0, 70]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid oklch(0.88 0.02 285)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v}%`, "Risk Score"]}
                  />
                  <Bar
                    dataKey="riskScore"
                    radius={[4, 4, 0, 0]}
                    name="Attrition Risk"
                  >
                    {departmentAttritionRisk.map((entry) => (
                      <Cell
                        key={`risk-cell-${entry.department}`}
                        fill={getRiskColor(entry.riskScore)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk table */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Department Risk Summary
              </p>
              {departmentAttritionRisk.map((dept) => (
                <div
                  key={dept.department}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border"
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">
                      {dept.department}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {dept.employees} employees
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${dept.riskScore}%`,
                          backgroundColor: getRiskColor(dept.riskScore),
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground w-8 text-right">
                      {dept.riskScore}%
                    </span>
                    {getRiskBadge(dept.riskScore)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
