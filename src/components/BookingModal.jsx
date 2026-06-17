import React, { useState } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Form submitted:', formData);
    alert('Thank you! Your appointment request has been submitted.');
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal__close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        
        <div className="booking-modal__header">
          <h3>Book an Appointment</h3>
          <p>Fill out the form below and our team will get back to you shortly to confirm your slot.</p>
        </div>

        <form className="booking-modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Jane Doe" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. jane@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. 9876543210" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Briefly describe your goals or any specific concerns..."></textarea>
          </div>
          
          <button type="submit" className="btn-primary w-100 mt-2">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
