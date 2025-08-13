import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../style/About.css';


const About = () => {
  return (
    <div className="about-container">
      <Header />
      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="about-title">
            <span className="typing-text">Way to Work</span>
          </h1>
          <p className="about-subtitle">Connecting Talent with Opportunity</p>
        </section>

        {/* Intro Content */}
        <section className="about-content">
          <p>
            <strong>Way to Work</strong> is a digital platform that bridges the gap between skilled daily wage workers and clients in need of trustworthy services. Whether you require a plumber, electrician, mason, or painter, we connect you with professionals in your area—quickly and reliably.
          </p>
          <p>
            Our mission is two-fold: <strong>Empower workers</strong> with greater visibility and job opportunities, and <strong>assist clients</strong> in finding verified, rated service providers in their local area. We ensure transparency, security, and ease of use through verification, booking, and feedback mechanisms.
          </p>
        </section>

        {/* Core Values */}
        <section className="about-values">
          <h2>Our Core Values</h2>
          <ul>
            <li>🛠️ Empowering Skilled Workers</li>
            <li>🤝 Building Trust Through Ratings & Feedback</li>
            <li>📍 Location-Based Smart Matching</li>
            <li>🚀 Simple & Transparent Booking Process</li>
          </ul>
        </section>

        {/* Clients Section */}
        <section className="about-role-section">
          <h2>👨‍💼 For Clients</h2>
          <p>
            Clients can easily search and book skilled workers by filtering based on skill, location, and ratings. Verified profiles and real-time availability help in quick decision-making.
          </p>
          <ul>
            <li>Search and book workers based on city and skill category</li>
            <li>View ratings, reviews, and contact details</li>
            <li>Provide feedback after service to improve reliability</li>
            <li>Track booking history</li>
          </ul>
        </section>

        {/* Workers Section */}
        <section className="about-role-section">
          <h2>👷 For Workers</h2>
          <p>
            Workers can register and showcase their skills with verified documents. We help them gain visibility and connect with clients in their area without middlemen.
          </p>
          <ul>
            <li>Create profile with name, age, skill, location, and daily wage</li>
            <li>Upload verification documents</li>
            <li>Receive and manage bookings directly</li>
            <li>Get rated by clients to build a strong reputation</li>
          </ul>
        </section>

        {/* Admin Section */}
        <section className="about-role-section">
          <h2>🛡️ For Admins</h2>
          <p>
            Admins oversee the entire ecosystem—verifying worker documents, managing user roles, and monitoring platform activity to ensure compliance and trustworthiness.
          </p>
          <ul>
            <li>Approve or reject worker registrations based on verification</li>
            <li>Manage user roles and access rights</li>
            <li>Review platform analytics and booking reports</li>
            <li>Moderate feedback and resolve disputes</li>
          </ul>
        </section>

        {/* Services Provided */}
        <section className="about-services">
          <h2>🔧 Services We Offer</h2>
          <p>We connect clients with skilled professionals in the following categories:</p>
          <ul>
            <li>💡 Electricians – Wiring, repairs, installation</li>
            <li>🚰 Plumbers – Leakage fixing, pipe installations</li>
            <li>🎨 Painters – Home painting and texture work</li>
            <li>🧱 Masons – Construction and bricklaying</li>
            <li>🔨 Carpenters – Woodwork, furniture repairs</li>
            <li>🧹 Housekeeping – Cleaning services</li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="about-testimonials">
          <h2>🌟 What Our Users Say</h2>
          <div className="testimonial">
            <p>"This app helped me find a reliable plumber in just 15 minutes. Very easy to use!"</p>
            <span>- Ramesh, Hyderabad (Client)</span>
          </div>
          <div className="testimonial">
            <p>"Thanks to Way to Work, I now get regular bookings every week. My income has doubled!"</p>
            <span>- Ganesh, Electrician (Worker)</span>
          </div>
          <div className="testimonial">
            <p>"Managing the platform is simple and intuitive. I can verify workers in seconds."</p>
            <span>- Priya, Admin</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
