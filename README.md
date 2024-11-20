# E-commerce-React-only-App

Thank you for applying for the React Intern position at Intertwine Technologies! This project is part of the interview process. Please complete the assignment and submit it by **November 20, 2024**.

## Project Overview

The goal of this assignment is to build a React application with the following functionalities:

### Demo Video:

https://github.com/user-attachments/assets/6e6a92e9-adbe-4212-8b4d-97a38dff1879

### Features

#### Dashboard
- Display a list of products with pagination.
- Implement a product search feature.
- Allow users to add products to the cart, with cart data stored in the browser's local storage.

#### Cart Page
- Display a list of selected products along with their quantities.
- Show the total price of the items in the cart.
- Provide options to:
  - Add/remove items from the cart.
  - Adjust the quantities of items.
  - Clear the cart completely.

### Requirements

1. **Responsive Design**:
   - The application should be fully responsive and optimized for both **web** and **mobile** views.

2. **API Calls**:
   - Use **Axios** to make API calls to the dummy server at [https://dummyjson.com/docs](https://dummyjson.com/docs).
   - It is recommended to create custom hooks for fetching data using Axios.

3. **UI/UX**:
   - Utilize **Material UI** or another CSS framework of your choice for styling and component design.
   - Ensure consistent theming and layout throughout the project.

4. **Browser Storage**:
   - Store the cart data in **localStorage** or **sessionStorage** to persist the cart between page reloads.

5. **Additional Considerations**:
   - Ensure proper error handling for API calls.
   - Implement proper input validation (for example, when adjusting item quantities).

---

## Project Structure

Here’s an overview of the basic project structure:

```
/src
  /components          # React components (Dashboard, CartPage, ProductCard, etc.)
  /hooks               # Custom React hooks (useAxios.js)
  /pages               # Pages (DashboardPage, CartPage)
  /context             # Context functions (auth context, etc.)
  App.js               # Main App component
  index.js             # Entry point for the application
```

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MridulTi/E-commerce-React-only-app .
   ```

2. **Install dependencies**:
   - You can use npm or yarn to install the required dependencies.
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm run dev (becuase we are using vite)
   ```

   The application will open in your browser at [http://localhost:3000](http://localhost:3000).

---

## API Usage

Use the [DummyJSON API](https://dummyjson.com/docs) to fetch products for the dashboard. Make sure to implement pagination and product search using the API endpoints provided.

### Example API Endpoint for Products
```bash
GET https://dummyjson.com/products
```

### Example API Response
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "image": "product-image-url"
    },
    ...
  ],
  "total": 100,
  "skip": 0,
  "limit": 10
}
```

---

## Features & Implementation Details

### Dashboard Page
- **Product Listing**: Display the products in a grid/list with pagination.
- **Search Functionality**: Implement a search bar to filter products by name or description.
- **Add to Cart**: Each product should have an "Add to Cart" button to allow the user to add the product to their cart.

### Cart Page
- **Cart Display**: List selected products with their quantities and total price.
- **Adjust Quantities**: Allow the user to increase or decrease the quantity of an item in the cart.
- **Remove Items**: Provide an option to remove items from the cart.
- **Clear Cart**: Include a button to clear all items in the cart.

### Search and Category Page
- **Product Display**: List selected products with their quantities and total price.
- **Adjust Quantities**: Allow the user to increase or decrease the quantity of an item in the cart.

### Styling
- **Material UI**: Use Material UI components (e.g., Button, Card, Grid) for layout and styling.
- **Responsive Design**: The layout should adjust to screen sizes, using breakpoints and grids to ensure a good user experience on mobile and desktop devices.

---

## Submitting Your Project

1. **Commit Your Changes**:
   - Ensure your code is properly committed and pushed to your repository.
   
2. **Send the Repository Link**:
   - Provide a link to your repository to the interviewer before the deadline.

3. **Additional Notes**:
   - You may include any extra features or improvements that you feel enhance the project.

---
