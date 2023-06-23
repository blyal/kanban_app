import React, { ReactNode } from 'react';

enum ModalType {
  ADD_BOARD = 'ADD_BOARD',
  UPDATE_OR_DELETE_BOARD = 'UPDATE_OR_DELETE_BOARD',
  ADD_SECTION = 'ADD_SECTION',
  UPDATE_OR_DELETE_SECTION = 'UPDATE_OR_DELETE_SECTION',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

interface ModalContextApi {
  typeOfModalOpen: ModalType | null;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextApi | undefined>(
  undefined
);
ModalContext.displayName = 'ModalContext';

interface ModalProviderProps {
  children: ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [typeOfModalOpen, setTypeOfModalOpen] =
    React.useState<ModalType | null>(null);
  const openModal = (modalType: ModalType) => setTypeOfModalOpen(modalType);
  const closeModal = () => setTypeOfModalOpen(null);

  const value: ModalContextApi = {
    typeOfModalOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function useModalContext() {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error(`useModalContext must be used within a <ModalProvider />`);
  }
  return context;
}

export { ModalProvider, useModalContext, ModalType };
