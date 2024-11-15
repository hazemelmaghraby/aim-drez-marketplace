import React, { useEffect, useState } from 'react';
import { auth, db } from './../../constants/database/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';
import logo from './../../assets/logo.jpg';
import userPlaceholder from './../../assets/logo.jpg'; // A placeholder image for the profile picture
import { websiteName } from './../../constants/website/BasicInfo';
import { doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "User",
    });

    useEffect(() => {
        const fetchUser = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                try {
                    const userDoc = await getDoc(doc(db, "users", uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserData({
                            username: data.username || "User",
                            firstName: capitalizeFirstLetter(data.firstName || "User"),
                            lastName: capitalizeFirstLetter(data.lastName || ""),
                            email: data.email || "Email hidden",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLgnBtn = (e) => {
        e.preventDefault();
        window.location.href = '/login';
    };

    const handleProfileName = (e) => {
        e.preventDefault();
        window.location.href = '/profile';
    };

    const handleSignBtn = (e) => {
        e.preventDefault();
        window.location.href = '/register';
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <section className="NavbarMain">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand websiteTitle" href="/">
                        <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top logo" />
                        {websiteName}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                                    <button className="btn btn-primary me-3 mainLgnBtn" type="submit" onClick={handleSignBtn}>Sign up</button>
                                    <button className="btn btn-primary" type="submit" onClick={handleLgnBtn}>Login</button>
                                </>
                            ) : (
                                <div className="profile-container d-flex align-items-center">
                                    <ul className="dropdown-menu dropDownMenu dropdown-menu-end profile-dropdown">
                                        <li className="dropdown-header text-center">
                                            <img
                                                src={user.photoURL || userPlaceholder}
                                                alt="Profile"
                                                className="rounded-circle"
                                                width="60"
                                                height="60"
                                            />
                                            <p className="mt-2 text-white fw-bold userRealNames" onClick={handleProfileName}>{`${userData.firstName} ${userData.lastName}`}</p>
                                            <small className="text-white text-opacity-75">{userData.email}</small>
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
                                            <a className="dropdown-item dropDownItem" href="/help">
                                                <i className="bi bi-question-circle me-2"></i> Help Center
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                                            </button>
                                        </li>
                                    </ul>
                                    <img
                                        src={user.photoURL || userPlaceholder}
                                        alt="Profile"
                                        className="profile-pic"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                                    />
                                    <span
                                        className="username ms-2"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ cursor: 'pointer', color: 'white', textTransform: 'uppercase' }}
                                    >
                                        {userData.username}
                                    </span>
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
