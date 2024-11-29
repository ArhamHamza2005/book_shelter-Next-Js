"use client";
import React, { useState } from 'react';
import Navbar from '../Nabvabr';

const Order = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    bookName: '',
    bookId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare form data for submission
    const formPayload = new FormData();
    formPayload.append('access_key', '0489d9f6-4197-473c-8646-f08350c2a7b6');
    formPayload.append('name', formData.name);
    formPayload.append('address', formData.address);
    formPayload.append('bookName', formData.bookName);
    formPayload.append('bookId', formData.bookId);

    // Submit form data using fetch
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formPayload,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful submission (reset the form fields)
        if (data.success) {
          setFormData({
            name: '',
            address: '',
            bookName: '',
            bookId: '',
          });
          alert("Order success")
        } else {
          // Handle error
          console.log('Form submission failed:', data);
        }
      })
      .catch((error) => {
        console.error('Error during form submission:', error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Place Your Order</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Address Input */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>

            {/* Book Name Input */}
            <div>
              <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">
                Book Name
              </label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the book name"
                required
              />
            </div>

            {/* Book ID Input */}
            <div>
              <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
                Book ID
              </label>
              <input
                type="text"
                id="bookId"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your Book ID"
                required
              />
            </div>

            {/* Contact Number Input */}
          

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-black rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Order;
