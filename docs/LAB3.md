# Лабораторна робота №3
## Реалізація основних сценаріїв зі статичними даними (без БД)

### Мета
Імплементувати ключові сценарії сервісу Animelist API, використовуючи статичні дані (in-memory),
без підключення бази даних.

### Реалізація
Дані зберігаються у масивах в пам’яті:
- src/modules/anime/anime.store.ts
- src/modules/list/list.store.ts
- src/modules/reviews/reviews.store.ts

Після перезапуску сервера дані скидаються (це нормально для навчальної ЛР3).

### Реалізовані ендпоінти
**Anime**
- GET /anime
- GET /anime/:id
- POST /anime
- PATCH /anime/:id
- DELETE /anime/:id

**Reviews**
- GET /anime/:id/reviews
- POST /anime/:id/reviews

**My List**
- GET /me/list
- POST /me/list
- PATCH /me/list/:entryId
- DELETE /me/list/:entryId

### Основні сценарії використання

#### Сценарій 1: Каталог аніме
1) GET /anime
2) POST /anime (створення аніме)
3) GET /anime/:id (перегляд деталей)

#### Сценарій 2: Мій список
1) POST /me/list (додати в список)
2) PATCH /me/list/:entryId (оновити статус/прогрес/score)
3) GET /me/list (перегляд)
4) DELETE /me/list/:entryId (видалити)

#### Сценарій 3: Відгуки
1) POST /anime/:id/reviews (додати review)
2) GET /anime/:id/reviews (перегляд)
### Перевірка роботи API

Було протестовано наступні запити:
- GET /anime
- POST /anime
- POST /anime/:id/reviews
- GET /anime/:id/reviews

Запити виконуються успішно, дані зберігаються в памʼяті сервера.

### Висновок
Було реалізовано основні сценарії Animelist API зі статичними даними без підключення до БД.
Проєкт готовий для наступного етапу — підключення PostgreSQL та ORM (Prisma).