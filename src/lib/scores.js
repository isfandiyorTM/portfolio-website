import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key) : null;

export async function saveScore(game, score) {
  try { localStorage.setItem(`${game}Best`, score); } catch {}
  if (!supabase) return;
  try {
    await supabase.from("game_scores").insert({ game, score });
  } catch {}
}

export async function getLeaderboard(game, limit = 10) {
  if (!supabase) return [];
  try {
    const { data } = await supabase
      .from("game_scores")
      .select("score, created_at")
      .eq("game", game)
      .order("score", { ascending: game === "reaction" })
      .limit(limit);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAllBests() {
  if (!supabase) return {};
  try {
    const games = ["snake", "typeracer", "memory", "whack", "reaction", "flappy", "codeorder"];
    const results = await Promise.all(
      games.map(g =>
        supabase
          .from("game_scores")
          .select("score")
          .eq("game", g)
          .order("score", { ascending: g === "reaction" })
          .limit(1)
          .then(({ data }) => [g, data?.[0]?.score ?? null])
      )
    );
    return Object.fromEntries(results);
  } catch {
    return {};
  }
}

export const supabaseReady = !!supabase;
