# Hybr1d---E-Commerce

Backend (Nodejs) Assignment

# Initial Setup

- Install [NodeJS](https://nodejs.org/en/)
- Clone this Repo
- from the root directory run this command

  - `npm ci`

- Add a `.env` file into your root directory

```
## Sample env content
PORT=3001 // port which you want to use default is 3000
NODE_ENV=development // by default it will be considered as development
API_SECRET=This_is_very_secret_string // this is required for the jsontoken signing process
```

- To run the Sever in _Development Mode_: `npm run dev`
- To run the server in _Production Mode_: `npm start`

# API Endpoints

- [_Postman APIs Collection_](./api_collection/Hybr1d.postman_collection.json)

- ![ALL API](./apis_imgs/api_folder.jpg)

* While Making each Request You have pass the `token` in header, except the _auth_ APIs.
* **{{host}}**: `http://localhost:{{your_port}}`

```
Authorization: JWT {token}
```

# Auth APIs

### @POST _{{host}}/auth/register_

- **Sample CURL Request**
  ```
    curl --location --request POST 'http://localhost:3001/api/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "seller2",
        "password": "password",
        "type": "seller"
    }'
  ```
- **Sample Response**
  ```json
  {
    "message": "User registered Successfully"
  }
  ```

### @POST _{{host}}/auth/login_

- **Sample CURL Request**

  ```
      curl --location --request POST 'http://localhost:3001/api/auth/login' \
      --header 'Content-Type: application/json' \
      --data-raw '{

          "username": "seller2",
          "password": "password"
      }'
  ```

- **Sample Response**
  ```json
  {
    "message": "logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU5MzM3MjMxLCJleHAiOjE2NTk1MTAwMzF9.9amMMM3Oqsyo5u45dzRY1dfi82Ie2oylXGENH67yxx4",
    "username": "seller2"
  }
  ```

# Buyer's APIs

### @GET _{{host}}/buyer/list-of-sellers_

- **Sample CURL Request**

  ```
      curl --location --request GET 'http://localhost:3001/api/buyer/list-of-sellers' \
      --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MzM3MDA0LCJleHAiOjE2NTk1MDk4MDR9.1EX5oPiLn8saOnY1TTl_xPnDlR_wl4tJSwzLEO4xTw4'
  ```

- **Sample Response**
  ```json
  {
    "sellers": [
      {
        "id": 2,
        "username": "seller"
      },
      {
        "id": 3,
        "username": "seller2"
      }
    ]
  }
  ```

### @GET _{{host}}/buyer/seller-catalog/:sellerId_

- **Sample CURL Request**

  ```
      curl --location --request GET 'http://localhost:3001/api/buyer/seller-catalog/3' \
      --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MzM3MDA0LCJleHAiOjE2NTk1MDk4MDR9.1EX5oPiLn8saOnY1TTl_xPnDlR_wl4tJSwzLEO4xTw4'
  ```

- **Sample Response**
  ```json
  {
    "catalodId": 2,
    "products": [
      {
        "id": 3,
        "name": "product2",
        "price": 30,
        "createdAt": "2022-08-01T06:56:38.536Z",
        "updatedAt": "2022-08-01T06:56:38.536Z",
        "catalogId": 2
      },
      {
        "id": 4,
        "name": "product3",
        "price": 40,
        "createdAt": "2022-08-01T06:56:38.536Z",
        "updatedAt": "2022-08-01T06:56:38.536Z",
        "catalogId": 2
      }
    ]
  }
  ```

### @POST _{{host}}/buyer/create-order/:sellerId_

- **Sample CURL Request**

  ```
      curl --location --request POST 'http://localhost:3001/api/buyer/create-order/3' \
      --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU5MzM3MDA0LCJleHAiOjE2NTk1MDk4MDR9.1EX5oPiLn8saOnY1TTl_xPnDlR_wl4tJSwzLEO4xTw4' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "products": [
          3,
          4
        ]
      }'
  ```

- **Sample Response**

  ```json
  {
    "message": "order places successfully ",
    "orders": [
      {
        "id": 4,
        "orderId": 3,
        "productId": 3,
        "createdAt": "2022-08-01T07:00:03.036Z",
        "updatedAt": "2022-08-01T07:00:03.036Z"
      },
      {
        "id": 5,
        "orderId": 3,
        "productId": 4,
        "createdAt": "2022-08-01T07:00:03.036Z",
        "updatedAt": "2022-08-01T07:00:03.036Z"
      }
    ]
  }
  ```

# Seller's APIs

### @POST _{{host}}/seller/create-catalog_

- **Sample CURL Request**

  ```
      curl --location --request POST 'http://localhost:3001/api/seller/create-catalog' \
      --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU5MzM2OTc2LCJleHAiOjE2NTk1MDk3NzZ9.LZi7Iq4Dy8lfTcNZLLqpp5LEwPB98PoLc5c-2Z8qoWY' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "products": [
            {
                "name": "product2",
                "price": 30
            },
            {
                "name": "product3",
                "price": 40
            }
        ]
      }'
  ```

- **Sample Response**

  ```json
  {
    "message": "order places successfully ",
    "orders": [
      {
        "id": 4,
        "orderId": 3,
        "productId": 3,
        "createdAt": "2022-08-01T07:00:03.036Z",
        "updatedAt": "2022-08-01T07:00:03.036Z"
      },
      {
        "id": 5,
        "orderId": 3,
        "productId": 4,
        "createdAt": "2022-08-01T07:00:03.036Z",
        "updatedAt": "2022-08-01T07:00:03.036Z"
      }
    ]
  }
  ```

### @GET _{{host}}/seller/orders_

- **Sample CURL Request**

  ```
      curl --location --request GET 'http://localhost:3001/api/seller/orders' \
      --header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjU5MzM3MjMxLCJleHAiOjE2NTk1MTAwMzF9.9amMMM3Oqsyo5u45dzRY1dfi82Ie2oylXGENH67yxx4'
  ```

- **Sample Response**

  ```json
  {
    "orders": {
      "3": [
        {
          "productName": "product2",
          "productPrice": 30
        },
        {
          "productName": "product3",
          "productPrice": 40
        }
      ]
    }
  }
  ```
