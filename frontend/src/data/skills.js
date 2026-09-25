const SKILL_CATALOG = [
  {
    key: "java",
    labels: ["java", "core java", "j2ee"],
    learn: [
      { title: "Java Tutorials – Oracle (free)", url: "https://docs.oracle.com/javase/tutorial/" },
      { title: "Java – freeCodeCamp", url: "https://www.freecodecamp.org/news/tag/java/" },
    ],
  },
  {
    key: "spring",
    labels: ["spring", "spring boot", "springboot"],
    learn: [
      { title: "Spring Boot guides", url: "https://spring.io/guides" },
      { title: "Baeldung Spring tutorials", url: "https://www.baeldung.com/spring-boot" },
    ],
  },
  {
    key: "javascript",
    labels: ["javascript", "js", "es6"],
    learn: [
      { title: "JavaScript – MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
      { title: "JavaScript – freeCodeCamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
    ],
  },
  {
    key: "react",
    labels: ["react", "react.js", "reactjs"],
    learn: [
      { title: "React docs", url: "https://react.dev/learn" },
      { title: "The Odin Project – React", url: "https://www.theodinproject.com/paths/full-stack-javascript" },
    ],
  },
  {
    key: "html",
    labels: ["html", "html5"],
    learn: [{ title: "HTML – MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" }],
  },
  {
    key: "css",
    labels: ["css", "css3"],
    learn: [{ title: "CSS – MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS" }],
  },
  {
    key: "python",
    labels: ["python", "django", "flask"],
    learn: [
      { title: "Python.org tutorial", url: "https://docs.python.org/3/tutorial/" },
      { title: "CS50P", url: "https://cs50.harvard.edu/python/" },
    ],
  },
  {
    key: "sql",
    labels: ["sql", "mysql", "postgresql", "database"],
    learn: [
      { title: "SQLBolt", url: "https://sqlbolt.com/" },
      { title: "Mode SQL tutorial", url: "https://mode.com/sql-tutorial" },
    ],
  },
  {
    key: "data",
    labels: ["data science", "machine learning", "ml", "pandas", "numpy"],
    learn: [
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
      { title: "Google ML crash course", url: "https://developers.google.com/machine-learning/crash-course" },
    ],
  },
  {
    key: "git",
    labels: ["git", "github"],
    learn: [{ title: "Git handbook", url: "https://docs.github.com/en/get-started/using-git" }],
  },
  {
    key: "dsa",
    labels: ["dsa", "algorithms", "data structures"],
    learn: [{ title: "VisuAlgo", url: "https://visualgo.net/" }],
  },
];

export function parseSkillList(value = "") {
  return value
    .toLowerCase()
    .split(/[,|/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function extractSkillsFromText(text = "") {
  const haystack = text.toLowerCase();
  const found = new Set();
  SKILL_CATALOG.forEach((entry) => {
    if (entry.labels.some((label) => haystack.includes(label))) {
      found.add(entry.key);
    }
  });
  return [...found];
}

export function skillGap(studentSkills, requiredSkills) {
  const have = new Set(parseSkillList(studentSkills));
  const need = parseSkillList(requiredSkills);
  const matched = need.filter((skill) => [...have].some((h) => h.includes(skill) || skill.includes(h)));
  const missing = need.filter((skill) => !matched.includes(skill));
  const coverage = need.length === 0 ? 0 : Math.round((matched.length / need.length) * 100);
  return { matched, missing, coverage, need };
}

export function learningLinksFor(skill) {
  const entry = SKILL_CATALOG.find(
    (item) => item.key === skill.toLowerCase() || item.labels.includes(skill.toLowerCase())
  );
  if (entry) return entry.learn;
  const q = encodeURIComponent(`${skill} tutorial`);
  return [
    { title: `Search on freeCodeCamp: ${skill}`, url: `https://www.freecodecamp.org/news/search/?query=${q}` },
    { title: `YouTube (free): ${skill}`, url: `https://www.youtube.com/results?search_query=${q}` },
  ];
}

export const FREE_RESOURCES = [
  { name: "freeCodeCamp", topic: "Web & programming", url: "https://www.freecodecamp.org/learn" },
  { name: "MDN Web Docs", topic: "HTML, CSS, JavaScript", url: "https://developer.mozilla.org/" },
  { name: "The Odin Project", topic: "Full-stack path", url: "https://www.theodinproject.com/" },
  { name: "CS50 (Harvard)", topic: "Computer science", url: "https://cs50.harvard.edu/" },
  { name: "Khan Academy", topic: "CS & computing", url: "https://www.khanacademy.org/computing" },
  { name: "Kaggle Learn", topic: "Data science", url: "https://www.kaggle.com/learn" },
  { name: "SQLBolt", topic: "SQL", url: "https://sqlbolt.com/" },
  { name: "React docs", topic: "Frontend", url: "https://react.dev/learn" },
  { name: "Spring guides", topic: "Backend (Java)", url: "https://spring.io/guides" },
  { name: "Google ML Crash Course", topic: "Machine learning", url: "https://developers.google.com/machine-learning/crash-course" },
  { name: "GitHub Docs", topic: "Git", url: "https://docs.github.com/" },
  { name: "W3Schools", topic: "Beginner web", url: "https://www.w3schools.com/" },
];
