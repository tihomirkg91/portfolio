import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useCursorTrail } from '../../contexts/CursorTrailContext';
import './contactPage.css';

export const ContactPage = () => {
  const { setTrailType } = useCursorTrail();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  // Set cursor trail type for contact page
  useEffect(() => {
    setTrailType('contact');
    return () => setTrailType('default');
  }, [setTrailType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('');

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          'EmailJS configuration missing. Please check your .env file.'
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tihomirkg91@gmail.com',
        },
        publicKey
      );

      setStatus('Message sent successfully! 🚀');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-hero-content"
          >
            <h1 className="section-title">Contact Mission Control</h1>
            <p className="contact-subtitle">
              Send your transmission to the commander
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-form-container"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Pilot Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Communication Channel
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Mission Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  placeholder="Share your mission details..."
                  rows={5}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                className="submit-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSending ? 'Transmitting...' : 'Launch Transmission'}
              </motion.button>

              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`status-message ${
                    status.includes('successfully') ? 'success' : 'error'
                  }`}
                >
                  {status}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
