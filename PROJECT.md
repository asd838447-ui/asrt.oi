# Project: Chemistry & Biology ENT Training Website

## Architecture
The application is structured as a client-side React SPA built using Vite. Since it is designed to be hosted on GitHub Pages, all dynamic data (lesson modifications, custom video uploads, user credentials, scores, progress) is persisted in `localStorage`.

- **Routing**: Custom state-based router (`page` state in `App`) to prevent 404 issues on GitHub Pages.
- **Styling**: Vanilla CSS utilizing CSS custom properties for theme colors, with a smooth transition class for theme switching.
- **Data Store**: A centralized `localStorage` database wrapper (`utils/store.js` or custom hook) managing:
  - `user`: Currently logged in user info (role: 'student' | 'admin').
  - `users`: Registered users database.
  - `lessons`: Lesson list with editable details (text, videoUrl, testQuestions, isUnlocked).
  - `scores`: Map of student scores per lesson test.
- **Media**: Local or absolute path files (e.g. `C:\Users\asd83\Downloads\Основы_химии.mp4` for video, and absolute paths to desktop PDF textbooks like `C:\Users\asd83\Desktop\Convert\Химия_7класс_Мектеп_Оспанова.pdf` which can be loaded in an `iframe` or browser viewer).

## Tracks & Milestones

### 1. E2E Testing Track (Orchestrator Conv ID: `28549a76-5cf0-4cd9-8bc7-4a9148535503`)
- **Status**: IN_PROGRESS
- **Scope**: Design and write E2E tests (Tiers 1-4) in Playwright. Publish `TEST_READY.md`.

### 2. Implementation Track (Orchestrator Conv ID: `ce56d153-c1b4-4618-b653-2b2547fa3e0e`)
- **Status**: IN_PROGRESS
- **Scope**: Develop the React web application step-by-step through the following milestones:

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Setup & Routing | Setup Vite + React boilerplate, custom router, and basic layout structure with light/dark theme toggle. | None | IN_PROGRESS |
| 2 | Welcome & Auth | Implement greeting screen, custom login page, persistent accounts in `localStorage`, and admin account initialization. | M1 | PLANNED |
| 3 | Subject Selection & UI | Implement dashboard with Chemistry/Biology selection, custom hover animations, and "In development" overlay for Biology. | M2 | PLANNED |
| 4 | Lesson Flow & Quizzes | Parse Chemistry lesson plan CSV into JSON/store, implement Lesson Details page (video player, text sheet, quiz, scores, retry, locked/unlocked state). | M3 | PLANNED |
| 5 | Admin Control Panel | Implement admin options to manage students, upload/edit lesson text, update video paths, and manually unlock lessons. | M4 | PLANNED |
| 6 | E2E Integration & Audit | Pass all E2E test suites (Tiers 1-4), verify with Challengers (Tier 5), and obtain CLEAN Forensic Auditor verdict. | M5 | PLANNED |


## Interface Contracts
### Data Formats

#### User Account
```json
{
  "username": "student1",
  "password": "password123",
  "role": "student",
  "createdAt": "2026-06-08T14:18:00Z"
}
```

#### Lesson Detail
```json
{
  "id": 1,
  "title": "Повторение базовых понятий химии. Чистые вещества и смеси...",
  "materials": "Оспанова М., Химия 7 кл, Мектеп, 2017, §1-4, §6-12",
  "hours": 1,
  "weekDay": "1-я неделя, Пн",
  "content": "Теория: базовые химические понятия, лабораторная посуда...",
  "videoUrl": "C:\\Users\\asd83\\Downloads\\Основы_химии.mp4",
  "textbookPdf": "Химия_7класс_Мектеп_Оспанова.pdf",
  "isUnlocked": true,
  "test": {
    "questions": [
      {
        "question": "Что является примером химического явления?",
        "options": ["Плавление льда", "Горение свечи", "Испарение воды", "Дробление камня"],
        "correctAnswer": 1
      }
    ]
  }
}
```

#### Student Score Record
```json
{
  "username": "student1",
  "scores": {
    "lesson_1": {
      "score": 80,
      "maxScore": 100,
      "passed": true,
      "timestamp": "2026-06-08T15:20:00Z"
    }
  }
}
```

## Code Layout
```
src/
├── assets/          # SVG icons, logo, and animations
├── components/      # Common components: ThemeToggle, InteractiveHover, PDFViewer
├── pages/           # Pages: Welcome, Login, Dashboard, LessonDetail, AdminPanel
├── services/        # LocalStorage helpers and preloaded CSV parser
├── App.css          # Theme-specific variables and CSS styles
├── App.jsx          # App root component with routing logic
├── main.jsx         # App entry point
index.html           # Main HTML shell
vite.config.js       # Vite configuration
```
