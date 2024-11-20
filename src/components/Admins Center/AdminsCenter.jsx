import React, { useEffect, useState } from "react";
import { auth, db } from "./../../constants/database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import "./AdminsCenter.css";

const AdminCenter = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Ensure the "doc" and Firestore path are correctly defined
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists() && userDocSnap.data().isAdmin) {
                        setIsAdmin(true);
                        await fetchUsers(); // Fetch users if admin
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
            setLoading(false); // Stop loading in all cases
        });

        return () => unsubscribe();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersSnapshot = await getDocs(collection(db, "users"));
            const userList = usersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading Database</p>
            </div>
        );;
    }

    if (!isAdmin) {
        return (
            <div className="not-authorized">
                <h2>You are not authorized to access this page.</h2>
            </div>
        );
    }

    return (
        <div className="admin-center">
            <h1>Administration Center</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName || "N/A"}</td>
                            <td>{user.lastName || "N/A"}</td>
                            <td>{user.username || "N/A"}</td>
                            <td>{user.email || "N/A"}</td>
                            <td>{user.gender || "N/A"}</td>
                            <td>{user.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCenter;
