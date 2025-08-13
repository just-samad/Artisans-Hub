import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/send-message", form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h1>Let’s Talk</h1>
        <p>Have a question or idea? Drop us a message and we’ll get right back to you.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Your Name</label>
          </div>

          <div className="input-field">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Your Email</label>
          </div>

          <div className="input-field">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <label>Your Message</label>
          </div>

          <button type="submit">Send Message</button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
