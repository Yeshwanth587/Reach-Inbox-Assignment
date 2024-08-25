import React from "react";
import "../App.css";

const Modal = ({ isOpen,children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#848484] bg-opacity-60 flex justify-center items-center">
      <div className="bg-black rounded-md shadow-md relative">
        <div >{children}</div>
      </div>
    </div>
  );
};

export default Modal;

