import React, { useState } from 'react';
import axios from 'axios'; // Axios import

const EditBusRoute = () => {
  // State to hold bus route details
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [routeStops, setRouteStops] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle departure location change
  const handleDepartureChange = (e) => {
    setDepartureLocation(e.target.value);
  };

  // Handle arrival location change
  const handleArrivalChange = (e) => {
    setArrivalLocation(e.target.value);
  };

  // Handle route stops change
  const handleRouteStopChange = (index, value) => {
    const newStops = [...routeStops];
    newStops[index] = value;
    setRouteStops(newStops);
  };

  // Add a new stop
  const addRouteStop = () => {
    setRouteStops([...routeStops, '']);
  };

  // Remove a stop
  const removeRouteStop = (index) => {
    const newStops = [...routeStops];
    newStops.splice(index, 1);
    setRouteStops(newStops);
  };

  // Handle form submission (to update the bus route)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setError('');     // Clear any previous errors

    try {
      // Prepare the route data to send to backend or API
      const routeData = {
        departureLocation,
        arrivalLocation,
        routeStops,
      };

      // Axios POST request to submit route data
      const response = await axios.post('/api/update-bus-route', routeData);

      // Handle the response from the server
      console.log('Bus route updated:', response.data);
      alert('Bus route successfully updated!');
    } catch (error) {
      // Handle errors (e.g., network errors or server issues)
      console.error('Error updating bus route:', error);
      setError('Failed to update bus route. Please try again.');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Bus Route</h2>
        <form onSubmit={handleSubmit}>
          {/* Departure Location Input */}
          <div className="mb-6">
            <label htmlFor="departureLocation" className="block text-lg font-medium text-gray-700">Departure Location:</label>
            <input
              type="text"
              id="departureLocation"
              value={departureLocation}
              onChange={handleDepartureChange}
              placeholder="Enter departure location"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Arrival Location Input */}
          <div className="mb-6">
            <label htmlFor="arrivalLocation" className="block text-lg font-medium text-gray-700">Arrival Location:</label>
            <input 
              type="text" 
              id="arrivalLocation"
              value={arrivalLocation}
              onChange={handleArrivalChange}
              placeholder="Enter arrival location"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
              required
            />
          </div>

          {/* Route Stops */}
          <div className="mb-6">
            <label htmlFor="routeStops" className="block text-lg font-medium text-gray-700">Route Stops:</label>
            {routeStops.map((stop, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => handleRouteStopChange(index, e.target.value)}
                  placeholder={`Stop ${index + 1}`}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md"
                />
                {routeStops.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeRouteStop(index)} 
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={addRouteStop} 
              className="mt-4 py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Stop
            </button>
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 text-md">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 px-4 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Bus Route'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusRoute;
