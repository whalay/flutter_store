import React, { useState, useEffect } from 'react';

const CreateProductPage = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch the categories from your API endpoint
        // and update the state
        fetchCategories();
    },[]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/categories');
            const data = await response.json();
            setCategories(data);
            console.log('good');
        } catch (error) {

            console.error('Error fetching categories:', error);

        }
        // const response = await fetch('http://localhost:5000/api/v1/categories');
        // const data = await response.json();
        // setCategories(data);
    
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your logic to create the product here
        console.log('Product:', product);
        // Reset the form fields
        setProduct({
            name: '',
            price: '',
            description: '',
            category: ''
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
                        name="name"
                        value={product.name}
                        onChange={handleChange}
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
                        name="price"
                        value={product.price}
                        onChange={handleChange}
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
                        name="category"
                        value={product.category}
                        onChange={handleChange}
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
                        name="description"
                        value={product.description}
                        onChange={handleChange}
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
