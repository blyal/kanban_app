import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSectionsByBoard } from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section as ISection } from '../types/types';
import { Section } from '../components/Section';
import { useModalContext, ModalType } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { AddSectionButton } from '../components/AddSectionButton';
import { useGetTasksByBoard } from '../api/useTasksApi';

function Board() {
  const { boardId } = useParams();
  const [sectionIdForAddingTask, setSectionIdForAddingTask] = React.useState<
    string | null
  >(null);
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

  const handleAddTask = (sectionId: string) => {
    setSectionIdForAddingTask(sectionId);
    openModal(ModalType.ADD_TASK);
  };

  React.useEffect(() => {
    if (!Boolean(typeOfModalOpen)) {
      setSectionIdForAddingTask(null);
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
        <ModalsWrapper sectionIdForAction={sectionIdForAddingTask} />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          p: 1,
          margin: 3,
          alignItems: 'start',
        }}
      >
        {sections.map((section: ISection) => {
          const sectionTasks = tasks.filter(
            (task) => task.sectionId === section._id
          );
          return (
            <Section
              key={section._id}
              section={section}
              sectionTasks={sectionTasks}
              handleAddTask={handleAddTask}
            />
          );
        })}
        <AddSectionButton />
      </Box>
    </>
  );
}

export { Board };
