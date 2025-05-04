function IsNoteValid(note) {
    return note.title.trim().length > 0 && note.content.trim().length > 0;
  }

  export default IsNoteValid;