import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>ⓒ {year} NoteNest from Jeansy Pena</p>
      <p>All rights reserved</p>
    </footer>
  );
}

export default Footer;