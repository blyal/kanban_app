import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{title}</h2>
          <button className='close-button' onClick={onClose}>
            X
          </button>
        </div>
        <div className='modal-body'>
          {children}
          Hello
        </div>
      </div>
    </div>
  );
};

export { Modal };
