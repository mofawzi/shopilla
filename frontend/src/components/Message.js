import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ varient, children }) => {
  return (
    <Alert variant={varient}>
      {/* Just show children */}
      {children}
    </Alert>
  );
};

// Set a default varient for any message
Message.defaultProps = {
  varient: "info",
};

export default Message;
