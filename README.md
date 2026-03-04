# Infrastructure Services Department Portfolio

A centralized portfolio showcasing all teams and achievements within the Infrastructure Services department.

## 🚀 Features

- **Markdown-based Content**: Easy to edit content in human-readable markdown files
- **Team Directory**: Cards linking to individual team portfolio pages
- **Achievements Showcase**: Aggregated wins from all teams in one place
- **Light/Dark Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works on all devices
- **GitHub Pages Hosting**: Automatic deployment via GitHub Actions

## 📁 File Structure

```
├── index.html
├── content/
│   ├── intro.md           # Hero section content
│   ├── about.md           # Mission & vision content
│   ├── teams.md           # Team cards content
│   └── achievements.md    # Department achievements
├── resources/
│   ├── styles.css
│   ├── scripts/
│   │   └── main.js
│   └── images/
│       └── hero-image.png
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## 🛠️ Setup Instructions

1. Create a new GitHub repository
2. Copy all files maintaining folder structure
3. Add hero image to `resources/images/hero-image.png`
4. Update team links in `content/teams.md` to point to actual team portfolio URLs
5. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
6. Push to main branch

## ✏️ Content Management

### Adding a New Team

Edit `content/teams.md`:

```markdown
---

- name: Team Name
- icon: fas fa-icon-name
- description: Team description here.
- link: https://yourusername.github.io/team-portfolio
- members: XX Engineers
```

### Adding a New Achievement

Edit `content/achievements.md`:

```markdown
---

- icon: fas fa-icon-name
- title: Achievement Title
- team: Team Name
- description: What was accomplished.
- metric1: Value
- metric1-label: Label
- metric2: Value
- metric2-label: Label
```

## 🎨 Customization

Edit `resources/styles.css` for colors, fonts, and styling.

## 📄 License

MIT License

```

## File Structure Summary

```

infrastructure-services-portfolio/
├── index.html
├── content/
│ ├── intro.md
│ ├── about.md
│ ├── teams.md
│ └── achievements.md
├── resources/
│ ├── styles.css
│ ├── scripts/
│ │ └── main.js
│ └── images/
│ └── hero-image.png
├── .github/
│ └── workflows/
│ └── deploy.yml
├── .gitignore
└── README.md
