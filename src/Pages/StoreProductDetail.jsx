import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StoreProductDetail = () => {
  const { storeID, id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log(storeID, id)

    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
        console.log(storeID, id)
        const response = await axios.get(`http://127.0.0.1:5000/api/v1/stores/${storeID}/product/${id}`, { withCredentials: true });
        setProduct(response.data);

    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/products/${id}`);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      {product ? (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-gray-600">${product.price}</p>
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StoreProductDetail;
