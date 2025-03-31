// src/pages/info/ContactPage.jsx
import  { useState } from "react";
import "./InfoPages.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    
    setFormStatus({
      submitted: true,
      error: null
    });
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <div className="contact-page">
      <div className="info-container">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-detail">
              <h3>Address</h3>
              <p>123 Luxury Avenue</p>
              <p>Downtown District</p>
              <p>Metro City, MC 10101</p>
            </div>
            
            <div className="contact-detail">
              <h3>Phone</h3>
              <p>Reservations: +1 (555) 123-4567</p>
              <p>Customer Service: +1 (555) 987-6543</p>
            </div>
            
            <div className="contact-detail">
              <h3>Email</h3>
              <p>info@luxuryhotel.com</p>
              <p>reservations@luxuryhotel.com</p>
            </div>
            
            <div className="contact-detail">
              <h3>Hours</h3>
              <p>Check-in: 3:00 PM</p>
              <p>Check-out: 12:00 PM</p>
              <p>Front Desk: 24/7</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            {formStatus.submitted ? (
              <div className="success-message">
                Thank you for your message! We'll get back to you shortly.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;