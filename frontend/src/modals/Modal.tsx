import React, { ReactNode } from 'react';
import { useModalContext } from '../context/modalContext';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, title, children }: ModalProps) => {
  const { closeModal } = useModalContext();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{title}</h2>
          <button className='close-button' onClick={handleCloseModal}>
            X
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
