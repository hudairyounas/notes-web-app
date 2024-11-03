import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Reference to the notes collection
const notesCollection = collection(db, "notes");

// Fetch notes from Firestore
export const fetchNotes = async (userId) => {
  const noteSnapshot = await getDocs(notesCollection);
  const notesList = noteSnapshot.docs
    .map((doc) => ({
      noteId: doc.id,
      ...doc.data(),
    }))
    .filter((note) => note.createdBy === userId); // Only keep notes created by the current user
  return notesList;
};

// Add a new note to Firestore
export const createNote = async (noteData, userId) => {
  const docRef = await addDoc(notesCollection, {
    ...noteData,
    createdBy: userId,
  });
  return { noteId: docRef.id, ...noteData, createdBy: userId }; // Return the created note with its ID
};

// Update an existing note
export const updateNote = async (noteId, noteData) => {
  const noteDoc = doc(db, "notes", noteId);
  await updateDoc(noteDoc, noteData);
  return { noteId, ...noteData }; // Return the updated note
};

// Delete a note from Firestore
export const deleteNote = async (noteId) => {
  const noteDoc = doc(db, "notes", noteId);
  await deleteDoc(noteDoc);
};
