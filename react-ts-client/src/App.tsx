import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const portocol = "http", host = "localhost", port = 10000;
const rootURL = `${portocol}://${host}:${port}`;

function App() {
  const [JSONResponse, setJSONResponse] = useState([]);

  useEffect(() => {
    axios.get(`${rootURL}/api/tags`)
      .then(response => {
        setJSONResponse(response.data.models);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ul>
      {JSONResponse.map((data : {
          modified_at: string,
          name: string
        }) => (
          <li key={data.modified_at}>{data.name}</li>
        ))}
    </ul>
  );
}

export default App;
