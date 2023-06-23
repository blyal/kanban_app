import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDeleteTask } from '../api/useTasksApi';
import { Modal } from './Modal';
import { useModalContext } from '../context/modalContext';

interface DeleteTaskModalProps {
  taskId: string;
}

function DeleteTaskModal({ taskId }: DeleteTaskModalProps) {
  const {
    mutateAsync: deleteTask,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteTask();
  const { closeModal } = useModalContext();

  const handleDelete = () => {
    deleteTask(taskId);
  };

  React.useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <Modal title='Delete Task'>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </Box>
      ) : isError ? (
        <div>
          <p>There was an error deleting a task</p>
        </div>
      ) : (
        <>
          <Typography>Are you sure you want to delete this task?</Typography>
          <br />
          <Button
            // type='submit'
            variant='contained'
            color='warning'
            fullWidth
            onClick={handleDelete}
          >
            Delete
          </Button>
        </>
      )}
    </Modal>
  );
}

export { DeleteTaskModal };
