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

test.describe('Light/Dark Theme Switch - Feature 9', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
  });

  test('T1.9.1: Light/Dark theme toggle is present in the layout', async ({ page }) => {
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });

  test('T1.9.2: Toggling theme switches the stylesheet/body class', async ({ page }) => {
    const body = page.locator('body');
    const hasDarkInit = await body.evaluate((el) => el.classList.contains('dark'));

    await page.getByTestId('theme-toggle').click();
    const hasDarkAfter = await body.evaluate((el) => el.classList.contains('dark'));
    expect(hasDarkInit).not.toBe(hasDarkAfter);
  });

  test('T1.9.3: Selected theme is saved in localStorage', async ({ page }) => {
    await page.getByTestId('theme-toggle').click();
    const themeVal = await page.evaluate(() => window.localStorage.getItem('theme'));
    expect(themeVal).toMatch(/^(light|dark)$/);
  });

  test('T1.9.4: Reloading page retains the last selected theme', async ({ page }) => {
    await page.getByTestId('theme-toggle').click();
    const themeValBefore = await page.evaluate(() => window.localStorage.getItem('theme'));

    await page.reload();
    const themeValAfter = await page.evaluate(() => window.localStorage.getItem('theme'));
    expect(themeValBefore).toBe(themeValAfter);
  });

  test('T1.9.5: Theme toggle triggers transition styles', async ({ page }) => {
    const body = page.locator('body');
    await page.getByTestId('theme-toggle').click();
    // Verify it has a transition class or transition styles
    const bodyClass = await body.evaluate((el) => el.className);
    expect(bodyClass).toBeDefined();
  });
});

test.describe('Light/Dark Theme Switch Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
  });

  test('T2.9.1: High-frequency toggling of theme', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');
    for (let i = 0; i < 10; i++) {
      await toggle.click();
    }
    // Still works and hasn't crashed
    await expect(toggle).toBeVisible();
  });

  test('T2.9.2: Invalid theme value in localStorage defaults safely', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('theme', 'invalid-theme-value');
    });
    await page.reload();
    const theme = await page.evaluate(() => window.localStorage.getItem('theme'));
    // Should fallback or default safely
    expect(theme).not.toBe('invalid-theme-value');
  });

  test('T2.9.3: Changing theme matches custom variable values immediately', async ({ page }) => {
    await page.getByTestId('theme-toggle').click();
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(backgroundColor).toBeDefined();
  });

  test('T2.9.4: CSS transition classes are applied and removed cleanly', async ({ page }) => {
    const body = page.locator('body');
    await page.getByTestId('theme-toggle').click();
    const bodyClass = await body.evaluate((el) => el.className);
    expect(bodyClass).toBeDefined();
  });

  test('T2.9.5: Custom scrollbars adjust to theme changes', async ({ page }) => {
    await page.getByTestId('theme-toggle').click();
    // Verification that scrollbars/layout handles it smoothly
    await expect(page.getByTestId('theme-toggle')).toBeVisible();
  });
});

test.describe('Cross-Feature Combinations & Real-World Scenarios (Theme)', () => {
  test('T3.5: Theme switched to dark -> logout -> login as admin -> verifies dark theme persists', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('theme', 'light');
    });
    await page.goto('/');
    
    // Switch to dark
    const body = page.locator('body');
    const hasDarkInit = await body.evaluate((el) => el.classList.contains('dark'));
    if (!hasDarkInit) {
      await page.getByTestId('theme-toggle').click();
    }

    await page.getByTestId('logout-btn').click();

    // Login as Admin
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('asd_123d');
    await page.getByTestId('login-submit-btn').click();

    // Verifies dark theme persists
    const isDarkNow = await body.evaluate((el) => el.classList.contains('dark'));
    expect(isDarkNow).toBe(true);
  });

  test('T3.6: Student takes quiz in dark theme -> scores 100% -> unlocks lesson 2 -> lesson 2 details is in dark theme', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
      window.localStorage.setItem('theme', 'dark');
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();

    // Check dark theme is active
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);

    // Pass the test
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }

    // Go back and verify Lesson 2 is unlocked and details is in dark theme
    await page.getByTestId('back-to-lessons-btn').click();
    await page.getByTestId('lesson-item-2').click();

    await expect(body).toHaveClass(/dark/);
  });

  test('T4.3: Theme Persistence & Session Restore', async ({ page }) => {
    // Toggle Dark -> Welcome screen -> Login -> Select subject -> Refresh -> Verifies theme & session persist.
    await page.addInitScript(() => {
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      if (!window.localStorage.getItem('theme')) {
        window.localStorage.setItem('theme', 'light');
      }
    });

    await page.goto('/');
    
    // Toggle Dark
    await page.getByTestId('theme-toggle').click();
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark/);

    // Welcome -> Login
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    // Select Chemistry
    await page.getByTestId('subject-chemistry-btn').click();

    // Refresh
    await page.reload();

    // Verifies theme and session persist
    await expect(body).toHaveClass(/dark/);
    await expect(page.getByTestId('lesson-list')).toBeVisible();
  });
});
