import React, { useState } from 'react';
import axios from 'axios'; // Axios import

const EditBusDetails = () => {
  // State to hold bus name and photo file
  const [busName, setBusName] = useState('');
  const [busPhoto, setBusPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle bus name change
  const handleBusNameChange = (e) => {
    setBusName(e.target.value);
  };

  // Handle bus photo change
  const handleBusPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusPhoto(file);
    }
  };

  // Handle form submission (to update the bus details)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError('');     // Clear any previous errors

    try {
      // Prepare the form data to send to backend or API
      const formData = new FormData();
      formData.append('busName', busName);
      formData.append('busPhoto', busPhoto);

      // Axios POST request to submit form data
      const response = await axios.post('/api/update-bus-details', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      console.log('Bus details updated:', response.data);
      alert('Bus details successfully updated!');
    } catch (error) {
      // Handle errors (e.g., network errors or server issues)
      console.error('Error updating bus details:', error);
      setError('Failed to update bus details. Please try again.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Bus Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Bus Name Input */}
          <div className="mb-6">
            <label htmlFor="busName" className="block text-lg font-medium text-gray-700">Bus Name:</label>
            <input
              type="text"
              id="busName"
              value={busName}
              onChange={handleBusNameChange}
              placeholder="Enter bus name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Bus Photo Upload */}
          <div className="mb-6">
            <label htmlFor="busPhoto" className="block text-lg font-medium text-gray-700">Upload Bus Photo:</label>
            <input 
              type="file" 
              id="busPhoto"
              accept="image/*" 
              onChange={handleBusPhotoChange}
              className="mt-2 block w-full text-md text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-md file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {busPhoto && (
              <div className="mt-6">
                <p>Selected File: {busPhoto.name}</p>
                <img 
                  src={URL.createObjectURL(busPhoto)} 
                  alt="Bus Preview" 
                  className="mt-4 border rounded-md w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 text-md">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Bus Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusDetails;
