import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Store = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.last_name}</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* User Information */}
        <div className="col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">User Information</h2>
          <p>
            <strong>Name:</strong> {user?.first_name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong>{user?.password}
          </p>
        </div>

        {/* Product List */}
        <div className="col-span-1 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Products</h2>
          <ul>
            {/* Render product list here */}
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </div>
      </div>

      {/* Other Information */}
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Other Information</h2>
        <p>Some other information goes here...</p>
      </div>
    </div>
  );
};

export default Store;
