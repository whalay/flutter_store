import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './context/AuthContext';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './Pages/Homepage'
import RegisterPage from './Pages/RegisterPage'
import RootLayout from './Pages/Root';

import CreateProductPage from './Pages/CreateProductpage';
import LoginPage from './Pages/LoginPage';
import ProductPage from './Pages/ProductPage';
import ProductDetail from './Pages/ProductDetail';
import Logout from './Pages/Logout';
import Checks from './Pages/checks';
import Store from './Pages/store';
import DashboardPage from './Pages/DashboardPage';
import StoreProductPage from './Pages/StoreProductPage';
import StoreProductDetail from './Pages/StoreProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: '/products/categories/:categoryId',
        element: <ProductPage />
      },
      {
        path: '/products',
        element: <ProductPage />
      },
      {
        path: '/products/:id',
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
        path: 'logout',
        element: <Logout />
      },

      {
        path: 'store',
        element: <Store />
      },
      {
        path: 'check',
        element: <Checks />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardPage />
  },
  {
    path: 'stores/:id/product',
    element: <CreateProductPage />
  },
  {
    path: 'stores/:id/myproduct',
    element: <StoreProductPage />
  },
  {
    path: 'stores/:storeID/myproduct/:id',
    element: <StoreProductDetail/>
  },

]);



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/auth/auth_status', { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        const data = res.data;
        if (data.authenticated) {
          login(data.user);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return <RouterProvider router={router} />;
}

export default App
