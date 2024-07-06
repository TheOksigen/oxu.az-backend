To document your API endpoints in Postman for the provided Express.js routes, you can create a collection with detailed requests and responses. Here’s how you can document each endpoint effectively:
## [DOCS](https://www.notion.so/Oxu-az-backend-api-docs-8c8e5b796cac48cb9164d0b19a205cf0)

[**https://oxuaz.yetim.me](https://oxuaz.yetim.me/news) — link**

### FrontEnd Documentation

### 1. **Register New Admin**

- **Endpoint:** POST `/register`
- **Description:** Registers a new admin user.
- **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}` (if using JWT for authentication) !!!!!!
- **Body:**
    
    ```json
    {
      "login": "admin@example.com",
      "password": "adminpassword"
    }
    
    ```
    
- **Expected Response:**
    
    ```json
    {
      "id": "admin_id",
      "login": "admin@example.com",
      "status": true,
      "token": "generated_jwt_token"
    }
    
    ```
    
- **Error Responses:**
    - `400 Bad Request`
        
        ```json
        {
          "error": "Login address already exists",
          "status": false
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "error": "Internal server error",
          "status": false
        }
        
        ```
        

### 2. **Admin Login**

- **Endpoint:** POST `/login`
- **Description:** Logs in an admin user.
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    
    ```json
    {  
       "login": "david123",  
       "password": "1234"
    }
    ```
    
- **Expected Response:**
    
    ```json
    {
      "id": "admin_id",
      "login": "admin@example.com",
      "status": true,
      "token": "generated_jwt_token"
    }
    
    ```
    
- **Error Responses:**
    - `401 Unauthorized`
        
        ```json
        {
          "error": "Incorrect login or password",
          "status": false
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "error": "Internal server error",
          "status": false
        }
        
        ```
        

---

---

## News

### 1. **Create News**

- **Endpoint:** POST `/news`
- **Description:** Creates a new news item.
- **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}` (if using JWT for authentication)
- **Body:**
    
    ```json
    {
      "img": "URL_to_image", // base64 elemeyin ele oxuaz saytindan linki goturun
      "title": "News Title",
      "description": "News Description",
      "category_id": "category_id"  // MongoDB ObjectId of the category
    }
    
    ```
    
- **Expected Response:**
    
    ```json
    {
      "message": "News Created successfully",
      "newNews": {
        // Newly created news item object
      }
    }
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "News Created has not succses",
          "error": {}
        }
        
        ```
        

### 2. **Get Paginated News**

- **Endpoint:** GET `/news_page/:page`
- **Description:** Retrieves paginated news items. limit 10
- **Parameters:**
    - `page: integer` (e.g., `/news/1` for the first page)
- **Expected Response:**
    
    ```json
    [
      // Array of news items
    ]
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "News not found",
          "error": {}
        }
        
        ```
        

### 3. **Get All News**

- **Endpoint:** GET `/news`
- **Description:** Retrieves all news items. limit no
- **Expected Response:**
    
    ```json
    [
      // Array of news items 
      // isletmeyi meslehet gormurem
    ]
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "News not found",
          "error": {}
        }
        
        ```
        

### 4. **Get News by ID**

- **Endpoint:** GET `/news/:id`
- **Description:** Retrieves a news item by its ID.
- **Parameters:**
    - `id: string` (e.g., `/news/615b62f3e820731ec49283d1`)
- **Expected Response:**
    
    ```json
    {
      // Single news item object
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "news its not available",
          "error": {}
        }
        
        ```
        

### 5. **Like News**

- **Endpoint:** PATCH `/news_like/:id`
- **Description:** Increments the like count of a news item by its ID.
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    {
      // Updated news item object with incremented like count
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "News not found"
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Internal server error",
          "error": {}
        }
        
        ```
        

### 6. **Dislike News**

- **Endpoint:** PATCH `/news_dislike/:id`
- **Description:** Increments the dislike count of a news item by its ID.
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    {
      // Updated news item object with incremented dislike count
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "News not found"
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Internal server error",
          "error": {}
        }
        
        ```
        

### 7. **Delete News**

- **Endpoint:** DELETE `/news/:id`
- **Description:** Deletes a news item by its ID.
- `Authorization: Bearer {{token}}` (if using JWT for authentication)
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    {
      "message": "News deleted successfully"
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "News not found"
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Failed to delete news",
          "error": {}
        }
        
        ```
        

### 8. **Get News by Category ID**

- **Endpoint:** GET `/news_by_categ/:id`
- **Description:** Retrieves news items belonging to a specific category.
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    [
      // Array of news items
    ]
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Internal server error",
          "error": {}
        }
        
        ```
        

### 9. Views **News**

- **Endpoint:** PATCH `/news_view/:id`
- **Description:** Retrieves news items belonging to a specific category.
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    {
      // Updated news item object with incremented dislike count
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "News not found"
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Internal server error",
          "error": {}
        }
        
        ```
        

### 4. **Get News by ID**

- **Endpoint:** GET `/news_viewed`
- **Description:** Geting most viewsed news, limit 10
- **Expected Response:**
    
    ```json
    {
      //  news items arraylar 
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "Server Error",
          "error": {}
        }
        
        ```
        

---

---

## **Category**

### 1. **Create Category**

- **Endpoint:** POST `/categories`
- **Description:** Creates a new category.
- **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}` (if using JWT for authentication)
- **Body:**
    
    ```json
    {
      "name": "Category Name"
    }
    
    ```
    
- **Expected Response:**
    
    ```json
    {
      "message": "Category created",
      "newcategories": {
        // Newly created category object
      }
    }
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Category not created",
          "error": {}
        }
        
        ```
        

### 2. **Get All Categories**

- **Endpoint:** GET `/categories`
- **Description:** Retrieves all categories.
- **Expected Response:**
    
    ```json
    [
      // Array of category objects
    ]
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Categories not found",
          "error": {}
        }
        
        ```
        

### 3. **Delete Categories**

- **Endpoint:** DELETE `/categories/:id`
- **Description:** Deletes a categories item by its ID.
- `Authorization: Bearer {{token}}` (if using JWT for authentication)
- **Parameters:**
    - `id: string`
- **Expected Response:**
    
    ```json
    {
      "message": "Categories deleted successfully"
    }
    
    ```
    
- **Error Responses:**
    - `404 Not Found`
        
        ```json
        {
          "message": "Categories not found"
        }
        
        ```
        
    - `500 Internal Server Error`
        
        ```json
        {
          "message": "Failed to delete news",
          "error": {}
        }
        
        ```
        

### filmin sonu
