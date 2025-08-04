import React, { useState } from 'react';
import './Profile.css';
import { FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    contact: '',
    email: '',
    address: '',
    skill: '',
    idNumber: '',
    profileImage: null,
    workImages: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else if (name === 'workImages') {
      setFormData({ ...formData, workImages: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit to backend later
    console.log(formData);
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Update Your Artisan Profile</h2>

        <label>Full Name</label>
        <input type="text" name="fullName" onChange={handleChange} required />

        <label>Date of Birth</label>
        <input type="date" name="dob" onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="tel" name="contact" onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" onChange={handleChange} required />

        <label>Skill</label>
        <select name="skill" onChange={handleChange} required>
          <option value="">Select Skill</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Painter">Painter</option>
          <option value="Tailor">Tailor</option>
        </select>

        <label>Identification Number</label>
        <input type="text" name="idNumber" onChange={handleChange} required />

        <label>Profile Image</label>
        <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />

        <label>Recent Work Images (Max 6)</label>
        <input type="file" name="workImages" accept="image/*" multiple onChange={handleChange} />

        <button type="submit">
          <FaSave /> Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
