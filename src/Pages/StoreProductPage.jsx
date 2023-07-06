import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useParams } from 'react-router-dom';



const StoreProductPage = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(AuthContext);
  const { id } = useParams();



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/stores/${id}/products`, { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">{user.username} Store Page</h1>
    <h2 className="text-xl font-bold mb-2">{user.username} Products</h2>
    <div className="grid grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
          <Link to={`${product.id}`}>
            <div key={product.id} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold mb-2">{product.product_name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-600">${product.price}</p>
            </div></Link>
          ))
        )}
      </div>
  </div>
  );
};

export default StoreProductPage;
