import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const DarkHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const heroImages = [
    'hero/hero1.jpg',
    'hero/hero2.jpg',
    'hero/hero3.png',
    'hero/hero4.jpg',
    'hero/hero5.jpg'
  ];

  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/category/${searchTerm.toLowerCase()}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="services/logo.png" alt="WayToWork Logo" className="logo-img" />
          Way to Work
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImages[heroImageIndex]})` }}
      >
        <div className="hero-text">
          <h1>Your Trusted Platform for Daily Wage Services</h1>
          <p>Connect with verified and skilled workers in your locality, anytime.</p>
          <button className="cta-button" onClick={() => navigate('/register')}>
            Get Started
          </button>
        </div>
      </section>

      {/* Search Section */}
      <div className="search-wrapper">
        <div className="search-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services like plumber, painter..."
          />
          <button type="button" onClick={handleSearch}>Search</button>
        </div>

        <div className="service-icons">
          {[
            { name: 'Plumber', image: '/services/plumber.jpg' },
            { name: 'Electrician', image: '/services/electrician.jpg' },
            { name: 'Painter', image: '/services/painter.jpg' },
            {name : 'carpenter',image:'/services/carpenter.jpg'},
            {name : 'Cleaner',image:'/services/cleaning.jpg'}
          ].map((service, index) => (
            <div key={index} className="service-card" onClick={() => handleCategoryClick(service.name)}>
              <img src={service.image} alt={service.name} />
              <span>{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Marquee */}
      <div className="text-marquee-wrapper">
        <div className="text-marquee">
          <span>
            “Fantastic service! Booking was super easy and quick.” &nbsp;&nbsp;&nbsp;
            “The workers were professional and punctual. Highly recommend!” &nbsp;&nbsp;&nbsp;
            “Very reliable support and transparent pricing.” &nbsp;&nbsp;&nbsp;
            “Loved how I could track all my bookings in one place.” &nbsp;&nbsp;&nbsp;
            “Safe, certified workers and excellent service quality.”
          </span>
        </div>
      </div>

      {/* Features */}
      <section className="features">
        <h2>Why Choose WayToWork?</h2>
        <div className="feature-grid">
          {[
            "Verified and Skilled Workers",
            "Easy Booking System",
            "Ratings and Reviews",
            "Location-Based Search",
            "Secure Payments",
          ].map((feature, index) => (
            <div key={index} className={`feature-card bg${index % 2 === 0 ? '1' : '2'}`}>
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Join Our Community of Trusted Workers</h2>
        <p>Start working with verified clients and grow your income today!</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 WayToWork. All rights reserved.</p>
        <div className="social-icons">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </div>
      </footer>
    </div>
  );
};

export default DarkHome;
