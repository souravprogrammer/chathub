import React from "react";

function Message({ text, self = false, type }) {
  const style = self
    ? "bg-slate-300/20 rounded-r-lg"
    : " bg-primary-foreground/90 rounded-l-lg text-white";

  if (type === "status") {
    return <div className="p-1 text-center">{text}</div>;
  }
  return <div className={"rounded-t-lg p-4 m-2 " + style}>{text}</div>;
}

export default Message;
