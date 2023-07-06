import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Category from '../Components/Category'
import Card from '../Components/Card'
import { productdb } from '../assets/Data'





const ProductPage = () => {
    const [categoryProduct, setCategoryProducts] = useState(null);
    const [allProducts, setAllProducts] = useState(null);
    const { categoryId } = useParams();






    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/v1/categories/${categoryId}/products`);
    //             const data = await response.json();
    //             setProducts(data);
    //             console.log(data)
    //         } catch (error) {
    //             console.log('Error fetching products:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, [categoryId]);
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setAllProducts(data);
                console.log(data);
            } catch (error) {
                console.log('Error fetching products:', error);
                setAllProducts(null);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/products/categories/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setCategoryProducts(data);
                console.log(data);
            } catch (error) {
                console.log('Error fetching products:', error);
                setCategoryProducts(null);
            }
        };
        fetchAllProducts();
        fetchProducts();
    }, [categoryId]);

    return (
        <div><Category />
            <div className='md:relative'>
                {/* <div className=' absolute left-40 flex flex-col flex-wrap sm:flex-row justify-between  sm:gap-5 sm:px-14 '> */}
                <div className='lg:absolute lg:left-60 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {categoryProduct !== null ? (
                        categoryProduct.map((product, index) => {
                            return (<Card key={index} id={product.product_id} name={product.product_name} price={product.price} seller={product.seller_name} />
                            )
                        })) :
                        allProducts !== null ? (
                            allProducts.map((product, index) => {
                                return (<Card key={index} id={product.id} name={product.product_name} price={product.price} seller={product.seller_name} />
                                )

                            })) :
                            (
                                // Render a loading or empty state
                                <p>No products found.</p>
                            )}


                </div>
            </div>



        </div>
    )
}

export default ProductPage