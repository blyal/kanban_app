import React from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { Modal } from './Modal';
import { useAddSectionToBoard } from '../api/useSectionsApi';
import { useModalContext } from '../context/modalContext';

interface AddSectionModalProps {
  boardId: string;
}

function AddSectionModal({ boardId }: AddSectionModalProps) {
  const [title, setTitle] = React.useState('');
  const {
    mutateAsync: addSection,
    isLoading,
    isError,
  } = useAddSectionToBoard();
  const { closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addSection({ title, boardId });

    // Clear the input fields after submitting
    setTitle('');
    closeModal();
  };

  return (
    <Modal title='Add Section'>
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
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Create
          </Button>
        </form>
      )}
    </Modal>
  );
}

export { AddSectionModal };
