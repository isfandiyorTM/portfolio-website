export const NAV_ITEMS = ["home", "about", "projects", "contact"];

export const SKILLS = [
  "Flutter", "Dart", "Firebase", "REST APIs",
  "BLoC", "Riverpod", "GetX", "Git",
  "UI/UX", "Mentoring", "Agile", "SQLite",
];

export const PROJECTS = [
  {
    id: "01",
    key: "chontak",               // matches translations key for i18n name/desc
    name: "Cho'ntak",
    desc: {
      en: "Personal finance app for Uzbekistan — track income/expenses, set budgets, grow savings. Flutter + Clean Architecture + BLoC. Fully offline, 3 languages.",
      uz: "O'zbekiston uchun shaxsiy moliya ilovasi — daromad, byudjet, jamg'arma. Flutter + Clean Architecture + BLoC. To'liq oflayn, 3 tilda.",
      ru: "Приложение личных финансов для Узбекистана — доходы, бюджет, накопления. Flutter + Clean Architecture + BLoC. Полностью офлайн, 3 языка.",
    },
    stack: ["Flutter", "Dart", "BLoC", "SQLite"],
    statusKey: "shipped",         // matches t.projects.status.shipped
    tags: ["Flutter", "Dart"],
    internalLink: "/chontak",     // navigate() inside app
  },
  {
    id: "02",
    key: "mentorhub",
    name: "MentorHub",
    desc: {
      en: "A mentorship platform connecting IT students with experienced developers. Features real-time chat, session scheduling, and progress tracking.",
      uz: "IT talabalarni tajribali dasturchilar bilan bog'lovchi mentorlik platformasi. Real vaqt chat, sessiya rejalashtirish va progress kuzatish.",
      ru: "Платформа менторства для IT-студентов. Чат в реальном времени, планирование сессий и отслеживание прогресса.",
    },
    stack: ["Flutter", "Firebase", "Dart"],
    statusKey: "live",
    tags: ["Flutter", "Firebase"],
    link: "https://github.com/isfandiyorTM",
  },
  {
    id: "03",
    key: "flutterkit",
    name: "FlutterKit UI",
    desc: {
      en: "An open-source collection of 50+ production-ready Flutter widgets and screens, used by developers worldwide.",
      uz: "50+ tayyor Flutter widget va ekranlar to'plami. Dunyo bo'ylab dasturchilar tomonidan ishlatiladi.",
      ru: "Коллекция 50+ готовых Flutter-виджетов и экранов с открытым кодом.",
    },
    stack: ["Flutter", "Dart", "Pub.dev"],
    statusKey: "open",
    tags: ["Flutter", "Dart"],
    link: "https://github.com/isfandiyorTM",
  },
];

export const FILTER_TAGS_KEYS = ["all", "Flutter", "Firebase", "Dart"];

export const SOCIAL_LINKS = {
  github:   "https://github.com/isfandiyorTM",
  linkedin: "https://www.linkedin.com/in/isfandiyor-madaminov-923a1a294/",
};