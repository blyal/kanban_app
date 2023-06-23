import { useParams } from 'react-router-dom';
import { useModalContext, ModalType } from '../context/modalContext';
import { AddBoardModal } from './AddBoardModal';
import { AddSectionModal } from './AddSectionModal';
import { Modal } from './Modal';
import { AddTaskModal } from './AddTaskModal';

interface ModalsWrapperProps {
  sectionIdForAction: string | null | undefined;
}

function ModalsWrapper({ sectionIdForAction = null }: ModalsWrapperProps) {
  const { typeOfModalOpen } = useModalContext();
  const { boardId } = useParams();

  if (typeOfModalOpen === ModalType.ADD_BOARD) return <AddBoardModal />;
  if (typeOfModalOpen === ModalType.DELETE_BOARD) return <></>;
  if (typeOfModalOpen === ModalType.ADD_SECTION && boardId !== undefined)
    return <AddSectionModal boardId={boardId} />;
  if (typeOfModalOpen === ModalType.UPDATE_SECTION) return <></>;
  if (typeOfModalOpen === ModalType.DELETE_SECTION) return <></>;
  if (
    typeOfModalOpen === ModalType.ADD_TASK &&
    boardId !== undefined &&
    sectionIdForAction !== null
  )
    return <AddTaskModal boardId={boardId} sectionId={sectionIdForAction} />;
  if (typeOfModalOpen === ModalType.UPDATE_TASK) return <></>;
  if (typeOfModalOpen === ModalType.DELETE_TASK) return <></>;

  return <Modal title='Error'>Something went wrong</Modal>;
}

export { ModalsWrapper };
