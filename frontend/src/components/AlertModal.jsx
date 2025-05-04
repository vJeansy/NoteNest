import React from 'react';
import Alert from "@mui/material/Alert";

function AlertModal({ message, handleClose }) {
    return (
          message && (
            <Alert
              severity="warning"
              onClose={() => handleClose()}
              sx={{           minWidth: "250px",
                maxWidth: "400px",
                boxShadow: 3,
                borderRadius: 1, }}
            >
              {message}
            </Alert>
      )
    );
}

export default AlertModal;