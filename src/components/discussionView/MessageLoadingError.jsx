import React from "react";
import { Link } from "react-router-dom";

const MessageLoadingError = props => {
  if (props.message === "Authorization missing") {
    return (
      <p>
        Must be logged in to send messages. <Link to="/login">Go to login</Link>
      </p>
    );
  }

  return (
    <p>
      Error while loading messages, hombre! <Link to="/">Start page</Link>
    </p>
  );
};

export default MessageLoadingError;
