import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Modal } from './Modal';
import { useAddTaskToSection } from '../api/useTasksApi';
import { useModalContext } from '../context/modalContext';

interface AddTaskModalProps {
  boardId: string;
  sectionId: string;
}

function AddTaskModal({ boardId, sectionId }: AddTaskModalProps) {
  const [title, setTitle] = React.useState('');
  const { mutateAsync: addTask, isLoading, isError } = useAddTaskToSection();
  const { closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addTask({ title, boardId, sectionId });

    // Clear the input fields after submitting
    setTitle('');
    closeModal();
  };

  return (
    <Modal title='Add Task'>
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
          <p>There was an error adding a task</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label='Title'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin='normal'
            inputProps={{ maxLength: 12 }}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Create
          </Button>
        </form>
      )}
    </Modal>
  );
}

export { AddTaskModal };
