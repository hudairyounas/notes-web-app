import {
  SET_USER,
  CLEAR_USER,
  SET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "./types";

const initialUserState = {
  user: null,
};

const initialNotesState = {
  notes: [],
};

// User reducer
export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// Notes reducer
export const notesReducer = (state = initialNotesState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return { ...state, notes: action.payload };
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.noteId === action.payload.noteId ? action.payload : note
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.noteId !== action.payload),
      };
    default:
      return state;
  }
};
