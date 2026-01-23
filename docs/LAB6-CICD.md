# Лабораторна робота №6 — CI/CD (GitHub Actions + Render)

Дата: 17.12.2025  
Проєкт: animelist-api-nodejs (Node.js + TypeScript + Prisma + PostgreSQL)

---

## 1) CI (Continuous Integration)

### Вимоги
При створенні PR або push в гілки `dev` / `main` виконуються перевірки:
- форматування коду (Prettier)
- перевірка стилю (ESLint)
- збірка TypeScript (build)
- тести (Jest)
- перевірка міграцій Prisma на тестовій БД (PostgreSQL service)

### Реалізація
CI реалізовано через GitHub Actions:
- файл: `.github/workflows/ci.yml`
- тригери:
    - `pull_request` → main/dev
    - `push` → main/dev
- у workflow підіймається `postgres:16`
- виконується:
    1) `npm ci`
    2) `npx prisma generate`
    3) `npx prisma migrate deploy`
    4) `npm run format:check`
    5) `npm run lint`
    6) `npm run build`
    7) `npm test`

---

## 2) Merge тільки якщо CI 

Налаштування через GitHub Branch Protection:
- Settings → Branches → Branch protection rules
- Для гілки `main` включено:
   Require a pull request before merging  
   Require status checks to pass before merging  
   Обов’язковий чек: `Lint + Build + Tests`

Таким чином PR **не можна замерджити**, якщо CI падає.

---

## 3) CD (Continuous Deployment)

### Вимога
При оновленні гілки `main` нова версія сервісу повинна автоматично деплоїтись на staging/production.

### Реалізація на Render
CD налаштовано через Render (Auto Deploy):
- Render Web Service прив’язано до репозиторію GitHub
- Branch: `main`
- Auto Deploy: ON
- Build Command:
  `npm ci && npm run build && npx prisma generate`
- Start Command:
  `npm run start`

Після merge у `main` Render **автоматично** збирає та деплоїть нову версію.

---

## 4) Доступність з інтернету

Сервіс доступний за публічним URL Render:
- https://animelist-api-nodejs.onrender.com

Приклад endpoint:
- GET `/health`
- GET `/anime`

---

## 5) Важливий момент про DATABASE_URL на Render

На Render використовується **Render Postgres URL** (Internal Database URL).

У налаштуваннях сервісу Render встановлено:
- `DATABASE_URL` = Internal Database URL (НЕ localhost)

Це вирішує помилку:
`P1001: Can't reach database server at localhost:5432`
