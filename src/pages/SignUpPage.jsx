// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig"; // Adjust the import according to your Firebase setup
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions"; // Action to set user in Redux
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Dispatch user information to Redux
      dispatch(
        setUser({
          userId: user.uid,
          displayName: "User", // Default display name; can be updated later
          email: user.email,
        })
      );

      // Show a success message
      toast.success("Account created successfully!");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to create an account. Please try again.");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="bg-white p-4 rounded shadow-md">
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
          Sign Up
        </button>
      </form>
      <p className="ml-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={handleLogin}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
