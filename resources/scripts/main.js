// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark-theme");
  themeIcon?.classList.replace("fa-moon", "fa-sun");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon?.classList.replace(
    isDark ? "fa-moon" : "fa-sun",
    isDark ? "fa-sun" : "fa-moon",
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger?.addEventListener("click", () => {
  navMenu?.classList.toggle("active");
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("active");
  });
});

// Content Loading
const CONTENT_BASE = "./content/";

async function fetchMarkdown(filename) {
  try {
    const response = await fetch(CONTENT_BASE + filename);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return null;
  }
}

function parseHeroContent(md) {
  const content = {};
  let currentKey = null;
  let currentValue = [];

  for (const line of md.split("\n")) {
    if (line.startsWith("## ")) {
      if (currentKey) content[currentKey] = currentValue.join("\n").trim();
      currentKey = "title";
      currentValue = [line.replace("## ", "")];
    } else if (line.startsWith("### ")) {
      if (currentKey) content[currentKey] = currentValue.join("\n").trim();
      currentKey = "description";
      currentValue = [line.replace("### ", "")];
    } else if (line.startsWith("- stat:")) {
      if (currentKey !== "stats") {
        if (currentKey) content[currentKey] = currentValue.join("\n").trim();
        currentKey = "stats";
        currentValue = [];
      }
      currentValue.push(line.replace("- stat:", "").trim());
    } else if (line.trim() && !line.startsWith("#")) {
      currentValue.push(line);
    }
  }
  if (currentKey) content[currentKey] = currentValue.join("\n").trim();
  return content;
}

function renderHero(content) {
  if (content.title) {
    document.getElementById("hero-title").innerHTML = content.title;
  }
  if (content.description) {
    document.getElementById("hero-description").innerHTML = marked.parse(
      content.description,
    );
  }
  if (content.stats) {
    const container = document.getElementById("hero-stats");
    container.innerHTML = content.stats
      .split("\n")
      .filter((s) => s.trim())
      .map((stat) => {
        const [number, label] = stat.split("|").map((s) => s.trim());
        return number && label
          ? `
        <div class="stat-item">
          <span class="stat-number">${number}</span>
          <span class="stat-label">${label}</span>
        </div>
      `
          : "";
      })
      .join("");
  }
}

function parseMissionContent(md) {
  return md
    .split("---")
    .filter((b) => b.trim())
    .map((block) => {
      const item = {};
      block.split("\n").forEach((line) => {
        if (line.startsWith("- icon:"))
          item.icon = line.replace("- icon:", "").trim();
        else if (line.startsWith("- title:"))
          item.title = line.replace("- title:", "").trim();
        else if (line.startsWith("- description:"))
          item.description = line.replace("- description:", "").trim();
      });
      return item;
    })
    .filter((i) => i.icon && i.title);
}

function renderMission(items) {
  const container = document.getElementById("mission-container");
  container.innerHTML = items.length
    ? items
        .map(
          (item) => `
    <div class="mission-card">
      <i class="${item.icon}"></i>
      <h3>${item.title}</h3>
      <p>${item.description || ""}</p>
    </div>
  `,
        )
        .join("")
    : '<div class="empty-content">No mission items to display</div>';
}

function parseTeamsContent(md) {
  return md
    .split("---")
    .filter((b) => b.trim())
    .map((block) => {
      const team = {};
      block.split("\n").forEach((line) => {
        if (line.startsWith("- name:"))
          team.name = line.replace("- name:", "").trim();
        else if (line.startsWith("- icon:"))
          team.icon = line.replace("- icon:", "").trim();
        else if (line.startsWith("- description:"))
          team.description = line.replace("- description:", "").trim();
        else if (line.startsWith("- link:"))
          team.link = line.replace("- link:", "").trim();
        else if (line.startsWith("- members:"))
          team.members = line.replace("- members:", "").trim();
      });
      return team;
    })
    .filter((t) => t.name && t.icon);
}

function renderTeams(teams) {
  const container = document.getElementById("teams-container");
  container.innerHTML = teams.length
    ? teams
        .map(
          (team) => `
    <a href="${team.link || "#"}" class="team-card" target="${team.link?.includes("http") ? "_blank" : "_self"}" rel="noopener noreferrer">
      <div class="team-icon">
        <i class="${team.icon}"></i>
      </div>
      <h3>${team.name}</h3>
      <p class="team-description">${team.description || ""}</p>
      <span class="team-link">
        Visit Team Page <i class="fas fa-arrow-right"></i>
      </span>
    </a>
  `,
        )
        .join("")
    : '<div class="empty-content">No teams to display</div>';
}

function parseAchievementsContent(md) {
  return md
    .split("---")
    .filter((b) => b.trim())
    .map((block) => {
      const achievement = {};
      block.split("\n").forEach((line) => {
        if (line.startsWith("- icon:"))
          achievement.icon = line.replace("- icon:", "").trim();
        else if (line.startsWith("- title:"))
          achievement.title = line.replace("- title:", "").trim();
        else if (line.startsWith("- team:"))
          achievement.team = line.replace("- team:", "").trim();
        else if (line.startsWith("- description:"))
          achievement.description = line.replace("- description:", "").trim();
        else if (line.startsWith("- metric1:"))
          achievement.metric1 = line.replace("- metric1:", "").trim();
        else if (line.startsWith("- metric1-label:"))
          achievement.metric1Label = line
            .replace("- metric1-label:", "")
            .trim();
        else if (line.startsWith("- metric2:"))
          achievement.metric2 = line.replace("- metric2:", "").trim();
        else if (line.startsWith("- metric2-label:"))
          achievement.metric2Label = line
            .replace("- metric2-label:", "")
            .trim();
      });
      return achievement;
    })
    .filter((a) => a.icon && a.title);
}

function renderAchievements(achievements) {
  const container = document.getElementById("achievements-container");
  container.innerHTML = achievements.length
    ? achievements
        .map(
          (achievement) => `
    <div class="achievement-card">
      <div class="achievement-header">
        <i class="${achievement.icon} achievement-icon"></i>
        <div>
          <span class="achievement-team">${achievement.team || "IS Department"}</span>
          <h3>${achievement.title}</h3>
        </div>
      </div>
      <p>${achievement.description || ""}</p>
      ${
        achievement.metric1 || achievement.metric2
          ? `
        <div class="achievement-metrics">
          ${
            achievement.metric1
              ? `
            <div class="metric">
              <span class="metric-value">${achievement.metric1}</span>
              <span class="metric-label">${achievement.metric1Label || "Impact"}</span>
            </div>
          `
              : ""
          }
          ${
            achievement.metric2
              ? `
            <div class="metric">
              <span class="metric-value">${achievement.metric2}</span>
              <span class="metric-label">${achievement.metric2Label || "Result"}</span>
            </div>
          `
              : ""
          }
        </div>
      `
          : ""
      }
    </div>
  `,
        )
        .join("")
    : '<div class="empty-content">No achievements to display</div>';
}

async function loadContent() {
  const heroMd = await fetchMarkdown("intro.md");
  if (heroMd) renderHero(parseHeroContent(heroMd));

  const aboutMd = await fetchMarkdown("about.md");
  if (aboutMd) {
    aboutMd.split("\n").forEach((line) => {
      if (line.startsWith("## "))
        document.getElementById("about-title").textContent = line.replace(
          "## ",
          "",
        );
      else if (line.startsWith("### "))
        document.getElementById("about-subhead").textContent = line.replace(
          "### ",
          "",
        );
    });
    renderMission(parseMissionContent(aboutMd));
  }

  const teamsMd = await fetchMarkdown("teams.md");
  if (teamsMd) {
    teamsMd.split("\n").forEach((line) => {
      if (line.startsWith("## "))
        document.getElementById("teams-title").textContent = line.replace(
          "## ",
          "",
        );
      else if (line.startsWith("### "))
        document.getElementById("teams-subhead").textContent = line.replace(
          "### ",
          "",
        );
    });
    renderTeams(parseTeamsContent(teamsMd));
  }

  const achievementsMd = await fetchMarkdown("achievements.md");
  if (achievementsMd) {
    achievementsMd.split("\n").forEach((line) => {
      if (line.startsWith("## "))
        document.getElementById("achievements-title").textContent =
          line.replace("## ", "");
      else if (line.startsWith("### "))
        document.getElementById("achievements-subhead").textContent =
          line.replace("### ", "");
    });
    renderAchievements(parseAchievementsContent(achievementsMd));
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
