import React, { useState, useEffect } from "react";
import { db, auth } from "./../../../constants/database/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ProfileConfig.css";
import male from "./../../../assets/male.png";
import female from "./../../../assets/female.png";
import maleAdmin from "./../../../assets/maleAdmin.png";
import femaleAdmin from "./../../../assets/femaleAdmin.png";

const ProfileConfig = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        birthDate: "",
        job: "",
        skills: "",
        address: "",
        nationality: "",
        religion: "",
        socialLevel: "",
        languages: "",
        username: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getProfilePicture = (userData) => {
        if (userData.isAdmin) {
            return userData.gender === "Male" ? maleAdmin : femaleAdmin;
        } else {
            if (userData.gender === "Male") {
                return male;
            } else if (userData.gender === "Female") {
                return female;
            }
            return defaultProfilePic;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        setUserInfo({
                            firstName: userData.firstName || "First Name",
                            lastName: userData.lastName || "Last Name",
                            profilePic: getProfilePicture(userData), // Set profilePic dynamically
                        });

                        setFormData((prev) => ({
                            ...prev,
                            username: userData.username,
                        }));
                    } else {
                        console.error("No document found for user:", user.uid);
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            } else {
                console.warn("No user is logged in.");
                setUserInfo(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;

            if (user) {
                await setDoc(doc(db, "usersInfo", user.uid), formData, { merge: true });
                toast.success("Profile information saved successfully!");
            }
        } catch (error) {
            toast.error("Error saving profile information: " + error.message);
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

    if (!userInfo) {
        return (
            <div className="user-profile">
                <h2 className="text-white">Please log in to edit and view your personal info.</h2>
            </div>
        );
    }

    return (
        <section className="profileConfig">
            <div className="profile-config bg-dark">
                <div className="user-info">
                    <img
                        src={userInfo.profilePic}
                        alt="Profile"
                        className="infoProfilePic"
                    />
                    <h2 className="user-name text-warning">
                        {userInfo.firstName} {userInfo.lastName}
                    </h2>
                </div>
                <h2 className="text-warning">Complete Your Profile</h2>
                <form onSubmit={handleSubmit} className="profile-config-form">
                    <div className="form-group">
                        <label htmlFor="birthDate">Birth Date</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job">Job</label>
                        <input
                            type="text"
                            id="job"
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your job"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <textarea
                            id="skills"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="List your skills (comma-separated)"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your nationality"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="religion">Religion</label>
                        <input
                            type="text"
                            id="religion"
                            name="religion"
                            value={formData.religion}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your religion"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="socialLevel">Social Level</label>
                        <input
                            type="text"
                            id="socialLevel"
                            name="socialLevel"
                            value={formData.socialLevel}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your social level"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="languages">Languages</label>
                        <textarea
                            id="languages"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="List the languages you know (comma-separated)"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter a username"
                            readOnly
                        />
                    </div>
                    {/* Add remaining fields here... */}
                    <button type="submit" className="btn btn-primary">
                        Save Profile
                    </button>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default ProfileConfig;
