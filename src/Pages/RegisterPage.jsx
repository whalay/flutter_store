import React, { useState, useEffect } from 'react';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [roles, setRole] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, username, email, password, selectedRole)



    // Perform registration logic here, e.g. send a request to your Flask API
    try {
      const response = await fetch('http://localhost:5000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "first_name" : firstName,
          "last_name": lastName,
          "username" : username,
          "email" : email,
          "password" : password,
          "role_id" : selectedRole
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // User created successfully, handle the response as needed
      console.log('User created successfully');
    } catch (error) {
      console.log('Error creating user:', error);
    }

    // Reset form fields
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setSelectedRole('')
  };
  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/roles');
      const data = await response.json();
      setRole(data);
      console.log(data);
    } catch (error) {

      console.error('Error fetching categories:', error);

    }
    // const response = await fetch('http://localhost:5000/api/v1/categories');
    // const data = await response.json();
    // setCategories(data);

  };

  useEffect(() => {
    // Fetch the categories from your API endpoint
    // and update the state
    fetchRoles();
  }, []);



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
