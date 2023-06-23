import { useParams } from 'react-router-dom';
import { useModalContext, ModalType } from '../context/modalContext';
import { AddBoardModal } from './AddBoardModal';
import { AddSectionModal } from './AddSectionModal';
import { Modal } from './Modal';
import { AddTaskModal } from './AddTaskModal';
import { DeleteTaskModal } from './DeleteTaskModal';

interface ModalsWrapperProps {
  sectionIdForAction?: string | null;
  taskIdForAction?: string | null;
}

function ModalsWrapper({
  sectionIdForAction,
  taskIdForAction,
}: ModalsWrapperProps = {}) {
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
    typeof sectionIdForAction === 'string'
  )
    return <AddTaskModal boardId={boardId} sectionId={sectionIdForAction} />;
  if (typeOfModalOpen === ModalType.UPDATE_TASK) return <></>;
  if (
    typeOfModalOpen === ModalType.DELETE_TASK &&
    typeof taskIdForAction === 'string'
  )
    return <DeleteTaskModal taskId={taskIdForAction} />;

  return <Modal title='Error'>Something went wrong</Modal>;
}

export { ModalsWrapper };
