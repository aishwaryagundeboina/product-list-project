# Product Listing and Shopping Cart

Full-stack application built with:
- **Frontend:** React.js, Vite, Axios
- **Backend:** Java Spring Boot, Spring Data JPA, Hibernate, Validation
- **Database:** MySQL

## Project Structure

```
product-listing-shopping-cart/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── CartItem.jsx
│   │   ├── services/
│   │   │   └── productService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   └── package.json
├── backend/
│   ├── src/main/java/com/productcart/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   ├── dto/
│   │   └── BackendApplication.java
│   └── pom.xml
└── database/
    └── schema.sql
```

## Running the Application

### 1. Database
Import and run `database/schema.sql` in MySQL.

### 2. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Runs at `http://localhost:8080`.

### 3. Frontend (React.js)
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:3000`.
