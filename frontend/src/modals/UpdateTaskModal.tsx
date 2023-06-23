import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Modal } from './Modal';
import { usePatchTask } from '../api/useTasksApi';
import { useModalContext } from '../context/modalContext';
import { Task } from '../types/types';

interface UpdateTaskModalProps {
  task: Task;
}

function UpdateTaskModal({ task }: UpdateTaskModalProps) {
  const [title, setTitle] = React.useState(task.title);
  const { mutateAsync: updateTask, isLoading, isError } = usePatchTask();
  const { closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask({
      taskId: task._id,
      data: { title, sectionId: task.sectionId, boardId: task.boardId },
    });
    closeModal();
  };

  return (
    <Modal title='Edit Task'>
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
          <p>There was an error updating this task</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label='Task'
            variant='outlined'
            value={title}
            multiline
            rows={4}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin='normal'
            inputProps={{ maxLength: 1000 }}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Save
          </Button>
        </form>
      )}
    </Modal>
  );
}

export { UpdateTaskModal };
