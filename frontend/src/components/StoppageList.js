import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoppageList = () => {
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/gps/stoppages?threshold=${threshold}`);
        console.log('Fetched data:', response.data); 
        setStoppages(response.data);
      } catch (error) {
        console.error('Error fetching stoppages:', error);
      }
    };

    fetchData();
  }, [threshold]);

  return (
    <div>
      <h1>Vehicle Stoppage List</h1>
      <input
        type="number"
        value={threshold}
        onChange={e => setThreshold(e.target.value)}
        placeholder="Enter threshold in minutes"
      />
      <table>
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Reach Time</th>
            <th>End Time</th>
            <th>Duration (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {stoppages.map((stop, index) => (
            <tr key={index}>
              <td>{stop.latitude}</td>
              <td>{stop.longitude}</td>
              <td>{new Date(stop.reachTime).toLocaleString()}</td>
              <td>{new Date(stop.endTime).toLocaleString()}</td>
              <td>{stop.duration.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoppageList;
