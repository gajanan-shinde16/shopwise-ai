# ShopWise AI

ShopWise AI is a full-stack e-commerce web application featuring an autonomous, tool-calling Agentic AI shopping assistant. Rather than functioning as a standard text-generation chatbot or passive retrieval system, the assistant utilizes a ReAct (Reasoning + Acting) loop powered by LangGraph and OpenAI (`gpt-4o-mini`). It autonomously selects and executes database tools to search products, apply multi-criteria filters, evaluate user reviews, compare technical specifications, and verify inventory in real time.

---

## Architecture Overview

ShopWise AI is designed as a decoupled, three-tier architecture:

```
[ Client: React + Vite + Tailwind CSS ]
                   │
                   ▼ (REST API / JWT Bearer)
[ Server: Node.js + Express 5 (ES Modules) ]
       │                                │
       ▼                                ▼
[ Database: MySQL 8.0 ]    [ Agentic AI: LangGraph + OpenAI ]
(Connection Pool / SSL)       ├── Tool: searchProducts
                              ├── Tool: filterProducts
                              ├── Tool: compareProducts
                              ├── Tool: getProductReviews
                              └── Tool: checkStock
```

---

## Core Features

### 1. Agentic AI Shopping Assistant
- **ReAct Decision Loop**: Implemented with LangGraph's `createReactAgent`. The agent reasons over user prompts, dynamically calls internal database tools, evaluates returned data, and iterates until it forms a substantiated recommendation.
- **5 Deterministic Database Tools**:
  - `searchProducts`: Keyword search across names, brands, and product descriptions.
  - `filterProducts`: Multi-parameter filtering by category, price bounds, brand, and minimum user rating.
  - `compareProducts`: Multi-product specification lookup for side-by-side trade-off analysis.
  - `getProductReviews`: Real customer review retrieval to validate product feedback.
  - `checkStock`: Live inventory checks ensuring recommended items are in stock.
- **Deterministic Parameter Extraction**: All tool inputs are strictly validated using `Zod` schemas.
- **Safety Guardrails**: Strict system-level prompt boundaries enforcing shopping-only interactions and rejecting off-topic prompts (such as programming questions or general trivia).
- **Tool Transparency**: The interface renders the exact tool calls executed during reasoning for complete explainability.
- **Interactive Product Cards**: Backend extracts product entities identified during tool calls, returning structured card data (image, price, rating, stock) that links directly to product detail pages.
- **Session Persistence**: Active chat conversations persist across page navigation and reloads via browser `sessionStorage`, with a one-click reset option.

### 2. E-Commerce Catalog & Product Browsing
- **Product Catalog**: Server-side pagination, sorting (price low-to-high, high-to-low, rating, newest), and category filtering.
- **Combined Search**: Manual catalog search bar integrating real-time keyword matching with active filter criteria.
- **Product Details**: Comprehensive view displaying dynamic specifications (parsed from native MySQL JSON attributes) and verified user reviews.

### 3. User Authentication & Personalization
- **Stateless Authentication**: JSON Web Tokens (JWT) with password hashing using `bcryptjs` (10 salt rounds).
- **Wishlist**: Allows authenticated users to save products from cards or detail views, backed by atomic database constraints (`UNIQUE KEY (user_id, product_id)`).
- **Search History**: Automatically logs both catalog search queries and natural-language AI interactions with timestamps. Provides quick re-search and deletion capabilities.

---

## Technology Stack

### Frontend
- **Framework**: React 19, Vite
- **Routing**: React Router 7 (Object-based route tree with protected routes)
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios (configured with request interceptors for JWT injection)
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (v20+ / v22 LTS), ES Modules
- **Framework**: Express 5
- **Agentic Framework**: `@langchain/langgraph/prebuilt`, `@langchain/openai`, `@langchain/core`
- **Schema Validation**: Zod
- **Database Driver**: `mysql2/promise` with connection pooling
- **Authentication**: `jsonwebtoken`, `bcryptjs`

### Database
- **Engine**: MySQL 8.0
- **Tables**: `users`, `products`, `reviews`, `wishlist`, `search_history`
- **Schema Highlights**: Native `JSON` column for product specifications, foreign keys with `ON DELETE CASCADE`.

### Deployment & Infrastructure
- **Frontend Hosting**: Vercel (Global Edge Network, SPA rewrites)
- **Backend Hosting**: Azure App Service (Linux, Node 22 LTS)
- **Database Hosting**: Azure Database for MySQL Flexible Server (SSL enforced)
- **CI/CD**: GitHub Actions (automated push-to-deploy workflow)

---

## Database Schema

```
USERS
  ├── id (PK, INT AUTO_INCREMENT)
  ├── name (VARCHAR)
  ├── email (VARCHAR, UNIQUE)
  ├── password (VARCHAR, bcrypt hash)
  └── created_at (TIMESTAMP)

PRODUCTS
  ├── id (PK, INT AUTO_INCREMENT)
  ├── name (VARCHAR)
  ├── category (VARCHAR)
  ├── brand (VARCHAR)
  ├── price (DECIMAL)
  ├── description (TEXT)
  ├── specifications (JSON)
  ├── rating (DECIMAL)
  ├── stock (INT)
  ├── image_url (VARCHAR)
  └── created_at (TIMESTAMP)

REVIEWS
  ├── id (PK, INT AUTO_INCREMENT)
  ├── user_id (FK -> users.id, ON DELETE CASCADE)
  ├── product_id (FK -> products.id, ON DELETE CASCADE)
  ├── rating (INT)
  ├── comment (TEXT)
  └── created_at (TIMESTAMP)

WISHLIST
  ├── id (PK, INT AUTO_INCREMENT)
  ├── user_id (FK -> users.id, ON DELETE CASCADE)
  ├── product_id (FK -> products.id, ON DELETE CASCADE)
  ├── created_at (TIMESTAMP)
  └── UNIQUE KEY (user_id, product_id)

SEARCH_HISTORY
  ├── id (PK, INT AUTO_INCREMENT)
  ├── user_id (FK -> users.id, ON DELETE CASCADE)
  ├── query (VARCHAR)
  └── created_at (TIMESTAMP)
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user account
- `POST /api/auth/login` — Authenticate and receive JWT
- `GET /api/auth/me` — Retrieve current authenticated user profile *(Protected)*

### Products
- `GET /api/products` — Retrieve paginated products with query filters (`q`, `category`, `brand`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`)
- `GET /api/products/search?q=:query` — Keyword search across products
- `GET /api/products/categories` — Get distinct categories
- `GET /api/products/:id` — Get single product details

### Reviews
- `GET /api/reviews/product/:productId` — Get all reviews for a product
- `POST /api/reviews` — Submit a review *(Protected)*

### Wishlist
- `GET /api/wishlist` — Get user's saved wishlist items *(Protected)*
- `POST /api/wishlist` — Add product to wishlist *(Protected)*
- `DELETE /api/wishlist/:productId` — Remove product from wishlist *(Protected)*

### Search History
- `GET /api/search-history` — Get user's past searches *(Protected)*
- `POST /api/search-history` — Record a search query *(Protected)*
- `DELETE /api/search-history/:id` — Delete a single history entry *(Protected)*
- `DELETE /api/search-history` — Clear all search history *(Protected)*

### AI Assistant
- `POST /api/ai/chat` — Send query to the ReAct shopping agent *(Protected)*

---

## Local Development Setup

### Prerequisites
- Node.js (v20 or v22 LTS)
- MySQL Server (v8.0+)
- OpenAI API Key

### 1. Clone Repository
```bash
git clone https://github.com/gajanan-shinde16/shopwise-ai.git
cd shopwise-ai
```

### 2. Database Setup
Log in to MySQL and run:
```sql
SOURCE server/db/schema.sql;
SOURCE server/db/seed.sql;
```

### 3. Server Configuration
Create `server/.env`:
```env
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=shopwise
DB_SSL=false
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Install dependencies and start the backend:
```bash
cd server
npm install
npm run dev
```

### 4. Client Configuration
Install dependencies and run the client:
```bash
cd ../client
npm install
npm run dev
```

The application will run locally at `http://localhost:5173`.

---

## Future Roadmap

- **Multimodal Search**: Allow users to upload photos of items to search for visually similar products in the catalog.
- **Price Alert Automation**: Background worker to notify users when items in their wishlist drop in price.
