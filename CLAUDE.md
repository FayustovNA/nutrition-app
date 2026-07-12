# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. Что это за проект

Nutrition-app — веб-клиент для клиентов и тренеров фитнес/нутрициологического сервиса (blackfoxnutrition.ru). Позволяет пользователю логиниться, вести дневник питания, смотреть статистику веса/КБЖУ, пользоваться калькуляторами, а тренер/админ управляет клиентами через отдельную админ-панель.

## 2. Стек и ключевые зависимости

- **Vite + React 18 + TypeScript** (`tsc && vite build`)
- **Redux Toolkit + react-redux** — глобальное состояние (`src/services`)
- **React Router v6** — роутинг, включая приватные и role-based маршруты
- **MUI (`@mui/material`, `@mui/x-data-grid`) + styled-components + emotion** — UI (несколько UI-систем одновременно, см. раздел 6)
- **apexcharts / react-apexcharts** — графики статистики
- **axios** и собственный `apiRequest` (`src/api/utils.ts`) — HTTP-запросы к бэкенду
- **openai** — используется для GPT-функциональности (`src/api/gpt.ts`)
- **swiper / react-slick / slick-carousel / react-spring-carousel** — карусели (несколько библиотек-дублей, см. раздел 6)
- Next.js указан в зависимостях, но фактически приложение — Vite SPA (не App Router), не полагайся на файловый роутинг Next.

## 3. Структура папок

```
src/
  api/            # запросы к бэкенду по доменам: admin, auth, bodystats, fatsecret, gpt, userstats
  services/
    slices/       # redux-toolkit слайсы (user, register, project, userStats, bodyStats, adminPanel)
    auth/         # работа с access/refresh токенами (authService.ts)
    store.ts, root-reducer.ts, hooks.ts
  protect/        # PrivateRoute (по isLoggedIn) и RoleBasedRoute (по роли)
  pages/          # по одной директории на страницу-маршрут (main, login, sign-up, stats, clients, adminpanel, ...)
  components/     # переиспользуемые блоки/панели/графики
  ui/             # низкоуровневые UI-примитивы (button, checkbox, inputs)
  hooks/, utils/  # общие хуки и утилиты (utils/config.ts — BASE_URL API)
  fonts/, images/, videos/, assets/ — статика
app.tsx, main.tsx # точка входа, здесь собраны Router + Redux Provider + маршруты
```

## 4. Команды

```bash
npm run dev       # dev-сервер Vite
npm run build      # tsc (проверка типов) + vite build → dist/
npm run preview    # предпросмотр собранного билда (то же, что start)
npm run lint        # eslint . --ext ts,tsx --max-warnings 0
npm run deploy      # build + публикация dist/ на gh-pages
```

Тестов и test runner в проекте нет (нет jest/vitest, нет `*.test.*`/`*.spec.*` файлов). Если добавляешь тесты — сначала спроси, какой раннер предпочтителен, конфигурации под них пока нет.

Docker: `docker-compose up` собирает контейнер по `Dockerfile` (клонирует репозиторий внутри образа, слушает 80/4173) — актуально в основном для деплоя, для локальной разработки обычно достаточно `npm run dev`.

## 5. Конфиги и env

- `.env.local` — единственный env-файл, содержит `VITE_OPENAI_API_KEY`. Не коммитить, не логировать значение.
- `vite.config.ts` — прокси `/api` → `http://www.blackfoxnutrition.ru` для локальной разработки, но реальный `BASE_URL` для прод-запросов захардкожен в `src/utils/config.ts` (`https://www.blackfoxnutrition.ru/api`), env-переменной не управляется.
- `.eslintrc.cjs` — правило `@typescript-eslint/no-explicit-any` выключено, остальное — дефолтные rules React/TS.
- `tsconfig.json` — strict-режим включён (`noUnusedLocals`, `noUnusedParameters` и т.д.), но `types` подключает и `next`, хотя Next.js фактически не используется.

## 6. Что можно менять свободно, а что — только по запросу

- Известные особенности кода, которые **не нужно "чинить" по своей инициативе**, если не попросили явно:
  - Дублирующиеся UI/карусель-библиотеки (MUI + styled-components + emotion; swiper + slick + spring-carousel) — исторически сложившийся стек, замена/унификация — отдельная задача с широким blast radius.
  - `BASE_URL` захардкожен, а не читается из env — трогать только если задача именно про конфигурацию окружений.
  - Названия некоторых файлов/страниц на кириллице (`сalculators`, компонент `Сalculators` с кириллической "С") — не переименовывать без запроса, это ломает импорты по всему проекту.
  - Комментарии и часть UI-текста в коде — на русском, это нормальный стиль проекта, не переводи их автоматически.
- Не добавляй тестовую инфраструктуру (jest/vitest/RTL) без запроса — её выбор явно не зафиксирован.
- Не меняй `Dockerfile`/`docker-compose.yml`/деплой (`npm run deploy` на gh-pages) без явного запроса — это влияет на прод-раскатку.
- TODO: нет информации о бэкенд-репозитории/API-контрактах — при работе с `src/api/*` ориентируйся на фактические запросы в коде, а не на документацию (её нет в репозитории).

## 7. Стиль работы

Перед изменениями: сначала разберись, как затрагиваемая фича работает сейчас (slice → api → component → page), затем предложи план изменений, и только после согласования — вноси правки. Особенно важно для роутинга (`app.tsx`) и стора (`root-reducer.ts`), так как там много неявных связей между страницами, ролями и токенами авторизации.
