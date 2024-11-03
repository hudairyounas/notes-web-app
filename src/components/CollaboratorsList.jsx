const CollaboratorsList = ({ collaborators }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold">Collaborators</h3>
      <ul>
        {collaborators.map((userId) => (
          <li key={userId} className="text-gray-700">
            {userId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorsList;
