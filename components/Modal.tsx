import React from "react";
import ReactDOM from "react-dom";
const MODAL_STYLES = {
  positon: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 100,
};

export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale" />
      <div className="absolute top-2/4 left-1/2  bg-white z-50 p-12">
        <button onClick={onClose}> close modal</button>
        {children}
      </div>
    </>,
    document.body
  );
}
