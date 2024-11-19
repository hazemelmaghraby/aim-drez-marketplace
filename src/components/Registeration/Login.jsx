import React, { useState } from 'react';
import { auth } from './../../constants/database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Registeration.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleFirebaseAuthError = (errorCode) => {
        let errorMessage;
        switch (errorCode) {
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid. Please enter a valid email.";
                break;
            case 'auth/user-disabled':
                errorMessage = "This account has been disabled. Contact support for assistance.";
                break;
            case 'auth/user-not-found':
                errorMessage = "No account found with this email. Please check or sign up if you don’t have an account.";
                break;
            case 'auth/wrong-password':
                errorMessage = "Incorrect password. Please try again or reset your password if you’ve forgotten it.";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Too many unsuccessful login attempts. Please try again later or reset your password.";
                break;
            case 'auth/invalid-credential':
                errorMessage = "Invalid Email Or Password.";
                break;
            default:
                errorMessage = "An unknown error occurred. Please Contact The Customer Support If The Error Keeps Showing";
        }
        toast.error(errorMessage);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully logged in!"), { autoClose: 2000 };
            setTimeout(() => {
                window.location.href = 'profile';
            }, 2500);
            // Optionally redirect the user or handle login success here
        } catch (error) {
            console.error("Login error:", error); // Logs the full error response to the console
            handleFirebaseAuthError(error.code);
        }
    };

    return (
        <>
            <section className='Login'>
                <div className="loginFormDiv w-50 container">
                    <h1 style={{ display: 'block' }}>Login</h1>
                    <p className='loginPara'>Welcome back! Please login to your account.</p>
                    <br />
                    <form className='login' onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control emailInput"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control passInput"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                /> Remember me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Sign in</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default Login;
