import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../i18n/LanguageContext";
import { saveScore } from "../lib/scores";

const CONTENT = {
  en: {
    easy: [
      "the quick brown fox jumps over the lazy dog and runs away fast",
      "code is written once but read many times so write it well",
      "practice makes perfect and typing is no different at all",
      "every great developer was once a beginner who kept going",
      "build apps that make people smile and solve real problems today",
      "focus on progress not perfection and you will always improve",
      "clean code is not written by following rules but by caring deeply",
      "a bug is just a feature that has not been understood yet",
      "ship it learn from users and iterate fast to build better products",
      "reading other people code is one of the best ways to grow fast",
      "version control is your safety net always commit before you break things",
      "naming things well is one of the hardest problems in all of programming",
      "a great user interface is invisible it just works without thinking",
      "every line of code you delete makes the program better and simpler",
      "the best code is no code solve the problem before writing anything",
      "slow is smooth and smooth is fast take your time and do it right",
      "learn the fundamentals deeply and the frameworks will make more sense",
      "your first solution is rarely the best one always refactor and improve",
      "write code for humans first and computers second always",
      "small commits often are better than one giant commit at the end",
      "teaching is not just sharing knowledge it is lighting curiosity in every student",
      "a great teacher listens more than they speak and asks the right questions",
      "patience is the most powerful skill any mentor can bring to the classroom",
      "good mentors help students find answers rather than handing all the answers away",
      "teaching others is the fastest way to discover what you truly know and what you do not",
      "every student learns differently and great teachers find a way to reach each one",
      "the goal of education is not to fill a bucket but to light a fire inside the learner",
      "feedback given with care is the most powerful tool in any teacher's hands",
      "a classroom should feel safe enough for students to make mistakes and learn from them",
      "the best lesson adapts to the student sitting in front of you right now",
      "write code that teaches as well as it runs clean and easy to follow",
      "great mentors challenge students just enough to grow without pushing them off the edge",
      "a student who asks why is worth more than one who just follows all instructions",
      "repetition builds muscle memory but understanding builds confidence in the learner",
      "show your students how you think not just what to do and watch them grow",
      "microsoft word lets you write format and share documents quickly and easily",
      "use heading styles in word to keep your document consistent throughout",
      "track changes in word lets your team review every edit before accepting it",
      "the word count in microsoft word updates live as you type",
      "you can insert tables images and charts directly into any word document",
      "a great slide has one idea big text and a visual that supports your message",
      "keep your slides simple and let images tell most of the story for you",
      "powerpoint animations should be subtle so they never distract from the content",
      "use slide master in powerpoint to apply consistent styling across all slides",
      "presenter view shows your notes while the audience sees only the clean slide",
      "excel formulas like sum average and if can save hours of manual calculation",
      "pivot tables in excel summarize thousands of rows of data in just seconds",
      "use conditional formatting to highlight key values and make data easy to read",
      "freeze panes in excel so the header row stays visible when you scroll down",
      "vlookup searches for a value in a table and returns a result from another column",
      "canva makes it easy to design posters flyers and social media graphics fast",
      "drag and drop elements in canva to build layouts without needing design skills",
      "use canva templates to start quickly then customize colors fonts and images",
      "canva lets you resize your design for different platforms with just one click",
      "the brand kit in canva stores your logo colors and fonts for consistent designs",
      "the home row keys are a s d f for the left hand and j k l for the right",
      "keeping your fingers on the home row helps you type faster without looking down",
      "touch typing means using all ten fingers without looking at the keyboard at all",
      "the f and j keys have small bumps so you can find the home row without looking",
      "daily practice is the fastest way to improve your typing speed and accuracy",
      "kahoot turns quizzes into competitive games that the whole class looks forward to",
      "in kahoot the faster you answer correctly the more points you earn each round",
      "teachers use kahoot to review lessons in a way that feels like a game not a test",
      "students join kahoot using a game pin shown on the teacher screen",
      "kahoot shows a leaderboard after every question so students see how they rank",
      "blooket lets students play different game modes while answering the same questions",
      "in blooket you earn coins by answering correctly and use them to unlock characters",
      "teachers create question sets in blooket and students choose which game mode to play",
      "blooket has game modes like tower defense gold quest and cafe to keep things fresh",
      "you can host a live blooket game for class or assign it for solo practice at home",
      "python uses indentation instead of braces to define code blocks making it readable",
      "print is the simplest python function and it sends output directly to the screen",
      "python lists store ordered collections of numbers strings and other objects",
      "a for loop in python repeats a code block once for every item in a list",
      "python dictionaries store data as key value pairs inside curly braces",
      "html defines the structure of every web page using opening and closing tags",
      "every html page starts with a doctype then html head and body sections",
      "the anchor tag in html creates a clickable link to another page or website",
      "use semantic html tags like header nav main and footer to structure your page",
      "the img tag embeds an image and the alt attribute describes it for accessibility",
      "css controls how html elements look using properties like color font and margin",
      "the box model in css gives every element a margin border padding and content area",
      "flexbox makes it easy to align and distribute elements in a row or column",
      "use media queries in css to make your layout adapt to different screen sizes",
      "css variables let you store colors or sizes in one place and reuse them anywhere",
      "javascript adds interactivity to web pages like button clicks and form validation",
      "variables in javascript are declared with let const or var each with different scope",
      "an array in javascript stores multiple values in a single variable using square brackets",
      "a function in javascript is a reusable block of code that runs when you call it",
      "the dom lets javascript find and change any element on a web page",
      "uzbekistan is a landlocked country in central asia with a rich silk road history",
      "samarkand bukhara and khiva are ancient uzbek cities with stunning architecture",
      "the tashkent metro is one of the most beautifully decorated subway systems in the world",
      "plov is the national dish of uzbekistan made with rice meat carrots and onions",
      "uzbekistan declared independence from the soviet union on september first nineteen ninety one",
    ],
    medium: [
      "Programming is not about typing fast, it is about thinking clearly and solving problems one step at a time.",
      "The best way to learn a new skill is to build something real with it, even if it breaks along the way.",
      "Software development is a team sport. The code you write today will be read by someone else tomorrow.",
      "Debugging is twice as hard as writing the code in the first place. Write it simple the first time.",
      "A good programmer looks both ways before crossing a one-way street and always writes tests afterward.",
      "The most important skill a developer can have is the ability to communicate clearly with their team.",
      "Code that is never shipped is worthless. Done and deployed beats perfect but never released every single time.",
      "You do not need to understand every line of a library to use it. Read the docs, try examples, then dig deeper.",
      "Every senior developer you admire was once completely lost trying to center a div or fix a null pointer exception.",
      "Test your assumptions early. The longer a wrong assumption survives, the more expensive it becomes to correct.",
      "If you cannot explain your code to someone else in simple words, you probably do not understand it well enough yourself.",
      "Write the simplest thing that could possibly work, then make it better once you understand the problem fully.",
      "Performance optimization without measurement is just guessing. Profile first, then optimize what actually matters.",
      "The goal of code review is not to find bugs but to share knowledge and raise the quality of the whole team.",
      "Teaching is the highest form of understanding. When you explain a concept clearly to a student, you discover the gaps in your own knowledge.",
      "A mentor's job is not to make students dependent on them but to make themselves unnecessary. True success is a student who surpasses you.",
      "The most powerful tool in any classroom is not a whiteboard or a projector — it is the genuine curiosity of a teacher who never stops learning.",
      "Every student who walks into your classroom brings a different background and a different way of seeing the world. Meet them where they are.",
      "Teaching programming is teaching problem-solving. The language is just the vocabulary; logical thinking is the grammar underneath it all.",
      "Great mentors don't just teach what to think — they teach how to think. That shift from memorization to reasoning is where real learning begins.",
      "The feedback loop between teacher and student is what drives growth. Ask questions, observe reactions, adjust your approach, and try again.",
      "A student who asks why is more valuable than one who just follows instructions. Nurture that curiosity and watch them grow faster than you imagined.",
      "When a student struggles, resist the urge to solve it for them. Ask a question instead. That pause — that productive struggle — is where learning actually happens.",
      "The best classroom is one where the teacher is also still a student. Admitting you do not know something is not weakness; it is the most powerful lesson you can teach.",
      "Microsoft Word is one of the most widely used word processors in the world. It offers tools for writing, formatting, and collaborating on documents of any size. Mastering keyboard shortcuts can noticeably increase your productivity in just a few weeks.",
      "The Track Changes feature in Word records every edit made to a document. Collaborators can accept or reject each change individually, making it ideal for team writing and peer review.",
      "Word styles let you define formatting for headings and body text in one place. When you update a style, every paragraph using it updates automatically, saving time on long documents.",
      "Mail merge in Word lets you create personalized letters or emails for hundreds of recipients at once, by linking a template to a spreadsheet of names and details.",
      "The Navigation Pane in Word lets you jump between headings and pages without scrolling. It is especially helpful when working on long reports or academic papers with many sections.",
      "A great PowerPoint presentation delivers one clear idea per slide with supporting visuals. Avoid walls of text — your audience should be listening to you, not reading your slides.",
      "Slide Master in PowerPoint lets you set fonts, colors, and layout once and apply them automatically across every slide. Using it from the start saves hours of reformatting later.",
      "Presenter View shows your speaker notes and a timer while the audience sees only the clean slide. It helps you stay on track without ever losing eye contact with your listeners.",
      "Animations in presentations should always serve the content, not distract from it. A simple fade keeps the flow smooth, while complex effects pull attention away from your message.",
      "PowerPoint's Design Ideas uses AI to suggest professional layouts from your content. It can turn a plain bullet list into a polished visual in seconds when you need to build slides fast.",
      "Microsoft Excel is used by millions to organize, analyze, and visualize data. Learning formulas like VLOOKUP, SUMIF, and INDEX-MATCH can transform how you handle numbers every single day.",
      "Pivot tables are one of the most powerful features in Excel. They let you group and summarize large datasets without writing a single formula, turning thousands of rows into a clear summary in seconds.",
      "Conditional formatting in Excel changes the color of a cell automatically based on its value. This makes it easy to spot trends and outliers in your data at a glance without any extra calculations.",
      "The VLOOKUP function searches for a value in the first column of a range and returns a value from another column. It is one of the most commonly used functions in professional spreadsheets.",
      "Named ranges in Excel let you assign a label to a group of cells. Instead of writing SUM(B2:B50), you can write SUM(SalesData), making spreadsheets far more readable and easy to maintain.",
      "Canva is a browser-based design tool that lets anyone create professional-looking graphics without a design background. With thousands of templates and a drag-and-drop interface, you can build posters and presentations in minutes.",
      "The Brand Kit in Canva stores your logo, colors, and fonts so they are always one click away. Every design stays visually consistent without needing to remember hex codes or font names.",
      "Canva's Magic Resize lets you create a design once and export it in multiple sizes instantly. A single Instagram post becomes a Facebook cover, a Twitter banner, and a slide in seconds.",
      "Canva offers a large library of free and premium images, icons, and illustrations. Instead of hunting for assets online, you can find everything you need in one place while you design.",
      "Canva's collaboration features let multiple people edit the same design at once, leaving comments and making changes together. It brings real-time teamwork to the world of visual design.",
      "Touch typing is the skill of using all ten fingers without looking at the keyboard. Once you build muscle memory for each key, your speed and accuracy improve dramatically with consistent practice.",
      "The home row is the foundation of touch typing. Left fingers rest on A, S, D, F and right fingers rest on J, K, L, and semicolon. Every other key is reached by moving away and returning immediately.",
      "Accuracy should always come before speed when learning to type. Rushing builds bad habits. It is better to type slowly and correctly than to develop fast but sloppy patterns that limit your ceiling.",
      "Typing speed is measured in words per minute, where each word counts as five characters including spaces. Beginners type around twenty to thirty WPM; average office workers reach forty to sixty.",
      "Good typing posture means keeping wrists flat, elbows at ninety degrees, and the keyboard at elbow height. This reduces strain on your wrists and shoulders and lets you type longer without fatigue.",
      "Kahoot is a game-based learning platform that transforms quizzes into competitive, engaging experiences. Students join with a PIN and race to answer correctly and quickly to earn the most points.",
      "Teachers use Kahoot to review material in a way students actually look forward to. The timer, leaderboard, and music create classroom energy that a paper quiz simply cannot replicate.",
      "Kahoot supports team mode where students collaborate in small groups to answer together. This encourages discussion and gives quieter students a lower-pressure way to participate in review.",
      "Kahoot's report shows teachers a detailed breakdown of every question after the game. You can see exactly which questions students struggled with and focus the next lesson on those specific gaps.",
      "You can create a Kahoot in minutes by writing your own questions, or search the public library for ready-made quizzes shared by millions of teachers worldwide on nearly any topic.",
      "Blooket is an educational gaming platform where teachers build question sets and students answer them inside different themed game modes. The variety keeps review sessions engaging and fresh.",
      "In Blooket's Gold Quest mode, correct answers let students steal gold from opponents, adding strategy on top of the academic content. This mechanic makes every question feel high stakes.",
      "Blooket's Tower Defense mode has students answer correctly to earn towers that defend their base from enemies. The game design naturally encourages repeated attempts as students want to survive longer.",
      "Teachers can view detailed post-game reports in Blooket showing individual accuracy and which questions had the most errors, helping identify content that needs reteaching before the class moves on.",
      "Blooket's solo mode lets students practice assigned sets at their own pace outside class time. Teachers track completion automatically, making it useful for homework and independent review.",
      "Python is one of the most beginner-friendly languages available, known for its clean and readable syntax. It is used across web development, data science, artificial intelligence, and automation in nearly every industry.",
      "In Python, indentation is not just style — it is syntax. Code inside a function, loop, or conditional must be indented consistently, or Python raises an error and refuses to run the program.",
      "Python's standard library includes modules for reading files, sending HTTP requests, parsing dates, and working with JSON. Before installing any package, it is worth checking whether Python already has what you need.",
      "List comprehensions in Python let you build a list in a single readable line. Instead of writing a loop to append items manually, you can express the same logic concisely and directly on one line.",
      "Functions in Python are defined with the def keyword, followed by the name and parameters. Breaking code into small, well-named functions makes it far easier to test, debug, and reuse across a project.",
      "HTML is the backbone of every webpage on the internet. It uses opening and closing tags to define content like headings, paragraphs, images, and links. Without HTML, browsers would have nothing to display.",
      "Semantic tags like header, nav, main, article, and footer describe the purpose of each section on your page. Using them correctly improves accessibility for screen readers and helps search engines understand your content.",
      "The anchor tag creates hyperlinks, which are the fundamental mechanism for navigating between pages on the web. The href attribute tells the browser where to go, and the link text tells the user what they will find.",
      "HTML forms collect input through text fields, dropdowns, checkboxes, and submit buttons. The form tag specifies where to send the data when submitted, using the action and method attributes.",
      "The img tag embeds an image and requires a src attribute pointing to the file. The alt attribute provides a text description for screen readers and is shown when the image cannot load.",
      "CSS is the styling language of the web, controlling every visual detail — colors, fonts, spacing, and layout. Learning Flexbox and Grid gives you full creative control over how pages look on any device.",
      "The CSS box model describes every element as a rectangle with content, padding, border, and margin. Understanding this model is essential for controlling spacing and building accurate, predictable layouts.",
      "Flexbox is a layout system designed for distributing space and aligning items in one dimension. It solves classic layout challenges like centering an element vertically or making items share available width equally.",
      "CSS Grid is a two-dimensional layout system that places elements in rows and columns simultaneously. It is the most powerful layout tool in CSS and makes building complex responsive designs far more manageable.",
      "Media queries let styles adapt based on screen size or resolution. By writing rules for different breakpoints, you create a single stylesheet that looks great on phones, tablets, and desktops alike.",
      "JavaScript is the programming language of the web. It runs in the browser and lets developers create dynamic experiences — from animations and form validation to full single-page applications with live data.",
      "The DOM is how JavaScript interacts with a webpage. You can use JavaScript to find elements, update their text, change their styles, or remove them entirely in response to user actions.",
      "Event listeners in JavaScript run a function when a specific event occurs, like a click, key press, or page load. They are the primary way JavaScript responds to user interaction and makes a page feel alive.",
      "Arrow functions provide a concise syntax for writing function expressions. They are common in modern code because they are shorter and do not create their own this binding, avoiding a common source of bugs.",
      "Promises represent the eventual result of an asynchronous operation. Using async and await on top of promises makes asynchronous code look synchronous, which is much easier to read and debug.",
      "Uzbekistan is a country in Central Asia whose history stretches thousands of years along the ancient Silk Road. Samarkand, Bukhara, and Khiva were once thriving centers of trade, scholarship, and Islamic architecture.",
      "Samarkand is one of the oldest continuously inhabited cities in the world. Its Registan square, flanked by three magnificent madrasas in turquoise and gold tilework, is among the finest Islamic architecture on earth.",
      "Plov is the national dish of Uzbekistan — rice cooked with lamb, carrots, and onions in a large cast-iron kazan. Every region has its own variation, and preparing it is considered both an art and a tradition.",
      "Uzbekistan declared independence from the Soviet Union on September 1, 1991, now celebrated annually as Independence Day. The country has modernized significantly while staying connected to its deep cultural roots.",
      "The Tashkent Metro, opened in 1977, is famous for its beautifully decorated stations, each in a distinct architectural style. It is one of the most ornate subway systems in the world and a great source of civic pride.",
    ],
    hard: [
      "Microsoft Word's advanced features extend far beyond basic text editing. The macro system lets users record sequences of commands and replay them with a single keystroke, dramatically improving efficiency on large document workflows. Combined with styles, section breaks, and cross-references, Word becomes a capable desktop publishing environment for professional publications.",
      "Collaborating in Microsoft Word has evolved significantly with cloud integration. Real-time co-authoring through OneDrive or SharePoint lets multiple users edit simultaneously, while Track Changes and Comments maintain a complete record of every modification and discussion throughout the document lifecycle.",
      "The table of contents feature in Word automatically generates a navigable index based on heading styles. As long as headings use the built-in Heading styles consistently, Word regenerates the entire contents table with a single click whenever the document changes, saving hours of manual updating on long reports.",
      "Reference management in Word supports footnotes, endnotes, and bibliographies through its built-in citation tool. Select a style like APA, MLA, or Chicago, add your sources once, and Word formats every in-text citation and the final reference list automatically throughout the document.",
      "Document protection in Word lets authors restrict editing, require passwords, or permit only specific change types like form-filling or tracked edits. These controls are essential for professional documents distributed to reviewers where unauthorized modifications to the content structure must be prevented.",
      "Building an effective presentation requires understanding how the brain processes visual and verbal information simultaneously. Research on cognitive load shows audiences retain content better when slides contain visuals that complement spoken words rather than duplicating them — the redundancy effect explains why reading from slides consistently undermines rather than reinforces the spoken message.",
      "PowerPoint's Morph transition creates smooth cinematic animations between slides by automatically identifying matching objects and animating them from their position on one slide to their position on the next. Unlike manual animations, Morph works automatically when objects are named consistently, making complex motion graphics surprisingly accessible to non-designers.",
      "Accessibility in presentations is critical as organizations reach diverse audiences. Screen reader users rely on reading order, alt text, sufficient color contrast, and meaningful slide titles. The built-in Accessibility Checker scans for issues and provides actionable guidance for each problem it finds.",
      "The Slide Master hierarchy includes one master and multiple layout slides beneath it. Changes to the master cascade to all layouts, while layout changes affect only slides using that layout. Mastering this hierarchy lets designers build flexible templates that maintain visual integrity even when distributed to many different presenters.",
      "Data visualization slides should show the insight, not just the chart. A raw bar chart with no annotation forces the audience to draw their own conclusions, while an annotated chart with a clear headline communicating the finding delivers the message immediately and memorably, even to viewers who only glance for a few seconds.",
      "Power Query in Excel is a data transformation technology that lets users import, clean, reshape, and merge data from multiple sources without writing code. Once a query is defined, it refreshes with a single click whenever source data changes, making it essential for anyone working with regularly updated reports.",
      "Array formulas in Excel perform multiple calculations simultaneously and return a result or an array. SUMPRODUCT, for example, multiplies corresponding elements in two arrays and sums the results in a single cell, enabling complex calculations that would otherwise require many helper columns spread across the spreadsheet.",
      "Excel's data validation restricts what users can enter by specifying allowed values, ranges, or dropdown lists. Combined with custom error messages, it transforms a raw spreadsheet into a guided form that prevents silent data entry errors from corrupting downstream calculations and making reports unreliable.",
      "Pivot charts combine the power of pivot tables with visual representation and update automatically as the underlying data changes. They support drilling into data by clicking chart elements and can be filtered independently of the table, making them ideal for interactive data exploration in executive presentations.",
      "XLOOKUP, introduced in newer Excel versions, replaces VLOOKUP with a more flexible and readable alternative. It can search any column, return arrays, handle missing values gracefully, and find the last match rather than the first — eliminating well-known VLOOKUP limitations that frustrated users for decades.",
      "Canva's approach to design democratization changed how non-designers create visual content. By abstracting professional tool complexity into a drag-and-drop interface, Canva enables marketing teams, educators, and entrepreneurs to produce high-quality visuals independently, reducing dependency on designers and dramatically accelerating content production cycles.",
      "The Canva Brand Kit lets organizations codify their visual identity into a centralized asset library. Uploading logos, defining a color palette, and specifying typography creates a reusable foundation accessible to every team member, ensuring brand consistency across all communications without requiring design expertise.",
      "Canva for Education provides free premium access for verified teachers and students, including a classroom interface where educators assign projects, provide feedback, and monitor submissions directly within the platform. This integrates creative tools into the learning workflow and builds visual communication skills alongside traditional academic literacy.",
      "Advanced typography in Canva goes beyond selecting a font. Letter spacing, line height, and effects like curves and shadows create text treatments that integrate with the overall composition. Understanding typographic hierarchy — which text should be largest and most prominent — separates polished professional design from generic amateur work.",
      "Canva's AI tools, including the background remover, Magic Write, and image generator, transform what a solo designer can accomplish. Tasks once requiring dedicated software and skilled hours — removing backgrounds precisely, generating copy variants, creating illustrations — can now be completed in minutes inside the same tool where all design work happens.",
      "The science of typing efficiency is rooted in biomechanics and motor learning. Minimizing finger travel, maintaining proper wrist alignment, and distributing keystrokes evenly across both hands reduces fatigue and enables sustained high-speed typing. This motivation drove alternative layouts like Dvorak and Colemak, designed to place the most common English letters on the home row to minimize total finger movement.",
      "Deliberate practice separates casual typists from experts. Simply typing daily improves familiarity but rarely builds elite speed. Targeted exercises that isolate weak fingers, common letter pairs, or punctuation patterns address the specific bottlenecks limiting performance. Typing tutors with per-finger statistics give you actionable data to direct practice where it makes the biggest difference.",
      "The relationship between accuracy and speed is nonlinear. At low accuracy, errors require backspacing and cost more time than the speed gained by rushing. Studies consistently show typists who maintain above ninety-five percent accuracy and gradually increase their target speed outperform those who chase speed immediately and tolerate frequent mistakes throughout.",
      "Code typing differs from prose typing because it involves a much higher frequency of special characters — parentheses, brackets, underscores, pipes, semicolons — all in less practiced keyboard positions. Developers who specifically master these symbol positions reduce the cognitive interruptions that fragment concentration during extended programming sessions.",
      "Muscle memory in typing forms through the same neurological mechanisms governing all procedural motor skills. Repeated correct repetitions build myelinated neural pathways that make movements faster and more automatic. Practicing at a speed where you maintain correctness is critical — rehearsing errors reinforces incorrect pathways that become progressively harder to unlearn as they solidify.",
      "Kahoot's pedagogical effectiveness rests on combining formative assessment with intrinsic motivation through game design. The timed format creates urgency that boosts engagement, while the live leaderboard sustains attention through competitive stakes. Immediate per-question feedback closes the learning loop far more rapidly than traditional assessments students see days after completion.",
      "Kahoot's Challenge mode lets teachers assign quiz games as asynchronous homework that students complete independently within a deadline. Unlike the live version, it removes real-time competitive pressure while preserving the point system and leaderboard that motivate effort, making it suitable for review assignments outside class hours.",
      "Research on game-based learning platforms like Kahoot has demonstrated significant improvements in student motivation, content retention, and positive attitudes toward the subject reviewed. These effects are especially pronounced for students who disengage during traditional instruction, suggesting the game format provides an alternative participation pathway for different learning profiles.",
      "Kahoot's question editor supports embedded images, diagrams, and videos, making it suitable for subjects that rely heavily on visual content. A science teacher can display a diagram and ask students to identify a structure; a language teacher can play an audio clip and test comprehension. This flexibility extends Kahoot far beyond simple text-based factual recall.",
      "Teacher analytics in Kahoot aggregate performance data across multiple games over time, enabling identification of persistent misconceptions and progress tracking between review sessions. Treating Kahoot reports as meaningful instructional signals rather than just scores transforms it from an engagement tool into a genuine formative assessment instrument.",
      "Blooket's game-based architecture is built on the principle that meaningful repetition is more effective when disguised as play. Each game mode wraps the same question set in a completely different experience — tower defense, gold theft, farming, café management — so students can review the same material multiple times without sessions feeling repetitive or academically routine.",
      "Blooket leverages variable reward schedules, a well-established psychological principle showing that unpredictable rewards are more motivating than consistent ones. When students answer correctly and receive random rewards — coins, power-ups, or items — the unpredictability maintains sustained engagement even after the platform's initial novelty has worn off.",
      "Blooket's ecosystem of unlockable characters called Blooks serves as a long-term progression system giving students ongoing reasons to return beyond any single classroom session. The drive to collect and complete a character set is a proven game design pattern that encourages habitual voluntary engagement, turning optional practice into a self-sustaining student behavior.",
      "Blooket provides post-game reports showing individual question accuracy and engagement metrics for every student. Unlike informal class discussions where understanding is difficult to measure consistently, these data points are objective and comparable across the class, supporting evidence-based decisions about what content to reteach.",
      "Blooket's homework mode lets students practice assigned sets independently, with the platform recording completion and performance automatically. This eliminates logistical overhead of paper-based practice, gives students immediate feedback on every response, and provides teachers a reliable digital record available before the next class meeting.",
      "Python's design philosophy, captured in the Zen of Python, emphasizes readability, simplicity, and explicitness over cleverness. This shapes the syntax, which uses English keywords instead of symbols wherever possible and enforces consistent indentation as a structural requirement. The result is code that reads closer to natural language than almost any other widely used programming language.",
      "Object-oriented programming in Python uses classes as blueprints for objects, specifying the attributes each instance will have and the methods that define its behavior. Inheritance lets new classes extend existing ones, reusing and specializing behavior without code duplication — a foundational principle of scalable software design applicable to domains ranging from games to scientific simulations.",
      "Python's ecosystem of third-party libraries is one of its defining strengths. NumPy and Pandas transformed data manipulation; TensorFlow and PyTorch made deep learning accessible; Flask and Django enable rapid web development. The breadth and quality of this ecosystem explain why Python became the dominant language in data science, machine learning, and scientific computing.",
      "Decorators in Python allow programmers to modify or extend a function's behavior without altering its source code. By wrapping a function inside another that adds functionality before or after the original call, decorators enable cross-cutting concerns like logging, access control, caching, and timing to be applied cleanly and reusably across an entire codebase.",
      "Asynchronous programming in Python using asyncio and the async and await keywords allows a single thread to manage many concurrent tasks by yielding control while waiting for slow I/O operations. This delivers significant throughput improvements in network-heavy applications without the complexity and safety risks of managing multiple threads explicitly.",
      "The evolution from early HTML to HTML5 reflects the entire history of the modern web. Early HTML defined only basic document structure; HTML5 introduced semantic elements, native audio and video support, the canvas element for programmatic graphics, and input types that reduce JavaScript dependencies for validation, transforming HTML from a markup language into a comprehensive application delivery platform.",
      "Accessibility in HTML extends well beyond adding alt text to images. It requires using semantic elements so assistive technologies can interpret page structure, providing ARIA roles where native semantics are insufficient, ensuring keyboard navigability for all interactive elements, and managing focus order so users who cannot use a mouse can navigate and operate every feature of your interface.",
      "HTML forms are the primary mechanism through which users interact with web applications. The input element alone supports over twenty type values — text, email, password, number, date, range, file, and more — each providing browser-native validation, appropriate mobile keyboard types, and semantic meaning that benefits users, search engines, and accessibility tools equally.",
      "The head section of an HTML document contains metadata invisible to users but critical to how a page is indexed, shared, and rendered. The title tag sets the browser tab label and search result text; meta tags provide social sharing descriptions; the viewport meta tag controls how mobile browsers scale the page for different screen sizes.",
      "Progressive enhancement is an HTML philosophy that prioritizes building a functional baseline before adding CSS and JavaScript. A page built this way remains usable even when a stylesheet fails or a script is blocked, ensuring the broadest possible audience can access your content regardless of browser capabilities, network conditions, or accessibility tools.",
      "CSS architecture at scale requires deliberate organization to stay maintainable. Methodologies like BEM encode the relationship between components and variants directly in class names, making it possible for large teams to collaborate on a shared stylesheet without creating specificity conflicts or accidentally breaking styles in unrelated parts of the interface.",
      "CSS custom properties are a native runtime mechanism for storing and reusing values throughout a stylesheet. Unlike preprocessor variables in SASS or LESS, CSS variables are resolved by the browser, which means they can be updated dynamically with JavaScript, respond to media queries, and be overridden at different points in the document hierarchy.",
      "The CSS cascade is the algorithm determining which rule applies when multiple rules target the same element. It weighs specificity, source order, and stylesheet origin. Understanding the cascade deeply prevents the antipattern of repeatedly escalating selector specificity to override earlier rules, which leads to fragile stylesheets that grow progressively harder to maintain.",
      "CSS Grid changed how developers think about web layout by enabling explicit two-dimensional control over rows and columns simultaneously. The grid-template-areas property lets you define structure using readable string representations, making the visual relationship between your code and your intended design unusually transparent and immediately comprehensible to anyone reading the stylesheet.",
      "CSS animations deliver smooth high-performance motion when operating on transform and opacity, which are processed by the GPU without requiring layout recalculation. Animating properties like left, top, or height triggers expensive layout and repaint operations on every frame, while transform moves elements in a compositor layer without affecting document flow or causing reflow.",
      "JavaScript's event loop enables a single-threaded language to handle asynchronous operations without blocking. Synchronous code runs on the call stack; callbacks from APIs like setTimeout or fetch wait in the task queue; and the event loop moves queued tasks onto the stack only when it is empty. This model explains most surprising timing behaviors developers encounter when writing asynchronous code.",
      "Closures are among the most powerful abstractions in JavaScript. A closure forms whenever a function is defined inside another and retains access to the outer function's variables even after that function has returned. This enables factory functions, private state encapsulation, and callbacks that carry context with them — all foundational patterns in how modern JavaScript libraries are structured.",
      "Prototypal inheritance in JavaScript differs fundamentally from classical inheritance. Every object has a hidden prototype property pointing to another object from which it inherits properties and methods. When you access a property not found directly on an object, the engine traverses the prototype chain upward until it finds the property or reaches null at the chain's end.",
      "The ES Module system standardizes how JavaScript is split into files with explicit import and export statements, replacing older patterns like CommonJS. It provides a statically analyzable dependency graph allowing bundlers to perform tree-shaking — removing unused exports from the final build — significantly reducing JavaScript delivered to the browser.",
      "TypeScript extends JavaScript with a static type system that catches errors at compile time. Annotating variables, parameters, and return values lets the compiler verify correctness before code runs. For large codebases maintained by multiple developers, the reduction in runtime errors and improved IDE support that TypeScript provides typically outweigh the overhead of maintaining type annotations.",
      "Uzbekistan's position along the Silk Road made it one of the most strategically important territories in the medieval world. Samarkand and Bukhara attracted merchants, scholars, and diplomats from China, Persia, Arabia, and Europe for over a millennium. The cultural exchange along this network left an enduring architectural and intellectual legacy still visible in the tilework and calligraphy of Uzbekistan's historic cities.",
      "The Timurid Empire, founded by Timur in the fourteenth century, established Samarkand as one of the most magnificent capitals in the known world. Timur brought craftsmen and architects from conquered territories to build mosques, madrasas, and mausoleums covered in intricate geometric tilework and calligraphy. This period is broadly considered the golden age of Central Asian art and intellectual achievement.",
      "The shrinking of the Aral Sea is one of the most severe environmental disasters of the twentieth century. Once the fourth-largest lake in the world, it was systematically drained during the Soviet era to irrigate cotton fields in Uzbekistan and Kazakhstan. The exposed seabed became a salt flat generating toxic dust storms, devastating agricultural land and public health for decades after the initial water diversion.",
      "Uzbekistan's post-independence modernization has included significant investment in infrastructure, digital technology, and tourism. The government liberalized currency exchange, simplified visa requirements, and launched major restoration projects in Samarkand and Bukhara to attract international visitors. These reforms diversify an economy historically dependent on cotton exports and natural gas revenues.",
      "The Uzbek language belongs to the Karluk branch of the Turkic family and uses a Latin-based alphabet adopted in the nineteen nineties, replacing the Cyrillic script imposed during the Soviet period. Before Cyrillic, Uzbek was written in Arabic script for centuries, meaning the language has transitioned through three entirely different writing systems within living memory, reflecting the dramatic transformations of the twentieth century.",
    ],
    quotes: [
      "First, solve the problem. Then, write the code. - John Johnson",
      "Any fool can write code a computer understands. Good programmers write code humans understand. - Fowler",
      "Simplicity is the soul of efficiency. - Austin Freeman",
      "Before software can be reusable it first has to be usable. - Ralph Johnson",
      "The most disastrous thing you can learn is your first programming language. - Alan Kay",
      "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
      "Make it work, make it right, make it fast. - Kent Beck",
      "Talk is cheap. Show me the code. - Linus Torvalds",
      "The function of good software is to make the complex appear simple. - Grady Booch",
      "First do it, then do it right, then do it better. - Addy Osmani",
      "In programming, if someone tells you something is wrong or does not work, they are usually right. - Linus Torvalds",
      "Programs must be written for people to read, and only incidentally for machines to execute. - Abelson & Sussman",
      "It always takes longer than you expect, even when you take into account the Hofstadter's Law. - Hofstadter",
      "Most good programmers do programming not because they expect to get paid but because it is fun. - Torvalds",
      "Walking on water and developing software from a specification are easy if both are frozen. - Edward V Berard",
      "The best error message is the one that never shows up. - Thomas Fuchs",
      "Tell me and I forget. Teach me and I remember. Involve me and I learn. - Benjamin Franklin",
      "The art of teaching is the art of assisting discovery. - Mark Van Doren",
      "A teacher affects eternity; he can never tell where his influence stops. - Henry Adams",
      "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires. - William Arthur Ward",
      "Education is not the filling of a pail but the lighting of a fire. - W.B. Yeats",
      "The best teachers are those who show you where to look but do not tell you what to see. - Alexandra K. Trenfor",
      "One child, one teacher, one book, one pen can change the world. - Malala Yousafzai",
      "To teach is to learn twice. - Joseph Joubert",
      "The highest result of education is tolerance and the desire to keep learning. - Helen Keller",
      "A good teacher can inspire hope, ignite the imagination, and instill a love of learning. - Brad Henry",
    ],
  },
  uz: {
    easy: [
      "tez yashil tulki dangasa it ustidan sakrab o'tdi va uzoqqa yugurdi",
      "kod bir marta yoziladi lekin ko'p marta o'qiladi shuning uchun uni yaxshi yozing",
      "mashq mukammallikka olib keladi va tez yozish ham bundan mustasno emas",
      "har bir buyuk dasturchi bir vaqtlar boshlagan yangi keldi edi va davom etdi",
      "odamlarni xursand qiladigan va muammolarni hal qiladigan ilovalar yarating",
      "mukammallik emas balki taraqqiyotga e'tibor bering va doim yaxshilanasiz",
      "yaxshi kod qoidalarga rioya qilish orqali emas balki g'amxo'rlik bilan yoziladi",
      "xato bu shunchaki hali to'liq tushunilmagan funksiya hisoblanadi",
      "yuborib yuboring foydalanuvchilardan o'rganing va tez takrorlab yaxshilanib boring",
      "boshqa dasturchilar kodini o'qish o'sishning eng yaxshi usullaridan biridir",
      "versiya nazorati sizning xavfsizlik to'ringiz doim buzishdan oldin saqlang",
      "nomlarni yaxshi berish dasturlashdagi eng qiyin muammolardan biri hisoblanadi",
      "buyuk foydalanuvchi interfeysi ko'rinmas bo'ladi u shunchaki ishlaydi",
      "o'chiradigan har bir kod qatori dasturni yanada yaxshi va sodda qiladi",
      "eng yaxshi kod bu umuman kod emas muammoni yozishdan avval hal qiling",
      "o'qitish shunchaki bilim ulashish emas u har bir o'quvchida qiziqish uyg'otishdir",
      "yaxshi o'qituvchi gapirganidan ko'ra ko'proq tinglar va to'g'ri savollar beradi",
      "sabr har bir murabbiy sinfga olib kiradigan eng kuchli ko'nikma hisoblanadi",
      "yaxshi murabbiylar o'quvchilarga javob berish o'rniga javob topishga yordam beradi",
      "boshqalarga o'rgatish nimani bilishingiz va nimani bilmasligingizni aniqlashning eng tez usuli",
      "har bir o'quvchi boshqacha o'rganadi va buyuk o'qituvchilar har biriga yo'l topadi",
      "ta'limning maqsadi chelakni to'ldirish emas balki har bir o'quvchida olov yoqishdir",
      "e'tibor bilan berilgan fikr har qanday o'qituvchi qo'lidagi eng kuchli quroldir",
      "nima qilishni emas qanday o'ylashni o'rgating va o'quvchilaringiz tez o'sadi",
      "o'quvchi nega deb so'raganda bu faqat qo'llash emas tushunishga intilayotganining belgisi",
      "microsoft word yordamida hujjatlarni yozish formatlash va ulashish juda oson",
      "wordda sarlavha uslublaridan foydalanib hujjatingizni boshidan oxirigacha bir xil saqlang",
      "o'zgarishlarni kuzatish funksiyasi jamoangizga har bir tahrirani qabul qilishdan avval ko'rish imkonini beradi",
      "microsoft wordda so'z soni siz yozayotganingizda avtomatik yangilanib turadi",
      "word hujjatiga jadvallar rasmlar va diagrammalarni osongina qo'shish mumkin",
      "yaxshi slaydda bitta fikr katta matn va xabarni qo'llab quvvatlovchi rasm bo'ladi",
      "slaydlaringizni sodda saqlang va rasmlar hikoyaning ko'p qismini o'zi aytib bersin",
      "powerpoint animatsiyalari silliq bo'lishi kerak va auditoriyani hech qachon chalg'itmasligi lozim",
      "barcha slaydlarga bir xil dizayn berish uchun slayd masteridan foydalaning",
      "prezentator ko'rinishi sizga eslatmalarni ko'rsatadi auditoriya esa faqat slaydni ko'radi",
      "sum average va if kabi excel formulalari har kuni soatlab qo'lda hisoblashni tejaydi",
      "excelda pivot jadvallar sekundlar ichida minglab qatorlarni ixcham xulosaga aylantiradi",
      "shartli formatlash muhim qiymatlarni ajratib ko'rsatadi va ma'lumotlarni o'qishni osonlashtiradi",
      "ustun sarlavhalarini ko'rish uchun excelda kataklarni muzlatish funksiyasidan foydalaning",
      "vlookup funksiyasi jadvalda qiymat qidirib boshqa ustundan mos natija qaytaradi",
      "canva maxsus bilimlarisiz plakat flayer va ijtimoiy tarmoq grafikalarini yaratishni osonlashtiradi",
      "canvada elementlarni sudrab tashlang va dizayn ko'nikmalarisiz chiroyli maketlar yarating",
      "canva shablonlaridan boshlang keyin ranglar shriftlar va rasmlarni o'z brendingizga moslang",
      "canva bitta dizaynni turli platformalar uchun bir zumda o'lchamini o'zgartirish imkonini beradi",
      "canvadagi brend to'plami logotip ranglar va shriftlarni doim bir joyda saqlaydi",
      "asosiy qator tugmalari chap qo'l uchun a s d f o'ng qo'l uchun esa j k l dir",
      "barmoqlaringizni asosiy qatorda saqlash pastga qaramasdan tezroq yozishga yordam beradi",
      "ko'r terilish deganda barcha o'n barmoq bilan klaviaturaga qaramasdan yozish tushuniladi",
      "f va j tugmalarida kichik tepalik bor shu orqali asosiy qatorni qaramasdan topasiz",
      "kunlik muntazam mashq tezlik va aniqligingizni oshirishning eng tez yo'lidir",
      "kahoot viktorinalarni butun sinf kutib oladigan qiziqarli musobaqa o'yinlariga aylantiradi",
      "kahootda to'g'ri javob qanchalik tez berilsa har turdan shuncha ko'p ball olinadi",
      "o'qituvchilar darsni tekshirish uchun kahootdan foydalanadi u test emas o'yindek his etiladi",
      "o'quvchilar o'qituvchining ekranidagi pin kod orqali kahoot o'yiniga qo'shiladi",
      "kahoot har savoldan so'ng liderlar jadvalini ko'rsatadi o'quvchilar esa reytingini ko'radi",
      "blooket o'quvchilarga bir xil savollarga javob bera turib turli o'yin rejimlarini o'ynash imkonini beradi",
      "blooketda to'g'ri javob berib tangalar topasiz va ularni yangi personajlarni ochishga sarflaysiz",
      "o'qituvchilar blooketda savol to'plamlari yaratadi o'quvchilar esa o'yin rejimini tanlaydi",
      "blooketda minora mudofaasi oltin qidirish va kafe kabi turli o'yin rejimlari mavjud",
      "blooket o'yinini sinfda jonli o'tkazish yoki uyda mustaqil mashq sifatida berish mumkin",
      "python kodlar blokini aniqlash uchun qavslar o'rniga chekinishdan foydalanadi",
      "print funksiyasi pythondagi eng oddiy buyruq bo'lib natijani to'g'ridan to'g'ri ekranga chiqaradi",
      "python ro'yxatlari tartibli to'plamlar bo'lib raqamlar matnlar va boshqa obyektlarni saqlaydi",
      "pythonda for tsikli ro'yxatdagi har bir element uchun kod blokini bir marta takrorlaydi",
      "python lug'atlari ma'lumotlarni kalit qiymat juftliklari sifatida jingalak qavslar ichida saqlaydi",
      "html har bir veb sahifaning tuzilmasini ochuvchi va yopuvchi teglar tizimi orqali belgilaydi",
      "har bir html sahifa doctype deklaratsiyasi html head va body teglari bilan boshlanadi",
      "html dagi anchor teg boshqa sahifa yoki veb saytga o'tuvchi havolalar yaratadi",
      "header nav main va footer kabi semantik html teglaridan foydalanib sahifani aniq tuzing",
      "img tegi html da rasm joylashtiradi alt atributi esa uni ekran o'quvchilar uchun tasvirlaydi",
      "css html elementlari qanday ko'rinishini rang shrift va chegaralar kabi xossalar orqali boshqaradi",
      "css quti modeli har bir elementga chap o'ng yuqori pastki chegaralari bilan to'rtburchak maydon beradi",
      "flexbox elementlarni qatorda yoki ustunda hizalash va taqsimlashni osonlashtiradi",
      "css da media so'rovlaridan foydalanib tartibingizni turli ekran o'lchamlariga moslang",
      "css o'zgaruvchilari ranglar yoki o'lchamlarni bir joyda saqlash va qayta ishlatish imkonini beradi",
      "javascript veb sahifalarga tugma bosish va forma tekshiruvi kabi interaktivlik qo'shadi",
      "javascript da o'zgaruvchilar let const yoki var bilan e'lon qilinadi har biri turli qamrovga ega",
      "javascript da massiv to'rtburchak qavslar yordamida bitta o'zgaruvchida ko'p qiymatni saqlaydi",
      "javascript da funksiya chaqirilganda ishlaydigan qayta foydalanish mumkin bo'lgan kod blokidir",
      "javascript da dom sahifadagi har qanday elementni topish va o'zgartirish imkonini beradi",
      "o'zbekiston markaziy osiyo da joylashgan quruqlikka o'ralgan davlat qadimgi ipak yo'li bilan mashhur",
      "samarqand buxoro va xiva o'zbekistonda hayratlanarli me'moriy yodgorliklarga ega qadimiy shaharlar",
      "toshkent metro markaziy osiyo dagi eng chiroyli bezatilgan metro tizimlaridan biri hisoblanadi",
      "palov o'zbekistonning milliy taomi bo'lib guruch go'sht sabzi va piyozdan kazanda tayyorlanadi",
      "o'zbekiston 1991 yil 1 sentyabrda sovet ittifoqidan mustaqilligini e'lon qildi",
    ],
    medium: [
      "Dasturlash tez yozish haqida emas, balki aniq fikrlash va muammolarni birma-bir hal qilish haqida.",
      "Yangi ko'nikmani o'rganishning eng yaxshi usuli u bilan haqiqiy narsa qurishdir, hatto u buzilsa ham.",
      "Dasturiy ta'minot ishlab chiqish jamoa ishi. Siz bugun yozgan kod ertaga boshqa odam tomonidan o'qiladi.",
      "Xatoliklarni tuzatish kodni yozishdan ikki baravar qiyin. Birinchi marta oddiy yozing.",
      "Yaxshi dasturchi bir tomonli ko'chani kesib o'tishdan oldin ham ikkala tomonga qaraydi.",
      "Dasturchi ega bo'lishi mumkin bo'lgan eng muhim ko'nikma bu jamoa bilan aniq muloqot qila olish qobiliyatidir.",
      "Hech qachon chiqarilmagan kod qiymatsiz. Bajarilgan va joylashtirilgan har doim mukammal lekin chiqarilmaganidan yaxshidir.",
      "O'qitish tushunishning eng yuqori shaklidir. Tushunchani o'quvchiga aniq tushuntirsangiz, o'z bilimingizning bo'shliklarini topasiz.",
      "Murabbiyning vazifasi o'quvchilarni o'ziga bog'liq qilish emas, balki o'zini keraksiz qilishdir. Haqiqiy muvaffaqiyat bu sizni ortda qoldirgan o'quvchidir.",
      "Sinfdagi eng kuchli vosita doska yoki proyektor emas — bu hech qachon o'rganishni to'xtatmaydigan o'qituvchining haqiqiy qiziqishidir.",
      "Sinfingizga kirgan har bir o'quvchi boshqa bir orqa fon va dunyoni ko'rish usulini olib keladi. Ularni qayerda ekanligida qabul qiling.",
      "Dasturlashni o'rgatish muammoni hal qilishni o'rgatishdir. Til faqat lug'at; mantiqiy fikrlash esa uning ostidagi grammatikadir.",
      "O'quvchi qiynalib qolsa uni uchun hal qilishga shoshilmang. Buning o'rniga savol bering. O'sha pauza, o'sha faol kurash, haqiqiy o'rganish sodir bo'lgan joydir.",
      "Microsoft Word dunyodagi eng keng tarqalgan matn muharririlaridan biridir. U hujjatlarni yozish, formatlash va hamkorlikda ishlash uchun qurollar taqdim etadi. Word klaviatura yorliqlarini o'rganish bir necha hafta ichida samaradorlikni sezilarli darajada oshirishi mumkin.",
      "Wordda o'zgarishlarni kuzatish funksiyasi hujjatga kiritilgan har bir tahrirani qayd etadi. Hamkorlar har bir o'zgarishni alohida qabul yoki rad etishi mumkin, bu esa jamoaviy yozish va o'zaro tekshirish uchun ideal vositadir.",
      "Word uslublari sarlavhalar va asosiy matn formatlashini bir joyda belgilash imkonini beradi. Uslubni yangilasangiz, undan foydalanadigan barcha abzatslar avtomatik yangilanadi va bu katta hujjatlarda juda ko'p vaqtni tejaydi.",
      "PowerPoint da yaxshi prezentatsiya bezakli effektlar haqida emas, balki aniq g'oyalarni vizual qo'llab-quvvatlash bilan yetkazish haqidadir. Har bir slaydda bitta asosiy xabar bo'lishi kerak. Eng yaxshi ma'ruzachilar slaydlar ovozlarining tabiiy davomi bo'lib ketgunga qadar mashq qiladilar.",
      "PowerPoint dagi Slayd Master barcha slaydalarga shriftlar, ranglar va joylanishni bir marta o'rnatib avtomatik qo'llash imkonini beradi. Buni boshidanoq ishlatish formatlashni qayta o'zgartirishga sarflanadigan soatlarni tejaydi.",
      "Prezentator ko'rinishi ma'ruzachiga eslatmalar va taymer ko'rsatadi, auditoriya esa faqat toza slaydni ko'radi. Bu tinglovchilar bilan ko'z aloqasini yo'qotmay yo'nalishni saqlab turishga yordam beradi.",
      "Microsoft Excel millionlab odamlar tomonidan ma'lumotlarni tartiblashtirish, tahlil qilish va vizualizatsiya qilish uchun ishlatiladigan kuchli elektron jadval vositasidir. VLOOKUP, SUMIF va INDEX-MATCH kabi formulalarni o'rganish raqamlar bilan ishlash tarzingizni tubdan o'zgartirishi mumkin.",
      "Pivot jadvallar Excelning eng kuchli funksiyalaridan biridir. Ular birorta ham formula yozmasdan katta ma'lumotlar to'plamlarini guruhlash, xulosalash va filtrlash imkonini beradi, minglab qatorlarni sekundlar ichida tushunarli xulosaga aylantiradi.",
      "Excelda shartli formatlash katakcha qiymatiga qarab uning rangini avtomatik o'zgartiradi. Bu ma'lumotlardagi tendensiyalar, chetga chiqish va muammolarni hech qanday qo'shimcha hisob-kitobsiz bir ko'rishda aniqlashni osonlashtiradi.",
      "Canva brauzerdagi dizayn vositasi bo'lib, har kimga dizayn ma'lumotlarisiz professional ko'rinadigan grafikalar yaratish imkonini beradi. Minglab shablonlar va sudrab tashlash interfeysi yordamida daqiqalar ichida plakat va prezentatsiyalar yaratish mumkin.",
      "Canvadagi Brend To'plami logotip, brendingiz ranglari va shriftlarini saqlaydi, ular doim bir marta bosish masofasida bo'ladi. Yaratadigan har bir dizayn hex kodlarini yoki shrift nomlarini eslab qolmasdan vizual jihatdan mos bo'ladi.",
      "Ko'r terilish klaviaturaga qaramasdan barcha o'n barmoqdan foydalanish ko'nikmasidir. Har bir tugma o'rnining muskul xotirasini shakllantirgandan so'ng tezlik va aniqligingiz sezilarli darajada yaxshilanadi. Ko'pchilik mutaxassislar kunlik muntazam mashq orqali daqiqasiga yetmishdan ortiq so'z tezligiga erishadilar.",
      "Asosiy qator ko'r terilishning asosi hisoblanadi. Chap barmoqlar A, S, D, F tugmalarida turadi, o'ng barmoqlar esa J, K, L va nuqtali vergulda turadi. Boshqa barcha tugmalar asosiy joydan uzoqlashib zudlik bilan qaytib kelish yo'li bilan bosiladi.",
      "Terishni o'rganayotganda aniqlik har doim tezlikdan oldinda bo'lishi kerak. Shoshilish keyinchalik tuzatish qiyinroq bo'lgan yomon odatlarni shakllantiradi. Bir necha hafta davomida sekin va to'g'ri terish tez lekin noaniq naqshlar rivojlantirishdan ko'ra yaxshidir.",
      "Kahoot an'anaviy viktorinalarni raqobatbardosh qiziqarli tajribaga aylantiruvchi o'yin asosidagi o'quv platformasidir. O'quvchilar PIN orqali qo'shiladi va eng ko'p ball olish uchun savollarni tez va to'g'ri javob berishda musobaqalashadilar.",
      "O'qituvchilar Kahootdan o'quvchilar haqiqatan ham kutib oladigan tarzda material takrorlash uchun foydalanadilar. Hisoblagich, jonli reyting jadvali va musiqa qog'oz viktorina hech qachon takrorlay olmaydigan sinf muhitini yaratadi.",
      "Blooket o'qituvchilar savol to'plamlari yaratadigan va o'quvchilar ularni turli mavzuli o'yin rejimlarida javob beradigan ta'lim o'yin platformasidir. O'yin turlari xilma-xilligi takrorlash sessiyalarini yangi va qiziqarli ushlab turadi.",
      "Blooketning Oltin Qidirish rejimida to'g'ri javob bergan o'quvchilar raqiblaridan oltin o'g'irlashi mumkin, bu akademik mazmun ustiga strategiya qatlamini qo'shadi. Bu mexanizm har bir savolni muhim his ettiradi va sinfni davomli jalb qiladi.",
      "Python mavjud eng boshlang'ich do'stona dasturlash tillaridan biri bo'lib, toza va o'qilishi oson sintaksisi bilan mashhur. U deyarli har bir sohada veb ishlab chiqish, ma'lumotlar fani, sun'iy intellekt va avtomatlashtirishda qo'llaniladi.",
      "Pythonda chekinish shunchaki uslub emas, balki sintaksisning bir qismidir. Funksiya, tsikl yoki shart ichidagi kod izchil chekintirilishi kerak, aks holda Python xato chiqarib dasturni ishga tushirishdan bosh tortadi.",
      "Python standart kutubxonasi fayllarni o'qish, HTTP so'rovlari yuborish, sanalarni tahlil qilish va JSON bilan ishlash uchun modullarni o'z ichiga oladi. Uchinchi tomon paketlarini o'rnatishdan avval Pythonning o'zida kerak narsa bor-yo'qligini tekshirish arziydi.",
      "HTML internetdagi har bir veb sahifaning asosini tashkil etadi. U sarlavhalar, abzatslar, rasmlar va havolalar kabi mazmunni belgilash uchun ochuvchi va yopuvchi teglar tizimidan foydalanadi. HTMLsiz brauzerlar nima ko'rsatishni bilmaydi.",
      "Header, nav, main, article va footer kabi semantik teglar sahifangizdagi har bir bo'limning maqsadini tavsiflaydi. Ularni to'g'ri ishlatish ekran o'quvchi foydalanuvchilar uchun foydalanish imkoniyatini oshiradi va qidiruv tizimlari kontentingizni yaxshiroq tushunishiga yordam beradi.",
      "Anchor tegi veb sahifalar o'rtasida navigatsiya qilishning asosiy mexanizmi bo'lgan giperhavolalar yaratadi. href atributi brauzerga qayerga borishni, havola matni esa foydalanuvchiga nima topishini aytadi.",
      "CSS veb ning uslub tilidir. U rang, shrift, bo'shliq va tartib kabi veb sahifaning har bir vizual tafsilotini nazorat qiladi. Flexbox va Grid ni chuqur o'rganish har qanday qurilmada sahifalar qanday ko'rinishini to'liq nazorat qilish imkonini beradi.",
      "CSS quti modeli har bir elementni kontent, to'ldirish, chegara va chegara bilan to'rtburchak sifatida ko'rsatishni tasvirlaydi. Bu modelni tushunish bo'shliqni nazorat qilish va aniq tartiblar yaratish uchun muhimdir.",
      "Flexbox bir o'lchamda elementlarni tarqatish va hizalash uchun mo'ljallangan tartib tizimi. U elementni vertikal markazlashtirish yoki mavjud kenglikni teng taqsimlash kabi klassik tartib muammolarini hal qiladi.",
      "JavaScript veb ning dasturlash tilidir. U brauzerda ishlaydi va dasturchilarga animatsiyalar, forma tekshiruvi va jonli ma'lumotlar bilan to'liq sahifa almashtirilmaydigan ilovalar yaratish imkonini beradi.",
      "DOM JavaScript ning veb sahifa mazmuni bilan o'zaro munosabati usuli. JavaScript yordamida elementlarni topish, matnlarini yangilash, uslublarini o'zgartirish yoki foydalanuvchi harakatlariga javoban ularni sahifadan olib tashlash mumkin.",
      "O'zbekiston ming yillar davomida qadimgi Ipak yo'li bo'ylab cho'zilgan tarixga ega Markaziy Osiyo davlatidir. Samarqand, Buxoro va Xiva bir vaqtlar savdo, ilm-fan va islom me'moriyatining gullab-yashnagan markazlari bo'lgan.",
      "Samarqand dunyodagi uzluksiz yashaladigan eng qadimiy shaharlardan biridir. Feruza va oltin kashtalar bilan qoplangan uch ulug'vor madrasa bilan o'ralgan Registon maydoni yerda islom me'moriyatining eng noyob namunalaridan biri hisoblanadi.",
      "O'zbekistonning milliy taomi palov bo'lib, u katta cho'yan qozon — kazanda qo'zichoq, sabzi va piyoz bilan pishirilgan guruchdan tayyorlanadi. O'zbekistonning har bir viloyatida o'ziga xos palov turi mavjud va uni pishirish san'at ham an'ana hisoblanadi.",
      "O'zbekiston 1991 yil 1 sentyabrda Sovet Ittifoqidan mustaqilligini e'lon qildi, bu sana har yili Mustaqillik kuni sifatida nishonlanadi. Mamlakat o'z madaniy ildizlariga aloqani saqlab qolgan holda sezilarli darajada modernizatsiya bo'ldi.",
      "1977 yilda ochilgan Toshkent Metrosu o'zining har biri o'ziga xos me'moriy uslubda bezatilgan stansiyalari bilan mashhur. U dunyodagi eng naqshli metro tizimlaridan biri bo'lib, toshkentliklar uchun katta maqtanch manbai hisoblanadi.",
    ],
    hard: [
      "Microsoft Word ning kengaytirilgan imkoniyatlari oddiy matn muharrirlashdan ancha uzoqqa boradi. Makro tizimi foydalanuvchilarga buyruqlar ketma-ketligini yozib, bitta tugma bosish bilan qayta ishga tushirish imkonini beradi, bu esa katta hujjat ish oqimlarida samaradorlikni keskin oshiradi. Uslublar, bo'lim uzilishlari va o'zaro havolalar bilan birgalikda Word professional nashrlar uchun to'laqonli nastol nashriyot muhitiga aylanadi.",
      "Microsoft Worddagi hamkorlik bulut integratsiyasi tufayli sezilarli rivojlandi. OneDrive yoki SharePoint orqali real vaqtda birgalikda muallif bo'lish bir necha foydalanuvchiga bir vaqtda tahrirlash imkonini beradi, O'zgarishlarni Kuzatish va Izohlar funksiyalari esa hujjat hayot tsikli davomida har bir o'zgartirish va muhokamaning to'liq qaydini saqlaydi.",
      "Worddagi mundarija sarlavha uslublari asosida navigatsiya qilinadigan ko'rsatkichni avtomatik yaratadi. Sarlavhalar ichki Sarlavha uslublaridan izchil foydalangan holda formatlangan bo'lsa, Word hujjat o'zgarganda butun mundarijani bitta bosish bilan qayta yaratadi va uzun hisobotlarda qo'lda yangilashga sarflanadigan soatlarni tejaydi.",
      "Wordda adabiyotlar ro'yxatini boshqarish funksiyasi ichki iqtibos vositasi orqali izohlar, muallif izohlari va adabiyotlar ro'yxatini qo'llab-quvvatlaydi. APA, MLA yoki Chikago kabi uslubni tanlang, manbalaringizni bir marta kiriting va Word butun hujjat bo'ylab har bir matn ichidagi iqtibos va yakuniy adabiyotlar ro'yxatini avtomatik formatlaydi.",
      "Worddagi hujjatni himoyalash mualliflarga tahrirlashni cheklash, parol talab qilish yoki faqat ma'lum turdagi o'zgarishlarga, masalan, forma to'ldirish yoki kuzatilgan tahrirlarga ruxsat berish imkonini beradi. Bu imkoniyatlar hujjat tuzilishiga ruxsatsiz o'zgartirish kiritilishining oldini olish kerak bo'lgan professional hujjatlar uchun muhimdir.",
      "Samarali prezentatsiya yaratish miyaning vizual va og'zaki ma'lumotlarni bir vaqtda qanday qayta ishlashini tushunishni talab qiladi. Kognitiv yuklanish bo'yicha tadqiqotlar auditoriya slaydlar gapirganlarni takror etishdan ko'ra to'ldiruvchi vizual elementlar bo'lganda ma'lumotni yaxshiroq eslab qolishini ko'rsatadi. Bu ortiqcha effekti deb ataluvchi tamoyil nima uchun slaydlardan o'qish doimo og'zaki xabarni kuchaytirish o'rniga zaiflashtirishi sababini izohlaydi.",
      "PowerPoint dagi Morph o'tish effekti mos ob'ektlarni avtomatik aniqlab, ularni bir slayddagi o'rnidan keyingi slayddagi o'rniga animatsiya qilish orqali slaydlar orasida silliq kinematografik animatsiyalar yaratadi. Qo'lda sozlanishi kerak bo'lgan an'anaviy animatsiyalardan farqli o'laroq, Morph ob'ektlar slaydlar bo'ylab izchil nomlanganda avtomatik ishlaydi, bu esa murakkab harakat grafikasini dizaynersiz ham yaratish imkonini beradi.",
      "Pivot jadvallar Excelning eng kuchli imkoniyatlaridan biridir. Ular birorta ham formula yozmasdan katta ma'lumot to'plamlarini guruhlash, xulosalash va filtrlash imkonini beradi. SUMPRODUCT funksiyasi, masalan, ikkita massivdagi mos elementlarni ko'paytiradi va yagona katakda natijalarni jamlaydi, bu esa boshqa holatda elektron jadval bo'ylab ko'plab yordamchi ustunlarni talab qiladigan murakkab hisob-kitoblarga imkon yaratadi.",
      "Python ning dizayn falsafasi, Python Zenida ifodalanganidek, aqlli va qisqalik ustidan o'qilishi, soddalik va aniqlikni ta'kidlaydi. Bu falsafa til sintaksisini shakllantiradi: iloji boricha ramzlar o'rniga inglizcha kalit so'zlar ishlatiladi va izchil chekinish uslub talabi sifatida emas, tuzilish talabi sifatida talab qilinadi. Natija deyarli boshqa keng qo'llaniladigan dasturlash tiliga qaraganda tabiiy tilga yaqinroq o'qiladigan koddir.",
      "Pythondagi ob'ektga yo'naltirilgan dasturlash har bir nusxa ega bo'ladigan atributlar va uning xatti-harakatini belgilovchi metodlarni ko'rsatuvchi ob'ektlar uchun ko'rsatmalar sifatida sinflardan foydalanadi. Meros yangi sinflarga kod takrorlanmasdan mavjud sinflarni kengaytirish va ixtisoslashtirish imkonini beradi, bu esa o'yinlardan ilmiy simulyatsiyalarga qadar turli sohalardagi murakkab tizimlarni modellashga mos keladigan kengaytiriladigan dasturiy ta'minot dizaynining asosiy tamoyilidir.",
      "HTML ning erta versiyadan HTML5 gacha rivojlanishi zamonaviy vebning butun tarixini aks ettiradi. Erta HTML faqat asosiy hujjat tuzilmasini belgilagan; HTML5 esa semantik elementlar, mahalliy audio va video qo'llab-quvvatlash, dasturiy grafika uchun canvas elementi va JavaScript bog'liqliklarini kamaytiruvchi kiritish turlarini joriy qildi, HTMLni oddiy belgilash tilidan keng qamrovli ilova yetkazib berish platformasiga aylantirdi.",
      "CSS da kengaytiriladigan me'moriyat kodni saqlanishi oson ushlab turish uchun ataylab tashkillashtirish talab qiladi. BEM kabi metodologiyalar komponentlar va ularning variantlari orasidagi munosabatni to'g'ridan-to'g'ri sinf nomlarida kodlaydi. Bu katta jamoalarga umumiy uslublar jadvalida birgalikda ishlash imkonini beradi va interfeysning aloqasiz qismlarida bir-birining uslublarini tasodifan buzmaslik uchun qulay sharoit yaratadi.",
      "JavaScript ning voqealar tsikli blokirovkasiz asinxron operatsiyalarni boshqarish imkonini beradigan bir oqimli til uchun mexanizmdir. Sinxron kod chaqiruv stekida bajariladi; setTimeout yoki fetch kabi API lardan kelgan qayta chaqiruvlar vazifalar navbatida kutadi; voqealar tsikli esa navbatdagi vazifani stekga o'tkazishdan avval stekni tekshiradi. Bu model dasturchilar asinxron JavaScript yozishda duch keladigan ajablanarli vaqt xatti-harakatlarini tushuntiradi.",
      "O'zbekistonning Ipak yo'li bo'ylab joylashgan o'rni uni o'rta asr dunyosidagi eng strategik muhim hududlardan biriga aylantirdi. Samarqand va Buxoro bir ming yildan ko'proq vaqt davomida Xitoy, Eron, Arabiston va Yevropadan savdogarlar, olimlar va diplomatlarni jalb etdi. Bu tarmoq bo'ylab madaniy almashinuv O'zbekistonning tarixiy shaharlarida hanuzgacha ko'rinib turadigan me'moriy va intellektual meros qoldirdi.",
      "Temuriylar imperiyasi, XIV asrda Temur tomonidan tashkil topgan, Samarqandni o'sha paytdagi mashhur dunyodagi eng ulug'vor poytaxtlardan biriga aylantirdi. Temur istilo qilingan hududlardan hunarmandlar va me'morlarni chaqirib, shaharni murakkab geometrik mozaika va islom xattatligiga o'ralgan masjidlar, madrasalar va maqbaralar bilan bezatdi. Bu davr Markaziy Osiyo san'at va intellektual yutuqlarining oltin davri sifatida keng tan olinadi.",
      "Orol dengizining qurishi XX asrning eng og'ir ekologik falokatlaridan biridir. Bir vaqtlar dunyo bo'yicha to'rtinchi eng katta ko'l bo'lgan bu suv havzasi sovet davrida O'zbekiston va Qozog'istondagi paxta dalalarini sug'orish uchun ataylab quritildi. Ochilgan dengiz tubi zaharli chang bo'ronlari keltirib chiqaradigan tuz tekisligiga aylandi va suv yo'naltirilgandan keyin o'n yillar davomida atrofdagi jamoalarda qishloq xo'jaligi va jamoat salomatligi uchun vayronkorlik olib keldi.",
    ],
    quotes: [
      "Avval muammoni hal qiling. Keyin kodni yozing. - John Johnson",
      "Har bir ahmoq kompyuter tushunadigan kod yoza oladi. Yaxshi dasturchilar inson tushunadigan kod yozadi. - Fowler",
      "Oddiylik samaradorlikning ruhi. - Austin Freeman",
      "Dasturiy ta'minot qayta foydalanilishidan oldin avval foydalanilishi kerak. - Ralph Johnson",
      "O'rganishingiz mumkin bo'lgan eng halokatli narsa birinchi dasturlash tilingizdir. - Alan Kay",
      "Uni ishlat, to'g'ri qil, tezlashtir. - Kent Beck",
      "Gap arzon. Menga kodni ko'rsat. - Linus Torvalds",
      "Yaxshi dasturiy ta'minotning vazifasi murakkabni oddiy ko'rsatishdir. - Grady Booch",
      "Menga ayt va esimdan chiqadi. O'rgat va esda qoladi. Jalb et va o'rganaman. - Benjamin Franklin",
      "O'qitish san'ati kashfiyotga yordam berish san'atidir. - Mark Van Doren",
      "O'qituvchi abadiyatga ta'sir qiladi; uning ta'siri qayerda to'xtashini hech qachon aytib bo'lmaydi. - Henry Adams",
      "O'qitishga ikki marta o'rganiladi. - Joseph Joubert",
      "Bitta bola, bitta o'qituvchi, bitta kitob, bitta qalam dunyoni o'zgartira oladi. - Malala Yousafzai",
      "Eng yaxshi o'qituvchilar qaerga qarashni ko'rsatadi, lekin nima ko'rishni aytmaydi. - Alexandra K. Trenfor",
      "Ta'lim chelakni to'ldirish emas, balki olov yoqishdir. - W.B. Yeats",
    ],
  },
  ru: {
    easy: [
      "быстрая коричневая лиса перепрыгнула через ленивую собаку и убежала прочь",
      "код пишется один раз но читается много раз поэтому пишите его хорошо",
      "практика ведёт к совершенству и быстрая печать не является исключением из этого",
      "каждый великий разработчик когда-то был новичком который продолжал идти вперёд",
      "создавайте приложения которые заставляют людей улыбаться и решают реальные задачи",
      "сосредоточьтесь на прогрессе а не на совершенстве и вы всегда будете улучшаться",
      "чистый код пишется не следованием правилам а заботой о качестве написанного",
      "баг это просто функция которая ещё не была правильно понята и изучена",
      "отправляйте код учитесь у пользователей и итерируйте быстро для создания лучших продуктов",
      "чтение чужого кода является одним из лучших способов профессионального роста",
      "контроль версий это ваша страховочная сеть всегда делайте коммит перед изменениями",
      "хорошее именование вещей является одной из самых сложных задач в программировании",
      "отличный интерфейс невидим он просто работает без необходимости думать о нём",
      "каждая удалённая строка кода делает программу лучше и проще для понимания",
      "преподавание это не просто передача знаний это разжигание любопытства в каждом ученике",
      "хороший учитель слушает больше чем говорит и задаёт правильные вопросы своим ученикам",
      "терпение это самый мощный навык который любой наставник привносит в класс",
      "лучшие наставники помогают ученикам находить ответы а не раздают готовые ответы",
      "учить других это самый быстрый способ обнаружить что ты на самом деле знаешь",
      "каждый ученик учится по-своему и великие учителя находят подход к каждому из них",
      "цель образования не наполнить ведро а разжечь огонь в каждом учащемся",
      "обратная связь данная с заботой это самый мощный инструмент в руках учителя",
      "покажите ученикам как вы думаете а не только что делать и наблюдайте как они растут",
      "ученик который спрашивает почему ценнее того кто просто следует инструкциям",
      "повторение строит мышечную память но понимание строит уверенность в учащемся",
      "microsoft word помогает писать форматировать и делиться документами быстро и удобно",
      "используйте стили в word чтобы заголовки и абзацы всегда выглядели одинаково",
      "отслеживание изменений в word позволяет команде проверить каждую правку перед принятием",
      "счётчик слов в microsoft word обновляется в реальном времени во время набора текста",
      "в документ word можно легко вставлять таблицы изображения и диаграммы",
      "на хорошем слайде одна идея крупный текст и картинка которая поддерживает сообщение",
      "делайте слайды простыми и пусть изображения рассказывают большую часть истории",
      "анимации в powerpoint должны быть ненавязчивыми чтобы не отвлекать аудиторию",
      "используйте образец слайдов чтобы применить единый стиль ко всей презентации",
      "режим докладчика показывает ваши заметки в то время как аудитория видит только слайд",
      "формулы excel такие как сумм срзнач и если экономят часы ручных вычислений каждый день",
      "сводные таблицы в excel обобщают тысячи строк данных за считанные секунды",
      "условное форматирование выделяет важные значения и делает данные легче читаемыми",
      "закрепите строки в excel чтобы заголовок был виден при прокрутке вниз",
      "функция vlookup ищет значение в таблице и возвращает результат из соответствующего столбца",
      "canva позволяет создавать плакаты флаеры и графику для соцсетей без специальных знаний",
      "перетаскивайте элементы в canva для создания красивых макетов без навыков дизайна",
      "начните с шаблона canva затем настройте цвета шрифты и изображения под свой бренд",
      "canva позволяет мгновенно изменить размер дизайна для разных платформ одним кликом",
      "набор бренда в canva хранит логотип цвета и шрифты всегда под рукой",
      "основной ряд клавиш для левой руки а с д ф для правой — й к л д",
      "удерживание пальцев на основном ряду помогает набирать текст быстрее без взгляда вниз",
      "слепой метод печати означает работу всеми десятью пальцами без взгляда на клавиатуру",
      "регулярные ежедневные тренировки быстрее всего повышают скорость и точность набора",
      "точность важнее скорости когда вы только начинаете учиться слепому методу печати",
      "kahoot превращает викторины в соревновательные игры которые весь класс с нетерпением ждёт",
      "в kahoot чем быстрее вы отвечаете правильно тем больше очков получаете за каждый вопрос",
      "учителя используют kahoot для повторения материала так что это ощущается как игра а не тест",
      "ученики присоединяются к kahoot по игровому пин-коду показанному на экране учителя",
      "kahoot показывает таблицу лидеров после каждого вопроса чтобы ученики видели свой рейтинг",
      "blooket позволяет ученикам играть в разные игровые режимы отвечая на одни и те же вопросы",
      "в blooket вы зарабатываете монеты правильными ответами и тратите их на разблокировку персонажей",
      "учителя создают наборы вопросов в blooket а ученики выбирают какой игровой режим сыграть",
      "в blooket есть режимы защиты башни поиска золота и кафе чтобы сохранять интерес",
      "можно провести живую игру blooket для класса или задать её для самостоятельной практики дома",
      "python использует отступы вместо скобок для определения блоков кода делая его читаемым",
      "print — самая простая функция python и она отправляет вывод прямо на экран",
      "списки python хранят упорядоченные коллекции чисел строк и других объектов",
      "цикл for в python повторяет блок кода один раз для каждого элемента в списке",
      "словари python хранят данные в виде пар ключ-значение внутри фигурных скобок",
      "html определяет структуру каждой веб-страницы с помощью открывающих и закрывающих тегов",
      "каждая html-страница начинается с объявления doctype затем html head и body",
      "тег anchor в html создаёт кликабельную ссылку на другую страницу или сайт",
      "используйте семантические теги html такие как header nav main и footer для структуры страницы",
      "тег img встраивает изображение а атрибут alt описывает его для программ чтения с экрана",
      "css управляет внешним видом элементов html с помощью свойств цвет шрифт и отступ",
      "блочная модель css даёт каждому элементу отступ границу заполнение и область содержимого",
      "flexbox упрощает выравнивание и распределение элементов в строке или столбце",
      "используйте медиа-запросы в css чтобы макет адаптировался к разным размерам экрана",
      "переменные css позволяют хранить цвета или размеры в одном месте и переиспользовать их",
      "javascript добавляет интерактивность веб-страницам например нажатие кнопок и проверка форм",
      "переменные в javascript объявляются с помощью let const или var каждая с разной областью видимости",
      "массив в javascript хранит несколько значений в одной переменной используя квадратные скобки",
      "функция в javascript это многократно используемый блок кода который запускается при вызове",
      "dom позволяет javascript находить и изменять любой элемент на веб-странице",
      "узбекистан — это не имеющая выхода к морю страна в средней азии с богатой историей шёлкового пути",
      "самарканд бухара и хива — древние города узбекистана с потрясающей архитектурой",
      "ташкентское метро является одним из самых красиво оформленных метрополитенов в мире",
      "плов — национальное блюдо узбекистана приготовленное из риса мяса моркови и лука в казане",
      "узбекистан провозгласил независимость от советского союза первого сентября тысяча девятьсот девяносто первого года",
    ],
    medium: [
      "Программирование — это не про скорость печати, а про чёткое мышление и решение задач по одной.",
      "Лучший способ освоить новый навык — создать с его помощью что-то реальное, даже если это сломается.",
      "Разработка программного обеспечения — командный вид спорта. Код который вы пишете сегодня прочитает кто-то другой.",
      "Отладка в два раза сложнее написания кода. Пишите просто с первого раза.",
      "Хороший программист смотрит в обе стороны перед переходом по дороге с односторонним движением.",
      "Самый важный навык разработчика — это умение чётко общаться со своей командой.",
      "Код который никогда не выпускается бесполезен. Сделанное и развёрнутое всегда лучше идеального но не выпущенного.",
      "Преподавание — это высшая форма понимания. Когда вы ясно объясняете концепцию студенту, вы обнаруживаете пробелы в своих собственных знаниях.",
      "Задача наставника — не сделать студентов зависимыми от себя, а сделать себя ненужным. Настоящий успех — это студент который превзошёл тебя.",
      "Самый мощный инструмент в любом классе — не доска и не проектор. Это искреннее любопытство учителя который никогда не перестаёт учиться.",
      "Каждый студент который входит в ваш класс приносит другой опыт и другой способ видеть мир. Встречайте их там где они находятся.",
      "Преподавать программирование — значит учить решению задач. Язык — это просто словарный запас; логическое мышление — это грамматика под ним.",
      "Когда студент застревает — не торопитесь решать за него. Задайте вопрос. Та пауза, та продуктивная борьба — это место где происходит настоящее обучение.",
      "Лучший класс — тот в котором учитель тоже ещё учится. Признать что ты чего-то не знаешь — не слабость. Это самый мощный урок который вы можете преподать.",
      "Microsoft Word является одним из самых распространённых текстовых редакторов в мире. Он предлагает инструменты для написания, форматирования и совместной работы над документами любого размера. Освоение горячих клавиш в Word может заметно повысить продуктивность уже через несколько недель.",
      "Функция отслеживания изменений в Word фиксирует каждую правку внесённую в документ. Соавторы могут принимать или отклонять каждое изменение отдельно, что делает её идеальной для командного написания и рецензирования.",
      "Стили Word позволяют определить форматирование заголовков и основного текста в одном месте. При обновлении стиля все абзацы его использующие обновляются автоматически, что экономит значительное время при работе с большими документами.",
      "Хорошая презентация PowerPoint — это не про эффектные анимации, а про чёткие идеи поданные с визуальной поддержкой. Каждый слайд должен нести одно главное сообщение и не более. Лучшие докладчики репетируют пока слайды не становятся естественным продолжением их речи.",
      "Образец слайдов в PowerPoint позволяет один раз задать шрифты, цвета и макет и автоматически применить их ко всем слайдам. Использование его с самого начала экономит часы переформатирования и сохраняет презентацию профессиональной.",
      "Режим докладчика в PowerPoint показывает заметки и таймер пока аудитория видит только чистый слайд. Это помогает держаться по плану не теряя зрительного контакта со слушателями.",
      "Microsoft Excel используется миллионами людей для организации, анализа и визуализации данных. Изучение формул вроде ВПР, СУММЕСЛИ и ПОИСКПОЗ может кардинально изменить способ работы с числами каждый день.",
      "Сводные таблицы — одна из самых мощных функций Excel. Они позволяют группировать и обобщать большие наборы данных без единой формулы, превращая тысячи строк в чёткий итог за секунды.",
      "Условное форматирование в Excel автоматически меняет цвет ячейки в зависимости от её значения. Это позволяет с первого взгляда замечать тенденции, выбросы и проблемы в данных без дополнительных вычислений.",
      "Canva — это браузерный инструмент дизайна дающий каждому возможность создавать профессиональную графику без дизайнерского образования. Тысячи шаблонов и интерфейс перетаскивания позволяют создавать плакаты и презентации за минуты.",
      "Набор бренда в Canva хранит логотип, фирменные цвета и шрифты — всегда в одном клике. Каждый дизайн остаётся визуально согласованным без необходимости запоминать коды цветов или названия шрифтов.",
      "Слепая печать — это навык работы всеми десятью пальцами не глядя на клавиатуру. После формирования мышечной памяти скорость и точность значительно возрастают. Большинство профессионалов достигают семидесяти и более слов в минуту при регулярных тренировках.",
      "Основной ряд — основа слепой печати. Пальцы левой руки лежат на А, С, Д, Ф, пальцы правой — на О, Л, Д, Ж. Каждая другая клавиша нажимается отведением пальца от основного ряда с немедленным возвратом.",
      "Точность всегда должна быть выше скорости при обучении набору. Спешка формирует вредные привычки которые труднее исправить позже. Лучше печатать медленно и правильно несколько недель чем выработать быстрые но небрежные паттерны.",
      "Kahoot — игровая обучающая платформа превращающая викторины в соревновательный увлекательный опыт. Ученики присоединяются по PIN-коду и соревнуются отвечая правильно и быстро чтобы набрать больше всех очков.",
      "Учителя используют Kahoot для повторения материала так что ученики действительно этого ждут. Таймер, таблица лидеров и музыка создают атмосферу в классе которую бумажная викторина просто не может воспроизвести.",
      "Kahoot поддерживает командный режим где ученики сотрудничают в малых группах при ответах. Это стимулирует обсуждение и даёт тихим ученикам менее напряжённый способ участвовать в повторении.",
      "Blooket — образовательная игровая платформа где учителя создают наборы вопросов а ученики отвечают на них внутри разных тематических игровых режимов. Разнообразие игр сохраняет занятия интересными.",
      "В режиме Золотого квеста Blooket правильные ответы позволяют ученикам воровать золото у соперников добавляя стратегию поверх учебного содержания. Это делает каждый вопрос значимым и удерживает класс в тонусе.",
      "Python — один из наиболее дружелюбных к новичкам языков программирования известный чистым и читаемым синтаксисом. Он используется в веб-разработке, науке о данных, искусственном интеллекте и автоматизации почти в каждой отрасли.",
      "В Python отступы — не просто стиль, а часть синтаксиса. Код внутри функции, цикла или условия должен иметь последовательный отступ, иначе Python выдаст ошибку и откажется запускать программу.",
      "Стандартная библиотека Python включает модули для чтения файлов, HTTP-запросов, разбора дат и работы с JSON. Прежде чем устанавливать сторонний пакет стоит проверить есть ли нужное уже в Python.",
      "HTML — основа каждой веб-страницы в интернете. Он использует открывающие и закрывающие теги для определения контента: заголовков, абзацев, изображений и ссылок. Без HTML браузерам нечего отображать.",
      "Семантические теги вроде header, nav, main, article и footer описывают назначение каждой секции страницы. Их правильное использование улучшает доступность для программ чтения с экрана и помогает поисковикам понять контент.",
      "CSS — язык стилей веба, управляющий каждой визуальной деталью страницы: цветами, шрифтами, отступами и макетом. Глубокое знание CSS особенно Flexbox и Grid даёт полный творческий контроль над видом страниц на любом устройстве.",
      "Блочная модель CSS описывает каждый элемент как прямоугольник с содержимым, отступом, границей и внешним отступом. Понимание этой модели необходимо для управления интервалами и построения точных макетов.",
      "JavaScript — язык программирования веба. Он работает в браузере и позволяет создавать динамические интерактивные возможности: от анимаций и проверки форм до полных одностраничных приложений с живыми данными.",
      "DOM — это способ взаимодействия JavaScript с содержимым веб-страницы. С его помощью можно находить элементы, обновлять их текст, менять стили или удалять их в ответ на действия пользователя.",
      "Узбекистан — страна в Центральной Азии с историей тянущейся тысячелетия назад вдоль древнего Шёлкового пути. Самарканд, Бухара и Хива были когда-то процветающими центрами торговли, науки и исламской архитектуры.",
      "Самарканд — один из старейших непрерывно населённых городов в мире. Площадь Регистан, обрамлённая тремя великолепными медресе в бирюзово-золотых изразцах, считается одним из лучших образцов исламской архитектуры на Земле.",
      "Плов — национальное блюдо Узбекистана: рис приготовленный с бараниной, морковью и луком в большом чугунном казане. В каждом регионе есть свой вариант, а его приготовление считается искусством и традицией.",
      "Узбекистан провозгласил независимость от Советского Союза 1 сентября 1991 года, теперь ежегодно отмечаемую как День независимости. Страна значительно модернизировалась сохраняя при этом глубокую связь со своими культурными корнями.",
      "Ташкентское метро открытое в 1977 году знаменито красиво оформленными станциями каждая в своём архитектурном стиле. Это один из самых нарядных метрополитенов в мире и предмет большой городской гордости.",
    ],
    hard: [
      "Расширенные возможности Microsoft Word выходят далеко за рамки базового редактирования текста. Система макросов позволяет записывать последовательности команд и воспроизводить их одним нажатием клавиши, резко повышая эффективность при работе с объёмными документами. В сочетании со стилями, разрывами разделов и перекрёстными ссылками Word превращается в полноценную среду настольных издательских систем для профессиональных публикаций.",
      "Совместная работа в Microsoft Word претерпела значительные изменения с появлением облачной интеграции. Совместное редактирование в реальном времени через OneDrive или SharePoint позволяет нескольким пользователям редактировать одновременно, а отслеживание изменений и комментарии сохраняют полную запись каждой правки и обсуждения на протяжении всего жизненного цикла документа.",
      "Функция оглавления в Word автоматически создаёт навигационный указатель на основе стилей заголовков. Пока заголовки последовательно используют встроенные стили, Word пересоздаёт всё оглавление одним кликом при изменении документа, экономя часы ручного обновления в длинных отчётах.",
      "Управление ссылками в Word поддерживает сноски, концевые сноски и библиографию через встроенный инструмент цитирования. Выберите стиль вроде APA, MLA или Chicago, добавьте источники один раз и Word автоматически форматирует каждую цитату в тексте и итоговый список литературы по всему документу.",
      "Защита документа в Word позволяет авторам ограничить редактирование, потребовать пароль или разрешить только определённые типы изменений, например заполнение форм или отслеживаемые правки. Эти элементы управления необходимы для профессиональных документов где несанкционированные изменения структуры контента должны быть предотвращены.",
      "Создание по-настоящему эффективной презентации требует понимания того как мозг одновременно обрабатывает визуальную и вербальную информацию. Исследования когнитивной нагрузки показывают что аудитория лучше запоминает контент когда слайды содержат визуальные элементы дополняющие а не дублирующие речь. Этот принцип избыточности объясняет почему чтение со слайдов неизменно ослабляет а не усиливает устное сообщение.",
      "Переход Morph в PowerPoint создаёт плавные кинематографические анимации между слайдами автоматически определяя совпадающие объекты и анимируя их из положения на одном слайде в положение на следующем. В отличие от обычных анимаций требующих ручной настройки Morph работает автоматически при последовательном именовании объектов, делая сложную анимацию неожиданно доступной для недизайнеров.",
      "Power Query в Excel — технология преобразования данных позволяющая импортировать, очищать, преобразовывать и объединять данные из нескольких источников без написания кода. После определения запрос обновляется одним кликом при изменении исходных данных, что делает его незаменимым для работы с регулярно обновляемыми наборами данных и отчётами.",
      "Философия дизайна Python, выраженная в Дзен Python, подчёркивает читаемость, простоту и явность в противовес изощрённости. Это проявляется в синтаксисе использующем английские ключевые слова вместо символов и требующем последовательных отступов как структурного требования, а не стилистического предпочтения. В результате код читается ближе к естественному языку чем практически любой другой широко используемый язык программирования.",
      "Объектно-ориентированное программирование в Python использует классы как чертежи объектов указывающие атрибуты каждого экземпляра и методы определяющие его поведение. Наследование позволяет новым классам расширять существующие повторно используя и специализируя поведение без дублирования кода — фундаментальный принцип масштабируемого проектирования применимый к областям от игр до научных симуляций.",
      "Экосистема сторонних библиотек Python — одна из его определяющих сильных сторон. NumPy и Pandas преобразили манипуляции с данными; TensorFlow и PyTorch сделали глубокое обучение доступным; Flask и Django обеспечивают быструю веб-разработку. Широта и качество этой экосистемы объясняют почему Python стал доминирующим языком в науке о данных и машинном обучении.",
      "Архитектура CSS в масштабе требует обдуманной организации для сохранения сопровождаемости. Методологии вроде BEM кодируют отношения между компонентами и их вариантами непосредственно в именах классов. Это позволяет большим командам работать над общей таблицей стилей не создавая конфликтов специфичности и не нарушая случайно стили в несвязанных частях интерфейса.",
      "Цикл событий JavaScript позволяет однопоточному языку обрабатывать асинхронные операции без блокировки. Синхронный код выполняется в стеке вызовов; обратные вызовы от API вроде setTimeout ждут в очереди задач; цикл событий перемещает следующую задачу в стек только когда тот пуст. Эта модель объясняет большинство удивительных временных поведений с которыми разработчики сталкиваются при написании асинхронного JavaScript.",
      "Положение Узбекистана вдоль Шёлкового пути сделало его одной из наиболее стратегически важных территорий средневекового мира. Самарканд и Бухара на протяжении более тысячелетия притягивали торговцев, учёных и дипломатов из Китая, Персии, Аравии и Европы. Культурный обмен вдоль этой сети оставил непреходящее архитектурное и интеллектуальное наследие по-прежнему заметное в изразцах и каллиграфии исторических городов Узбекистана.",
      "Тимуридская империя основанная Тимуром в XIV веке превратила Самарканд в один из великолепнейших городов тогдашнего мира. Тимур привозил мастеров и архитекторов из завоёванных территорий для строительства мечетей, медресе и мавзолеев покрытых затейливой геометрической мозаикой и исламской каллиграфией. Этот период широко считается золотым веком центральноазиатского искусства и интеллектуальных достижений.",
      "Усыхание Аральского моря — одна из тяжелейших экологических катастроф XX века. Некогда четвёртое по величине озеро в мире оно было систематически осушено в советскую эпоху для орошения хлопковых полей Узбекистана и Казахстана. Обнажившееся дно превратилось в солончак порождающий токсичные пыльные бури, опустошая сельскохозяйственные угодья и здоровье населения окрестных районов на протяжении десятилетий после первоначального отвода воды.",
    ],
    quotes: [
      "Сначала решите проблему. Затем напишите код. - John Johnson",
      "Любой дурак напишет код который поймёт компьютер. Хороший программист пишет код который поймёт человек. - Fowler",
      "Простота — душа эффективности. - Austin Freeman",
      "Прежде чем программное обеспечение можно будет повторно использовать, оно должно быть пригодным для использования. - Ralph Johnson",
      "Самое губительное что вы можете выучить — это ваш первый язык программирования. - Alan Kay",
      "Сделайте это работающим, затем правильным, затем быстрым. - Kent Beck",
      "Разговоры дёшевы. Покажи мне код. - Linus Torvalds",
      "Функция хорошего программного обеспечения — сделать сложное простым. - Grady Booch",
      "Скажи мне — и я забуду. Научи меня — и я запомню. Вовлеки меня — и я научусь. - Бенджамин Франклин",
      "Искусство преподавания — это искусство помощи в открытии. - Марк Ван Дорен",
      "Учитель влияет на вечность; он никогда не знает где заканчивается его влияние. - Генри Адамс",
      "Учить — значит учиться дважды. - Жозеф Жубер",
      "Один ребёнок, один учитель, одна книга, одна ручка могут изменить мир. - Малала Юсуфзай",
      "Лучшие учителя — те кто показывает куда смотреть, но не говорит что видеть. - Александра К. Тренфор",
      "Образование — это не наполнение ведра, а разжигание огня. - У.Б. Йейтс",
      "Хороший учитель может вдохновить надежду, зажечь воображение и привить любовь к учению. - Брэд Генри",
    ],
  },
};

const CODE_CONTENT = [
  "void main() { runApp(const MyApp()); }",
  "Widget build(BuildContext context) { return Scaffold(body: Center(child: Text('Hello'))); }",
  "Future<void> fetchData() async { final res = await http.get(uri); if (res.statusCode == 200) return; }",
  "final items = ['flutter', 'dart', 'mobile']; final upper = items.map((e) => e.toUpperCase()).toList();",
  "setState(() { counter++; score += 10; lastUpdated = DateTime.now(); });",
  "class UserModel { final String id; final String name; const UserModel({required this.id, required this.name}); }",
  "final bloc = context.read<AuthBloc>(); bloc.add(LoginEvent(email: email, password: password));",
  "StreamBuilder<User?>(stream: auth.authStateChanges(), builder: (ctx, snap) { if (snap.hasData) return HomeScreen(); return LoginScreen(); });",
  "extension StringExt on String { bool get isEmail => RegExp(r'^[\\w.]+@[\\w]+\\.[a-z]{2,}$').hasMatch(this); }",
  "SharedPreferences prefs = await SharedPreferences.getInstance(); await prefs.setString('token', value);",
  "Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));",
  "Column(crossAxisAlignment: CrossAxisAlignment.start, children: [ Text(title), const SizedBox(height: 8), Text(body) ])",
  "TextStyle get labelStyle => TextStyle(fontFamily: 'Orbitron', fontSize: 12, letterSpacing: 2, color: Colors.green);",
  "final response = await Dio().get('/api/users', queryParameters: {'page': 1, 'limit': 20});",
  "BlocBuilder<CounterBloc, CounterState>(builder: (context, state) { return Text('${state.count}'); });",
  "AnimatedContainer(duration: const Duration(milliseconds: 300), curve: Curves.easeOut, width: isOpen ? 200 : 60);",
  "mixin Validator { String? validateEmail(String? v) => v != null && v.contains('@') ? null : 'Invalid email'; }",
  "class LessonModel { final String id; final String title; final int durationMin; const LessonModel({required this.id, required this.title, required this.durationMin}); }",
  "final students = await FirebaseFirestore.instance.collection('students').where('mentorId', isEqualTo: userId).get();",
  "enum ProgressLevel { beginner, intermediate, advanced, expert }",
  "Widget lessonCard(LessonModel lesson) => Card(child: ListTile(title: Text(lesson.title), subtitle: Text('${lesson.durationMin} min')));",
  "final completedLessons = lessons.where((l) => l.isCompleted).length; final progress = completedLessons / lessons.length;",
  "class MentorBloc extends Bloc<MentorEvent, MentorState> { MentorBloc() : super(MentorInitial()) { on<LoadStudents>(_onLoadStudents); } }",
  "Future<void> markLessonComplete(String lessonId) async { await db.collection('lessons').doc(lessonId).update({'completed': true, 'completedAt': Timestamp.now()}); }",
  "final streak = students.fold(0, (max, s) => s.streak > max ? s.streak : max);",
  "ListView.builder(itemCount: lessons.length, itemBuilder: (ctx, i) => LessonTile(lesson: lessons[i], onTap: () => openLesson(lessons[i])));",
  "class QuizQuestion { final String question; final List<String> options; final int correctIndex; const QuizQuestion({required this.question, required this.options, required this.correctIndex}); }",
  "final score = answers.asMap().entries.where((e) => e.value == quiz.questions[e.key].correctIndex).length;",
  "StreamSubscription<QuerySnapshot> sub = db.collection('live-session').snapshots().listen((snap) { setState(() => messages = snap.docs); });",
  "GestureDetector(onTap: () => context.read<LessonBloc>().add(StartLesson(id: lesson.id)), child: LessonCard(lesson: lesson));",
  "final avgRating = feedback.isEmpty ? 0.0 : feedback.map((f) => f.rating).reduce((a, b) => a + b) / feedback.length;",
  "void explainConcept(String topic) { debugPrint('Teaching $topic...'); notifyStudents(topic); recordSession(topic); }",
  "abstract class TeachingRepository { Future<List<Student>> getStudents(); Future<void> submitFeedback(Feedback fb); }",
  "CircularProgressIndicator(value: student.progress, color: Colors.green, backgroundColor: Colors.green.withOpacity(0.2));",
];

const pickMulti = (mode, lang, lines) => {
  const bank = mode === "code" ? CODE_CONTENT : (CONTENT[lang]?.[mode] ?? CONTENT.en[mode]);
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  const count = mode === "quotes" ? 1 : Math.min(lines, shuffled.length);
  return shuffled.slice(0, count).map((s, i, arr) => {
    const trimmed = s.trim();
    if (i < arr.length - 1 && !/[.!?]$/.test(trimmed)) return trimmed + ".";
    return trimmed;
  }).join(" ");
};

const calcWpm = (correctChars, startMs) => {
  const mins = (Date.now() - startMs) / 60000;
  if (mins < 0.0001) return 0;
  return Math.round(correctChars / 5 / mins);
};

const wpmRating = (wpm) => {
  if (wpm >= 90) return { label: "S", color: "#00ff88" };
  if (wpm >= 70) return { label: "A", color: "#4ade80" };
  if (wpm >= 50) return { label: "B", color: "#ffcc44" };
  if (wpm >= 30) return { label: "C", color: "#fb923c" };
  return { label: "D", color: "#ff3c3c" };
};

/* ── Visual Keyboard ──────────────────────────────────────────────────── */
const KB_ROWS = [
  ["1","2","3","4","5","6","7","8","9","0","-","="],
  ["q","w","e","r","t","y","u","i","o","p","[","]"],
  ["a","s","d","f","g","h","j","k","l",";","'"],
  ["z","x","c","v","b","n","m",",",".","/"],
  [" "],
];

function KeyboardViz({ nextKey, pressedKey, pressedCorrect }) {
  return (
    <div style={{
      padding: "16px 10px 12px",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      marginTop: 14,
      userSelect: "none",
      cursor: "text",
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 3, color: "var(--text-muted)", textAlign: "center", marginBottom: 10 }}>
        KEYBOARD
      </div>
      {KB_ROWS.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 3 }}>
          {row.map(key => {
            const isSpace   = key === " ";
            const isNext    = nextKey === key;
            const isPressed = pressedKey === key;
            const correct   = isPressed && pressedCorrect;
            const wrong     = isPressed && !pressedCorrect;

            return (
              <div
                key={key}
                style={{
                  width:    isSpace ? "min(280px, 62vw)" : "clamp(28px, 5vw, 36px)",
                  height:   "clamp(32px, 4.5vw, 40px)",
                  display:  "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: isSpace ? 10 : "clamp(10px, 2vw, 13px)",
                  letterSpacing: isSpace ? 3 : 0,
                  border: "1px solid",
                  borderColor: correct ? "var(--green)"
                              : wrong  ? "#ff3c3c"
                              : isNext ? "rgba(0,255,136,0.55)"
                              : "var(--border)",
                  background: correct ? "rgba(0,255,136,0.18)"
                             : wrong  ? "rgba(255,60,60,0.18)"
                             : isNext ? "rgba(0,255,136,0.06)"
                             : "var(--bg)",
                  color: correct ? "var(--green)"
                       : wrong   ? "#ff3c3c"
                       : isNext  ? "var(--green)"
                       : "var(--text-muted)",
                  boxShadow: correct ? "0 0 10px rgba(0,255,136,0.35)"
                           : wrong   ? "0 0 10px rgba(255,60,60,0.35)"
                           : isNext  ? "0 0 6px rgba(0,255,136,0.18)"
                           : "none",
                  transition: "background 0.1s, border-color 0.1s, box-shadow 0.1s, color 0.1s",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              >
                {isSpace ? "SPACE" : key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export default function TypeRacer() {
  const { t, lang } = useLang();
  const g = t.games;

  const MODE_META = {
    easy:   { label: g.tr_mode_easy,   icon: "🌱", hint: g.tr_hint_easy },
    medium: { label: g.tr_mode_medium, icon: "⚡", hint: g.tr_hint_medium },
    hard:   { label: g.tr_mode_hard,   icon: "🔥", hint: g.tr_hint_hard },
    code:   { label: g.tr_mode_code,   icon: "💻", hint: g.tr_hint_code },
    quotes: { label: g.tr_mode_quotes, icon: "💬", hint: g.tr_hint_quotes },
  };

  const LEN_META = [
    { key: "short",    lines: 1, label: g.tr_len_short    ?? "Short",    hint: "~1 line"  },
    { key: "medium",   lines: 3, label: g.tr_len_medium   ?? "Medium",   hint: "~3 lines" },
    { key: "long",     lines: 5, label: g.tr_len_long     ?? "Long",     hint: "~5 lines" },
    { key: "marathon", lines: 9, label: g.tr_len_marathon ?? "Marathon", hint: "~9 lines" },
  ];

  const [mode,    setMode]    = useState("easy");
  const [lenKey,  setLenKey]  = useState("short");
  const [text,    setText]    = useState(() => pickMulti("easy", "en", 1));
  const [typed,   setTyped]   = useState("");
  const [phase,   setPhase]   = useState("idle");
  const [wpm,     setWpm]     = useState(0);
  const [acc,     setAcc]     = useState(100);
  const [elapsed, setElapsed] = useState(0);
  const [best,    setBest]    = useState(() => { try { return parseInt(localStorage.getItem("typeracerBest") || "0") || 0; } catch { return 0; } });
  const [newBest, setNewBest] = useState(false);

  // keyboard state
  const [pressedKey,     setPressedKey]     = useState(null);
  const [pressedCorrect, setPressedCorrect] = useState(true);

  const inputRef        = useRef(null);
  const startRef        = useRef(null);
  const intervalRef     = useRef(null);
  const errorsRef       = useRef(new Set());
  const keyRef          = useRef({ total: 0, correct: 0 });
  const typedRef        = useRef("");
  const textRef         = useRef(text);
  const phaseRef        = useRef("idle");
  const pressTimer      = useRef(null);
  const textContainerRef = useRef(null);
  const cursorRef       = useRef(null);

  textRef.current  = text;
  phaseRef.current = phase;

  const clearTimer = () => { if (intervalRef.current) clearInterval(intervalRef.current); };

  const startTimer = (startText) => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      const cur = typedRef.current;
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
      const correctChars = [...cur].filter((c, i) => c === startText[i]).length;
      setWpm(calcWpm(correctChars, startRef.current));
      const { total, correct: ck } = keyRef.current;
      setAcc(total === 0 ? 100 : Math.round((ck / total) * 100));
    }, 200);
  };

  useEffect(() => () => { clearTimer(); clearTimeout(pressTimer.current); }, []);

  // track physical key presses for keyboard visualization
  useEffect(() => {
    const onKeyDown = (e) => {
      if (phaseRef.current !== "done") inputRef.current?.focus();
      if (phaseRef.current === "done") return;
      const raw = e.key;
      const key = raw === " " ? " " : raw.length === 1 ? raw.toLowerCase() : null;
      if (!key) return;

      const nextChar = textRef.current[typedRef.current.length];
      const isCorrect = nextChar !== undefined && (key === nextChar || key === nextChar.toLowerCase());

      setPressedKey(key);
      setPressedCorrect(isCorrect);
      clearTimeout(pressTimer.current);
      pressTimer.current = setTimeout(() => setPressedKey(null), 240);
    };
    window.addEventListener("keydown", onKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!textContainerRef.current || !cursorRef.current) return;
    const container = textContainerRef.current;
    const cursor = cursorRef.current;
    const containerRect = container.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();
    const relativeTop = cursorRect.top - containerRect.top + container.scrollTop;
    const targetScrollTop = relativeTop - container.clientHeight / 3;
    container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
  }, [typed]);

  const getLinesForKey = (key) => LEN_META.find(l => l.key === key)?.lines ?? 1;

  const reset = useCallback((newMode, newLenKey, newText) => {
    clearTimer();
    errorsRef.current = new Set();
    keyRef.current = { total: 0, correct: 0 };
    typedRef.current = "";
    setTyped("");
    setPhase("idle");
    setWpm(0);
    setAcc(100);
    setElapsed(0);
    setNewBest(false);
    setPressedKey(null);
    if (textContainerRef.current) textContainerRef.current.scrollTop = 0;
    const m  = newMode   ?? mode;
    const lk = newLenKey ?? lenKey;
    const tx = newText   ?? pickMulti(m, lang, getLinesForKey(lk));
    setMode(m);
    setLenKey(lk);
    setText(tx);
    textRef.current  = tx;
    phaseRef.current = "idle";
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [mode, lenKey, lang]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (val.length > text.length) return;

    if (phase === "idle" && val.length > 0) {
      startRef.current = Date.now();
      setPhase("typing");
      phaseRef.current = "typing";
      startTimer(text);
    }

    if (val.length > typed.length) {
      const idx = val.length - 1;
      const correct = val[idx] === text[idx];
      keyRef.current.total++;
      if (correct) keyRef.current.correct++;
      else errorsRef.current.add(idx);
    }

    typedRef.current = val;
    setTyped(val);

    if (val.length === text.length) {
      clearTimer();
      const finalSecs = Math.floor((Date.now() - startRef.current) / 1000);
      const correctChars = [...val].filter((c, i) => c === text[i]).length;
      const finalWpm = calcWpm(correctChars, startRef.current);
      const { total, correct: ck } = keyRef.current;
      const finalAcc = total === 0 ? 100 : Math.round((ck / total) * 100);
      setWpm(finalWpm);
      setAcc(finalAcc);
      setElapsed(finalSecs);
      setPhase("done");
      phaseRef.current = "done";
      if (finalWpm > best) {
        setBest(finalWpm);
        setNewBest(true);
        saveScore("typeracer", finalWpm);
      }
    }
  };

  const handleModeChange = (m)  => reset(m, lenKey, null);
  const handleLenChange  = (lk) => reset(mode, lk, null);

  const progress = text.length > 0 ? (typed.length / text.length) * 100 : 0;
  const nextChar = phase !== "done" && text.length > 0 ? text[typed.length] : null;
  const nextKey  = nextChar === " " ? " " : nextChar?.toLowerCase() ?? null;
  const rating   = wpmRating(wpm);

  return (
    <div style={{ userSelect: "none" }}>
      <style>{`
        .tr-mode { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; padding:7px 12px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; text-transform:uppercase; white-space:nowrap; }
        .tr-mode.active { border-color:var(--green); background:rgba(0,255,136,0.08); color:var(--green); box-shadow:0 0 12px rgba(0,255,136,0.12); }
        .tr-mode:hover:not(.active) { border-color:var(--green-dim); color:var(--text); }
        .tr-len { font-family:var(--font-mono); font-size:9px; letter-spacing:2px; padding:5px 10px; border:1px solid var(--border); background:transparent; color:var(--text-muted); cursor:pointer; transition:all 0.2s; text-transform:uppercase; }
        .tr-len.active { border-color:#7c3aed; background:rgba(124,58,237,0.1); color:#a78bfa; box-shadow:0 0 8px rgba(124,58,237,0.15); }
        .tr-len:hover:not(.active) { border-color:var(--green-dim); color:var(--text); }
        .tr-char { font-family:var(--font-mono); font-size:30px; line-height:1.95; }
        .tr-char.correct  { color:var(--green); }
        .tr-char.wrong    { color:#ff3c3c; background:rgba(255,60,60,0.15); border-radius:2px; }
        .tr-char.cursor   { outline:1px solid var(--green); background:rgba(0,255,136,0.12); animation:blink 1s step-end infinite; }
        .tr-char.pending  { color:var(--text-muted); opacity:0.5; }
        .tr-stat-card { border:1px solid var(--border); background:var(--bg); padding:10px 6px; text-align:center; transition:border-color 0.3s; }
        @media(max-width:600px){ .tr-char { font-size:22px !important; } }
        @keyframes tr-nb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        .tr-nb { animation:tr-nb 0.5s ease; color:#ffcc44 !important; }
        @keyframes tr-done-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .tr-done { animation:tr-done-in 0.35s ease both; }
        @keyframes tr-rating { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        .tr-rating-badge { animation:tr-rating 0.4s 0.1s ease both; }
      `}</style>

      {/* Mode selector */}
      <div style={{ display: phase === "typing" ? "none" : "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.entries(MODE_META).map(([m, meta]) => (
          <button key={m} className={`tr-mode ${mode === m ? "active" : ""}`} onClick={() => handleModeChange(m)}>
            {meta.icon} {meta.label}
          </button>
        ))}
      </div>

      {/* Length selector */}
      {phase !== "typing" && mode !== "quotes" && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:2, color:"var(--text-muted)", marginRight:4 }}>
            {g.tr_len_label ?? "LENGTH"}:
          </span>
          {LEN_META.map(l => (
            <button key={l.key} className={`tr-len ${lenKey === l.key ? "active" : ""}`} onClick={() => handleLenChange(l.key)}>
              {l.label}
            </button>
          ))}
        </div>
      )}
      {mode === "quotes" && phase !== "typing" && <div style={{ marginBottom: 14 }} />}

      {/* Stats bar */}
      <div style={{ display: phase === "typing" ? "none" : "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 12 }}>
        {[
          { label: g.wpm,    value: phase === "idle" ? "—" : wpm,                    color: phase === "typing" ? "var(--green)" : "var(--text)" },
          { label: g.acc,    value: phase === "idle" ? "—" : acc + "%",              color: acc >= 95 ? "var(--green)" : acc >= 80 ? "#ffcc44" : "#ff3c3c" },
          { label: g.errors, value: phase === "idle" ? "—" : errorsRef.current.size, color: errorsRef.current.size === 0 ? "var(--green)" : "#ff6060" },
          { label: g.time,   value: phase === "idle" ? "—" : elapsed + "s",          color: "var(--text-muted)" },
        ].map(s => (
          <div key={s.label} className="tr-stat-card">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--border)", marginBottom: 12, position: "relative", display: phase === "typing" ? "none" : "block" }}>
        <div style={{
          height: "100%",
          width: progress + "%",
          background: progress === 100 ? "var(--green)" : "var(--green)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 6px var(--green)",
        }} />
      </div>

      {phase !== "done" ? (
        <>
          {/* Text display */}
          <div
            ref={textContainerRef}
            onClick={() => inputRef.current?.focus()}
            style={{
              background: "var(--bg)",
              border: "1px solid",
              borderColor: phase === "typing" ? "rgba(0,255,136,0.3)" : "var(--green-dark)",
              borderLeft: `3px solid ${phase === "typing" ? "var(--green)" : "var(--green-dark)"}`,
              padding: mode === "quotes" ? "40px 36px" : "30px 36px",
              marginBottom: 0,
              cursor: "text",
              lineHeight: mode === "quotes" ? 2.2 : 1.95,
              wordBreak: "break-word",
              height: "180px",
              overflowY: "hidden",
              textAlign: mode === "quotes" ? "center" : "left",
              transition: "border-color 0.3s",
            }}
          >
            {[...text].map((ch, i) => {
              const authorStart = mode === "quotes" ? text.lastIndexOf(" - ") : -1;
              const inAuthor    = authorStart !== -1 && i >= authorStart;
              const isCursor    = i === typed.length;
              let cls = "tr-char pending";
              if (i < typed.length) cls = typed[i] === ch ? "tr-char correct" : "tr-char wrong";
              else if (isCursor)    cls = "tr-char pending cursor";
              return (
                <span
                  key={i}
                  ref={isCursor ? cursorRef : null}
                  className={cls}
                  style={inAuthor && i >= typed.length ? { opacity: 0.5, fontStyle: "italic" } : undefined}
                >
                  {ch === " " ? " " : ch}
                </span>
              );
            })}
          </div>

          {/* Hidden input */}
          <input
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            onPaste={e => e.preventDefault()}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
            autoFocus
          />

          {/* Keyboard — clicking anywhere on it re-focuses the hidden input */}
          <div style={{ display: phase === "typing" ? "none" : "block" }} onClick={() => inputRef.current?.focus()}>
            <KeyboardViz nextKey={nextKey} pressedKey={pressedKey} pressedCorrect={pressedCorrect} />
          </div>

          {/* Bottom bar */}
          <div style={{ display: phase === "typing" ? "none" : "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: 2 }}>
              {phase === "idle"
                ? g.tr_start_hint
                : `${text.length - typed.length} ${g.tr_remaining}`}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn btn-secondary" style={{ fontSize: 11, padding: "7px 14px", letterSpacing: 2 }}
                onClick={() => reset(mode, lenKey, pickMulti(mode, lang, getLinesForKey(lenKey)))}>
                {g.tr_new_text}
              </button>
              {phase === "typing" && (
                <button className="btn btn-secondary" style={{ fontSize: 11, padding: "7px 14px", letterSpacing: 2 }}
                  onClick={() => reset(mode, lenKey, text)}>
                  {g.tr_retry}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Results screen */
        <div className="tr-done" style={{ border: "1px solid var(--green)", background: "rgba(0,255,136,0.03)", padding: "32px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 4, color: "var(--green)", marginBottom: 20 }}>{g.tr_results_label}</div>

          {/* WPM + rating */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 6 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 900, color: "var(--green)", lineHeight: 1 }}>{wpm}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-muted)" }}>WPM</span>
              </div>
              {newBest && (
                <div className="tr-nb" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 3, marginTop: 4 }}>{g.tr_new_best}</div>
              )}
            </div>
            <div
              className="tr-rating-badge"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 900,
                color: rating.color,
                border: `2px solid ${rating.color}`,
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${rating.color}44`,
              }}
            >
              {rating.label}
            </div>
          </div>

          {/* Detail stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap", margin: "20px 0 24px", border: "1px solid var(--border)" }}>
            {[
              { label: g.acc,    value: acc + "%",         color: acc >= 95 ? "var(--green)" : acc >= 80 ? "#ffcc44" : "#ff3c3c" },
              { label: g.errors, value: errorsRef.current.size, color: errorsRef.current.size === 0 ? "var(--green)" : "#ff6060" },
              { label: g.time,   value: elapsed + "s",     color: "var(--text)" },
              { label: g.best,   value: best + " wpm",     color: "var(--green-dim)" },
            ].map((s, i) => (
              <div key={s.label} style={{
                fontFamily: "var(--font-mono)", textAlign: "center",
                flex: "1 1 80px",
                padding: "14px 8px",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 8, letterSpacing: 2, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => reset(mode, lenKey, text)}>{g.tr_retry} ↺</button>
            <button className="btn btn-secondary" onClick={() => reset(mode, lenKey, null)}>{g.tr_new_text} →</button>
          </div>
        </div>
      )}
    </div>
  );
}
