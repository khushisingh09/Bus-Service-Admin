import React, { useState } from 'react';
import axios from 'axios'; // Axios import

const EditBusTiming = () => {
  // State to hold bus timing details
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle departure time change
  const handleDepartureTimeChange = (e) => {
    setDepartureTime(e.target.value);
  };

  // Handle arrival time change
  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  // Handle form submission (to update the bus timing)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError('');     // Clear any previous errors

    try {
      // Prepare the timing data to send to backend or API
      const timingData = {
        departureTime,
        arrivalTime,
      };

      // Axios POST request to submit timing data
      const response = await axios.post('/api/update-bus-timing', timingData);

      // Handle the response from the server
      console.log('Bus timing updated:', response.data);
      alert('Bus timing successfully updated!');
    } catch (error) {
      // Handle errors (e.g., network errors or server issues)
      console.error('Error updating bus timing:', error);
      setError('Failed to update bus timing. Please try again.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Bus Timing</h2>
        <form onSubmit={handleSubmit}>
          {/* Departure Time Input */}
          <div className="mb-6">
            <label htmlFor="departureTime" className="block text-lg font-medium text-gray-700">Departure Time:</label>
            <input
              type="time"
              id="departureTime"
              value={departureTime}
              onChange={handleDepartureTimeChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Arrival Time Input */}
          <div className="mb-6">
            <label htmlFor="arrivalTime" className="block text-lg font-medium text-gray-700">Arrival Time:</label>
            <input
              type="time"
              id="arrivalTime"
              value={arrivalTime}
              onChange={handleArrivalTimeChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 text-md">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Bus Timing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusTiming;
