import React from "react";

const TextPill = ({ left, message }) => {
  if (left === true) {
    return (
      <div className="border-2 bg-green-200 border-none rounded-lg m-2 p-6">
        {message}
      </div>
    );
  } else {
    return (
      <div className="flex rounded-lg bg-blue-200 border-none justify-end border-2 m-2 p-6">
        {message}
      </div>
    );
  }
};

export default TextPill;
