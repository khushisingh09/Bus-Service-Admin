import React, { useState } from 'react';
import axios from 'axios'; // Axios import

const EditBusType = () => {
  // State to hold the bus type and the sub-type
  const [busType, setBusType] = useState('');
  const [busSubType, setBusSubType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle bus type change
  const handleBusTypeChange = (e) => {
    setBusType(e.target.value);
    setBusSubType(''); // Reset the subtype when changing the main type
  };

  // Handle bus subtype change
  const handleBusSubTypeChange = (e) => {
    setBusSubType(e.target.value);
  };

  // Handle form submission (to update the bus type)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError('');     // Clear any previous errors

    try {
      // Prepare the bus type data to send to backend or API
      const typeData = {
        busType,
        busSubType,
      };

      // Axios POST request to submit bus type data
      const response = await axios.post('/api/update-bus-type', typeData);

      // Handle the response from the server
      console.log('Bus type updated:', response.data);
      alert('Bus type successfully updated!');
    } catch (error) {
      // Handle errors (e.g., network errors or server issues)
      console.error('Error updating bus type:', error);
      setError('Failed to update bus type. Please try again.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Bus Type</h2>
        <form onSubmit={handleSubmit}>
          {/* Bus Type Dropdown */}
          <div className="mb-6">
            <label htmlFor="busType" className="block text-lg font-medium text-gray-700">Select Bus Type:</label>
            <select
              id="busType"
              value={busType}
              onChange={handleBusTypeChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            >
              <option value="" disabled>Select bus type</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>

          {/* Conditionally Rendered Bus Subtype Dropdown */}
          {(busType === 'AC' || busType === 'Non-AC') && (
            <div className="mb-6">
              <label htmlFor="busSubType" className="block text-lg font-medium text-gray-700">Select Bus Sub-Type:</label>
              <select
                id="busSubType"
                value={busSubType}
                onChange={handleBusSubTypeChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
                required
              >
                <option value="" disabled>Select bus sub-type</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Seater">Seater</option>
              </select>
            </div>
          )}

          {/* Error Handling */}
          {error && <p className="text-red-500 text-md">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Bus Type'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusType;
