import React from 'react';
import { useParams } from 'react-router-dom';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdBadge,
  FaWrench,
  FaCalendarAlt,
  FaToolbox
} from 'react-icons/fa';
import './ArtisanDetails.css';
import CommentRating from '../components/CommentRating';

// Dummy artisan list (simulate real DB later)
const dummyArtisans = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Artisan ${i + 1}`,
  skill: ['Plumber', 'Electrician', 'Carpenter', 'Mechanic', 'Painter', 'Tailor'][i % 6],
  region: ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Enugu', 'PH'][i % 6],
  phone: `080${Math.floor(10000000 + Math.random() * 89999999)}`,
  email: `artisan${i + 1}@example.com`,
  dob: `199${i % 10}-0${(i % 9) + 1}-15`,
  address: `House ${i + 1}, Main Street, ${['Ikeja', 'Wuse', 'Mokola', 'Nasarawa'][i % 4]}`,
  identification: `ID-${100000 + i}`,
  image: `https://randomuser.me/api/portraits/men/${i % 60}.jpg`,
  recentWork: Array.from({ length: 6 }, (_, j) => `https://source.unsplash.com/random/400x300?sig=${i * 10 + j}`)
}));

const ArtisanDetails = () => {
  const { id } = useParams();
  const artisan = dummyArtisans.find((a) => a.id === id);

  if (!artisan) {
    return <div className="artisan-not-found">Artisan not found 😞</div>;
  }

  return (
    <div className="artisan-details-wrapper">
      <div className="artisan-details-container">
        <div className="artisan-card">
          <img src={artisan.image} alt={artisan.name} className="artisan-img" />
          <h2>{artisan.name}</h2>
          <p className="artisan-skill"><FaWrench /> {artisan.skill}</p>
          <div className="artisan-info">
            <p><FaMapMarkerAlt /> Region: <strong>{artisan.region}</strong></p>
            <p><FaToolbox /> Skill: <strong>{artisan.skill}</strong></p>
            <p><FaPhone /> Phone: <strong>{artisan.phone}</strong></p>
            <p><FaEnvelope /> Email: <strong>{artisan.email}</strong></p>
            <p><FaCalendarAlt /> Date of Birth: <strong>{artisan.dob}</strong></p>
            <p><FaIdBadge /> ID Number: <strong>{artisan.identification}</strong></p>
            <p><FaMapMarkerAlt /> Address: <strong>{artisan.address}</strong></p>
          </div>
        </div>
      </div>

      {/* 🖼️ Recent Work Images */}
      <div className="recent-work-section">
        <h3>Recent Work</h3>
        <div className="recent-work-gallery">
          {artisan.recentWork.map((img, idx) => (
            <a href={img} target="_blank" rel="noopener noreferrer" key={idx}>
              <img src={img} alt={`Work ${idx + 1}`} className="work-image" />
            </a>
          ))}
        </div>
      </div>

      {/* 🔥 Comment & Rating Component */}
      <CommentRating artisanId={artisan.id} />
    </div>
  );
};

export default ArtisanDetails;
