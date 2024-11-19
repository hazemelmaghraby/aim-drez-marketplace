import React, { useEffect, useState } from 'react';
import { auth, db } from './../../constants/database/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';
import logo from './../../assets/logo.jpg';
import userPlaceholder from './../../assets/logo.jpg'; // A placeholder image for default profile
import { websiteName } from './../../constants/website/BasicInfo';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import maleAdmin from './../../assets/maleAdmin.png';
import femaleAdmin from './../../assets/femaleAdmin.png';
import female from './../../assets/female.png';
import male from './../../assets/male.png';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});

    // Fetch user data when logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } else {
                setUser(null);
                setUserData({});
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => toast.success("Logged out successfully", { autoClose: 2000 }))
            .catch((error) => toast.error("Error logging out"));
    };

    const handleSignupRedirect = () => {
        toast.info("Redirecting to signup...", { autoClose: 2000 }); // Toast closes in 2 seconds
        setTimeout(() => {
            window.location.href = '/register';
        }, 2000); // Redirect after 2 seconds
    };

    // Determine profile picture
    const getProfilePicture = () => {
        if (userData.gender === 'Male') {
            return male;
        } else if (userData.gender === 'Female') {
            return female;
        }
        return userPlaceholder; // Default profile picture
    };

    return (
        <section className="NavbarMain">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand websiteTitle" href="/">
                        <img
                            src={logo}
                            alt="Logo"
                            width="30"
                            height="24"
                            className="d-inline-block align-text-top logo"
                        />
                        {websiteName}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link navLink active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navLink" href="#">Marketplace</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navLink" href="#">Social</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navLink" href="#">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navLink" href="#">Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex mainNavRegistrationBtns" role="search">
                            {!user ? (
                                <>
                                    <button
                                        className="btn btn-primary me-3 mainLgnBtn"
                                        onClick={() => {
                                            toast.info("Redirecting to signup...", { autoClose: 1000 });
                                            setTimeout(() => {
                                                window.location.href = '/register';
                                            }, 2000);
                                        }}
                                    >
                                        Sign up
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            toast.info("Redirecting to login...", { autoClose: 1100 });
                                            setTimeout(() => {
                                                window.location.href = '/login';
                                            }, 2000);
                                        }}
                                    >
                                        Login
                                    </button>
                                </>
                            ) : (
                                <div className="profile-container d-flex align-items-center">
                                    <img
                                        src={getProfilePicture()}
                                        alt="Profile"
                                        className="profile-pic"
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    />
                                    <span
                                        className="username ms-2"
                                        style={{
                                            color: 'white',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                        }}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {userData.username || "User"}
                                    </span>
                                    <ul className="dropdown-menu dropDownMenu dropdown-menu-end">
                                        <li className="dropdown-header text-center">
                                            <img
                                                src={getProfilePicture()}
                                                alt="Profile"
                                                className="rounded-circle"
                                                width="60"
                                                height="60"
                                            />
                                            <p className="mt-2 fw-bold text-white">
                                                {userData.firstName} {userData.lastName}
                                            </p>
                                            <small className="text-white">{user.email}</small>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item dropDownItem" href="/profile">
                                                <i className="bi bi-person-circle me-2"></i> My Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item dropDownItem" href="/settings">
                                                <i className="bi bi-gear me-2"></i> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item dropDownItem" href="/notifications">
                                                <i className="bi bi-bell me-2"></i> Notifications
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item dropDownItem" href="/contact">
                                                <i className="bi bi-question-circle me-2"></i> Help Center
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item logout-btn"
                                                onClick={handleLogout}
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </section>
    );
};

export default Navbar;
