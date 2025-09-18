"use client";
import useSWR from "swr";

export type LeetCodeApi = {
  username: string;
  data: any;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLeetCode(username: string) {
  const { data, error, isLoading, mutate } = useSWR<LeetCodeApi>(
    `/api/leetcode?username=${encodeURIComponent(username)}`,
    fetcher,
    { refreshInterval: 1000 * 60 * 30 } // every 30m
  );

  const stats = data?.data;
  return { data: stats, username, error, isLoading, mutate };
}
