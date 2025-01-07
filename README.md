<div align="center">
  <h1>Тестовое задание на должность Junior+ Node.js back-end разработчик</h1>
  <p>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
<img src="https://img.shields.io/badge/postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres"/>
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn"/>  
</p>
</div>

---

# Оглавление

1. [Введение](#введение)
   1. [Схема проброса данных](#схема-проброса-данных)
   1. [Файл .env](#файл-env)
   1. [Конфигурация Docker Compose](#конфигурация-docker-compose)
1. [Как запустить](#как-запустить)
---

# Бэкенд сервиса по приёму заявок обратной связи

Проект включает три контейнера на проде и два контейнера при разработке. Первый – для базы данных (PostgreSQL), один для Adminer (интерфейс для управления базой данных), и один для самого сервиса.

## Введение

### Схема проброса данных

<div align="center">

```mermaid
flowchart LR;
A(порты 80 и 443)-->|nginx|B(SERVER_PORT_EXTERNAL - внешний порт, например, порт 8080);
B-->|docker|C(SERVER_PORT_INTERNAL - внутренний порт, например, порт 3000);
```

</div>

### Файл `.env`

<details>
<summary>
Шаблон файла <b>.ENV</b>:
</summary>

Создайте файл `.env` в корневом каталоге проекта и добавьте следующие переменные окружения:

```plaintext
#Настройки сервера
SERVICE_NAME='' #string

HTTP_HOST='' #string
HTTP_PORT= #number 

JWT_SECRET='' #string

EXAMPLE_MESSAGE='Hello, world!' #string

#Настройки базы данных 
DATABASE_PORT_INTERNAL = #number #внутренний порт (порт в конетйнере) 
DATABASE_PORT_EXTERNAL = #number #внешний порт 

DATABASE_USER='postgres' 
DATABASE_HOST = '' #string (если проект разворачивается при помощи Dockerfile, то следует указать контейнер ('db'). Если проект разворачивается лишь засчёт docker-compose – следует указать 'localhost')
DATABASE_USERNAME = '' #string
DATABASE_PASSWORD = '' #string
DATABASE_NAME = '' #string
DATABASE_URL=postgresql://postgres:pass@localhost:5432/dev

#Настройки Adminer
ADMINER_PORT_INTERNAL =  #number
ADMINER_PORT_EXTERNAL =  #number
```

</details>

### Конфигурация Docker Compose

<details>
<summary>Шаблон файла  <b>docker-compose.yml</b>:</summary>
Создайте файл `docker-compose.yml` в корневом каталоге проекта и добавьте следующие переменные окружения:

```yaml
version: '3.8'
services:
  db_dev:
    container_name: '${SERVICE_NAME}-db'
    image: postgres:13
    restart: always
    environment:
      POSTGRES_DB: ${DATABASE_NAME}
      POSTGRES_USER: ${DATABASE_USERNAME}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    ports:
      - '${DATABASE_PORT_EXTERNAL}:${DATABASE_PORT_INTERNAL}'
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data # Хранение данных Postgres
      #- ./pg_data:/var/lib/postgresql/data/pgdata

  adminer:
    container_name: '${SERVICE_NAME}-adminer'
    image: adminer
    restart: always
    depends_on:
      - db_dev
    ports:
      - '${ADMINER_PORT_EXTERNAL}:${ADMINER_PORT_INTERNAL}'

volumes:
  postgres_data:
```

</details>

---

## Как запустить

Для запуска проекта выполните следующие шаги:

1. Ввести команду
    ```sh
    make run
    ```
    Это запустит контейнеры и сервер

1. Накатить миграции:
    ```sh
    будет дополнено
    ```

```mermaid
graph TD
    A[.env] -->|Загрузка переменных окружения| B[config.ts]
    B -->|Валидация конфигурации| C[Prisma Client]
    C -->|Настройка базы данных| D[Prisma Schema]
    D -->|Модели данных| E[User Repository]
    E -->|CRUD операции| F[Express Server]
    F -->|Маршруты API| G[Swagger Documentation]
    F -->|Маршруты API| H[JWT Authentication]
    F -->|Маршруты API| I[Logging]
    F -->|Запуск сервера| J[app.ts]
```