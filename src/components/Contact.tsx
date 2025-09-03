import type { FC } from "react";
import { memo } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Contact.css";

const Contact: FC = memo(() => {
  const { contactInfo } = usePortfolio();

  return (
    <section id="contact" className="contact">
      <div className="contact-container container">
        <div className="section-header">
          <h2 className="section-title gaming-title animate-on-scroll">Contact Protocol</h2>
        </div>

        <div className="contact-content">
          <div className="contact-info glass-card animate-on-scroll">
            <div className="contact-intro">
              <h3 className="gaming-subtitle">Let's Start a Mission</h3>
              <p>
                Ready to collaborate on cutting-edge projects? Whether you need a frontend warrior or want to discuss the latest tech innovations, I'm here to help bring your
                digital visions to life.
              </p>
            </div>

            <div className="contact-details">
              <a href={`mailto:${contactInfo.email}`} className="contact-item contact-item-1">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <span>{contactInfo.email}</span>
                </div>
                <div className="contact-item-bg"></div>
              </a>

              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone}`} className="contact-item contact-item-2">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="contact-item-bg"></div>
                </a>
              )}

              {contactInfo.linkedin && (
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-item contact-item-3">
                  <div className="contact-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <span>Connect with me</span>
                  </div>
                  <div className="contact-item-bg"></div>
                </a>
              )}

              {contactInfo.github && (
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="contact-item contact-item-4">
                  <div className="contact-icon">
                    <FaGithub />
                  </div>
                  <div className="contact-text">
                    <h4>GitHub</h4>
                    <span>View my code</span>
                  </div>
                  <div className="contact-item-bg"></div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
