import { test, expect } from '@playwright/test';

test.describe('Welcome Screen & Login Transition - Feature 1', () => {
  test('T1.1.1: Welcome screen displays greeting text', async ({ page }) => {
    await page.goto('/');
    const greeting = page.locator('text="Здравствуйте, вы перешли по ссылке на сайт..."');
    await expect(greeting).toBeVisible();
  });

  test('T1.1.2: Welcome screen displays a "Next" button', async ({ page }) => {
    await page.goto('/');
    const nextBtn = page.getByTestId('welcome-next-btn');
    await expect(nextBtn).toBeVisible();
  });

  test('T1.1.3: Clicking "Next" transitions to the login page', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await expect(page.getByTestId('login-username-input')).toBeVisible();
  });

  test('T1.1.4: Login page displays username and password inputs', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await expect(page.getByTestId('login-username-input')).toBeVisible();
    await expect(page.getByTestId('login-password-input')).toBeVisible();
  });

  test('T1.1.5: Login page displays login button', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await expect(page.getByTestId('login-submit-btn')).toBeVisible();
  });
});

test.describe('Authenticated Roles & Persistence - Feature 2', () => {
  test('T1.2.1: Admin logins successfully with credentials asd838 / asd_123d', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('asd_123d');
    await page.getByTestId('login-submit-btn').click();
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
    await expect(page.getByTestId('admin-panel-btn')).toBeVisible();
  });

  test('T1.2.2: Student logins successfully with valid registered credentials', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'student1', password: 'password123', role: 'student' }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('student1');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
    await expect(page.getByTestId('admin-panel-btn')).not.toBeVisible();
  });

  test('T1.2.3: Authenticated session persists upon page reload', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
    await page.reload();
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
  });

  test('T1.2.4: Logging out clears user session from localStorage and redirects to login', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
    await expect(page.getByTestId('logout-btn')).toBeVisible();
    await page.getByTestId('logout-btn').click();
    await expect(page.getByTestId('login-username-input')).toBeVisible();
    
    const user = await page.evaluate(() => window.localStorage.getItem('user'));
    expect(user).toBeNull();
  });

  test('T1.2.5: Student registration/creation creates persistent user accounts', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
    });
    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
    await page.getByTestId('new-student-username').fill('newstudent');
    await page.getByTestId('new-student-password').fill('pass123');
    await page.getByTestId('create-student-submit').click();

    await page.reload();
    await page.getByTestId('admin-panel-btn').click();
    const studentList = page.getByTestId('student-list');
    await expect(studentList).toContainText('newstudent');
  });
});

test.describe('Welcome Screen & Login Transition - Feature 1 Boundary & Corner Cases - Tier 2', () => {
  test('T2.1.1: Rapid clicking on Next button', async ({ page }) => {
    await page.goto('/');
    const nextBtn = page.getByTestId('welcome-next-btn');
    await nextBtn.click();
    await nextBtn.click({ clickCount: 5 });
    await expect(page.getByTestId('login-username-input')).toBeVisible();
  });

  test('T2.1.2: Submitting empty credentials shows validation errors', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-submit-btn').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('error' || 'заполните' || 'invalid' || 'empty');
  });

  test('T2.1.3: Submitting incorrect password shows login failure message', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('asd838');
    await page.getByTestId('login-password-input').fill('wrong_password');
    await page.getByTestId('login-submit-btn').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('error' || 'неверный' || 'invalid' || 'failed');
  });

  test('T2.1.4: Submitting non-existent user shows login failure message', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('non_existent_student');
    await page.getByTestId('login-password-input').fill('some_password');
    await page.getByTestId('login-submit-btn').click();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).toContain('error' || 'неверный' || 'invalid' || 'failed');
  });

  test('T2.1.5: Username field handles special characters gracefully', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('user!@#Name$%^&*()_+{}|:"<>?`-=[]\\;\',./');
    await page.getByTestId('login-password-input').fill('some_password');
    await page.getByTestId('login-submit-btn').click();
    const usernameVal = await page.getByTestId('login-username-input').inputValue();
    expect(usernameVal).toBe('user!@#Name$%^&*()_+{}|:"<>?`-=[]\\;\',./');
  });
});

test.describe('Authenticated Roles & Persistence - Feature 2 Boundary & Corner Cases - Tier 2', () => {
  test('T2.2.1: Direct access to Dashboard without auth redirects to Login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('subject-chemistry-btn')).not.toBeVisible();
  });

  test('T2.2.2: Direct access to Admin panel as Student redirects to Dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
    await expect(page.getByTestId('admin-panel-btn')).not.toBeVisible();
  });

  test('T2.2.3: Clearing localStorage session forces logout on page reload', async ({ page }) => {
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('init_done')) {
        window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
        window.sessionStorage.setItem('init_done', 'true');
      }
    });
    await page.goto('/');
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();

    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(page.getByTestId('subject-chemistry-btn')).not.toBeVisible();
  });

  test('T2.2.4: Clicking browser Back button after logout does not re-authenticate', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
    await expect(page.getByTestId('logout-btn')).toBeVisible();
    await page.getByTestId('logout-btn').click();
    await expect(page.getByTestId('login-username-input')).toBeVisible();

    await page.goBack();
    await expect(page.getByTestId('subject-chemistry-btn')).not.toBeVisible();
  });

  test('T2.2.5: Invalid session tokens in localStorage are cleared upon app mount', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', '{invalid-json}');
    });
    await page.goto('/');
    const userVal = await page.evaluate(() => window.localStorage.getItem('user'));
    expect(userVal).not.toBe('{invalid-json}');
  });
});

test.describe('Cross-Feature Combinations & Real-World Scenarios', () => {
  test('T3.4: Admin registers Student B -> Student B logins -> theme is inherited or default', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'asd838', role: 'admin' }));
      window.localStorage.setItem('theme', 'dark');
    });
    await page.goto('/');
    await page.getByTestId('admin-panel-btn').click();
    await page.getByTestId('new-student-username').fill('studentB');
    await page.getByTestId('new-student-password').fill('pass123B');
    await page.getByTestId('create-student-submit').click();

    await page.getByTestId('logout-btn').click();

    await page.getByTestId('login-username-input').fill('studentB');
    await page.getByTestId('login-password-input').fill('pass123B');
    await page.getByTestId('login-submit-btn').click();

    const theme = await page.evaluate(() => window.localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('T3.9: Admin deletes student -> deleted student\'s active session is terminated/invalidated', async ({ page }) => {
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('init_done')) {
        window.localStorage.setItem('user', JSON.stringify({ username: 'studentA', role: 'student' }));
        window.localStorage.setItem('users', JSON.stringify([
          { username: 'studentA', password: 'password123', role: 'student' }
        ]));
        window.sessionStorage.setItem('init_done', 'true');
      }
    });
    await page.goto('/');
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();

    await page.evaluate(() => {
      window.localStorage.setItem('users', '[]');
    });
    await page.reload();
    await expect(page.getByTestId('subject-chemistry-btn')).not.toBeVisible();
  });

  test('T4.5: Multi-Student Sandbox Isolation', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('users', JSON.stringify([
        { username: 'studentA', password: 'password123', role: 'student' },
        { username: 'studentB', password: 'password123', role: 'student' }
      ]));
      window.localStorage.setItem('scores', JSON.stringify({
        'studentA': {
          'lesson_1': { score: 80, maxScore: 100, passed: true, timestamp: new Date().toISOString() }
        }
      }));
    });
    await page.goto('/');
    await page.getByTestId('welcome-next-btn').click();
    await page.getByTestId('login-username-input').fill('studentB');
    await page.getByTestId('login-password-input').fill('password123');
    await page.getByTestId('login-submit-btn').click();

    await page.getByTestId('subject-chemistry-btn').click();
    await page.getByTestId('lesson-item-1').click();

    const quizScore = page.getByTestId('quiz-score');
    await expect(quizScore).not.toBeVisible();
  });
});
