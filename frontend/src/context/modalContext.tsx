import React, { ReactNode } from 'react';

enum ModalType {
  ADD_BOARD,
  DELETE_BOARD,
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
}

interface ModalContextApi {
  typeOfModalOpen: ModalType | null;
  openModal: (modalType: ModalType | null) => void;
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
  const openModal = (modalType: ModalType | null) =>
    setTypeOfModalOpen(modalType);

  const value: ModalContextApi = {
    typeOfModalOpen,
    openModal,
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

export { ModalProvider, useModalContext };
