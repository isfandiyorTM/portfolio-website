export const NAV_ITEMS = ["home", "about", "projects", "contact"];
export const SKILLS = [
  "Flutter", "Dart", "Firebase", "REST APIs",
  "BLoC", "Riverpod", "GetX", "Git",
  "UI/UX", "Mentoring", "Agile", "SQLite",
];
export const PROJECTS = [
  {
    id: "01",
    key: "rahimovdevs",
    name: "RahimovDevs",
    desc: {
      en: "A live platform showcasing web projects built by my students at Rahimov School — real apps, real code, shipped to the world.",
      uz: "Rahimov Maktabidagi o'quvchilarim tomonidan qurilgan veb loyihalar platformasi — haqiqiy ilovalar, haqiqiy kod.",
      ru: "Живая платформа с веб-проектами моих студентов из Школы Рахимова — реальные приложения, реальный код.",
    },
    stack: ["HTML", "CSS", "JavaScript", "React"],
    statusKey: "live",
    tags: ["Web"],
    internalLink: "/rahimovdevs",
  },
  {
    id: "02",
    key: "chontak",
    name: "Cho'ntak",
    desc: {
      en: "Personal finance app for Uzbekistan — track income/expenses, set budgets, grow savings. Flutter + Clean Architecture + BLoC. Fully offline, 3 languages.",
      uz: "O'zbekiston uchun shaxsiy moliya ilovasi — daromad, byudjet, jamg'arma. Flutter + Clean Architecture + BLoC. To'liq oflayn, 3 tilda.",
      ru: "Приложение личных финансов для Узбекистана — доходы, бюджет, накопления. Flutter + Clean Architecture + BLoC. Полностью офлайн, 3 языка.",
    },
    stack: ["Flutter", "Dart", "BLoC", "SQLite"],
    statusKey: "shipped",
    tags: ["Flutter", "Dart"],
    internalLink: "/chontak",
  },
  {
    id: "03",
    key: "hojijalyuzi",
    name: "Hoji Jalyuzi",
    desc: {
      en: "Mobile app for a blinds company — browse products, request quotes, and manage orders. Built with Flutter for a seamless customer experience.",
      uz: "Jalyuzi kompaniyasi uchun mobil ilova — mahsulotlarni ko'rish, narx so'rash va buyurtmalarni boshqarish. Flutter bilan qurilgan.",
      ru: "Мобильное приложение для компании жалюзи — просмотр продуктов, запрос цен и управление заказами. Разработано на Flutter.",
    },
    stack: ["Flutter", "Dart", "GetX"],
    statusKey: "shipped",
    tags: ["Flutter", "Dart"],
    internalLink: "/hoji-jalyuzi",
  },
];
export const FILTER_TAGS_KEYS = ["all", "Flutter", "Dart", "Web"];
export const SKILL_METERS = [
  { label: "Teaching / Mentoring", level: 95 },
  { label: "Flutter / Dart",       level: 90 },
  { label: "BLoC / Riverpod",      level: 85 },
  { label: "Git / GitHub",         level: 85 },
  { label: "Clean Architecture",   level: 82 },
  { label: "Firebase / REST API",  level: 78 },
  { label: "React / Vite",         level: 72 },
  { label: "UI Design",            level: 68 },
];

export const RESUME = {
  name:    "ISFANDIYOR MADAMINOV",
  contact: [
    { icon: "✉", text: "isfandiyormadaminov12@gmail.com" },
    { icon: "🌐", text: "rahimovdevs.tech" },
    { icon: "📍", text: "Tashkent, Uzbekistan" },
    { icon: "⌥",  text: "github.com/isfandiyordev" },
  ],
  experience: [
    { company: "Rahimov School" },
    { company: "Biznex POS System" },
    { company: "University" },
    { company: "ICode · Codial · Integer" },
  ],
  projects: [
    { name: "Rahimov Devs Platform", tech: "React · Vite · Custom i18n" },
    { name: "Cho'ntak",              tech: "Flutter · BLoC · SQLite · Clean Architecture" },
    { name: "Hoji Jalyuzi",          tech: "Flutter · Firebase" },
  ],
  skills: [
    { items: ["Flutter", "Dart", "iOS", "Android"] },
    { items: ["BLoC", "Provider", "Riverpod"] },
    { items: ["Firebase", "REST API", "SQLite", "Dio"] },
    { items: ["Clean Architecture", "SOLID", "MVC"] },
    { items: ["Git", "GitHub", "VS Code", "Figma"] },
    { items: ["React", "Vite", "HTML", "CSS", "JavaScript"] },
    { items: ["Uzbek (native)", "Russian (A2)", "English (professional)"] },
  ],
  stats: [
    { v: "4+"   },
    { v: "450+" },
    { v: "2+"   },
    { v: "5★"   },
  ],
};

export const SOCIAL_LINKS = {
  github:    "https://github.com/isfandiyorTM",
  linkedin:  "https://www.linkedin.com/in/isfandiyor-madaminov-923a1a294/",
  youtube:   "https://www.youtube.com/@isfandiyor_madaminov",
  telegram:  "https://t.me/isfandiyor_madaminov",
};