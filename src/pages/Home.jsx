import React, { useEffect, useState } from 'react';
import './Home.css';
import { FaMapMarkerAlt, FaSearch, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [artisans, setArtisans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await axios.get('http://localhost:4000/artisan');
        setArtisans(res.data);
      } catch (err) {
        console.error('Failed to fetch artisans:', err);
      }
    };
    fetchArtisans();
  }, []);

  const filteredArtisans = artisans.filter(artisan =>
    artisan.fullName.toLowerCase().includes(search.toLowerCase()) &&
    (region ? artisan.location === region : true) &&
    (category ? artisan.skill.includes(category) : true)
  );

  const handleCardClick = (id) => {
    navigate(`/artisan/${id}`);
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to <span className="highlight">Artisan Hub</span></h1>
        <p>Your one-stop destination to find top-rated local artisans.</p>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Region</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Kano">Kano</option>
          <option value="Enugu">Enugu</option>
          <option value="Ibadan">Ibadan</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Tailor">Tailor</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Painter">Painter</option>
        </select>
      </div>
<div className="featured-section">
  <h2>🔥 Featured Artisans</h2>
  <div className="featured-cards">
    {filteredArtisans
      .filter(artisan => artisan.rate >= 4 && artisan.rate <= 5)
      .slice(0, 5)
      .map((artisan) => (
        <div
          className="featured-card"
          key={artisan._id}
          onClick={() => handleCardClick(artisan._id)}>
          <img src={`http://localhost:4000/${artisan.profileImage}`} alt={artisan.fullName} />
          <h3>{artisan.fullName}</h3>
          <p><FaUserTie /> {artisan.skill.join(', ')}</p>
          <p><FaMapMarkerAlt /> {artisan.location}</p>
          <span className="rating">⭐ {artisan.rate || 'N/A'}</span>
        </div>
      ))}
  </div>
</div>


      <div className="all-artisans-section">
        <h2>🔍 All Artisans</h2>
        <div className="artisan-grid">
          {filteredArtisans.map((artisan) => (
            <div
              className="artisan-card"
              key={artisan._id}
              onClick={() => handleCardClick(artisan._id)}
            >
              <img src={`http://localhost:4000/${artisan.profileImage}`} alt={artisan.fullName} />
              <h4>{artisan.fullName}</h4>
              <p>{artisan.skill.join(', ')} - {artisan.location}</p>
              <p className="small">⭐ {artisan.rate || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

