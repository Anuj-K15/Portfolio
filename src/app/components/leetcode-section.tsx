"use client";
import React from "react";
import { SectionHeader } from "./section-header";
import { Progress } from "@/components/ui/progress";
import { Flame, TrendingUp, Target } from "lucide-react";
import { useLeetCode } from "@/hooks/use-leetcode";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CountUpNumber } from "@/components/ui/count-up-number";

export function LeetCodeSection({
  username = "anujkarambalkar1504",
}: {
  username?: string;
}) {
  const { data: stats, error, isLoading } = useLeetCode(username);

  const totalSolved = stats?.totalSolved as number | undefined;
  const totalQuestions = (stats?.totalQuestions ??
    stats?.totalQuestionCount) as number | undefined;
  const easySolved = stats?.easySolved;
  const mediumSolved = stats?.mediumSolved;
  const hardSolved = stats?.hardSolved;
  const totalEasy = stats?.totalEasy as number | undefined;
  const totalMedium = stats?.totalMedium as number | undefined;
  const totalHard = stats?.totalHard as number | undefined;

  const streakDays =
    stats?.streak ??
    stats?.streakDays ??
    stats?.matchedUser?.userCalendar?.streak;
  const contestRating =
    stats?.contestRating ??
    stats?.contest?.rating ??
    stats?.userContestRanking?.rating;
  const acceptanceRate = stats?.acceptanceRate as number | undefined;
  const ranking = stats?.ranking as number | undefined;

  const profileUrl = `https://leetcode.com/${encodeURIComponent(username)}/`;

  const completionPercent =
    typeof totalSolved === "number" &&
    typeof totalQuestions === "number" &&
    totalQuestions > 0
      ? Math.round((totalSolved / totalQuestions) * 100)
      : undefined;
  const remaining =
    typeof totalSolved === "number" && typeof totalQuestions === "number"
      ? Math.max(0, totalQuestions - totalSolved)
      : undefined;

  return (
    <section id="leetcode" className="py-12 md:py-16">
      <SectionHeader
        title="LeetCode"
        subtitle="Live stats from my LeetCode journey — fetched dynamically from the API."
        align="left"
      />

      {/* Top stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Problems Solved */}
        <div className="rounded-2xl border border-emerald-400/15 bg-white/5 p-5 backdrop-blur-lg">
          <div className="text-slate-200/85">Problems Solved</div>
          {isLoading ? (
            <div className="mt-3 h-8 w-24 animate-pulse rounded bg-white/10" />
          ) : typeof totalSolved === "number" ? (
            <CountUpNumber
              className="mt-2 block text-3xl font-semibold text-white"
              to={totalSolved}
              duration={800}
            />
          ) : (
            <span className="mt-2 block text-3xl font-semibold text-white">
              —
            </span>
          )}
          {typeof completionPercent === "number" && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              <Target className="size-3" /> {completionPercent}%
            </div>
          )}
        </div>

        {/* Acceptance Rate */}
        <div className="rounded-2xl border border-emerald-400/15 bg-white/5 p-5 backdrop-blur-lg">
          <div className="text-slate-200/85">Acceptance Rate</div>
          {isLoading ? (
            <div className="mt-3 h-8 w-28 animate-pulse rounded bg-white/10" />
          ) : typeof acceptanceRate === "number" ? (
            <CountUpNumber
              className="mt-2 block text-3xl font-semibold text-white"
              to={acceptanceRate}
              decimals={2}
              suffix="%"
              duration={900}
            />
          ) : (
            <span className="mt-2 block text-3xl font-semibold text-white">
              —
            </span>
          )}
          {typeof acceptanceRate === "number" && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              <TrendingUp className="size-3" />
              {/* No delta available; only displaying current value */}
              Live
            </div>
          )}
        </div>

        {/* Global Rank */}
        <div className="rounded-2xl border border-emerald-400/15 bg-white/5 p-5 backdrop-blur-lg">
          <div className="text-slate-200/85">Global Rank</div>
          {isLoading ? (
            <div className="mt-3 h-8 w-32 animate-pulse rounded bg-white/10" />
          ) : typeof ranking === "number" ? (
            <CountUpNumber
              className="mt-2 block text-3xl font-semibold text-white"
              to={ranking}
              prefix="#"
              duration={900}
            />
          ) : (
            <span className="mt-2 block text-3xl font-semibold text-white">
              —
            </span>
          )}
        </div>

        {/* Current Streak */}
        <div className="rounded-2xl border border-emerald-400/15 bg-white/5 p-5 backdrop-blur-lg">
          <div className="text-slate-200/85">Current Streak</div>
          {isLoading ? (
            <div className="mt-3 h-8 w-24 animate-pulse rounded bg-white/10" />
          ) : typeof streakDays === "number" ? (
            <CountUpNumber
              className="mt-2 block text-3xl font-semibold text-white"
              to={streakDays}
              suffix="+ days"
              duration={800}
            />
          ) : (
            <span className="mt-2 block text-3xl font-semibold text-white">
              —
            </span>
          )}
          {typeof streakDays === "number" && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              <Flame className="size-3" /> Hot streak!
            </div>
          )}
        </div>
      </div>

      {/* Progress row */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Completion Progress Donut */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Completion Progress</span>
            <span className="ml-auto rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px]">
              OVERALL
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr]">
            <div className="relative mx-auto h-48 w-48">
              {typeof completionPercent === "number" &&
              typeof remaining === "number" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Completed",
                          value: Math.max(0, completionPercent),
                        },
                        {
                          name: "Remaining",
                          value: Math.max(0, 100 - completionPercent),
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      startAngle={90}
                      endAngle={-270}
                      innerRadius={60}
                      outerRadius={80}
                      stroke="none"
                      isAnimationActive={true}
                      animationBegin={0}
                      animationDuration={900}
                      animationEasing="ease-out"
                    >
                      <Cell key="completed" fill="#10B981" />
                      <Cell key="remaining" fill="rgba(255,255,255,0.08)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded-full bg-white/5" />
              )}
              {typeof completionPercent === "number" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {typeof completionPercent === "number" ? (
                      <CountUpNumber
                        className="text-2xl font-bold text-emerald-300"
                        to={completionPercent}
                        suffix="%"
                        duration={900}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-emerald-300">
                        —
                      </span>
                    )}
                    <div className="text-xs text-slate-300/75">Completion</div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                {typeof totalSolved === "number" ? (
                  <CountUpNumber
                    className="text-xl font-semibold text-white"
                    to={totalSolved}
                    duration={800}
                  />
                ) : (
                  <span className="text-xl font-semibold text-white">—</span>
                )}
                <div className="text-xs text-slate-300/80">Solved</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                {typeof remaining === "number" ? (
                  <CountUpNumber
                    className="text-xl font-semibold text-white"
                    to={remaining}
                    duration={800}
                  />
                ) : (
                  <span className="text-xl font-semibold text-white">—</span>
                )}
                <div className="text-xs text-slate-300/80">Remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Progress Breakdown</span>
          </div>
          <div className="mt-4 space-y-5">
            {typeof easySolved === "number" &&
              typeof totalEasy === "number" && (
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-200/85">
                    <span>Easy</span>
                    <span className="tabular-nums">
                      {easySolved}/{totalEasy}
                    </span>
                  </div>
                  <Progress
                    value={(easySolved / Math.max(1, totalEasy)) * 100}
                  />
                </div>
              )}
            {typeof mediumSolved === "number" &&
              typeof totalMedium === "number" && (
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-200/85">
                    <span>Medium</span>
                    <span className="tabular-nums">
                      {mediumSolved}/{totalMedium}
                    </span>
                  </div>
                  <Progress
                    value={(mediumSolved / Math.max(1, totalMedium)) * 100}
                  />
                </div>
              )}
            {typeof hardSolved === "number" &&
              typeof totalHard === "number" && (
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-200/85">
                    <span>Hard</span>
                    <span className="tabular-nums">
                      {hardSolved}/{totalHard}
                    </span>
                  </div>
                  <Progress
                    value={(hardSolved / Math.max(1, totalHard)) * 100}
                  />
                </div>
              )}
            {typeof totalSolved === "number" &&
              typeof totalQuestions === "number" && (
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-200/85">
                    <span>Total Progress</span>
                    <span className="tabular-nums">
                      {totalSolved}/{totalQuestions}
                    </span>
                  </div>
                  <Progress
                    value={(totalSolved / Math.max(1, totalQuestions)) * 100}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
