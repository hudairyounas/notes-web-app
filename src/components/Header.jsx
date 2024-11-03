import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Header = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md rounded mb-4">
      <h1 className="text-xl font-bold">Study Notes</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-blue-500 hover:underline">
              Create Note
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button
                  onClick={onLogout}
                  className="text-blue-500 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <div className="flex items-center">
          <img
            src={user.photoURL || "path/to/default-profile.png"} // Use a default profile image if none
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
