
# Car Store B4A2V3

- [Backend Link](https://carmodelbackend.vercel.app/) (https://carmodelbackend.vercel.app/)
- [Project Overview](https://drive.google.com/file/d/1jukTiQqwaQsDFJ0gXZDyjUwYw48hnKrx/view?usp=sharing) babel[Video Link]


# initial setup of project

- you must install these following package

- npm i cors
- npm i dotenv
- npm i express
- npm i mongoose
- npm i zod
- need env file but i dont provide my guthub

# you also need these dev dependency

-  @eslint/js
-  @types/cors
-  @types/eslint__js
-  @types/express
-  @types/node
-  @typescript-eslint/eslint-plugin
-  @typescript-eslint/parser

# you should follow this docs
- [LogRocket docs](https://blog.logrocket.com/linting-typescript-eslint-prettier) uses [Babel](https://babeljs.io/) for Fast Refresh

# Api link you hit the data

# Create a Car
- Endpoint: /api/cars
- Method: POST
- Request Body:

# Must folow the schema with validation

{
  "brand": "Toyota",
  "model": "Camry",
  "year": 2024,
  "price": 25000,
  "category": "Sedan",
  "description": "A reliable family sedan with modern features.",
  "quantity": 50,
  "inStock": true
}

# Get All Cars
- Endpoint: /api/cars
- Method: GET

# Get a Specific Car
- Endpoint: /api/cars/:carId
- Method: GET

# Update a Car
- Endpoint: /api/cars/:carId
- Method: PUT

# Delete a Car
- Endpoint: /api/cars/:carId
- Method: DELETE

# Order a Car
- Endpoint: /api/orders
- Method: POST

You must be follow the following schema

{
  "email": "customer@example.com",
  "car": "648a45e5f0123c45678d9012",
  "quantity": 1,
  "totalPrice": 27000
}

# description
If the quantity zero you cant order the bike
is Instock false you cant by the product
quantity and totalPrice greater than zero

# Calculate Revenue from Orders (Aggregation)
- Endpoint: /api/orders/revenue
- Method: GET










