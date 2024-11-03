const CommentsSection = ({ comments }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.commentId} className="border-b pb-2 mb-2">
          <p className="font-medium">{comment.userName}:</p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
