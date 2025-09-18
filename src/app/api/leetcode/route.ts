import { NextRequest } from "next/server";

export const revalidate = 3600; // Cache for 1 hour on the server

type GqlDifficulty = "All" | "Easy" | "Medium" | "Hard";

function byDifficulty<T extends { difficulty: GqlDifficulty }>(
  arr: T[] | undefined,
  diff: GqlDifficulty
): T | undefined {
  return Array.isArray(arr)
    ? arr.find((a) => a.difficulty === diff)
    : undefined;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "anujkarambalkar1504";
  const year = new Date().getFullYear();

  const query = `
    query userStats($username: String!, $year: Int) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
        userCalendar(year: $year) {
          streak
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "anuj-portfolio/1.0",
        referer: "https://leetcode.com/",
        origin: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username, year } }),
      next: { revalidate },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `LeetCode GraphQL error: ${res.status} ${res.statusText} - ${text}`
      );
    }

    const json = await res.json();
    const d = json?.data;

    const allCounts: Array<{ difficulty: GqlDifficulty; count: number }> =
      d?.allQuestionsCount || [];
    const matchedUser = d?.matchedUser;
    const submitStats = matchedUser?.submitStats;
    const ac = submitStats?.acSubmissionNum as
      | Array<{
          difficulty: GqlDifficulty;
          count: number;
          submissions?: number;
        }>
      | undefined;
    const total = submitStats?.totalSubmissionNum as
      | Array<{
          difficulty: GqlDifficulty;
          count: number;
          submissions?: number;
        }>
      | undefined;

    const acAll = byDifficulty(ac, "All");
    const totalAll = byDifficulty(total, "All");
    const acEasy = byDifficulty(ac, "Easy");
    const acMed = byDifficulty(ac, "Medium");
    const acHard = byDifficulty(ac, "Hard");

    const allAll = byDifficulty(allCounts, "All");
    const allEasy = byDifficulty(allCounts, "Easy");
    const allMed = byDifficulty(allCounts, "Medium");
    const allHard = byDifficulty(allCounts, "Hard");

    const acceptedSubs = acAll?.submissions ?? acAll?.count ?? 0;
    const totalSubs = totalAll?.submissions ?? totalAll?.count ?? 0;
    const acceptanceRate =
      totalSubs > 0 ? (acceptedSubs / totalSubs) * 100 : undefined;

    const normalized = {
      username,
      totalSolved: acAll?.count,
      totalQuestions: allAll?.count,
      easySolved: acEasy?.count,
      mediumSolved: acMed?.count,
      hardSolved: acHard?.count,
      totalEasy: allEasy?.count,
      totalMedium: allMed?.count,
      totalHard: allHard?.count,
      acceptanceRate:
        typeof acceptanceRate === "number"
          ? Number(acceptanceRate.toFixed(2))
          : undefined,
      ranking: matchedUser?.profile?.ranking,
      streak: matchedUser?.userCalendar?.streak,
      userContestRanking: d?.userContestRanking,
      languageProblemCount: matchedUser?.languageProblemCount,
      matchedUser: {
        userCalendar: matchedUser?.userCalendar,
      },
    };

    return new Response(JSON.stringify({ username, data: normalized }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch LeetCode data",
        message: err?.message,
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
