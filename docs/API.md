# Animelist API — REST API Specification

Документація REST API для сервісу типу MyAnimeList / Shikimori.
API реалізовано на Node.js + TypeScript.

## Загальна інформація

Base URL: http://localhost:3000

Формат даних: application/json

Тип API: REST

Аутентифікація: (на поточному етапі не реалізована)

Версія: v1

## Загальні правила

### 1.1. Формат відповідей

Всі відповіді API повертаються у форматі JSON.

### 1.2. Формат помилок

```
{
"error": "validation_error",
"message": "Validation failed",
"details": [
{
"field": "title",
"issue": "required"
}
]
}
```

### 1.3. HTTP статуси

| Код | Опис                      |
| --- | ------------------------- |
| 200 | Успішний запит            |
| 201 | Створено                  |
| 204 | Успішно, без тіла         |
| 400 | Помилка валідації         |
| 404 | Не знайдено               |
| 409 | Конфлікт                  |
| 500 | Внутрішня помилка сервера |

## Health Check

### 2.1 Перевірка роботи сервера

```
GET /health
```

Response

```
{
  "status": "OK",
  "message": "Animelist API is running"
}
```

## 3. Aніме

### 3.1 Отримати список аніме

Query parameters:

| Назва  | Тип    | Опис                  |
| ------ | ------ | --------------------- |
| page   | number | номер сторінки        |
| limit  | number | кількість елементів   |
| q      | string | пошук по назві        |
| year   | number | рік                   |
| status | string | ongoing / finished    |
| sort   | string | rating / year / title |

```
GET /anime
```

#### Response 200

```
{
  "items": [
    {
      "id": "uuid",
      "title": "Naruto",
      "status": "finished",
      "year": 2002,
      "avgRating": 8.6
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

## 3.2 Отримати аніме за ID

```
GET /anime/:id
```

```
{
  "id": "uuid",
  "title": "Naruto",
  "titleEn": "Naruto",
  "titleJp": "ナルト",
  "synopsis": "Short description",
  "status": "finished",
  "year": 2002,
  "season": "fall",
  "ageRating": "PG-13",
  "posterUrl": "https://..."
}
```

### 3.3 Створити аніме

```
POST /anime
```

Response 201

```
{
  "id": "uuid",
  "message": "Anime created"
}
```

```
{
  "title": "Naruto",
  "titleEn": "Naruto",
  "titleJp": "ナルト",
  "synopsis": "Short description",
  "status": "finished",
  "year": 2002,
  "season": "fall",
  "ageRating": "PG-13",
  "posterUrl": "https://..."
}
```

### 3.4 Оновити аніме

```
PATCH /anime/:id
```

Response 201

```
{
  "synopsis": "Updated description",
  "posterUrl": "https://new-image"
}
```

3.5 Видалити аніме

```
DELETE /anime/:id
```

Response 204

### 4.Reviews

## 4.1 Отримати відгуки до аніме

```
GET /anime/:id/reviews
```

```
{
"items": [
{
"id": "uuid",
"userId": "uuid",
"rating": 9,
"text": "Great anime!",
"createdAt": "2025-10-22T12:00:00Z"
}
]
}
```

### 4.2 Додати відгук

```
POST /anime/:id/reviews
```

```
{
"rating": 9,
"text": "Great anime!"
}
```

Один користувач може залишити лише один відгук для одного аніме.

## 5. User Anime List (My List)

### 5.1 Отримати список користувача

```
GET /me/list
```

```
{
  "items": [
    {
      "id": "uuid",
      "animeId": "uuid",
      "status": "watching",
      "score": 8,
      "episodesWatched": 12
    }
  ]
}
```

### 5.2 Додати аніме до списку

```
POST /me/list
```

```
{
  "animeId": "uuid",
  "status": "planned"
}
```

### 5.3 Оновити запис

```
PATCH /me/list/:entryId
```

```
{
"status": "completed",
"score": 9,
"episodesWatched": 24
}
```

### 5.4 Видалити зі списку

```
DELETE /me/list/:entryId
```

## 6. Статуси

### Статус аніме

ongoing

finished

Статус у списку користувача

planned

watching

completed

dropped

on_hold

## 7. Примітки

API реалізовано для навчальних цілей.

Аутентифікація буде додана на наступних етапах.

Дані можуть зберігатись у памʼяті або БД (PostgreSQL).

Структура відповідає ER-діаграмі.
