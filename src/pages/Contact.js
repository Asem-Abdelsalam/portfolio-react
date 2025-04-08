import React, { useState } from 'react';

function Contact() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (name && email && message) {
      setFeedback('Message sent successfully.');
      e.target.reset();
    } else {
      setFeedback('Please fill in all fields.');
    }
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <main>
      <section className="section contact-section">
        <div className="container">
          <h2>Contact Me</h2>
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
              <span className="form-line"></span>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
              <span className="form-line"></span>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" required></textarea>
              <span className="form-line"></span>
            </div>
            <button type="submit" className="send-button">Send Message</button>
          </form>
          <p id="form-feedback" className={`form-feedback ${feedback ? 'show' : ''}`}>{feedback}</p>
        </div>
      </section>
    </main>
  );
}

export default Contact;