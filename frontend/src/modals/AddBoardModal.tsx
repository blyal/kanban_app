import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Modal } from './Modal';
import { useAddBoard } from '../api/useBoardsApi';
import { useModalContext } from '../context/modalContext';

function AddBoardModal() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { mutateAsync: addBoard, isLoading, isError } = useAddBoard();
  const { closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBoard({ title, description });

    // Clear the input fields after submitting
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <Modal title='Add Board'>
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
          <p>There was an error adding a section</p>
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
          <TextField
            label='Description'
            variant='outlined'
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin='normal'
            inputProps={{ maxLength: 140 }}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Create
          </Button>
        </form>
      )}
    </Modal>
  );
}

export { AddBoardModal };
