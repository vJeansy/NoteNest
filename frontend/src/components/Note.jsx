import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Fab } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal component

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedContent, setUpdatedContent] = useState(props.content);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  function handleDelete() {
    props.onDelete(props.id);
    setOpenModal(true); // Open the modal when delete is confirmed
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    props.onEdit(props.id, updatedTitle, updatedContent); // Send updated note
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div className="edit-note">
          <input type="text" value={updatedTitle} name="title" onChange={(e) => setUpdatedTitle(e.target.value)} />
          <hr />
          <textarea value={updatedContent} name="content" onChange={(e) => setUpdatedContent(e.target.value)} rows="3" />
          <Fab aria-label="Save" onClick={handleSave}>
            <SaveIcon />
          </Fab>
        </div>
      ) : (
        <>
          <h1>{props.title}</h1>
          <hr />
          <p>{props.content}</p>
          <Fab className="edit-icon" aria-label="Edit" onClick={handleEdit}>
            <EditIcon />
          </Fab>
          <Fab className="delete-icon" aria-label="Delete" onClick={() => setOpenModal(true)}>
            <DeleteIcon />
          </Fab>
          <ConfirmationModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              onConfirm={handleDelete} />
        </>
      )}
    </div>
  );
}

export default Note;