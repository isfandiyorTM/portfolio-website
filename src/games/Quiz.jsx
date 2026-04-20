import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";

const BANK = {
  en: {
    flutter: [
      { q:"What language is Flutter built with?",               options:["JavaScript","Kotlin","Dart","Swift"],                          answer:2 },
      { q:"Which widget scrolls a list of items?",              options:["Column","GridView","ListView","Stack"],                        answer:2 },
      { q:"What does 'flutter pub get' do?",                    options:["Runs the app","Fetches dependencies","Builds APK","Clears cache"], answer:1 },
      { q:"Which state management uses Streams?",               options:["Provider","GetX","Riverpod","Bloc"],                           answer:3 },
      { q:"Entry point of every Flutter app?",                  options:["App()","main()","init()","start()"],                          answer:1 },
      { q:"Which Firebase service stores real-time data?",      options:["Firestore","Storage","Auth","Hosting"],                       answer:0 },
      { q:"What does 'hot reload' do?",                         options:["Restarts fully","Injects code without restart","Clears state","Rebuilds APK"], answer:1 },
      { q:"What is 'pubspec.yaml' for?",                        options:["UI layout","App config & dependencies","Routing","State"],    answer:1 },
      { q:"Dart keyword constant at compile time?",             options:["final","static","const","var"],                               answer:2 },
      { q:"Which widget arranges children horizontally?",       options:["Column","Row","Stack","Wrap"],                                answer:1 },
      { q:"Which widget clips its child to a circle?",          options:["ClipRRect","CircleAvatar","ClipOval","Container"],            answer:2 },
      { q:"Which operator handles null in Dart?",               options:["??","!!","&&","||"],                                          answer:0 },
    ],
    tech: [
      { q:"Who created the Linux kernel?",                      options:["Bill Gates","Dennis Ritchie","Linus Torvalds","Steve Jobs"],  answer:2 },
      { q:"What does HTTP stand for?",                          options:["HyperText Transfer Protocol","High Tech Transfer","HyperText Platform","HyperTool Process"], answer:0 },
      { q:"Binary value of decimal 10?",                        options:["1010","1001","1100","0110"],                                  answer:0 },
      { q:"Which company owns Android?",                        options:["Apple","Microsoft","Google","Meta"],                          answer:2 },
      { q:"What does CSS stand for?",                           options:["Computer Style Sheets","Cascading Style Sheets","Creative Style System","Colorful Style"], answer:1 },
      { q:"SQL stands for?",                                    options:["Structured Query Language","Simple Query Logic","Sequential Query List","Standard Layer"], answer:0 },
      { q:"What does RAM stand for?",                           options:["Random Access Memory","Read And Modify","Rapid Array Module","Read Access Memory"], answer:0 },
      { q:"Which protocol secures HTTPS?",                      options:["SSH","TLS/SSL","FTP","SMTP"],                                 answer:1 },
      { q:"Standard port for HTTP?",                            options:["443","8080","21","80"],                                       answer:3 },
      { q:"How many bits in a byte?",                           options:["4","16","8","32"],                                            answer:2 },
      { q:"What does API stand for?",                           options:["App Program Interface","Application Programming Interface","Auto Process Integration","Protocol Index"], answer:1 },
      { q:"Git was created by?",                                options:["GitHub","Linus Torvalds","Microsoft","Atlassian"],             answer:1 },
    ],
    general: [
      { q:"How many continents on Earth?",                      options:["5","6","7","8"],                                              answer:2 },
      { q:"Which planet is closest to the Sun?",               options:["Venus","Mars","Mercury","Earth"],                             answer:2 },
      { q:"Water freezes at (°C)?",                             options:["0","-10","4","32"],                                           answer:0 },
      { q:"How many sides does a hexagon have?",                options:["5","6","7","8"],                                              answer:1 },
      { q:"Capital of Japan?",                                  options:["Seoul","Beijing","Tokyo","Bangkok"],                          answer:2 },
      { q:"Which is the largest ocean?",                        options:["Atlantic","Indian","Arctic","Pacific"],                       answer:3 },
      { q:"Speed of light approximately?",                      options:["300,000 km/s","150,000 km/s","450,000 km/s","100,000 km/s"], answer:0 },
      { q:"Who painted the Mona Lisa?",                         options:["Michelangelo","Picasso","Leonardo da Vinci","Raphael"],       answer:2 },
      { q:"Bones in an adult human body?",                      options:["196","206","216","186"],                                      answer:1 },
      { q:"Chemical symbol 'O' is?",                            options:["Gold","Oxygen","Osmium","Oganesson"],                        answer:1 },
      { q:"The Great Wall is in?",                              options:["India","Japan","China","Korea"],                              answer:2 },
      { q:"Minutes in a day?",                                  options:["1200","1440","1380","1560"],                                   answer:1 },
    ],
  },
  uz: {
    flutter: [
      { q:"Flutter qaysi tilda yaratilgan?",                    options:["JavaScript","Kotlin","Dart","Swift"],                         answer:2 },
      { q:"Ro'yxat elementlarini aylantirish uchun qaysi widget?", options:["Column","GridView","ListView","Stack"],                    answer:2 },
      { q:"'flutter pub get' nima qiladi?",                     options:["Ilovani ishga tushiradi","Kutubxonalarni yuklaydi","APK yaratadi","Keshni tozalaydi"], answer:1 },
      { q:"Qaysi state management Streamlardan foydalanadi?",   options:["Provider","GetX","Riverpod","Bloc"],                          answer:3 },
      { q:"Har bir Flutter ilovasi qayerdan boshlanadi?",       options:["App()","main()","init()","start()"],                          answer:1 },
      { q:"Qaysi Firebase xizmat real vaqtda ma'lumot saqlaydi?", options:["Firestore","Storage","Auth","Hosting"],                    answer:0 },
      { q:"'Hot reload' nima qiladi?",                          options:["To'liq qayta ishga tushiradi","Qayta tushirmasdan kodni yuboradi","Holatni tozalaydi","APK qayta yaratadi"], answer:1 },
      { q:"'pubspec.yaml' nima uchun?",                         options:["UI tartib","Ilova sozlamalari va kutubxonalar","Yo'naltirish","Holat boshqaruvi"], answer:1 },
      { q:"Kompilyatsiya vaqtida doimiy Dart kalit so'zi?",     options:["final","static","const","var"],                               answer:2 },
      { q:"Qaysi widget farzandlarni gorizontal joylashtiradi?", options:["Column","Row","Stack","Wrap"],                              answer:1 },
      { q:"Farzandni doiraviy qilib kesish uchun qaysi widget?", options:["ClipRRect","CircleAvatar","ClipOval","Container"],          answer:2 },
      { q:"Dart-da null uchun qaysi operator?",                  options:["??","!!","&&","||"],                                         answer:0 },
    ],
    tech: [
      { q:"Linux kernelini kim yaratgan?",                      options:["Bill Gates","Dennis Ritchie","Linus Torvalds","Steve Jobs"],  answer:2 },
      { q:"HTTP nima degan ma'no?",                             options:["HiperMatn Uzatish Protokoli","Yuqori Texnologiya","HiperMatn Platformasi","HiperAsbob"], answer:0 },
      { q:"10 sonining ikkilik qiymati?",                       options:["1010","1001","1100","0110"],                                  answer:0 },
      { q:"Android qaysi kompaniyaga tegishli?",                options:["Apple","Microsoft","Google","Meta"],                          answer:2 },
      { q:"CSS nima degan ma'no?",                              options:["Kompyuter Stil Varaqlari","Kaskad Stil Varaqlari","Ijodiy Stil Tizimi","Rangli Stil"], answer:1 },
      { q:"SQL nima degan ma'no?",                              options:["Strukturali So'rov Tili","Oddiy So'rov","Ketma-ket So'rov","Standart Qatlam"], answer:0 },
      { q:"RAM nima degan ma'no?",                              options:["Tasodifiy Kirish Xotirasi","O'qish va O'zgartirish","Tezkor Massiv","O'qish Xotirasi"], answer:0 },
      { q:"HTTPS ni qaysi protokol xavfsiz qiladi?",            options:["SSH","TLS/SSL","FTP","SMTP"],                                 answer:1 },
      { q:"HTTP uchun standart port?",                          options:["443","8080","21","80"],                                       answer:3 },
      { q:"'Bayt'da nechta bit bor?",                           options:["4","16","8","32"],                                            answer:2 },
      { q:"API nima degan ma'no?",                              options:["Ilova Dasturi Interfeysi","Ilova Dasturlash Interfeysi","Avto Jarayon","Protokol Indeksi"], answer:1 },
      { q:"Git-ni kim yaratgan?",                               options:["GitHub","Linus Torvalds","Microsoft","Atlassian"],             answer:1 },
    ],
    general: [
      { q:"Yer sharidagi qit'alar soni?",                       options:["5","6","7","8"],                                              answer:2 },
      { q:"Quyoshga eng yaqin sayyora?",                        options:["Venus","Mars","Merkuriy","Yer"],                              answer:2 },
      { q:"Suv necha darajada muzlaydi (°C)?",                  options:["0","-10","4","32"],                                           answer:0 },
      { q:"Olti burchakning nechta tomoni bor?",                options:["5","6","7","8"],                                              answer:1 },
      { q:"Yaponiyaning poytaxti?",                             options:["Seul","Pekin","Tokio","Bangkok"],                             answer:2 },
      { q:"Eng katta okean?",                                   options:["Atlantik","Hind","Arktik","Tinch"],                           answer:3 },
      { q:"Yorug'lik tezligi taxminan?",                        options:["300 000 km/s","150 000 km/s","450 000 km/s","100 000 km/s"],  answer:0 },
      { q:"Mona Lizani kim chizgan?",                           options:["Mikelanjelo","Pikasso","Leonardo da Vinchi","Rafael"],        answer:2 },
      { q:"Katta yoshli insonning nechtasuyagi bor?",           options:["196","206","216","186"],                                      answer:1 },
      { q:"'O' kimyoviy belgisi qaysi element?",                options:["Oltin","Kislorod","Osmiy","Oganesson"],                      answer:1 },
      { q:"Buyuk Xitoy devori qayerda?",                        options:["Hindiston","Yaponiya","Xitoy","Koreya"],                      answer:2 },
      { q:"Bir kunda necha daqiqa bor?",                        options:["1200","1440","1380","1560"],                                   answer:1 },
    ],
  },
  ru: {
    flutter: [
      { q:"На каком языке создан Flutter?",                     options:["JavaScript","Kotlin","Dart","Swift"],                         answer:2 },
      { q:"Какой виджет прокручивает список?",                  options:["Column","GridView","ListView","Stack"],                       answer:2 },
      { q:"Что делает 'flutter pub get'?",                      options:["Запускает приложение","Загружает зависимости","Собирает APK","Очищает кэш"], answer:1 },
      { q:"Какое управление состоянием использует Streams?",    options:["Provider","GetX","Riverpod","Bloc"],                          answer:3 },
      { q:"Точка входа каждого Flutter-приложения?",            options:["App()","main()","init()","start()"],                          answer:1 },
      { q:"Какой Firebase сервис хранит данные в реальном времени?", options:["Firestore","Storage","Auth","Hosting"],                  answer:0 },
      { q:"Что делает 'Hot reload'?",                           options:["Полный перезапуск","Вставляет код без перезапуска","Очищает состояние","Пересобирает APK"], answer:1 },
      { q:"Для чего 'pubspec.yaml'?",                           options:["Разметка UI","Настройки и зависимости","Маршрутизация","Управление состоянием"], answer:1 },
      { q:"Константа Dart во время компиляции?",                options:["final","static","const","var"],                               answer:2 },
      { q:"Какой виджет располагает дочерние горизонтально?",   options:["Column","Row","Stack","Wrap"],                                answer:1 },
      { q:"Какой виджет обрезает дочерний в круг?",             options:["ClipRRect","CircleAvatar","ClipOval","Container"],            answer:2 },
      { q:"Оператор null в Dart?",                              options:["??","!!","&&","||"],                                          answer:0 },
    ],
    tech: [
      { q:"Кто создал ядро Linux?",                             options:["Билл Гейтс","Деннис Ритчи","Линус Торвальдс","Стив Джобс"],  answer:2 },
      { q:"Что означает HTTP?",                                 options:["Протокол передачи гипертекста","Высокотехнологичный протокол","Платформа гипертекста","Гиперинструмент"], answer:0 },
      { q:"Двоичное значение числа 10?",                        options:["1010","1001","1100","0110"],                                  answer:0 },
      { q:"Кому принадлежит Android?",                          options:["Apple","Microsoft","Google","Meta"],                          answer:2 },
      { q:"Что означает CSS?",                                  options:["Компьютерные таблицы стилей","Каскадные таблицы стилей","Система стилей","Цветные стили"], answer:1 },
      { q:"Что означает SQL?",                                  options:["Структурированный язык запросов","Простой запрос","Последовательный список","Стандартный слой"], answer:0 },
      { q:"Что означает RAM?",                                  options:["Оперативная память","Чтение и изменение","Быстрый массив","Память чтения"], answer:0 },
      { q:"Какой протокол защищает HTTPS?",                     options:["SSH","TLS/SSL","FTP","SMTP"],                                 answer:1 },
      { q:"Стандартный порт HTTP?",                             options:["443","8080","21","80"],                                       answer:3 },
      { q:"Сколько бит в байте?",                               options:["4","16","8","32"],                                            answer:2 },
      { q:"Что означает API?",                                  options:["Интерфейс программы","Интерфейс программирования приложений","Автоинтеграция","Индекс протокола"], answer:1 },
      { q:"Кто создал Git?",                                    options:["GitHub","Линус Торвальдс","Microsoft","Atlassian"],            answer:1 },
    ],
    general: [
      { q:"Сколько континентов на Земле?",                      options:["5","6","7","8"],                                              answer:2 },
      { q:"Ближайшая к Солнцу планета?",                        options:["Венера","Марс","Меркурий","Земля"],                           answer:2 },
      { q:"При какой температуре замерзает вода (°C)?",         options:["0","-10","4","32"],                                           answer:0 },
      { q:"Сколько сторон у шестиугольника?",                   options:["5","6","7","8"],                                              answer:1 },
      { q:"Столица Японии?",                                    options:["Сеул","Пекин","Токио","Бангкок"],                             answer:2 },
      { q:"Самый большой океан?",                               options:["Атлантический","Индийский","Арктический","Тихий"],            answer:3 },
      { q:"Скорость света примерно?",                           options:["300 000 км/с","150 000 км/с","450 000 км/с","100 000 км/с"],  answer:0 },
      { q:"Кто написал Мону Лизу?",                             options:["Микеланджело","Пикассо","Леонардо да Винчи","Рафаэль"],       answer:2 },
      { q:"Костей у взрослого человека?",                       options:["196","206","216","186"],                                      answer:1 },
      { q:"Элемент с символом 'O'?",                            options:["Золото","Кислород","Осмий","Оганесон"],                      answer:1 },
      { q:"Где находится Великая Китайская стена?",             options:["Индия","Япония","Китай","Корея"],                             answer:2 },
      { q:"Минут в сутках?",                                    options:["1200","1440","1380","1560"],                                   answer:1 },
    ],
  },
};

const MODE_META = {
  flutter: { icon: "🐦", color: "#06b6d4" },
  tech:    { icon: "💻", color: "#00ff88" },
  general: { icon: "🌍", color: "#f59e0b" },
};

const MODE_LABELS = {
  flutter: { en:"FLUTTER", uz:"FLUTTER", ru:"FLUTTER" },
  tech:    { en:"TECH",    uz:"TEXNOLOGIYA", ru:"ТЕХНОЛОГИИ" },
  general: { en:"GENERAL", uz:"UMUMIY",   ru:"ОБЩИЕ" },
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Quiz() {
  const { t, lang } = useLang();
  const g = t.games;

  const getBank = (m, l) => BANK[l]?.[m] ?? BANK.en[m];

  const [mode, setMode]           = useState("flutter");
  const [questions, setQuestions] = useState(() => shuffle(getBank("flutter", lang)).slice(0, 8));
  const [current, setCurrent]     = useState(0);
  const [selected, setSelected]   = useState(null);
  const [score, setScore]         = useState(0);
  const [done, setDone]           = useState(false);
  const [answered, setAnswered]   = useState(false);

  const pickMode = (m) => {
    setMode(m);
    setQuestions(shuffle(getBank(m, lang)).slice(0, 8));
    setCurrent(0); setSelected(null); setScore(0); setDone(false); setAnswered(false);
  };

  const q = questions[current];

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i); setAnswered(true);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(c => c + 1); setSelected(null); setAnswered(false);
  };

  const restart = () => {
    setQuestions(shuffle(getBank(mode, lang)).slice(0, 8));
    setCurrent(0); setSelected(null); setScore(0); setDone(false); setAnswered(false);
  };

  const pct = Math.round((score / questions.length) * 100);

  if (done) return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 4, color: "var(--green)", marginBottom: 14 }}>// {g.results?.toUpperCase()}</div>
      <div style={{ fontSize: "clamp(36px,10vw,52px)", marginBottom: 10 }}>
        {pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,8vw,40px)", color: "var(--green)", marginBottom: 6 }}>
        {score}/{questions.length}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px,3vw,12px)", color: "var(--text-muted)", marginBottom: 24, letterSpacing: 1 }}>
        {pct >= 80 ? g.quiz_expert : pct >= 60 ? g.quiz_good : g.quiz_keep}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={restart}>{g.play_again}</button>
        <button className="btn btn-secondary" onClick={() => pickMode(mode === "flutter" ? "tech" : mode === "tech" ? "general" : "flutter")}>{g.quiz_next_cat}</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {Object.entries(MODE_META).map(([m, meta]) => (
          <button
            key={m}
            onClick={() => pickMode(m)}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2,
              padding: "7px 12px", border: `1px solid ${mode === m ? meta.color : "var(--border)"}`,
              background: mode === m ? meta.color + "18" : "transparent",
              color: mode === m ? meta.color : "var(--text-muted)",
              cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 5,
            }}
          >
            {meta.icon} {MODE_LABELS[m][lang] ?? MODE_LABELS[m].en}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: 2 }}>{current + 1} / {questions.length}</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--green)" }}>⭐ {score}</span>
      </div>
      <div style={{ height: 3, background: "var(--border)" }}>
        <div style={{ height: "100%", background: "var(--green)", width: `${(current / questions.length) * 100}%`, transition: "width 0.4s" }} />
      </div>

      {/* Question */}
      <div style={{ background: "var(--bg)", border: "1px solid var(--border)", padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "clamp(12px,3vw,14px)", lineHeight: 1.7, color: "var(--text)" }}>
        <span style={{ color: "var(--green)", marginRight: 8 }}>//</span>{q.q}
      </div>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = "var(--bg-card)", border = "var(--border)", color = "var(--text)";
          if (answered) {
            if (i === q.answer)      { bg = "#001a0d"; border = "var(--green)"; color = "var(--green)"; }
            else if (i === selected) { bg = "#1a0005"; border = "#ff4466"; color = "#ff4466"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={answered} style={{
              background: bg, border: `1px solid ${border}`, color,
              padding: "13px 14px", fontFamily: "var(--font-mono)",
              fontSize: "clamp(11px,3vw,13px)", cursor: answered ? "default" : "pointer",
              textAlign: "left", transition: "all 0.25s", letterSpacing: "0.5px",
              WebkitTapHighlightColor: "transparent", lineHeight: 1.4,
            }}>
              <span style={{ color: "var(--green-dim)", marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px,3vw,13px)", color: selected === q.answer ? "var(--green)" : "#ff4466" }}>
            {selected === q.answer ? g.correct : `✗ ${q.options[q.answer]}`}
          </span>
          <button className="btn btn-primary" onClick={next} style={{ padding: "10px 24px", fontSize: 12 }}>
            {current + 1 >= questions.length ? g.results : g.next}
          </button>
        </div>
      )}
    </div>
  );
}
