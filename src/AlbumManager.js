// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import custom styles

const API_URL = 'https://jsonplaceholder.typicode.com/albums';

function AlbumManager() {
  // State variables for albums and modal visibility
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [updateAlbumId, setUpdateAlbumId] = useState(null);
  const [updatedAlbumTitle, setUpdatedAlbumTitle] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch albums from API when component mounts
  useEffect(() => {
    fetchAlbums();
  }, []);

  // Fetch albums from API using Axios
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

 
  
 // Open the edit modal with album data
  const openEditModal = (albumId, albumTitle) => {
    setUpdateAlbumId(albumId);
    setUpdatedAlbumTitle(albumTitle);
    setShowEditModal(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setUpdateAlbumId(null);
    setUpdatedAlbumTitle('');
  };

  // Open the add modal
  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Close the add modal
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewAlbumTitle('');
  };

  // Add a new album using POST request
  const addAlbum = async () => {
    try {
      const response = await axios.post(API_URL, { title: newAlbumTitle });
      const newAlbum = { id: response.data.id, title: newAlbumTitle };
      setAlbums([...albums, newAlbum]);
      closeAddModal();
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  // Delete an album using DELETE request

const deleteAlbum = async (albumId) => {
    // Display a confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this album?");
    
    if (shouldDelete) {
      try {
        await axios.delete(`${API_URL}/${albumId}`);
        const updatedAlbums = albums.filter(album => album.id !== albumId);
        setAlbums(updatedAlbums);
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    }
  };



  // Update an album using PUT request

  const updateAlbum = async () => {
    // Display a confirmation dialog for changes
    const shouldUpdate = window.confirm("Are you sure you want to save changes to this album?");
    
    if (shouldUpdate) {
      try {
        await axios.put(`${API_URL}/${updateAlbumId}`, { title: updatedAlbumTitle });
        const updatedAlbums = albums.map(album =>
          album.id === updateAlbumId ? { ...album, title: updatedAlbumTitle } : album
        );
        setAlbums(updatedAlbums);
        closeEditModal();
      } catch (error) {
        console.error('Error updating album:', error);
      }
    }
  };


  // Render the component
  return (
    <div className="container">
      {/* Navigation bar */}
      <nav className="navbar">
        <h1>Album Manager</h1>
        <button onClick={openAddModal}>Add Album</button>
      </nav>
      {/* Album list */}
      <ul className="album-list">
        {albums.map(album => (
          <li key={album.id} className="album-item">
            <span>{album.title}</span>
            <div className="album-actions">
              <button onClick={() => openEditModal(album.id, album.title)}>Edit</button>
              <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Edit modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Album</h2>
            <input
              type="text"
              value={updatedAlbumTitle}
              onChange={e => setUpdatedAlbumTitle(e.target.value)}
            />
            <button onClick={updateAlbum}>Save Changes</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
      {/* Add modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Album</h2>
            <input
              type="text"
              value={newAlbumTitle}
              onChange={e => setNewAlbumTitle(e.target.value)}
              placeholder="Album Title"
            />
            <button onClick={addAlbum}>Add Album</button>
            <button onClick={closeAddModal}>Cancel</button>
          </div>
        </div>
      )}

        {albums.map(album => (
        <li key={album.id} className="album-item">
            <span>{album.title}</span>
            <div className="album-actions">
            <button onClick={() => openEditModal(album.id, album.title)}>Edit</button>
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            </div>
        </li>
        ))}

    </div>
  );
}

export default AlbumManager;
