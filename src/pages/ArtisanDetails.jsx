import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
// const dummyArtisans = Array.from({ length: 50 }, (_, i) => ({
//   id: (i + 1).toString(),
//   name: `Artisan ${i + 1}`,
//   skill: ['Plumber', 'Electrician', 'Carpenter', 'Mechanic', 'Painter', 'Tailor'][i % 6],
//   region: ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Enugu', 'PH'][i % 6],
//   phone: `080${Math.floor(10000000 + Math.random() * 89999999)}`,
//   email: `artisan${i + 1}@example.com`,
//   dob: `199${i % 10}-0${(i % 9) + 1}-15`,
//   address: `House ${i + 1}, Main Street, ${['Ikeja', 'Wuse', 'Mokola', 'Nasarawa'][i % 4]}`,
//   identification: `ID-${100000 + i}`,
//   image: `https://randomuser.me/api/portraits/men/${i % 60}.jpg`,
//   recentWork: Array.from({ length: 6 }, (_, j) => `https://source.unsplash.com/random/400x300?sig=${i * 10 + j}`)
// }));

const ArtisanDetails = () => {
    const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [username, setUsername] = useState('');


    useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const res = await axios.get(`https://artisan-hub-e5io.onrender.com/${id}`);
        setArtisan(res.data.artisan);
        setComments(res.data.comments);
        console.log('res.data', res.data.artisans);
        console.log('res.comments', res.data.comments)
        
      } catch (err) {
        console.error('Error fetching artisan:', err);
      }
    };
    fetchArtisan();
  }, [id]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !userComment) return;

    try {
      const res = await axios.post(`https://artisan-hub-e5io.onrender.com/${id}/comment`, {
        user: username,
        comment: userComment,
        rating: userRating,
      });
      setComments(prev => [...prev, res.data]);
      setUserComment('');
      setUserRating(5);
      setUsername('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  }

  if (!artisan) return <div>Loading...</div>;

  return (
    <div className="artisan-details-wrapper">
      <div className="artisan-details-container">
        <div className="artisan-card">
          <img src={`https://artisan-hub-e5io.onrender.com/${artisan.profileImage}`}  alt={artisan.name} className="artisan-img" />
          <h2>{artisan.fullName}</h2>
          <p className="artisan-skill"><FaWrench /> {artisan.skill}</p>
          <div className="artisan-info">
            <p><FaMapMarkerAlt /> Location: <strong>{artisan.location}</strong></p>
            <p><FaToolbox /> Skill: <strong>{artisan.skill}</strong></p>
            <p><FaPhone /> Phone Number: <strong>{artisan.phoneNumber}</strong></p>
            <p><FaEnvelope /> Email: <strong>{artisan.email}</strong></p>
            <p><FaCalendarAlt /> Date of Birth: <strong>{artisan.dob}</strong></p>
            <p><FaIdBadge /> ID Number: <strong>{artisan.bvn}</strong></p>
            <p><FaMapMarkerAlt /> Address: <strong>{artisan.address}</strong></p>
          </div>
        </div>
      </div>

      {/* 🖼️ Recent Work Images */}
      <div className="recent-work-section">
        <h3>Recent Work</h3>
           <div className="recent-work-section">
        <h3>Recent Work</h3>
        <div className="recent-work-gallery">
             {artisan.worksImage?.map((img, i) => (
              <img
                key={i}
                src={`https://artisan-hub-e5io.onrender.com/${img}`} 
                alt={`Work ${i + 1}`}
                className='work-image'
              />
            ))}
          </div>
      </div>
      </div>
    <div className="comment-rating-container">
  <h3>Comments</h3>

  <div className="rating-summary">
    {comments.length > 0 ? `Total Comments: ${comments.length}` : 'No comments yet.'}
  </div>

  <form onSubmit={handleSubmit} className="comment-form">
    <input
      type="text"
      placeholder="Your name"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <textarea
      placeholder="Leave a comment..."
      value={userComment}
      onChange={(e) => setUserComment(e.target.value)}
      required
    />
    <div className="star-rating">
      <select value={userRating} onChange={(e) => setUserRating(Number(e.target.value))}>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>
    <button type="submit">Submit Comment</button>
  </form>

  <div className="comment-list">
    {comments.map((c, idx) => (
      <div key={idx} className="comment-item">
        <p><strong>{c.user}</strong></p>
        <div className="comment-stars">
          {'⭐'.repeat(c.rating)}
        </div>
        <p>{c.comment}</p>
      </div>
    ))}
  </div>
</div>


      {/* 🔥 Comment & Rating Component */}
      {/* <CommentRating artisanId={artisan.id} /> */}
      
    </div>
  );
};

export default ArtisanDetails;
