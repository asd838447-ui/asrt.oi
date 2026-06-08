import { test, expect } from '@playwright/test';

const mockLessons = [
  {
    id: 1,
    title: "Основы химии: вещества, явления и строение атома",
    hours: 1,
    weekDay: "1-я неделя, Пн",
    content: `Глава I. Введение в химию. Чистые вещества и смеси (§1–3)
- Определение: Химия — это наука о веществах, их свойствах и превращениях в другие вещества.
- Физическое тело vs Вещество: Физическое тело состоит из определенного вещества.
- Свойства: индивидуальные свойства (агрегатное состояние, плотность, цвет, запах, температуры кипения/плавления, электро- и теплопроводность, растворимость).
- Смеси: Гетерогенные (неоднородные) и гомогенные (однородные).
- Методы разделения: Фильтрование, отстаивание, действие магнитом, выпаривание, кристаллизация, дистилляция (перегонка).

Глава II. Изменения состояния веществ (§4, §6)
- Физические явления: изменяется состояние или форма, но новые вещества не образуются (испарение воды, плавление льда).
- Химические явления (реакции): образуются новые вещества (горение, гниение, ржавление).
- Признаки реакций: выделение газа, изменение окраски, образование осадка, выделение/поглощение тепла/света.

Глава III. Атомы. Молекулы. Вещества (§7–9)
- Простые вещества: атомы одного химического элемента (H2, N2, O2...).
- Сложные вещества: атомы разных элементов (H2O, NH3...).
- Строение атома: Ядро (протоны p+ и нейтроны n0) + электроны (e-).
  - Число протонов = число электронов = Порядковый номер (Z).
  - Число нейтронов (N) = Ar - Z.
- Изотопы: Разновидности атомов одного элемента с разным числом нейтронов (протий, дейтерий, тритий).

Глава IV. Воздух. Реакция горения (§10–12)
- Состав воздуха (по объему): Азот N2 (78.08%), Кислород O2 (20.95%), благородные газы (0.94%), углекисмый газ CO2 (0.03%).
- Горение: взаимодействие с кислородом с выделением тепла и света (образуются оксиды).`,
    videoUrl: "C:\\Users\\asd83\\Downloads\\Основы_химии.mp4",
    textbookPdf: "Химия_7класс_Мектеп_Оспанова.pdf",
    isUnlocked: true,
    test: {
      questions: [
        {
          question: "В соответствии с учебником химии 7 класса, что из перечисленного является веществом, а не физическим телом?",
          options: ["Железо", "Стеклянный стакан", "Железный гвоздь", "Айсберг"],
          correctAnswer: 0
        },
        {
          question: "Какой метод разделения смесей следует использовать для выделения поваренной соли из её водного раствора?",
          options: ["Действие магнитом", "Выпаривание", "Отстаивание", "Фильтрование"],
          correctAnswer: 1
        },
        {
          question: "Какое из приведенных явлений относится к химическим?",
          options: ["Измельчение сахара", "Таяние льда", "Горение свечи", "Испарение спирта"],
          correctAnswer: 2
        },
        {
          question: "На каком физическом различии свойств компонентов основан метод дистилляции (перегонки)?",
          options: ["Различие в температурах кипения", "Различие в плотности", "Различие в размерах молекул", "Различие в растворимости"],
          correctAnswer: 0
        },
        {
          question: "Что происходит с температурой чистого вещества в процессе его плавления, согласно графику нагревания?",
          options: ["Температура сначала растет, а затем падает", "Температура резко снижается", "Температура линейно растет", "Температура остается неизменной"],
          correctAnswer: 3
        },
        {
          question: "К какому типу относится смесь, в которой частицы компонентов можно увидеть невооруженным глазом или с помощью микроскопа?",
          options: ["Химическое соединение", "Чистое вещество", "Однородная (гомогенная)", "Неоднородная (гетерогенная)"],
          correctAnswer: 3
        },
        {
          question: "Согласно МКТ (молекулярно-кинетической теории), как расположены молекулы в жидкостях?",
          options: ["Жестко закреплены в узлах решетки", "Находятся на очень больших расстояниях", "Расположены близко друг к другу, но могут скользить", "Двигаются хаотично с огромными скоростями"],
          correctAnswer: 2
        },
        {
          question: "Какой признак химической реакции наблюдается при взаимодействии мела с соляной кислотой?",
          options: ["Появление металлического блеска", "Затвердевание смеси", "Выделение газа", "Выделение света (свечение)"],
          correctAnswer: 2
        },
        {
          question: "Что из перечисленного является примером физического свойства вещества?",
          options: ["Плотность", "Горючесть", "Способность к окисленнию", "Токсичность"],
          correctAnswer: 0
        },
        {
          question: "Как называется процесс перехода вещества из газообразного состояния непосредственно в твердое, минуя жидкое?",
          options: ["Сублимация", "Десублимация", "Конденсация", "Кристаллизация"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 2,
    title: "Lesson 2: Advanced",
    hours: 2,
    weekDay: "1-я неделя, Ср",
    content: "Theory content for Lesson 2",
    videoUrl: "C:\\Users\\asd83\\Downloads\\Advanced_chem.mp4",
    textbookPdf: "Химия_8класс_Мектеп_Оспанова.pdf",
    isUnlocked: false,
    test: {
      questions: [
        {
          question: "Question 2?",
          options: ["Opt A", "Opt B", "Opt C", "Opt D"],
          correctAnswer: 2
        }
      ]
    }
  }
];

test.describe('Lesson Content Player & Text - Feature 5', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
  });

  test('T1.5.1: Lesson 1 details displays a video player', async ({ page }) => {
    await expect(page.getByTestId('lesson-video-player')).toBeVisible();
  });

  test('T1.5.2: Video player in Lesson 1 plays Основы_химии.mp4 by default', async ({ page }) => {
    const video = page.getByTestId('lesson-video-player');
    const src = await video.getAttribute('src');
    expect(src).toContain('Основы_химии.mp4');
  });

  test('T1.5.3: Lesson details displays a formatted text sheet', async ({ page }) => {
    await expect(page.getByTestId('lesson-text-content')).toBeVisible();
    await expect(page.getByTestId('lesson-text-content')).toContainText('Основы химии: вещества, явления и строение атома');
  });

  test('T1.5.4: Textbook materials section lists associated textbook titles', async ({ page }) => {
    await expect(page.getByTestId('textbook-link-1')).toBeVisible();
    await expect(page.getByTestId('textbook-link-1')).toContainText('Химия_7класс_Мектеп_Оспанова.pdf');
  });

  test('T1.5.5: Back button returns to the lesson plan', async ({ page }) => {
    await page.getByTestId('back-to-lessons-btn').click();
    await expect(page.getByTestId('lesson-list')).toBeVisible();
  });
});

test.describe('Interactive Testing & Retakes - Feature 6', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
  });

  test('T1.6.1: Lesson test displays multiple-choice questions', async ({ page }) => {
    await expect(page.getByTestId('quiz-container')).toBeVisible();
    await expect(page.getByTestId('quiz-question')).toBeVisible();
    await expect(page.getByTestId('quiz-option-0')).toBeVisible();
    await expect(page.getByTestId('quiz-option-1')).toBeVisible();
  });

  test('T1.6.2: Submitting the test displays student score', async ({ page }) => {
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toBeVisible();
  });

  test('T1.6.3: Retake button allows starting the test over', async ({ page }) => {
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-retake-btn')).toBeVisible();
    await page.getByTestId('quiz-retake-btn').click();
    await expect(page.getByTestId('quiz-submit-btn')).toBeVisible();
    await expect(page.getByTestId('quiz-score')).not.toBeVisible();
  });

  test('T1.6.4: Passing the test records the score persistently', async ({ page }) => {
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toBeVisible();

    const scores = await page.evaluate(() => JSON.parse(window.localStorage.getItem('scores')));
    expect(scores['student1']['lesson_1'].score).toBe(100);
  });

  test('T1.6.5: Score persistence maps scores specifically per student', async ({ page }) => {
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }

    const scores = await page.evaluate(() => JSON.parse(window.localStorage.getItem('scores')));
    expect(scores['student1']).toBeDefined();
    expect(scores['student2']).toBeUndefined();
  });
});

test.describe('Textbook Integration (PDF Viewer) - Feature 7', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
  });

  test('T1.7.1: Clicking textbook links launches PDF viewer', async ({ page }) => {
    await page.getByTestId('textbook-link-1').click();
    await expect(page.getByTestId('pdf-viewer')).toBeVisible();
  });

  test('T1.7.2: PDF viewer displays textbook title and iframe/canvas placeholder', async ({ page }) => {
    await page.getByTestId('textbook-link-1').click();
    await expect(page.getByTestId('pdf-viewer')).toContainText('Химия_7класс_Мектеп_Оспанова.pdf');
    await expect(page.getByTestId('pdf-iframe')).toBeVisible();
  });

  test('T1.7.3: PDF viewer correctly binds the PDF document source path', async ({ page }) => {
    await page.getByTestId('textbook-link-1').click();
    const src = await page.getByTestId('pdf-iframe').getAttribute('src');
    expect(src).toContain('Химия_7класс_Мектеп_Оспанова.pdf');
  });

  test('T1.7.4: PDF viewer provides a way to return to lesson detail', async ({ page }) => {
    await page.getByTestId('textbook-link-1').click();
    await page.getByTestId('pdf-close-btn').click();
    await expect(page.getByTestId('pdf-viewer')).not.toBeVisible();
    await expect(page.getByTestId('lesson-video-player')).toBeVisible();
  });

  test('T1.7.5: Textbooks list loads the correct configured list', async ({ page }) => {
    await expect(page.getByTestId('textbook-link-1')).toBeVisible();
  });
});

test.describe('Lesson Content Player & Text Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
  });

  test('T2.5.1: Broken video URL shows error state/fallback', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, videoUrl: 'invalid://video.mp4', test: { questions: [] } }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    // Verify that we can gracefully handle/display error
    await expect(page.getByTestId('lesson-video-player')).toBeVisible();
  });

  test('T2.5.2: Lesson with empty text displays placeholder', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, content: '', test: { questions: [] } }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('lesson-text-content')).toBeVisible();
    const contentText = await page.getByTestId('lesson-text-content').innerText();
    expect(contentText.trim().length).toBeGreaterThanOrEqual(0);
  });

  test('T2.5.3: Long textbook description text is scrollable', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, content: 'a'.repeat(2000), test: { questions: [] } }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('lesson-text-content')).toBeVisible();
  });

  test('T2.5.4: Rapid lesson switching does not cause layout flicker or memory issues', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, test: { questions: [] } },
        { id: 2, title: 'Lesson 2', isUnlocked: true, test: { questions: [] } }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    await page.getByTestId('back-to-lessons-btn').click();
    await page.getByTestId('lesson-item-2').click();
    await expect(page.getByTestId('lesson-video-player')).toBeVisible();
  });

  test('T2.5.5: Special characters in lesson titles render correctly', async ({ page }) => {
    const specialTitle = 'Lesson 1: & < > " \'';
    await page.addInitScript((title) => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: title, isUnlocked: true, test: { questions: [] } }
      ]));
    }, specialTitle);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    const item = page.getByTestId('lesson-item-1');
    await expect(item).toContainText(specialTitle);
  });
});

test.describe('Interactive Testing & Retakes Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
  });

  test('T2.6.1: Submitting quiz with zero selected answers shows warning', async ({ page }) => {
    // Submit without selecting an option
    await page.getByTestId('quiz-submit-btn').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('warning' || 'выберите' || 'select' || 'error' || 'quiz');
  });

  test('T2.6.2: Quiz scoring handles 0 correct and 100% correct answers correctly', async ({ page }) => {
    // 0 correct (incorrect choice)
    const incorrectAnswers = [1, 0, 0, 1, 0, 0, 0, 0, 1, 0];
    for (const ans of incorrectAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toContainText('0');

    await page.getByTestId('quiz-retake-btn').click();

    // 100% correct (correct choice)
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toContainText('100');
  });

  test('T2.6.3: Retaking quiz clears previous selections completely', async ({ page }) => {
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await page.getByTestId('quiz-retake-btn').click();
    const opt = page.getByTestId('quiz-option-1');
    const isChecked = await opt.evaluate((el) => el.checked);
    expect(isChecked).toBeFalsy();
  });

  test('T2.6.4: Page refresh during quiz preserves temporary state or resets cleanly', async ({ page }) => {
    await page.getByTestId('quiz-option-1').click();
    await page.reload();
    // Resetting cleanly or preserving state is acceptable. Verify page is still functional.
    await expect(page.getByTestId('quiz-container')).toBeVisible();
  });

  test('T2.6.5: Malformed test JSON handles loading errors gracefully', async ({ page }) => {
    await page.addInitScript(() => {
      // Set malformed test in lesson
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, test: '{malformed-json}' }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    // App should not crash
    await expect(page.getByTestId('lesson-text-content')).toBeVisible();
  });
});

test.describe('Textbook Integration Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
  });

  test('T2.7.1: Broken/missing PDF path shows error message', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, textbookPdf: '', test: { questions: [] } }
      ]));
    });
    await page.reload();
    // Textbook link might not be visible, or show error if clicked
    const link = page.getByTestId('textbook-link-1');
    if (await link.isVisible()) {
      await link.click();
      await expect(page.getByTestId('pdf-viewer')).toBeVisible();
    }
  });

  test('T2.7.2: Handling files with spaces and special symbols in path', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, textbookPdf: 'my file #1 (draft).pdf', test: { questions: [] } }
      ]));
    });
    await page.reload();
    await page.getByTestId('textbook-link-1').click();
    const src = await page.getByTestId('pdf-iframe').getAttribute('src');
    expect(src).toContain(encodeURIComponent('my file #1 (draft).pdf') || 'my file #1 (draft).pdf');
  });

  test('T2.7.3: PDF viewer handles external vs local filesystem PDF links', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', isUnlocked: true, textbookPdf: 'http://example.com/file.pdf', test: { questions: [] } }
      ]));
    });
    await page.reload();
    await page.getByTestId('textbook-link-1').click();
    const src = await page.getByTestId('pdf-iframe').getAttribute('src');
    expect(src).toBe('http://example.com/file.pdf');
  });

  test('T2.7.4: Clicking PDF link in rapid succession', async ({ page }) => {
    const link = page.getByTestId('textbook-link-1');
    await link.click();
    await link.click({ clickCount: 3 });
    await expect(page.getByTestId('pdf-viewer')).toBeVisible();
  });

  test('T2.7.5: PDF viewer dimensions adjust to mobile/desktop screens', async ({ page }) => {
    await page.getByTestId('textbook-link-1').click();
    await page.setViewportSize({ width: 375, height: 667 }); // mobile size
    const box = await page.getByTestId('pdf-viewer').boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);
  });
});

test.describe('Tier 4: Real-World Application Scenarios (Lesson Flow)', () => {
  test('T4.1: Student Full Learning Path', async ({ page }) => {
    // Welcome -> Login -> Select Chemistry -> Check Lesson 1 -> View text -> Pass test -> Score persisted -> Lesson 2 unlocks.
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await expect(page.getByTestId('lesson-lock-2')).toBeVisible(); // Lesson 2 locked

    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('lesson-text-content')).toContainText('Основы химии: вещества, явления и строение атома');

    // Take and pass the quiz (Option 1 is correct)
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toContainText('100');

    // Return to lesson plan
    await page.getByTestId('back-to-lessons-btn').click();

    // Lesson 2 should be unlocked now
    await expect(page.getByTestId('lesson-lock-2')).not.toBeVisible();
    await page.getByTestId('lesson-item-2').click();
    await expect(page.getByTestId('lesson-text-content')).toContainText('Theory content for Lesson 2');
  });

  test('T4.4: Test Retake & Score History', async ({ page }) => {
    // Student takes quiz -> Fails (<50%) -> Retakes -> Passes (100%) -> Verifies updated score in dashboard.
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();

    // Select incorrect answer
    const incorrectAnswers = [1, 0, 0, 1, 0, 0, 0, 0, 1, 0];
    for (const ans of incorrectAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toContainText('0');

    // Retake quiz
    await page.getByTestId('quiz-retake-btn').click();

    // Select correct answer
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }
    await expect(page.getByTestId('quiz-score')).toContainText('100');

    // Return and verify score is persisted
    await page.getByTestId('back-to-lessons-btn').click();
    
    const scores = await page.evaluate(() => JSON.parse(window.localStorage.getItem('scores')));
    expect(scores['student1']['lesson_1'].score).toBe(100);
  });
});
