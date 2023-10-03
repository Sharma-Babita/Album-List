import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AlbumManager from './AlbumManager'; // Import the main component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AlbumManager /> {/* Render the main component */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
