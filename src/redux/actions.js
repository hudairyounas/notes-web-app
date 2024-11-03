import {
  SET_USER,
  CLEAR_USER,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "./types";

// User actions
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Note actions
export const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes,
});

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  payload: note,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

// Optional: Asynchronous actions for notes (e.g., fetching from Firestore)
export const fetchNotes = () => async (dispatch) => {
  try {
    const notes = await fetchNotesFromService(); // Replace with your actual fetch function
    dispatch(setNotes(notes));
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    // Optionally dispatch an error action here
  }
};

// Example for handling a new note creation
export const createNote = (noteData) => async (dispatch) => {
  try {
    const newNote = await createNoteInService(noteData); // Replace with your actual create function
    dispatch(addNote(newNote));
  } catch (error) {
    console.error("Failed to create note:", error);
    // Optionally dispatch an error action here
  }
};
