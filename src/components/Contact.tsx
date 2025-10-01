import type { FC } from 'react';
import { useMemo } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import './Contact.css';

interface ContactItem {
  readonly href: string;
  readonly icon: IconType;
  readonly title: string;
  readonly text: string;
  readonly className: string;
  readonly target?: '_blank';
  readonly rel?: 'noopener noreferrer';
}

const Contact: FC = () => {
  const { contactInfo } = usePortfolio();

  const contactItems = useMemo((): ContactItem[] => {
    const items: ContactItem[] = [
      {
        href: `mailto:${contactInfo.email}`,
        icon: FaEnvelope,
        title: 'Email',
        text: contactInfo.email,
        className: 'contact-item-1',
      },
    ];

    if (contactInfo.phone)
      items.push({
        href: `tel:${contactInfo.phone}`,
        icon: FaPhone,
        title: 'Phone',
        text: contactInfo.phone,
        className: 'contact-item-2',
      });

    if (contactInfo.linkedin)
      items.push({
        href: contactInfo.linkedin,
        icon: FaLinkedin,
        title: 'LinkedIn',
        text: 'Connect with me',
        className: 'contact-item-3',
        target: '_blank',
        rel: 'noopener noreferrer',
      });

    if (contactInfo.github)
      items.push({
        href: contactInfo.github,
        icon: FaGithub,
        title: 'GitHub',
        text: 'View my code',
        className: 'contact-item-4',
        target: '_blank',
        rel: 'noopener noreferrer',
      });

    return items;
  }, [contactInfo]);

  return (
    <section id="contact" className="contact">
      <div className="contact-container container">
        <div className="section-header">
          <h2 className="section-title gaming-title animate-on-scroll">
            Contact Protocol
          </h2>
        </div>

        <div className="contact-content">
          <div className="contact-info glass-card animate-on-scroll">
            <div className="contact-intro">
              <h3 className="gaming-subtitle">Let's Start a Mission</h3>
              <p>
                Ready to collaborate on cutting-edge projects? Whether you need
                a frontend warrior or want to discuss the latest tech
                innovations, I'm here to help bring your digital visions to
                life.
              </p>
            </div>

            <div className="contact-details">
              {contactItems.map(item => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`contact-item ${item.className}`}
                  target={item.target}
                  rel={item.rel}
                >
                  <div className="contact-icon">
                    <item.icon />
                  </div>
                  <div className="contact-text">
                    <h4>{item.title}</h4>
                    <span>{item.text}</span>
                  </div>
                  <div className="contact-item-bg"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
