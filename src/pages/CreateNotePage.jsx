import React, { useState } from "react";
import { createNote } from "../services/notesService";
import { toast } from "react-toastify";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = { title, content, createdAt: new Date() }; // Include any additional fields if needed
      await createNote(noteData);
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error(error.message); // Display the error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Create Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNotePage;
