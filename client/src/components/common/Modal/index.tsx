import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ModalWrapper from './ModalWrapper';

interface ModalProps {
  isOpen: boolean;
  children: JSX.Element | React.ReactNode;
}

const modalRoot = (function defineModalRootElement() {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modalPortal';

  return modalDiv;
})();

const appRoot = document.body;

function Modal({ children, isOpen }: ModalProps) {
  const modalRef = useRef(modalRoot);

  useEffect(() => {
    const initialModalRef = modalRef.current;
    appRoot.appendChild(initialModalRef);

    return () => {
      if (appRoot.contains(initialModalRef)) appRoot.removeChild(initialModalRef);
    };
  }, []);

  return isOpen
    ? ReactDOM.createPortal(<ModalWrapper>{children}</ModalWrapper>, modalRef.current)
    : null;
}

export default Modal;
