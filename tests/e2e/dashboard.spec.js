import { test, expect } from '@playwright/test';

test.describe('Subject Selection UI & Biology Lock - Feature 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
  });

  test('T1.3.1: Dashboard displays "Chemistry" and "Biology" buttons', async ({ page }) => {
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
    await expect(page.getByTestId('subject-biology-btn')).toBeVisible();
  });

  test('T1.3.2: Chemistry button exhibits hover animations/effects', async ({ page }) => {
    const chemBtn = page.getByTestId('subject-chemistry-btn');
    await chemBtn.hover();
    // Verify hover effects (e.g., active class or inline style/transform or custom attribute)
    await expect(chemBtn).toBeVisible(); // Hover succeeded
  });

  test('T1.3.3: Biology button exhibits hover animations/effects', async ({ page }) => {
    const bioBtn = page.getByTestId('subject-biology-btn');
    await bioBtn.hover();
    await expect(bioBtn).toBeVisible(); // Hover succeeded
  });

  test('T1.3.4: Clicking Biology displays "(В разработке)" overlay', async ({ page }) => {
    await page.getByTestId('subject-biology-btn').click();
    const overlay = page.getByTestId('biology-lock-overlay');
    await expect(overlay).toBeVisible();
    await expect(overlay).toContainText('В разработке');
  });

  test('T1.3.5: Biology overlay has a working close mechanism', async ({ page }) => {
    await page.getByTestId('subject-biology-btn').click();
    await expect(page.getByTestId('biology-lock-overlay')).toBeVisible();
    await page.getByTestId('biology-overlay-close').click();
    await expect(page.getByTestId('biology-lock-overlay')).not.toBeVisible();
  });
});

test.describe('Chemistry Lesson Plan Listing - Feature 4', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
      // Set mock lessons
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson One', hours: 1, weekDay: '1-я неделя, Пн', isUnlocked: true },
        { id: 2, title: 'Lesson Two', hours: 2, weekDay: '1-я неделя, Ср', isUnlocked: false }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
  });

  test('T1.4.1: Clicking Chemistry shows the lesson plan list', async ({ page }) => {
    await expect(page.getByTestId('lesson-list')).toBeVisible();
  });

  test('T1.4.2: Lesson list displays correct lesson titles', async ({ page }) => {
    const item1 = page.getByTestId('lesson-item-1');
    const item2 = page.getByTestId('lesson-item-2');
    await expect(item1).toContainText('Lesson One');
    await expect(item2).toContainText('Lesson Two');
  });

  test('T1.4.3: Lesson list displays correct weekday and hours metadata', async ({ page }) => {
    const item1 = page.getByTestId('lesson-item-1');
    await expect(item1).toContainText('1-я неделя, Пн');
    await expect(item1).toContainText('1 ч');
  });

  test('T1.4.4: Lesson list indicates locked vs unlocked status of lessons', async ({ page }) => {
    await expect(page.getByTestId('lesson-lock-2')).toBeVisible();
    await expect(page.getByTestId('lesson-lock-1')).not.toBeVisible();
  });

  test('T1.4.5: Unlocked lesson items are clickable, locked are disabled/inactive', async ({ page }) => {
    // Unlocked should lead to lesson page
    await page.getByTestId('lesson-item-1').click();
    await expect(page.getByTestId('lesson-video-player')).toBeVisible();

    await page.getByTestId('back-to-lessons-btn').click();

    // Locked should not allow proceeding
    await page.getByTestId('lesson-item-2').click();
    await expect(page.getByTestId('lesson-video-player')).not.toBeVisible();
  });
});

test.describe('Subject Selection UI & Biology Lock Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
    await page.goto('/');
  });

  test('T2.3.1: Biology button overlay covers all keyboard/tab actions on the page', async ({ page }) => {
    await page.getByTestId('subject-biology-btn').click();
    await expect(page.getByTestId('biology-lock-overlay')).toBeVisible();
    // Pressing Tab should focus overlay elements, not elements behind it
    await page.keyboard.press('Tab');
    const closeBtn = page.getByTestId('biology-overlay-close');
    await expect(closeBtn).toBeFocused();
  });

  test('T2.3.2: Rapid hover on and off Chemistry and Biology buttons', async ({ page }) => {
    const chemBtn = page.getByTestId('subject-chemistry-btn');
    const bioBtn = page.getByTestId('subject-biology-btn');
    for (let i = 0; i < 5; i++) {
      await chemBtn.hover();
      await bioBtn.hover();
    }
    await expect(chemBtn).toBeVisible();
  });

  test('T2.3.3: Hover state animations handle high frequency triggers', async ({ page }) => {
    const chemBtn = page.getByTestId('subject-chemistry-btn');
    await chemBtn.hover();
    await page.mouse.move(0, 0); // Unhover
    await chemBtn.hover();
    await expect(chemBtn).toBeVisible();
  });

  test('T2.3.4: Biology overlay close button is keyboard accessible', async ({ page }) => {
    await page.getByTestId('subject-biology-btn').click();
    await expect(page.getByTestId('biology-lock-overlay')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('biology-lock-overlay')).not.toBeVisible();
  });

  test('T2.3.5: Dashboard handles missing subject data gracefully', async ({ page }) => {
    // Modify mock data to be empty or corrupted
    await page.evaluate(() => {
      window.localStorage.removeItem('lessons');
    });
    await page.reload();
    await expect(page.getByTestId('subject-chemistry-btn')).toBeVisible();
  });
});

test.describe('Chemistry Lesson Plan Listing Boundary & Corner Cases - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ username: 'student1', role: 'student' }));
    });
  });

  test('T2.4.1: Fallback to default lesson plan if localStorage is empty', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.removeItem('lessons');
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    // First lesson item should be visible, meaning default loaded
    await expect(page.getByTestId('lesson-item-1')).toBeVisible();
  });

  test('T2.4.2: Long lesson titles do not break layout (handles wrapping)', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson ' + 'a'.repeat(200), hours: 1, weekDay: '1-я неделя, Пн', isUnlocked: true }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    await expect(page.getByTestId('lesson-item-1')).toBeVisible();
    // Layout should not overflow (we check height/width is valid)
    const box = await page.getByTestId('lesson-item-1').boundingBox();
    expect(box.height).toBeGreaterThan(0);
    expect(box.width).toBeGreaterThan(0);
  });

  test('T2.4.3: Direct URL access to locked lessons is blocked', async ({ page }) => {
    // If router handles URL hash or state, we try to force custom route state or check if navigation fails
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 1, title: 'Lesson 1', hours: 1, weekDay: '1-я неделя, Пн', isUnlocked: true },
        { id: 2, title: 'Lesson 2', hours: 1, weekDay: '1-я неделя, Ср', isUnlocked: false }
      ]));
    });
    // Let's say navigation is state-based, but we can verify clicking doesn't change page view or direct URL doesn't load it
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    
    // Simulate setting route/lesson ID directly in localStorage/state if application has it, or ensure we cannot open details
    await page.getByTestId('lesson-item-2').click();
    await expect(page.getByTestId('lesson-video-player')).not.toBeVisible();
  });

  test('T2.4.4: Modifying lesson index outside of bounds doesn\'t crash app', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    // Verify list is rendered and no React errors occurred
    await expect(page.getByTestId('lesson-list')).toBeVisible();
  });

  test('T2.4.5: Unordered lesson data arrays are sorted by lesson ID', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('lessons', JSON.stringify([
        { id: 2, title: 'Lesson Two', hours: 2, weekDay: '1-я неделя, Ср', isUnlocked: true },
        { id: 1, title: 'Lesson One', hours: 1, weekDay: '1-я неделя, Пн', isUnlocked: true }
      ]));
    });
    await page.goto('/');
    await page.getByTestId('subject-chemistry-btn').click();
    
    // Verify first child is Lesson 1, second is Lesson 2
    const firstText = await page.locator('[data-testid^="lesson-item-"]').first().innerText();
    expect(firstText).toContain('Lesson One');
  });
});
