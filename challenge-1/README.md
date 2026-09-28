
## Install

Need Node.js and MongoDB running

```bash id="iun60y"
cd challenge-1
npm install
```

## Env

Copy env example

```bash id="oo4g94"
cp .env.example .env
```

Then add needed data 


## Test users

I added seed script because there is no register endpoint

```bash id="hcr62k"
npm run seed
```

Test users

```text id="zwrje6"
admin@example.com
password123
admin

user@example.com
password123
user
```

## Run

```bash id="v6eyvl"
npm run dev
```
server will start after mongodb connection

## Endpoints

```text id="kni2ph"
POST   /auth/login 
POST   /products => create products
GET    /products =>list all products and you can use querey like this products?page=1 
GET    /products/:id => get single product bu id
PUT    /products/:id => update product by id
DELETE /products/:id =>delete product by id
```


## Login

```http id="gxcqwa"
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

response

```json id="z7vf7h"
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

JWT has user id and role inside it

## Create product

```http id="lgz9on"
POST /products
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "name": "Laptop",
  "category": "Electronics",
  "price": 999.99,
  "quantity": 10
}
```

validation

- name is required
- category is optional
- price must be positive
- quantity cannot be negative
