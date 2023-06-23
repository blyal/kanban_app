import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSectionsByBoard } from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section as ISection, Task as ITask } from '../types/types';
import { Section } from '../components/Section';
import { useModalContext, ModalType } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { AddSectionButton } from '../components/AddSectionButton';
import { useGetTasksByBoard } from '../api/useTasksApi';

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
    tasks,
    isLoading: areTasksLoading,
    isError: isGetTasksError,
  } = useGetTasksByBoard(boardId);
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

  React.useEffect(() => {
    if (!Boolean(typeOfModalOpen)) {
      setSectionForAction(null);
      setTaskForAction(null);
    }
  }, [typeOfModalOpen]);

  if (isGetSectionsError || isGetTasksError) {
    return <ErrorPage />;
  }

  if (areSectionsLoading || areTasksLoading)
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
          <CircularProgress size={100} color='primary' />
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
              />
            );
          })}
          <AddSectionButton />
        </Box>
      </Box>
    </>
  );
}

export { Board };
