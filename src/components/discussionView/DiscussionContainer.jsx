import React from "react";
import DiscussionItem from "./DiscussionItem";
import MessageInput from "./MessageInput";

import Container from "react-bootstrap/Container";

const DiscussionContainer = props => {
  let parsedMessages = props.messages.map(message => {
    let parsedDate = parseDate(message.created);
    return (
      <DiscussionItem key={message.id} content={message.content} author={message.username} timestamp={parsedDate} />
    );
  });
  return (
    <Container>
      {parsedMessages}
      <MessageInput onSubmission={props.onSubmission} />
    </Container>
  );
};

export default DiscussionContainer;

// helper
const parseDate = dateString => {
  let parsed =
    dateString.split("T")[0].trim() +
    " " +
    dateString
      .split("T")[1]
      .split(".")[0]
      .trim();
  return parsed;
};
