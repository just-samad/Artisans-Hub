import React, { useState } from 'react';
import './Profile.css';
import { FaSave } from 'react-icons/fa';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phoneNumber: '',
    email: '',
    address: '',
    skill: '',
    bvn: '',
    gender: '',
    location: '',
    bio: '',
    experience: '',
    rate: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'workImages') {
        formData.workImages.forEach((file) => {
          form.append('workImages', file);
        });
      } else if (key === 'profileImage' && formData.profileImage) {
        form.append('profileImage', formData.profileImage);
      } else if (key !== 'workImages' && key !== 'profileImage') {
        form.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/profile/update', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        console.log(result);
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
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
        <input type="tel" name="phoneNumber" onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" onChange={handleChange} required />

        <label>Skills</label>
        <input type="text" name="skill" onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Location</label>
        <input type="text" name="location" onChange={handleChange} required />

        <label>Bio</label>
        <textarea name="bio" onChange={handleChange} required />

        <label>Experience</label>
        <input type="text" name="experience" onChange={handleChange} required />

        <label>Rate</label>
        <input type="text" name="rate" onChange={handleChange} required />

        <label>Identification Number (BVN)</label>
        <input type="text" name="bvn" onChange={handleChange} required />

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

