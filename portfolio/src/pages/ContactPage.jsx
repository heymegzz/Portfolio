import { useState, useEffect } from 'react';
import TechBackground from '../components/TechBackground';
import CircuitPattern from '../components/CircuitPattern';
import './ContactPage.css';

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: 'envelope',
      title: 'Email',
      content: 'meghnanair7569@gmail.com',
      link: 'mailto:meghnanair7569@gmail.com'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <TechBackground page="contact" />
      <CircuitPattern page="contact" />
      <div className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2>GET IN TOUCH</h2>
          <div className="header-line"></div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'd love to hear from you! Whether you have a question, project idea, 
              or just want to say hello, feel free to reach out. I'm always open to 
              discussing new projects, creative ideas, or opportunities to be part of 
              your vision.
            </p>
            <p>
              As a passionate developer, I'm constantly looking to collaborate on exciting 
              projects and challenges. Your feedback and inquiries help me grow and improve.
            </p>
            
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="contact-icon">
                    <i className={`fas fa-${method.icon}`}></i>
                  </div>
                  <div className="contact-details">
                    <h4>{method.title}</h4>
                    {method.link ? (
                      <a href={method.link} target="_blank" rel="noopener noreferrer">
                        {method.content}
                      </a>
                    ) : (
                      <p>{method.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send a Message</h3>
            {submitSuccess ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <p>Your message has been sent successfully! I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`submit-btn ${submitting ? 'submitting' : ''}`}
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage; 