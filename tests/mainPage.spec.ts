import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

const elements = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository link',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server link',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light button',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search (Ctrl+K) button',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    await expect
      .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
      .toHaveAttribute('href', '/');
    await expect
      .soft(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/docs/intro');
    await expect
      .soft(page.getByRole('link', { name: 'API' }))
      .toHaveAttribute('href', '/docs/api/class-playwright');
    await expect
      .soft(page.getByRole('link', { name: 'Community' }))
      .toHaveAttribute('href', '/community/welcome');
    await expect
      .soft(page.getByRole('link', { name: 'GitHub repository' }))
      .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect
      .soft(page.getByRole('link', { name: 'Discord server' }))
      .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
