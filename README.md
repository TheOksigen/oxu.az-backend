# Oxu.az Backend

Express + MongoDB backend for news, categories, admin auth and S3 image uploads.

## Run

```bash
bun install
bun run dev
```

Required `.env` values:

```env
PORT=3000
MONGO_URI=
JWT_TOKEN=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

## API Docs

Scalar API reference:

```text
GET /docs
```

OpenAPI JSON:

```text
GET /openapi.json
```

## Auth

Protected endpoints require:

```http
Authorization: Bearer <token>
```

### Login

```http
POST /login
Content-Type: application/json
```

```json
{
  "login": "admin",
  "password": "password"
}
```

### Register Admin

```http
POST /register
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "login": "admin",
  "password": "password"
}
```

### Verify Token

```http
GET /verify
Authorization: Bearer <token>
```

## News

### List News

```http
GET /news?page=1&limit=10&sort=newest
```

Query params:

- `page`: default `1`
- `limit`: default `10`, max `50`
- `search`: searches `title` and `description`
- `category_id`: filters by category id
- `sort`: `newest`, `oldest`, `most_viewed`, `most_liked`

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

Legacy pagination endpoint still works:

```http
GET /news_page/1?limit=10
```

### Search News

```http
GET /news/search?title=test&page=1&limit=10
```

### News By Category

```http
GET /news_by_categ/:id?page=1&limit=10
```

### Most Viewed News

```http
GET /news_viewed?limit=10
```

### Get News By ID

```http
GET /news/:id
```

### Create News

```http
POST /news
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "img": "https://example.com/image.jpg",
  "title": "News title",
  "description": "News description",
  "category_id": "665f0f1b8f4f3c0012b34567"
}
```

### Update News

```http
PATCH /news/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### Delete News

```http
DELETE /news/:id
Authorization: Bearer <token>
```

### Counters

```http
PATCH /news_like/:id
PATCH /news_dislike/:id
PATCH /news_view/:id
```

## Categories

```http
GET /categories
```

```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Siyaset"
}
```

```http
DELETE /categories/:id
Authorization: Bearer <token>
```

## Images

```http
POST /img
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Form field:

```text
img
```

```http
DELETE /img/:filename
Authorization: Bearer <token>
```
