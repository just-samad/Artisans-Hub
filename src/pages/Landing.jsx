import AOS from 'aos';
import 'aos/dist/aos.css';
import '../pages/Landing.css';
import heroImg from '../assets/artisan.jpg';
import { FaMapMarkerAlt, FaSearch, FaUserTie, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React, { useEffect, useState } from 'react';

const ROTATING_WORDS = ['Plumbers', 'Electricians', 'Carpenters', 'Painters', 'Tailors'];

const LandingPage = () => {
    const [artisans, setArtisans] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const res = await axios.get('https://artisan-hub-e5io.onrender.com/artisan');
                setArtisans(res.data);
            } catch (err) {
                console.error('Failed to fetch artisans:', err);
            }
        };
        fetchArtisans();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleRedirect = (path) => {
        window.location.href = path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const filteredArtisans = artisans.filter(artisan =>
        artisan.fullName.toLowerCase().includes(search.toLowerCase()) &&
        (region ? artisan.location === region : true) &&
        (category ? artisan.skill.includes(category) : true)
    );

    const handleCardClick = (id) => {
        navigate(`/artisan/${id}`);
    };

    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="nav-logo">ArtisanHub</div>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                    <li><a href="#featured" onClick={() => setIsMenuOpen(false)}>Artisans</a></li>
                    <li><a href="#how" onClick={() => setIsMenuOpen(false)}>How It Works</a></li>
                    <li><a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a></li>
                    <div className="nav-actions-mobile">
                        <button className="btn-secondary" onClick={() => { handleRedirect('/login'); setIsMenuOpen(false); }}>Login</button>
                        <button className="btn-primary" onClick={() => { handleRedirect('/signup'); setIsMenuOpen(false); }}>Sign Up</button>
                    </div>
                </ul>
                <div className="nav-actions">
                    <button className="btn-secondary" onClick={() => handleRedirect('/login')}>Login</button>
                    <button className="btn-primary" onClick={() => handleRedirect('/signup')}>Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <div className="hero-content" data-aos="fade-up">
                    <h1 className="hero-title">
                        Find Trusted <span className="rotating-text">{ROTATING_WORDS[currentIndex]}</span> Near You
                    </h1>
                    <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                        Artisan Hub connects service seekers with verified, rated, and reliable artisans across various fields.
                    </p>
                    <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400">
                        <button className="btn-primary" onClick={() => handleRedirect('/signup')}>Sign Up as Artisan</button>
                        <button className="btn-secondary" onClick={() => handleRedirect('/signup')}>Sign Up as User</button>
                    </div>
                </div>
                <div className="hero-image" data-aos="zoom-in">
                    <img src={heroImg} alt="Artisan illustration" />
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider" />

            {/* About Section */}
            <section className="section about-section" id="about" data-aos="fade-up">
                <h2>About Artisan Hub</h2>
                <p>
                    We bridge the gap between skilled artisans and those in need of reliable services—from plumbing to fashion design.
                    Safe, fast, and trusted connections.
                </p>
            </section>

            <div className="section-divider" />

            {/* Featured Artisans */}
            <section className="section featured-artisans" id="featured" data-aos="fade-up">
                <h2>Featured Artisans</h2>
                <div className="card-container">
                    {filteredArtisans
                        .filter(artisan => artisan.rate >= 4 && artisan.rate <= 5)
                        .slice(0, 5)
                        .map((artisan) => (
                            <div
                                className="featured-card"
                                key={artisan._id}
                                onClick={() => handleCardClick(artisan._id)}>
                                <img src={`https://artisan-hub-e5io.onrender.com/${artisan.profileImage}`} alt={artisan.fullName} className='card-img' />
                                <h3>{artisan.fullName}</h3>
                                <p><FaUserTie /> {artisan.skill.join(', ')}</p>
                                <p><FaMapMarkerAlt /> {artisan.location}</p>
                                <span className="rating">⭐ {artisan.rate || 'N/A'}</span>
                            </div>
                        ))}
                </div>
            </section>

            <div className="section-divider" />

            {/* How It Works */}
            <section className="section how-it-works" id="how">
                <h2 data-aos="fade-up">How It Works</h2>
                <div className="card-container">
                    {[
                        { title: '1. Sign Up', text: 'Create a free account as a user or artisan.' },
                        { title: '2. Connect', text: 'Browse artisans, view profiles, and reach out securely.' },
                        { title: '3. Rate & Review', text: 'Share your experience to help others find trusted service.' },
                    ].map((step, i) => (
                        <div className="card" key={i} data-aos="fade-up" data-aos-delay={i * 200}>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="section-divider" />

            {/* Testimonials */}
            <section className="section testimonials" id="testimonials" data-aos="fade-up">
                <h2>What Users Are Saying</h2>
                <div className="card-container">
                    <div className="card" data-aos="zoom-in">
                        <p>"I found a fantastic plumber in minutes. Artisan Hub made it so easy!"</p>
                        <h4>— Grace, Abuja</h4>
                    </div>
                    <div className="card" data-aos="zoom-in" data-aos-delay="200">
                        <p>"Reliable platform. I now get more clients as a carpenter."</p>
                        <h4>— Samuel, Ibadan</h4>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* Call to Action */}
            <section className="section cta" data-aos="zoom-in">
                <h2>Ready to Get Started?</h2>
                <p>Join Artisan Hub today and experience trusted service connections.</p>
                <button className="btn-primary" onClick={() => handleRedirect('/signup')}>Join Now</button>
            </section>

            {/* Footer */}
            <footer className="section footer" data-aos="fade-up">
                <p>&copy; {new Date().getFullYear()} Artisan Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;