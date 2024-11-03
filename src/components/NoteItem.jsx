import { Link } from "react-router-dom";

const NoteItem = ({ note }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <Link to={`/notes/${note.noteId}`}>
        <h2 className="text-lg font-semibold">{note.title}</h2>
        <p className="text-gray-600">{note.content.slice(0, 100)}...</p>
        <p className="text-sm text-gray-500">Subject: {note.subject}</p>
      </Link>
    </div>
  );
};

export default NoteItem;
