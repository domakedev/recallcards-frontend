import { forwardRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children }, ref) => {
  return ReactDOM.createPortal(
    <div
      ref={ref}
      style={{ display: "none" }}
      className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 text-white"
    >
      {children}
    </div>,
    document.body
  );
});

Modal.displayName = "Modal";

export default Modal;
