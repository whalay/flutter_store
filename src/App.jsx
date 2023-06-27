import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import RegisterPage from './Pages/RegisterPage'
import RootLayout from './Pages/Root';
import CreateProductPage from './Pages/CreateProductpage';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';
import ProductDetail from './Pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: 'market',
        element: <ProductPage />
      },
      {
        path: '/:name',
        element: <ProductDetail />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'addProduct',
        element: <CreateProductPage />
      },
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App
