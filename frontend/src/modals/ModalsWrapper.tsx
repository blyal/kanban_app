import { useParams } from 'react-router-dom';
import { useModalContext, ModalType } from '../context/modalContext';
import { AddBoardModal } from './AddBoardModal';
import { AddSectionModal } from './AddSectionModal';
import { Modal } from './Modal';
import { AddTaskModal } from './AddTaskModal';
import { DeleteTaskModal } from './DeleteTaskModal';
import { UpdateTaskModal } from './UpdateTaskModal';
import { Task } from '../types/types';

interface ModalsWrapperProps {
  sectionIdForAction?: string | null;
  taskForAction?: Task | null;
}

function ModalsWrapper({
  sectionIdForAction,
  taskForAction,
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
  if (typeOfModalOpen === ModalType.UPDATE_TASK && taskForAction)
    return <UpdateTaskModal task={taskForAction} />;
  if (typeOfModalOpen === ModalType.DELETE_TASK && taskForAction)
    return <DeleteTaskModal taskId={taskForAction._id} />;

  return <Modal title='Error'>Something went wrong</Modal>;
}

export { ModalsWrapper };
