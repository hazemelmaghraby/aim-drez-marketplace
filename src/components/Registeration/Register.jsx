// Register.js
import React, { useState } from "react";
import { auth, db } from "./../../constants/database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import './Registeration.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });
    const [formCompletion, setFormCompletion] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        updateProgress();
    };

    const updateProgress = () => {
        const fieldsFilled = Object.values(formData).filter(field => field !== "").length;
        const percentage = (fieldsFilled / Object.keys(formData).length) * 100;
        setFormCompletion(percentage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, username, email, password, confirmPassword, gender } = formData;

        if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !gender) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        };

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                username,
                email,
                gender,
                password
            });

            toast.success("Account created successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                gender: ""
            });
            setFormCompletion(0);
        } catch (error) {
            toast.error("Registration failed: " + error.message);
        }
    };

    return (
        <section className="registerFrom d-flex justify-content-center align-items-center">
            <div className="registerFormDiv w-50 container">
                <h1 className="mt-3">Register</h1>
                <p className='registerPara'>Create your account to get started.</p>

                <CircularProgressbar
                    value={formCompletion}
                    text={`${Math.round(formCompletion)}%`}
                    styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${formCompletion / 100})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7"
                    })}
                    className="circle"
                />

                <form className='register' onSubmit={handleSubmit}>
                    <div className="form-group d-flex">
                        <input type="text" name="firstName" className="form-control me-2" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group d-flex">
                        <input type="text" name="username" className="form-control me-2" placeholder="Username" value={formData.username} onChange={handleChange} required />
                        <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label className="me-3">
                            <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
                        </label>
                        <label className="ml-3">
                            <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                        </label>
                    </div>
                    <p className="alreadyHaveAccount">Already have an account? <a href="/login" className="loginLink">Login</a></p>
                    <button type="submit" className="btn btn-primary mt-1 mb-4">Register</button>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Register;
