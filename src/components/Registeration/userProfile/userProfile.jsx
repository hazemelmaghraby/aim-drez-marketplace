import React, { useEffect, useState } from "react";
import { auth, db } from "./../../../constants/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './UserProfile.css'; // Add styles for the profile page
import maleProfilePic from "./../../../assets/male.png";
import femaleProfilePic from "./../../../assets/female.png";
import defaultProfilePic from "./../../../assets/logo.jpg";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

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
            setLoading(false); // Set loading to false after data is fetched
        });

        return () => unsubscribe();
    }, []);

    const getProfilePicture = () => {
        if (userData.gender === "Male") {
            return maleProfilePic;
        } else if (userData.gender === "Female") {
            return femaleProfilePic;
        }
        return defaultProfilePic;
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="user-profile">
                <h2 className="text-white">Please log in to view your profile.</h2>
            </div>
        );
    }

    return (
        <div className="user-profile bg-dark">
            <div className="profile-card">
                <img
                    src={getProfilePicture()}
                    alt="Profile"
                    className="profile-pic"
                    width="150"
                    height="150"
                    style={{ borderRadius: "50%" }}
                />
                <h2 className="username">{userData.username || "User"}</h2>
                <p>
                    <strong>First Name:</strong> {userData.firstName || "N/A"}
                </p>
                <p>
                    <strong>Last Name:</strong> {userData.lastName || "N/A"}
                </p>
                <p>
                    <strong>Gender:</strong> {userData.gender || "N/A"}
                </p>
                <p>
                    <strong>Email:</strong> {userData.email || "N/A"}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
