const openApiSpec = {
    openapi: "3.0.3",
    info: {
        title: "Oxu.az Backend API",
        version: "1.0.0",
        description: "Express API for admin auth, news, categories and image uploads."
    },
    servers: [
        {
            url: "/"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            Category: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "665f0f1b8f4f3c0012b34567" },
                    name: { type: "string", example: "Siyaset" }
                }
            },
            News: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "665f0f1b8f4f3c0012b34568" },
                    img: { type: "string", example: "https://example.com/image.jpg" },
                    title: { type: "string", example: "News title" },
                    description: { type: "string", example: "News description" },
                    like: { type: "number", example: 0 },
                    dislike: { type: "number", example: 0 },
                    view: { type: "number", example: 0 },
                    category_id: {
                        oneOf: [
                            { type: "string" },
                            { $ref: "#/components/schemas/Category" }
                        ]
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            },
            PaginationMeta: {
                type: "object",
                properties: {
                    page: { type: "number", example: 1 },
                    limit: { type: "number", example: 10 },
                    total: { type: "number", example: 42 },
                    totalPages: { type: "number", example: 5 },
                    hasNextPage: { type: "boolean", example: true },
                    hasPrevPage: { type: "boolean", example: false }
                }
            },
            PaginatedNewsResponse: {
                type: "object",
                properties: {
                    data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/News" }
                    },
                    meta: { $ref: "#/components/schemas/PaginationMeta" }
                }
            },
            AuthResponse: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    login: { type: "string" },
                    status: { type: "boolean" },
                    token: { type: "string" }
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    error: { type: "string" }
                }
            }
        },
        parameters: {
            Page: {
                name: "page",
                in: "query",
                schema: { type: "integer", default: 1, minimum: 1 }
            },
            Limit: {
                name: "limit",
                in: "query",
                schema: { type: "integer", default: 10, minimum: 1, maximum: 50 }
            }
        }
    },
    paths: {
        "/docs": {
            get: {
                summary: "Scalar API docs",
                responses: {
                    200: { description: "HTML documentation page" }
                }
            }
        },
        "/openapi.json": {
            get: {
                summary: "OpenAPI specification",
                responses: {
                    200: {
                        description: "OpenAPI JSON",
                        content: {
                            "application/json": {
                                schema: { type: "object" }
                            }
                        }
                    }
                }
            }
        },
        "/login": {
            post: {
                summary: "Admin login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["login", "password"],
                                properties: {
                                    login: { type: "string" },
                                    password: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Logged in",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/AuthResponse" }
                            }
                        }
                    },
                    401: { description: "Invalid credentials" }
                }
            }
        },
        "/register": {
            post: {
                summary: "Create admin",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["login", "password"],
                                properties: {
                                    login: { type: "string" },
                                    password: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Admin created" },
                    400: { description: "Login already exists" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/verify": {
            get: {
                summary: "Verify admin token",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Token is valid" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/news": {
            get: {
                summary: "List news",
                parameters: [
                    { $ref: "#/components/parameters/Page" },
                    { $ref: "#/components/parameters/Limit" },
                    {
                        name: "search",
                        in: "query",
                        schema: { type: "string" },
                        description: "Case-insensitive title/description search"
                    },
                    {
                        name: "category_id",
                        in: "query",
                        schema: { type: "string" }
                    },
                    {
                        name: "sort",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["newest", "oldest", "most_viewed", "most_liked"],
                            default: "newest"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Paginated news",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/PaginatedNewsResponse" }
                            }
                        }
                    }
                }
            },
            post: {
                summary: "Create news",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["img", "title", "description"],
                                properties: {
                                    img: { type: "string" },
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    category_id: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: { description: "News created" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/news/search": {
            get: {
                summary: "Search news",
                parameters: [
                    { $ref: "#/components/parameters/Page" },
                    { $ref: "#/components/parameters/Limit" },
                    {
                        name: "title",
                        in: "query",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: {
                        description: "Paginated search result",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/PaginatedNewsResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/news_page/{page}": {
            get: {
                summary: "Legacy paginated news endpoint",
                parameters: [
                    {
                        name: "page",
                        in: "path",
                        required: true,
                        schema: { type: "integer", minimum: 1 }
                    },
                    { $ref: "#/components/parameters/Limit" }
                ],
                responses: {
                    200: {
                        description: "Paginated news",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/PaginatedNewsResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/news/{id}": {
            get: {
                summary: "Get news by ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "News item" },
                    400: { description: "Invalid ID" },
                    404: { description: "News not found" }
                }
            },
            patch: {
                summary: "Update news",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "News updated" },
                    400: { description: "Invalid ID" },
                    401: { description: "Unauthorized" },
                    404: { description: "News not found" }
                }
            },
            delete: {
                summary: "Delete news",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "News deleted" },
                    400: { description: "Invalid ID" },
                    401: { description: "Unauthorized" },
                    404: { description: "News not found" }
                }
            }
        },
        "/news_by_categ/{id}": {
            get: {
                summary: "List news by category",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    },
                    { $ref: "#/components/parameters/Page" },
                    { $ref: "#/components/parameters/Limit" }
                ],
                responses: {
                    200: {
                        description: "Paginated category news",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/PaginatedNewsResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/news_viewed": {
            get: {
                summary: "Most viewed news",
                parameters: [
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 10, maximum: 50 }
                    }
                ],
                responses: {
                    200: { description: "Most viewed news list" }
                }
            }
        },
        "/news_like/{id}": {
            patch: {
                summary: "Increment news like count",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "Updated news" },
                    404: { description: "News not found" }
                }
            }
        },
        "/news_dislike/{id}": {
            patch: {
                summary: "Increment news dislike count",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "Updated news" },
                    404: { description: "News not found" }
                }
            }
        },
        "/news_view/{id}": {
            patch: {
                summary: "Increment news view count",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "Updated news" },
                    404: { description: "News not found" }
                }
            }
        },
        "/categories": {
            get: {
                summary: "List categories",
                responses: {
                    200: { description: "Category list" }
                }
            },
            post: {
                summary: "Create category",
                security: [{ bearerAuth: [] }],
                responses: {
                    201: { description: "Category created" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/categories/{id}": {
            delete: {
                summary: "Delete category",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "Category deleted" },
                    400: { description: "Invalid ID" },
                    401: { description: "Unauthorized" },
                    404: { description: "Category not found" }
                }
            }
        },
        "/img": {
            post: {
                summary: "Upload image",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    img: {
                                        type: "string",
                                        format: "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: "Uploaded image URL" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/img/{filename}": {
            delete: {
                summary: "Delete image",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "filename",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "Image deleted" },
                    401: { description: "Unauthorized" }
                }
            }
        }
    }
};

module.exports = openApiSpec;
