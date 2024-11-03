import CommentsSection from "../components/CommentsSection";

const NoteDetailPage = ({ note, comments }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p>{note.content}</p>
      <CommentsSection comments={comments} />
    </div>
  );
};

export default NoteDetailPage;
