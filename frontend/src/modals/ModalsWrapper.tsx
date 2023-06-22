import { useModalContext, ModalType } from '../context/modalContext';
import { Modal } from './Modal';

function ModalsWrapper() {
  const { typeOfModalOpen } = useModalContext();

  //   if (typeOfModalOpen === ModalType.ADD_BOARD) return <></>;
  if (typeOfModalOpen === ModalType.DELETE_BOARD) return <></>;
  if (typeOfModalOpen === ModalType.ADD_SECTION) return <></>;
  if (typeOfModalOpen === ModalType.UPDATE_SECTION) return <></>;
  if (typeOfModalOpen === ModalType.DELETE_SECTION) return <></>;
  if (typeOfModalOpen === ModalType.ADD_TASK) return <></>;
  if (typeOfModalOpen === ModalType.UPDATE_TASK) return <></>;
  if (typeOfModalOpen === ModalType.DELETE_TASK) return <></>;

  return (
    <Modal isOpen={true} title='Error'>
      Something went wrong
    </Modal>
  );
}

export { ModalsWrapper };
