import React from "react";

function Message({ text, self = false }) {
  const style = self
    ? "bg-[#F2F2F2] rounded-r-lg"
    : " bg-primary rounded-l-lg text-white";
  return <div className={"rounded-t-lg p-4 " + style}>{text}</div>;
}

export default Message;
