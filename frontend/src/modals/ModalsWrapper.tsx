import { useParams } from 'react-router-dom';
import { useModalContext, ModalType } from '../context/modalContext';
import { AddBoardModal } from './AddBoardModal';
import { AddSectionModal } from './AddSectionModal';
import { Modal } from './Modal';
import { UpdateOrDeleteSectionModal } from './UpdateOrDeleteSectionModal';
import { AddTaskModal } from './AddTaskModal';
import { DeleteTaskModal } from './DeleteTaskModal';
import { UpdateTaskModal } from './UpdateTaskModal';
import { Section, Task } from '../types/types';
import { UpdateOrDeleteBoardModal } from './UpdateOrDeleteBoardModal';

interface ModalsWrapperProps {
  sectionForAction?: Section | null;
  taskForAction?: Task | null;
}

function ModalsWrapper({
  sectionForAction,
  taskForAction,
}: ModalsWrapperProps = {}) {
  const { typeOfModalOpen } = useModalContext();
  const { boardId } = useParams();

  if (typeOfModalOpen === ModalType.ADD_BOARD) return <AddBoardModal />;
  if (
    typeOfModalOpen === ModalType.UPDATE_OR_DELETE_BOARD &&
    boardId !== undefined
  )
    return <UpdateOrDeleteBoardModal boardId={boardId} />;
  if (typeOfModalOpen === ModalType.ADD_SECTION && boardId !== undefined)
    return <AddSectionModal boardId={boardId} />;
  if (
    typeOfModalOpen === ModalType.UPDATE_OR_DELETE_SECTION &&
    sectionForAction
  )
    return <UpdateOrDeleteSectionModal section={sectionForAction} />;
  if (
    typeOfModalOpen === ModalType.ADD_TASK &&
    boardId !== undefined &&
    sectionForAction
  )
    return <AddTaskModal boardId={boardId} sectionId={sectionForAction._id} />;
  if (typeOfModalOpen === ModalType.UPDATE_TASK && taskForAction)
    return <UpdateTaskModal task={taskForAction} />;
  if (typeOfModalOpen === ModalType.DELETE_TASK && taskForAction)
    return <DeleteTaskModal taskId={taskForAction._id} />;

  return <Modal title='Error'>Something went wrong</Modal>;
}

export { ModalsWrapper };
