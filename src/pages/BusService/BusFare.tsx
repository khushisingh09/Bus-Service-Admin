import React, { useState } from 'react';
import axios from 'axios'; // Axios import

const EditBusFare = () => {
  // State to hold bus fare details
  const [fareAmount, setFareAmount] = useState('');
  const [fareType, setFareType] = useState('Economy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle fare amount change
  const handleFareAmountChange = (e) => {
    setFareAmount(e.target.value);
  };

  // Handle fare type change
  const handleFareTypeChange = (e) => {
    setFareType(e.target.value);
  };

  // Handle form submission (to update the bus fare)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError('');     // Clear any previous errors

    try {
      // Prepare the fare data to send to backend or API
      const fareData = {
        fareAmount,
        fareType,
      };

      // Axios POST request to submit fare data
      const response = await axios.post('/api/update-bus-fare', fareData);

      // Handle the response from the server
      console.log('Bus fare updated:', response.data);
      alert('Bus fare successfully updated!');
    } catch (error) {
      // Handle errors (e.g., network errors or server issues)
      console.error('Error updating bus fare:', error);
      setError('Failed to update bus fare. Please try again.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Bus Fare</h2>
        <form onSubmit={handleSubmit}>
          {/* Fare Amount Input */}
          <div className="mb-6">
            <label htmlFor="fareAmount" className="block text-lg font-medium text-gray-700">Fare Amount:</label>
            <input
              type="number"
              id="fareAmount"
              value={fareAmount}
              onChange={handleFareAmountChange}
              placeholder="Enter fare amount"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Fare Type Input */}
          <div className="mb-6">
            <label htmlFor="fareType" className="block text-lg font-medium text-gray-700">Fare Type:</label>
            <select
              id="fareType"
              value={fareType}
              onChange={handleFareTypeChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 text-md">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Bus Fare'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusFare;
