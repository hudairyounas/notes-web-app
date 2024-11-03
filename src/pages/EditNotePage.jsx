import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateNote } from "../services/notesService"; // Import your updateNote function
import { toast } from "react-toastify"; // For notifications

const EditNotePage = () => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const navigate = useNavigate();

  // Local state for the note data, initialized with empty strings
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    subject: "",
  });

  useEffect(() => {
    // Fetch the note data based on noteId
    const noteToEdit = notes.find((note) => note.noteId === noteId);
    if (noteToEdit) {
      setNoteData(noteToEdit); // Only update if noteToEdit exists
    } else {
      toast.error("Note not found!");
      navigate("/"); // Redirect to home if the note is not found
    }
  }, [noteId, notes, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(noteId, noteData);
      toast.success("Note updated successfully!");
      navigate("/"); // Redirect to home after successful update
    } catch (error) {
      toast.error("Failed to update note. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title || ""} // Ensure value is always defined
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={noteData.content || ""} // Ensure value is always defined
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={noteData.subject || ""} // Ensure value is always defined
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNotePage;
