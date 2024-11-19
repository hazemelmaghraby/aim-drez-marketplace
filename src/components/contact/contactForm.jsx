import React, { useState } from "react";
import './ContactForm.css'; // Style file for the form
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com'; // Import EmailJS

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address.";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Sending email using EmailJS
            emailjs
                .sendForm(
                    'service_n4uqz6l',   // Your Service ID (from EmailJS)
                    'template_vnr8kie',  // Your Template ID (from EmailJS)
                    e.target,            // The form DOM element
                    'fOm9S9tQ6EdzzSllB'       // Your User ID (from EmailJS)
                )
                .then(
                    (result) => {
                        toast.success("Message sent successfully!");
                        setFormData({ name: "", email: "", subject: "", message: "" });
                        console.log(result.text);
                    },
                    (error) => {
                        toast.error("Error sending message. Please try again later.");
                        console.error("EmailJS error:", error.text);
                    }
                );
        } else {
            toast.error("Please fill out all fields correctly.");
        }
    };

    return (
        <section className="contact-form-section">
            <div className="contact-form-container">
                <h2 className="contact-form-title">Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                            placeholder="Enter the subject"
                        />
                        {errors.subject && <small className="text-danger">{errors.subject}</small>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`form-control ${errors.message ? "is-invalid" : ""}`}
                            placeholder="Enter your message"
                            rows="5"
                        />
                        {errors.message && <small className="text-danger">{errors.message}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Send Message
                    </button>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default ContactForm;
