import React, { useState, useEffect } from "react";
import IsNoteValid from "../utils/IsNoteValid";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import AlertModal from "./AlertModal";
import { Collapse } from '@mui/material';

function CreateArea(props) {
  const [isZoom, setIsZoom] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (!IsNoteValid(note)) {
      setAlertMessage("Please fill in both title and content.");
      return;
    }

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    setAlertMessage("");
  }

  function handleClick() {
    setIsZoom(true);
  }

  // Auto-close the alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
      return () => clearTimeout(timer); // cleanup on unmount or message change
    }
  }, [alertMessage]);
  return (
    <div>
      <form className="create-note">
        {isZoom && (
          <input
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        )}
        <hr />
        <textarea
          onClick={handleClick}
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={isZoom ? "3" : "0"}
        />
        <Zoom in={isZoom}>
          <Fab color="primary" aria-label="add" onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      <div
    style={{
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1300,
    display: "flex",
    justifyContent: "flex-start",
  }}
>
  <Collapse in={!!alertMessage}>
    {alertMessage && (
      <AlertModal
        props={{ severity: "error" }}
        message={alertMessage}
        handleClose={() => setAlertMessage("")}
      />
    )}
  </Collapse>
</div>
    </div>
  );
}

export default CreateArea;
// Note: The `IsNoteValid` function is assumed to be a utility function that checks if the note has valid title and content.