import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProductPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    console.log(`id, ${id}`)
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/categories');
      setCategories(response.data);
      console.log('Categories:', response.data);
      console.log(`id: ${id}`);
      console.log(`id, ${id}`)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const payload = {
    //   product_name: productName,
    //   price: price,
    //   description: description,
    //   category_id: categoryId
    // };

    axios
      .post(`http://127.0.0.1:5000/api/v1/stores/${id}/products`, 
      {product_name: productName,
        price: price,
        description: description,
        category_id: categoryId}, 
      { withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        const data = res.data;
        console.log(res);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={categoryId}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
