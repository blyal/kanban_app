import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  useGetSectionsByBoard,
  useUpdateSectionOrder,
} from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section as ISection, Task as ITask } from '../types/types';
import { Section } from '../components/Section';
import { useModalContext, ModalType } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { AddSectionButton } from '../components/AddSectionButton';
import { useGetTasksByBoard, useMoveTask } from '../api/useTasksApi';

function Board() {
  const { boardId } = useParams();
  const [sectionForAction, setSectionForAction] =
    React.useState<ISection | null>(null);
  const [taskForAction, setTaskForAction] = React.useState<ITask | null>(null);
  const {
    sections,
    isLoading: areSectionsLoading,
    isError: isGetSectionsError,
  } = useGetSectionsByBoard(boardId);
  const {
    mutateAsync: updateSectionOrder,
    isLoading: isUpdatingSectionOrder,
    isError: isUpdateSectionOrderError,
  } = useUpdateSectionOrder();
  const {
    tasks,
    isLoading: areTasksLoading,
    isError: isGetTasksError,
  } = useGetTasksByBoard(boardId);
  const { mutateAsync: moveTask } = useMoveTask();
  const { typeOfModalOpen, openModal } = useModalContext();

  const handleClickSectionTitle = (section: ISection) => {
    setSectionForAction(section);
    openModal(ModalType.UPDATE_OR_DELETE_SECTION);
  };

  const handleAddTask = (section: ISection) => {
    setSectionForAction(section);
    openModal(ModalType.ADD_TASK);
  };

  const handleEditTask = (task: ITask) => {
    setTaskForAction(task);
    openModal(ModalType.UPDATE_TASK);
  };

  const handleDeleteTask = (task: ITask) => {
    setTaskForAction(task);
    openModal(ModalType.DELETE_TASK);
  };

  const handleMoveSection = (sectionId: string, dropOrder: number) => {
    updateSectionOrder({ sectionId, newOrder: dropOrder });
  };

  const handleMoveTask = (
    taskId: string,
    dropOrder: number,
    sectionId: string
  ) => {
    moveTask({ taskId, newOrder: dropOrder, newSectionId: sectionId });
  };

  React.useEffect(() => {
    if (!Boolean(typeOfModalOpen)) {
      setSectionForAction(null);
      setTaskForAction(null);
    }
  }, [typeOfModalOpen]);

  if (isGetSectionsError || isGetTasksError || isUpdateSectionOrderError) {
    return <ErrorPage />;
  }

  if (areSectionsLoading || areTasksLoading || isUpdatingSectionOrder)
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={100} color='secondary' />
        </Box>
      </div>
    );

  return (
    <>
      {Boolean(typeOfModalOpen) && (
        <ModalsWrapper
          sectionForAction={sectionForAction}
          taskForAction={taskForAction}
        />
      )}
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          overflowX: 'auto',
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'start',
              p: 2,
            }}
          >
            {sections.map((section: ISection) => {
              const sectionTasks: ITask[] = tasks.filter(
                (task) => task.sectionId === section._id
              );
              return (
                <Section
                  key={section._id}
                  section={section}
                  sectionTasks={sectionTasks}
                  handleClickTitle={handleClickSectionTitle}
                  handleAddTask={handleAddTask}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={handleDeleteTask}
                  handleMoveSection={handleMoveSection}
                  handleMoveTask={handleMoveTask}
                />
              );
            })}
            <AddSectionButton />
          </Box>
        </DndProvider>
      </Box>
    </>
  );
}

export { Board };
