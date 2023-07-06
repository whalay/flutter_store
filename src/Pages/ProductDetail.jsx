import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import QuantityButton from '../Components/QuantityButton';
import bag from "../assets/bag.jpg";

const ProductDetail = () => {
    const {id } = useParams();
    const [product, setProducts] = useState([]);
    

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Product ID:',id)
            try {
                const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.log('Error fetching products:', error);
                setProducts(null);
            }
        };

        fetchProducts();
    }, [id]);

    if (!product) {
        return <div>Product not found!</div>;
    }


    return (
        <div className='md:px-14 p-5 h-screen'>
            <div className="flex flex-col md:flex-row  md:items-center justify-between gap-10   ">
                <div className="md:basis-1/2 flex ">
                    <img src={bag} alt="" className="flex-grow" />
                </div>

                <div className="flex flex-col     md:px-0 md:basis-1/2">
                    <h1 className="text-xl font-bold py-5">{product.product_name}</h1>
                    <p className='text-2xl font-bold'>{product.price}</p>
                    <div className="py-5">
                        <h3 className='py-2'>Quantity:</h3>
                        <QuantityButton />
                    </div>
                    <button className='bg-blue-500 p-3 text-white text-2xl my-4'>Add to Cart</button>

                </div>


            </div>


        </div>
    )
}

export default ProductDetail