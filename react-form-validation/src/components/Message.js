import React from "react";

const Message = props => {
  const { url, phone, name, email } = props;

  let message;
  if (url && phone && name) {
    message = <h3 className="text-center message">Form is Complete</h3>;
  } else {
    message = <h3 className="text-center message">Form is Incomplete</h3>;
  }
  return <div>{message}</div>;
};

export default Message;
