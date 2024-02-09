import React from "react";

function Message({ text, self = false, type, name }) {
  const style = self
    ? "bg-slate-300/20 rounded-r-lg"
    : " bg-primary-foreground/90 rounded-l-lg text-white";

  if (type === "status") {
    return (
      <div className="p-1 text-center">
        {"you are now chatting with "}{" "}
        <span className="font-bold text-indigo-500">{name}</span> {".Say hi!"}
      </div>
    );
  }
  return (
    <div className={"rounded-t-lg p-4 m-2 flex flex-col " + style}>
      <span className="text-sm font-semibold text-indigo-300">{name}</span>
      {text}
    </div>
  );
}

export default Message;
