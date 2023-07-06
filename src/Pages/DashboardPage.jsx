import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [userStores, setUserStore] = useState([]);
  const [hasStores, setHasStore] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the user's store information from the backend
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching the user's store
    axios
    .get('http://127.0.0.1:5000/api/v1/mystores', {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        setUserStore(response.data);
        setHasStore(true);
      } else if (response.status === 404) {
        setHasStore(false);
      } else {
        throw new Error('Failed to fetch user store');
      }
    })
    .catch((error) => {
      console.error('Error fetching user store:', error);
    });
}, [user]);

  const handleCreateStore = () => {
    // Implement the logic to create a store here
    // You can use the 'authState.user' to get the user's information
    // and send a request to the backend to create the store
  };
  const handleCreateProduct = () => {
    // Implement the logic to create a store here
    // You can use the 'authState.user' to get the user's information
    // and send a request to the backend to create the store
    // navigate(`/stores/${userStores[0].id}/product`)

  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user ? user.username : 'Guest'}!</h1>
      {hasStores && userStores.length > 0 ? (
        userStores.map((store) => (
          <div key={store.id} className="bg-gray-100 p-4 rounded-md mb-4">
            <h2 className="text-2xl font-bold mb-2">Your Store: {store.store_name}</h2>
            <p className="text-gray-600">Location: {store.location}</p>
        <Link to={`/stores/${store.id}/product`}>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"          >
            Create Product
          </button></Link>
          <Link to={`/stores/${store.id}/myproduct`}>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"          >
            Go to my Products
          </button></Link>
          </div>
          
        ))
        
      ) : (
        <div className="mb-4">
          <p>You don't have any stores.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateStore}
          >
            Create Store
          </button>
        </div>
      )}

    </div>
  );

};

export default DashboardPage;
