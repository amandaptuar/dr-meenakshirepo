import React, { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="container contact-hero__inner">
          <div className="contact-hero__content">
            <span className="section-label">Get In Touch</span>
            <h1 className="contact-hero__title">Let's Start Your Transformation</h1>
            <p className="contact-hero__desc">
              Whether you have questions about our programs, need to book a consultation, or simply want to say hello—we're here for you. Reach out and our team will respond promptly.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="contact-section">
        <div className="container contact-section__inner">
          
          <div className="contact-info">
            <h2 className="contact-info__title">Contact Information</h2>
            <p className="contact-info__desc">
              We look forward to hearing from you. Use any of the methods below to reach out to Dr. Meenakshi's clinic.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="cd-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <strong>Clinic Address</strong>
                  <span>123 Wellness Avenue, Health District<br/>New Delhi, 110001</span>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="cd-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <strong>Phone Number</strong>
                  <span>+91 9608783691</span>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="cd-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <strong>Email Address</strong>
                  <span>hello@drmeenakshi.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3 className="form-title">Send a Message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" className="btn-primary w-100">Send Message</button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
