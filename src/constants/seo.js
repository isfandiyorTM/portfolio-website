// Per-route <head> data. Read at runtime by useSeo, and at build time by
// vite.config.js, which writes a copy of index.html for each route so that
// crawlers which don't run JavaScript (Telegram, LinkedIn…) get the right tags.
export const SITE_URL = "https://isfandiyormadaminov.dev";

export const ROUTE_META = {
  "/": {
    title: "Isfandiyor Madaminov — IT Mentor & Flutter Developer",
    description: "Isfandiyor Madaminov — IT Mentor and Flutter mobile developer at Rahimov School. Building cross-platform apps and mentoring the next generation of developers in Uzbekistan.",
  },
  "/compiland": {
    title: "Compiland — Learn Computers by Playing | Isfandiyor Madaminov",
    description: "Compiland is an EdTech platform for school students: a town of six hands-on computer and coding courses (419 lessons) with a guide called Compi, a game, typing races and teacher analytics. Built with React, Cloudflare Workers and D1.",
  },
  "/chontak": {
    title: "Cho'ntak — Offline Personal Finance App in Flutter | Isfandiyor Madaminov",
    description: "Cho'ntak is a personal finance app for Uzbekistan: track income and expenses, set budgets and grow savings, fully offline. Built with Flutter, Clean Architecture, BLoC and SQLite.",
  },
  "/hoji-jalyuzi": {
    title: "Hoji Jalyuzi — Blinds Measuring & Order App in Flutter | Isfandiyor Madaminov",
    description: "Hoji Jalyuzi is a Flutter app for blinds installers: measurement calculations, customer records and real-time orders for workers, with offline sync.",
  },
  "/rahimovdevs": {
    title: "RahimovDevs — Student Web Projects Platform | Isfandiyor Madaminov",
    description: "RahimovDevs is a live platform where students of Rahimov School publish the web projects they build from scratch.",
  },
  "/resume": {
    title: "Resume — Isfandiyor Madaminov",
    description: "Resume of Isfandiyor Madaminov — IT mentor and Flutter developer in Tashkent, Uzbekistan.",
  },
  "/games": {
    title: "Mini Games — Isfandiyor Madaminov",
    description: "Nine small browser games: Snake, Type Racer, Memory, Quiz, Whack-a-Bug, Debugger, Reaction, Flappy Widget and Code Order.",
  },
  "/scores": {
    title: "Leaderboard — Isfandiyor Madaminov",
    description: "Best scores for the mini games on isfandiyormadaminov.dev.",
  },
};

export const NOT_FOUND_META = {
  title: "Page not found — Isfandiyor Madaminov",
  description: "This page does not exist.",
};

export const routeUrl = (path) => SITE_URL + (path === "/" ? "/" : path);
