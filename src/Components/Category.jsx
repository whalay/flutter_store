import React, { useState, useEffect } from 'react'
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Category = ({ nav, close }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the categories from your API endpoint
    // and update the state
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/categories');
      const data = await response.json();
      setCategories(data);
      console.log('good');
    } catch (error) {

      console.error('Error fetching categories:', error);

    }
  }

  return (
    <div className={`${nav ? '  bg-red-500 w-full left-0 top-0 z-10 h-screen fixed' : 'lg:absolute left-10'}`}>
      {nav && <GrClose onClick={close} className=' absolute top-10 right-10' />}

      <ul className={`${nav ? '  absolute top-10 left-10 flex flex-col   ' : 'lg:flex flex-col  hidden'} gap-10 text-xl font-bold`}>
        {categories.map((category, index) => (
          <Link to={`/products/categories/${category.id}`}>
            <li>{category.name}</li>
          </Link>

        ))}
      </ul>


    </div>
  )
}

export default Category