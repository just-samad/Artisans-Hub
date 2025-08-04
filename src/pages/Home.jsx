import React, { useState } from 'react';
import './Home.css';
import { FaMapMarkerAlt, FaSearch, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Dummy artisan data generator
const generateDummyArtisans = () => {
  const categories = ['Plumber', 'Electrician', 'Tailor', 'Mechanic', 'Painter'];
  const regions = ['Lagos', 'Abuja', 'Kano', 'Enugu', 'Ibadan'];
  const artisans = [];

  for (let i = 1; i <= 50; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    artisans.push({
      id: i,
      name: `Artisan ${i}`,
      category: randomCategory,
      region: randomRegion,
      rating: (3 + Math.random() * 2).toFixed(1),
      image: `https://i.pravatar.cc/150?img=${i % 70}`,
    });
  }

  return artisans;
};

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const allArtisans = generateDummyArtisans();

  const filteredArtisans = allArtisans.filter(artisan =>
    artisan.name.toLowerCase().includes(search.toLowerCase()) &&
    (region ? artisan.region === region : true) &&
    (category ? artisan.category === category : true)
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
          {filteredArtisans.slice(0, 5).map((artisan) => (
            <div
              className="featured-card"
              key={artisan.id}
              onClick={() => handleCardClick(artisan.id)}
            >
              <img src={artisan.image} alt={artisan.name} />
              <h3>{artisan.name}</h3>
              <p><FaUserTie /> {artisan.category}</p>
              <p><FaMapMarkerAlt /> {artisan.region}</p>
              <span className="rating">⭐ {artisan.rating}</span>
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
              key={artisan.id}
              onClick={() => handleCardClick(artisan.id)}
            >
              <img src={artisan.image} alt={artisan.name} />
              <h4>{artisan.name}</h4>
              <p>{artisan.category} - {artisan.region}</p>
              <p className="small">⭐ {artisan.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
