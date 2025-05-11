import React from 'react';
import Alert from "@mui/material/Alert";

function AlertModal({ props, message, handleClose }) {
    return (
          message && (
            <Alert
              severity={props.severity}
              onClose={() => handleClose()}
              sx={{
                minWidth: "250px",
                maxWidth: "400px",
                boxShadow: 3,
                borderRadius: 1,
                position: "absolute",
                bottom: "10px",
                right: "10px",
                zIndex: 1000,
                transition: "all 0.3s ease-in-out",}}
            >
              {message}
            </Alert>
      )
    );
}

export default AlertModal;