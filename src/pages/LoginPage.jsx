// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig"; // Adjust the import according to your Firebase setup
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions"; // Action to set user in Redux
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Dispatch user information to Redux
      dispatch(
        setUser({
          userId: user.uid,
          displayName: user.displayName || "User", // Handle case if displayName is null
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      // Show a success message
      toast.success("Logged in successfully!");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "Failed to log in. Please check your credentials or sign up."
      );
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <button
          onClick={handleSignupRedirect}
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
