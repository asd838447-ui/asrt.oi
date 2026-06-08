# Original User Request

## Initial Request — 2026-06-08T19:17:56+05:00

Create a production-grade website for chemistry and biology training, aimed at preparing students for the Unified National Testing (ENT). The application should be built as a modern, interactive, and visually stunning web application (React + Vite, Vanilla CSS, custom animations, and a light/dark theme switch), storing all lessons, student scores, and uploaded files in localStorage to allow easy deployment on GitHub Pages.

Working directory: C:\Users\asd83\.gemini\antigravity\scratch\chemistry_biology_learning
Integrity mode: development

## Requirements

### R1. Authentication & Roles
- Entrance greeting message screen: "Здравствуйте, вы перешли по ссылке на сайт... учителя по химии и биологии" with a "Next" button.
- Transitions to a login page. Admin credentials are username `asd838` and password `asd_123d`. Admins can manage student credentials and upload/unlock lessons. All accounts are persistent (saved in localStorage).

### R2. Main Interface & Subject Selection
- Two large subject selection buttons: "Chemistry" (Химия) and "Biology" (Биология).
- Hovering over these buttons displays dynamic, smooth interactive drawings corresponding to the subject.
- Clicking "Biology" shows a "(В разработке)" (In development) overlay.
- Clicking "Chemistry" shows the lesson plan loaded from `C:\Users\asd83\Desktop\Convert\КТП_Химия_7-11класс_ЕНТ_Год.xlsx` or its CSV equivalent.

### R3. Lesson Flow & Student Tests
- Clicking a lesson opens its detail page, displaying a video lesson player, a text sheet, and a test.
- The first lesson has the video `C:\Users\asd83\Downloads\Основы_химии.mp4` loaded by default, along with the text content and test.
- After passing the test, the student sees their score and can choose to retake it.
- Textbooks from `C:\Users\asd83\Desktop\Convert` are linked and can be opened in a PDF viewer.
- Admin panel allows teachers to upload videos, edit texts, add test links, and unlock the next lesson.

### R4. Theme Styling
- Global Dark/Light mode toggle that switches the site's layout styling smoothly.

## Acceptance Criteria

### A1. Welcome and Authorization
- [ ] Student sees the welcome message, clicks Next, and logs in using valid credentials.
- [ ] Admin logs in with `asd838` / `asd_123d` and can access the teacher management panel.

### A2. Subject Selection & Interactive UI
- [ ] Chemistry and Biology buttons have hover animations.
- [ ] Dark/Light mode toggle updates colors globally and instantly.
- [ ] Biology displays the "In development" message, Chemistry displays the lesson list.

### A3. Lesson Content & Administration
- [ ] The first lesson plays the video `Основы_химии.mp4`.
- [ ] Textbooks can be opened in Google Docs or custom PDF viewer.
- [ ] Student can take the test for Lesson 1, see their score, and retake it.
- [ ] Admin can unlock subsequent lessons and modify the content of lessons.
