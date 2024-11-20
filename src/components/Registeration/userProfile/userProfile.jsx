import React, { useEffect, useState } from "react";
import { auth, db } from "./../../../constants/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './UserProfile.css'; // Add styles for the profile page
import maleProfilePic from "./../../../assets/male.png";
import femaleProfilePic from "./../../../assets/female.png";
import defaultProfilePic from "./../../../assets/logo.jpg";
import maleAdmin from "./../../../assets/maleAdmin.png";
import femaleAdmin from "./../../../assets/femaleAdmin.png";

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
        if (userData.isAdmin) {
            // Admin profile pictures
            return userData.gender === "Male" ? maleAdmin : femaleAdmin;
        } else {
            // Regular user profile pictures
            if (userData.gender === "Male") {
                return maleProfilePic;
            } else if (userData.gender === "Female") {
                return femaleProfilePic;
            }
            return defaultProfilePic; // Fallback
        }
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

                {/* Profile Fields with Conditional Actions */}
                <p>
                    <strong>First Name:</strong> {userData.firstName ||
                        <span className="action-link" onClick={() => alert("Redirect to First Name update")}> Add your First Name</span>}
                </p>
                <p>
                    <strong>Last Name:</strong> {userData.lastName ||
                        <span className="action-link" onClick={() => alert("Redirect to Last Name update")}> Add your Last Name</span>}
                </p>
                <p>
                    <strong>Gender:</strong> {userData.gender ||
                        <span className="action-link" onClick={() => alert("Redirect to Gender update")}> Specify your Gender</span>}
                </p>
                <p>
                    <strong>Email:</strong> {userData.email ||
                        <span className="action-link" onClick={() => alert("Redirect to Email update")}> Add your Email</span>}
                </p>
                <p>
                    <strong>Birth Date:</strong> {userData.birthDate ||
                        <span className="action-link" onClick={() => alert("Redirect to Birth Date update")}> Provide your Birth Date</span>}
                </p>
                <p>
                    <strong>Job:</strong> {userData.job ||
                        <span className="action-link" onClick={() => alert("Redirect to Job update")}> Add your Job Title</span>}
                </p>
                <p>
                    <strong>Skills:</strong> {userData.skills ||
                        <span className="action-link" onClick={() => alert("Redirect to Skills update")}> Mention your Skills</span>}
                </p>
                <p>
                    <strong>Address:</strong> {userData.address ||
                        <span className="action-link" onClick={() => alert("Redirect to Address update")}> Provide your Address</span>}
                </p>
                <p>
                    <strong>Nationality:</strong> {userData.nationality ||
                        <span className="action-link" onClick={() => alert("Redirect to Nationality update")}> Specify your Nationality</span>}
                </p>
                <p>
                    <strong>Languages:</strong> {userData.languages ||
                        <span className="action-link" onClick={() => alert("Redirect to Languages update")}> Mention the Languages you know</span>}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
