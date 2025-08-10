import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userprofile.css';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

  const handleEdit = () => {
  navigate('/edit-profile');
};


const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token'); // or wherever you store your token
    const response = await axios.delete('https://artisan-hub-e5io.onrender.com/profile/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(response.data.message);
    localStorage.removeItem('token'); // log out user
    navigate('/register'); // redirect to register or login page
  } catch (error) {
    console.error(error);
    alert('Error deleting profile');
  }
};

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://artisan-hub-e5io.onrender.com/profile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      console.log('res.data:', res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  fetchProfile();
}, []);





  return (
    <div className="profile-container">
    {user ? (
               <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://artisan-hub-e5io.onrender.com/${user.profileImage}`} 
            alt="Profile"
            className="profile-img"
          />
          
          <div className="profile-info">
            <h2>{user.fullName}</h2>
            {/* <p className='gender'>{user.gender}</p> */}
            <p className="bio">{user.bio} | {user.experience}</p>
            <p className="skill">🛠️ Skills: {user.skill}</p>
            <p className="location">📍 {user.location}</p>
            <p className="address">🏠 {user.address}.</p>
             <span className="rating">⭐ {user.rate || 'N/A'}</span>
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact</h3>
          <p>📞 {user.phoneNumber}</p>
          <p>✉️ {user.email}</p>
        </div>

        <div className="works-section">
          <h3>My Works</h3>
          <div className="works-gallery">
             {user.worksImage?.map((img, i) => (
              <img
                key={i}
                src={`https://artisan-hub-e5io.onrender.com/${img}`} 
                alt={`Work ${i + 1}`}
              />
            ))}
          </div>
        </div>
            <div className="profile-actions">
          <button onClick={handleEdit} className="edit-btn">Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      </div>
    ) : (
        <p></p>
    )}
    </div>
  );
};

export default UserProfile;

