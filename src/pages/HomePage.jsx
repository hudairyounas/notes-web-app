import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotes } from "../redux/actions";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { fetchNotes } from "../services/notesService"; // Import your fetchNotes function
import { toast } from "react-toastify"; // Import toast for notifications

const HomePage = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const loadNotes = async () => {
      if (user) {
        try {
          const fetchedNotes = await fetchNotes(user.uid); // Pass user ID to fetchNotes
          dispatch(setNotes(fetchedNotes)); // Dispatch fetched notes to Redux
        } catch (error) {
          toast.error("Failed to fetch notes. Please try again."); // Show error message
        }
      }
    };

    loadNotes();
  }, [dispatch, user]);

  const handleLogout = async () => {
    await signOut(auth);
    // Add any additional logout handling if necessary
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header profileImage={user?.photoURL} onLogout={handleLogout} />
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Notes</h2>
        <Link
          to="/create"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Note
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.noteId} className="bg-white shadow-md rounded p-4">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <p className="text-gray-500">{note.subject}</p>
            <Link
              to={`/edit/${note.noteId}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
      {notes.length === 0 && (
        <p className="text-gray-500">No notes available. Create a new note!</p>
      )}
    </div>
  );
};

export default HomePage;
