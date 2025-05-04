import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";

function Header({ userImage, username, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  const firstLetter = username?.charAt(0).toUpperCase() || "U";

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
      <div className="logo" onClick={refreshPage}>
        <h1>NoteNest</h1>
        <p>Your personal note-taking app</p>
      </div>

      {/* User Avatar */}
      <div className="user-avatar">
      <Avatar
  src={userImage}
  alt="User"
  onClick={handleMenuOpen}
  sx={{
    cursor: "pointer",
    width: 55,
    height: 55,
    bgcolor: "#3f51b5", // default background color if no image
    color: "white",
    fontSize: 28,
    fontWeight: 500,
  }}
>
  {!userImage && firstLetter?.[0]?.toUpperCase()}
</Avatar>
</div>

      {/* Menu for Logout */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>Logout</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;