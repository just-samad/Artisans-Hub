import React, { useState } from 'react';
import './Faq.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: 'How do I register as an artisan?',
    answer: 'Click on the signup button, select "Artisan", and fill out your full profile details including your skill, contact info, and work images.',
  },
  {
    question: 'Is there a fee to use Artisan Hub?',
    answer: 'No, Artisan Hub is completely free to use for both artisans and clients. We aim to empower connections without barriers.',
  },
  {
    question: 'How can users contact an artisan?',
    answer: 'Each artisan has a profile page showing their contact details including phone number and email address.',
  },
  {
    question: 'How does rating and feedback work?',
    answer: 'Users can leave real-time ratings and comments on any artisan profile after a job is completed. Ratings help improve visibility!',
  },
  {
    question: 'Can artisans update their profiles?',
    answer: 'Yes! Simply login and go to your profile page to edit your information, upload new work images, or change your contact details.',
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-wrapper">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
