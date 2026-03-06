import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  type RecognitionPost,
  badges,
  employees,
  recognitionPosts,
} from "@/mockData";
import { Award, Crown, Plus, Trophy, Zap } from "lucide-react";
import { useState } from "react";

// Top earners leaderboard — sort employees by XP
const topEarners = [...employees]
  .sort((a, b) => b.xpPoints - a.xpPoints)
  .slice(0, 10);

function RecognitionCard({
  post,
  index,
}: { post: RecognitionPost; index: number }) {
  const [xpCount, setXpCount] = useState(post.xpReactions);
  const [reacted, setReacted] = useState(false);

  const handleReact = () => {
    setXpCount((p) => (reacted ? p - 1 : p + 1));
    setReacted((p) => !p);
  };

  return (
    <Card
      className="shadow-xs hover:shadow-card transition-shadow"
      data-ocid={`recognition.wall.item.${index}`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Sender → Receiver */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {post.senderAvatar.slice(0, 2)}
            </div>
            <span className="text-xs font-semibold text-foreground truncate">
              {post.sender}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              →
            </span>
            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">
              {post.receiverAvatar.slice(0, 2)}
            </div>
            <span className="text-xs font-semibold text-foreground truncate">
              {post.receiver}
            </span>
          </div>
          <span
            className="text-2xl leading-none flex-shrink-0"
            style={{ filter: `drop-shadow(0 0 6px ${post.badgeColor}80)` }}
          >
            {post.badge}
          </span>
        </div>

        {/* Message */}
        <p className="text-sm text-foreground leading-relaxed">
          {post.message}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            {post.timestamp}
          </span>
          <button
            type="button"
            onClick={handleReact}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all",
              reacted
                ? "bg-amber-100 text-amber-700 border border-amber-200"
                : "bg-muted text-muted-foreground hover:bg-amber-50 hover:text-amber-600",
            )}
          >
            <Zap size={11} />
            {xpCount}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

const rankIcons: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Recognition() {
  return (
    <div className="p-6 space-y-5" data-ocid="recognition.section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-foreground">
            Recognition Wall
          </h2>
          <p className="text-xs text-muted-foreground">
            Celebrate wins and lift each other up
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          data-ocid="recognition.primary_button"
        >
          <Plus size={14} />
          Give Kudos
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recognition Wall */}
        <div className="lg:col-span-2 space-y-3">
          {recognitionPosts.map((post, i) => (
            <RecognitionCard key={post.id} post={post} index={i + 1} />
          ))}
        </div>

        {/* Sidebar: Leaderboard + Badges */}
        <div className="space-y-4">
          {/* Leaderboard */}
          <Card className="shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy size={15} className="text-amber-500" />
                XP Leaderboard
              </CardTitle>
              <p className="text-xs text-muted-foreground">Top 10 this month</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {topEarners.map((emp, i) => (
                  <div
                    key={emp.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted/30",
                      i === 0 && "bg-amber-50/60",
                    )}
                    data-ocid={`recognition.leaderboard.item.${i + 1}`}
                  >
                    {/* Rank */}
                    <span className="text-sm w-6 text-center flex-shrink-0 font-bold text-muted-foreground">
                      {rankIcons[i + 1] || i + 1}
                    </span>

                    {/* Avatar */}
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                        i === 0
                          ? "bg-amber-100 text-amber-700"
                          : i === 1
                            ? "bg-slate-100 text-slate-600"
                            : i === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-primary/10 text-primary",
                      )}
                    >
                      {emp.avatar}
                    </div>

                    {/* Name + Dept */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {emp.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {emp.department}
                      </p>
                    </div>

                    {/* XP */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-0.5">
                        <Zap size={10} className="text-amber-500" />
                        <span className="text-xs font-bold text-amber-600">
                          {emp.xpPoints.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badge Collection */}
          <Card className="shadow-xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Award size={15} className="text-primary" />
                Badge Collection
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {badges.length} badges in the system
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex flex-col items-center p-2.5 rounded-xl border border-border bg-muted/20 text-center hover:shadow-xs transition-shadow cursor-default"
                  >
                    <span className="text-xl leading-none mb-1">
                      {badge.name.split(" ")[0]}
                    </span>
                    <p className="text-[10px] font-semibold text-foreground leading-tight">
                      {badge.name.split(" ").slice(1).join(" ")}
                    </p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      {badge.holders} holders
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
