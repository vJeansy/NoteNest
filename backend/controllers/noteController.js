import db from "../config/db.js";

export const getNotes = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes WHERE user_id = $1::int", [req.user.userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createNote = async (req, res) => {
    const {title, content} = req.body;
    const userId = req.user.userId;
    try {
        const result = await db.query("INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, content, userId]
        );
        res.status(201).json({ message: "Note created successfully", note: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const {title, content} = req.body;
    const userId = req.user.userId;
    try {
        const result = await db.query("UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
            [title, content, id, userId]
        );
        if(!result.rows.length) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        res.json({ message: "Note updated successfully", note: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
      const result = await db.query("DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *", [id, userId]);
      if (!result.rows.length) return res.status(404).json({ error: "Note not found or unauthorized" });
        // If the note was found and deleted, send a success message
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
