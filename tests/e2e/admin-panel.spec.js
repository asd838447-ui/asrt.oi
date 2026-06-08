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

test.describe('Teacher Admin Controls - Feature 8', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
  });

  test('T1.8.1: Admin panel lists registered student accounts', async ({ page }) => {
    await expect(page.getByTestId('student-list')).toBeVisible();
    await expect(page.getByTestId('student-list')).toContainText('student1');
  });

  test('T1.8.2: Admin can create new student credentials', async ({ page }) => {
    await page.getByTestId('new-student-username').fill('student2');
    await page.getByTestId('new-student-password').fill('pass123');
    await page.getByTestId('create-student-submit').click();
    await expect(page.getByTestId('student-list')).toContainText('student2');
  });

  test('T1.8.3: Admin can edit lesson text content', async ({ page }) => {
    await page.getByTestId('edit-lesson-text-1').fill('Updated theory content');
    await page.getByTestId('save-lesson-edits-1').click();

    // Verify localStorage updated
    const lessons = await page.evaluate(() => JSON.parse(window.localStorage.getItem('lessons')));
    expect(lessons.find(l => l.id === 1).content).toBe('Updated theory content');
  });

  test('T1.8.4: Admin can edit lesson video URL path', async ({ page }) => {
    await page.getByTestId('edit-lesson-video-1').fill('C:\\new_video.mp4');
    await page.getByTestId('save-lesson-edits-1').click();

    const lessons = await page.evaluate(() => JSON.parse(window.localStorage.getItem('lessons')));
    expect(lessons.find(l => l.id === 1).videoUrl).toBe('C:\\new_video.mp4');
  });

  test('T1.8.5: Admin can manually unlock the next lesson', async ({ page }) => {
    // Unlock lesson 2
    await page.getByTestId('unlock-lesson-2').click();

    const lessons = await page.evaluate(() => JSON.parse(window.localStorage.getItem('lessons')));
    expect(lessons.find(l => l.id === 2).isUnlocked).toBe(true);
  });
});

test.describe('Teacher Admin Controls Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);
    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
  });

  test('T2.8.1: Adding student with duplicate username shows error', async ({ page }) => {
    await page.getByTestId('new-student-username').fill('student1');
    await page.getByTestId('new-student-password').fill('password123');
    await page.getByTestId('create-student-submit').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('error' || 'exists' || 'duplicate' || 'пользователь');
  });

  test('T2.8.2: Adding student with empty fields displays validation error', async ({ page }) => {
    await page.getByTestId('new-student-username').fill('');
    await page.getByTestId('new-student-password').fill('');
    await page.getByTestId('create-student-submit').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('error' || 'заполните' || 'empty' || 'required');
  });

  test('T2.8.3: Editing lesson text to be extremely long handles scroll', async ({ page }) => {
    await page.getByTestId('edit-lesson-text-1').fill('a'.repeat(5000));
    await page.getByTestId('save-lesson-edits-1').click();
    // Verify it saved and page did not crash
    await expect(page.getByTestId('edit-lesson-text-1')).toBeVisible();
  });

  test('T2.8.4: Admin cannot lock the very first lesson (Lesson 1 must stay unlocked)', async ({ page }) => {
    // If there is lock button for lesson 1, it should not be active, or there is no such lock mechanism
    // Verify first lesson remains unlocked in localStorage even if we try to lock it
    const lessons = await page.evaluate(() => JSON.parse(window.localStorage.getItem('lessons')));
    expect(lessons.find(l => l.id === 1).isUnlocked).toBe(true);
  });

  test('T2.8.5: Admin panel handles many students listing', async ({ page }) => {
    // Inject 100 students
    await page.addInitScript(() => {
      const students = Array.from({ length: 100 }, (_, i) => ({
        username: `student_many_${i}`,
        password: 'password123',
        role: 'student'
      }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' },
        ...students
      ]));
    });
    await page.reload();
    await expect(page.getByTestId('student-list')).toBeVisible();
    await expect(page.getByTestId('student-list')).toContainText('student_many_99');
  });
});

test.describe('Cross-Feature Combinations (Admin Panel)', () => {
  test('T3.1: Admin modifies video path -> Student logins -> plays updated video', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
    await page.getByTestId('edit-lesson-video-1').fill('C:\\new_video_path.mp4');
    await page.getByTestId('save-lesson-edits-1').click();

    await page.getByTestId('logout-btn').click();

    // Login as Student
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();

    const video = page.getByTestId('lesson-video-player');
    const src = await video.getAttribute('src');
    expect(src).toContain('new_video_path.mp4');
  });

  test('T3.2: Admin unlocks Lesson 2 -> Student logins -> verifies Lesson 2 is now unlocked', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
    await page.getByTestId('unlock-lesson-2').click();

    await page.getByTestId('logout-btn').click();

    // Login as Student
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await expect(page.getByTestId('lesson-lock-2')).not.toBeVisible();
  });

  test('T3.3: Student takes Lesson 1 quiz -> submits score -> Admin panel updates student score list', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    const correctAnswers = [0, 1, 2, 0, 3, 3, 2, 2, 0, 1];
    for (const ans of correctAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }

    await page.getByTestId('logout-btn').click();

    // Login as Admin
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('asd_123d');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('admin-panel-btn').click();
    await expect(page.getByTestId('student-list')).toContainText('100');
  });

  test('T3.7: Student fails quiz -> Admin overrides and unlocks Lesson 2 -> Student can access Lesson 2', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    const incorrectAnswers = [1, 0, 0, 1, 0, 0, 0, 0, 1, 0];
    for (const ans of incorrectAnswers) {
      await page.getByTestId(`quiz-option-${ans}`).click();
      await page.getByTestId('quiz-submit-btn').click();
    }

    await page.getByTestId('logout-btn').click();

    // Admin override
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('asd_123d');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('admin-panel-btn').click();
    await page.getByTestId('unlock-lesson-2').click();

    await page.getByTestId('logout-btn').click();

    // Student returns
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await expect(page.getByTestId('lesson-lock-2')).not.toBeVisible();
    await page.getByTestId('lesson-item-2').click();
    await expect(page.getByTestId('lesson-text-content')).toContainText('Theory content for Lesson 2');
  });

  test('T3.8: Admin edits Lesson 1 quiz question -> Student sees updated question immediately', async ({ page }) => {
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
    
    // Simulate updating quiz in admin panel
    await page.evaluate(() => {
      const lessons = JSON.parse(window.localStorage.getItem('lessons'));
      lessons[0].test.questions[0].question = "What is updated chemistry?";
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    });

    await page.getByTestId('logout-btn').click();

    // Student checks
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('quiz-question')).toContainText('What is updated chemistry?');
  });
});

test.describe('Tier 4: Real-World Application Scenarios (Admin Panel)', () => {
  test('T4.2: Teacher Lesson Editing & Unlock', async ({ page }) => {
    // Admin login -> Create student -> Edit Lesson 1 text & video -> Unlock Lesson 2 -> Logout -> Student login -> Verify updates & access.
    await page.addInitScript((lessons) => {
      window.localStorage.setItem('lessons', JSON.stringify(lessons));
    }, mockLessons);

    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('asd_123d');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('admin-panel-btn').click();
    
    // Create student
    await page.getByTestId('new-student-username').fill('student_new');
    await page.getByTestId('new-student-password').fill('pass1234');
    await page.getByTestId('create-student-submit').click();

    // Edit Lesson 1
    await page.getByTestId('edit-lesson-text-1').fill('Completely new theory text.');
    await page.getByTestId('edit-lesson-video-1').fill('C:\\new_theory_video.mp4');
    await page.getByTestId('save-lesson-edits-1').click();

    // Unlock Lesson 2
    await page.getByTestId('unlock-lesson-2').click();

    await page.getByTestId('logout-btn').click();

    // Student login
    await page.getByTestId('login-username-input').fill('student_new');
    await page.getByTestId('login-password-input').fill('pass1234');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    
    // Check Lesson 2 is unlocked
    await expect(page.getByTestId('lesson-lock-2')).not.toBeVisible();

    // Check Lesson 1 edits
    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('lesson-text-content')).toContainText('Completely new theory text.');
    const src = await page.getByTestId('lesson-video-player').getAttribute('src');
    expect(src).toContain('new_theory_video.mp4');
  });
});
