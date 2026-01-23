# Лабораторна робота №7 — Перформанс

Дата: 31.12.2025  
Проєкт: animelist-api-nodejs (REST API)

---

## 1) Lighthouse / Web Vitals

Проєкт є REST API без frontend, тому Lighthouse/Web Vitals не застосовуються.
Фокус зроблено на навантаженні API, CPU/RAM профілюванні та БД аналізі.

---

## 2) Навантажувальний тест (Load testing)

### Інструмент
- autocannon

### Сценарії (типові для сервісу)
1) GET `/health`
2) GET `/anime` (отримання списку)



LOADTEST_URL=http://localhost:3000 npm run loadtest

) Результати навантаження (локально)
HEALTH (50 connections, 10s)

requests total: 132914

avg rps: 13291.20

avg latency: 3.22 ms

p99 latency: 6 ms

errors: 0

GET /anime (30 connections, 15s)

requests total: 17325

avg rps: 1155.00

avg latency: 25.45 ms

p99 latency: 44 ms

errors: 0

Висновок:

/health витримує дуже велике навантаження з малою затримкою

/anime значно важчий через роботу з БД, але стабільно працює

RAM usage

Для швидкого заміру під навантаженням використовувався process.memoryUsage() (можна логувати раз в 1-2 сек).

При навантаженні:

RAM стабільна, без явного росту (ознака відсутності memory leak)

Аналіз запитів до БД
   Метод

У Postgres можна дивитись повільні/часті запити через:

pg_stat_statements (за умови ввімкнення)

логування slow queries

EXPLAIN ANALYZE для окремих запитів

Типові запити

SELECT list anime

SELECT reviews

INSERT / UPDATE / DELETE list entries

Вузьке місце:

ендпоінти що роблять SELECT + COUNT можуть бути дорожчими

вирішується індексами та оптимізацією запитів (при рості даних)