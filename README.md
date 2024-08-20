To document your API endpoints in Postman for the provided Express.js routes, you can create a collection with detailed requests and responses. Here’s how you can document each endpoint effectively:

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

## **Image Upload and Deletion API Documentation**

### **1. Image Upload**

**Endpoint:**

- **URL:** `/img`
- **Method:** `POST`
- **Description:** This endpoint allows you to upload an image file to the server. After a successful upload, it returns the URL where the image is stored.

**Request:**

- **Headers:**
    - `Content-Type: multipart/form-data`
    - `Authorization: Bearer <your-jwt-token>`
- **Body:**
    - **Field:** `img` (This is the key for the image file in the form data)
    - **Type:** `File`
    - **Description:** The image file to be uploaded.

**Response:**

- **Status Code:** `200 OK`
- **Body:**
    
    ```json
    {
      "img_url": "<https://your-bucket-url/path-to-image>"
    }
    
    ```
    
    - **img_url:** The URL of the uploaded image.

**Example in JavaScript:**

```jsx
const formData = new FormData();
formData.append('img', fileInput.files[0]);

fetch('/img', {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => {
    console.log('Image URL:', data.img_url);
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });

```

---

### **2. Image Deletion**

**Endpoint:**

- **URL:** `/img/:filename`
- **Method:** `DELETE`
- **Description:** This endpoint allows you to delete an image from the server by specifying the image filename.

**Request:**

- **Headers:**
    - `Authorization: Bearer <your-jwt-token>`
- **URL Parameters:**
    - `:filename` - The name of the image file you want to delete.

**Response:**

- **Status Code:** `200 OK`
- **Body:** A confirmation message or status indicating the image was successfully deleted.

**Example in JavaScript:**

```jsx
const filename = 'image-to-delete.jpg'; // Replace with the actual filename
const token = 'your-jwt-token'; // Replace with your JWT token

fetch(`/img/${filename}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
  .then(response => {
    if (response.ok) {
      console.log('Image deleted successfully');
    } else {
      console.error('Failed to delete image');
    }
  })
  .catch(error => {
    console.error('Error deleting image:', error);
  });

```

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
        

### 10. N**ews Search**

**Endpoint:** GET `/news/search?title=NumuneXeberadi(inputunadi)`

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
        

### 11. **Get most vieaw**

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
        

### 12. Update News

- **Method**: PATCH
- **URL**: `news/:id` (replace `:id` with the actual ID of the news item you want to update)
- **Headers**:
    - `Content-Type`: `application/json`
    - `Authorization`: `Bearer YOUR_JWT_TOKEN` (if your `loginfunction` middleware requires a JWT token for authentication)

### Request Body

In the body of the request, you can include the fields you want to update. Make sure to use raw JSON format. Here's an example:

```json
{
		"img": "img.url"
    "title": "Updated News Title",
    "description": "Updated content of the news article.",
    "category_id": "60d5f484f8e7ae0017a2e57e"
}
```

### Example Response

- If the news item is successfully updated, you should receive a response similar to:

```json
{
    "message": "News updated successfully",
    "updatedNews": {
        "_id": "60d5f484f8e7ae0017a2e57e",
        "title": "Updated News Title",
        "description": "Updated content of the news article.",
        "category_id": "60d5f484f8e7ae0017a2e57e",
        "like": 0,
        "dislike": 0,
        "view": 0,
        "createdAt": "2021-06-25T14:30:44.000Z",
        "updatedAt": "2021-06-25T14:35:44.000Z"
    }
}

```

- If there is an error (e.g., the news item is not found), you might receive a response like:

```json
{
    "message": "News not found"
}

```

Or if there is a server error:

```json
{
    "message": "Failed to update news",
    "error": "Detailed error message here"
}

```

### 13. Get Most Viewed News

- **Endpoint:** `GET /news/most_viewed`
- **Description:** Retrieves the top 10 most viewed news articles sorted by the number of views in descending order.
- **Parameters:** None
- **Expected Response:**
    
    ```json
    [
        {
            "_id": "60d5f484f8e7ae0017a2e57e",
            "title": "Sample News Title 1",
            "description": "Content of the news article 1.",
            "category_id": {
                "_id": "60d5f484f8e7ae0017a2e57f",
                "name": "Category Name 1"
            },
            "like": 10,
            "dislike": 2,
            "view": 100,
            "createdAt": "2021-06-25T14:30:44.000Z",
            "updatedAt": "2021-06-25T14:35:44.000Z"
        },
        {
            "_id": "60d5f485f8e7ae0017a2e580",
            "title": "Sample News Title 2",
            "description": "Content of the news article 2.",
            "category_id": {
                "_id": "60d5f486f8e7ae0017a2e581",
                "name": "Category Name 2"
            },
            "like": 8,
            "dislike": 1,
            "view": 95,
            "createdAt": "2021-06-24T12:25:40.000Z",
            "updatedAt": "2021-06-24T12:30:40.000Z"
        },
        // 8 more news articles...
    ]
    
    ```
    
- **Error Responses:**
    - `500 Internal Server Error`
        
        ```json
        {
            "message": "Server error"
        }
        
        ```
        

## **Category**

---

---

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