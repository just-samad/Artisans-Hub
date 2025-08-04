import React from 'react';
import './About.css';
import aboutImg from '../assets/artisan.jpg'; // Any clean SVG or PNG visual

const AboutPage = () => {
  return (
    <div className="about-wrapper">
      <section className="about-hero">
        <div className="about-content">
          <h1>About Artisan Hub</h1>
          <p>
            Artisan Hub is a trusted platform that connects people to skilled artisans across Nigeria.
            We provide visibility for artisans and easy access for clients seeking reliable, verified, and professional help.
          </p>
        </div>
        <img src={aboutImg} alt="About Artisan Hub" className="about-image" />
      </section>

      <section className="about-values">
        <h2>Our Core Principles</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Empowerment</h3>
            <p>We help artisans gain exposure and earn with dignity through tech-driven visibility.</p>
          </div>
          <div className="value-card">
            <h3>Trust</h3>
            <p>Only verified artisans are listed. No scams. No uncertainty. Just skill and reliability.</p>
          </div>
          <div className="value-card">
            <h3>Access</h3>
            <p>Clients can search by region and skill to find help that’s close, capable, and quick to reach.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
