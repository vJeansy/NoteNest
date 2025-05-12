import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "axios";
import { logError } from "../utils/LogError";

const API_URL = "https://notenest-f6h2.onrender.com/api/notes"; // Production URL
//const API_URL = "http://localhost:5000/api/notes"; // Local development URL

function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Retrieve username from local storage


  /** Fetch notes from the backend on component mount */
  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data.reverse()); // Reverse the order of notes
      } catch (error) {
        logError.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [token]); // Runs whenever the token changes

  /** Handle note creation by sending it to the backend */
  const addNote = async (newNote) => {
    try {
      await axios.post(API_URL, newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Immediately refresh notes from backend
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data.reverse()); // Reverse the order of notes
    } catch (error) {
      logError.error("Error creating note:", error);
    }
  };

  const updateNote = async (id, title, content) => {
    try {
      await axios.put(`${API_URL}/${id}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Ensure immediate UI update by modifying state
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, title, content } : note))
      );
    } catch (error) {
      logError.error("Error updating note:", error);
    }
  };

  /** Handle note deletion by removing it from the backend */
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      logError.error("Error deleting note:", error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div>
      <Header username={username} onLogout={logOut} />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onEdit={updateNote} // Pass the update function to Note component
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default NotesDashboard;