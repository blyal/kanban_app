import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { usePatchBoard, useDeleteBoard } from '../api/useBoardsApi';
import { useModalContext } from '../context/modalContext';
import { Modal } from './Modal';
import { Board } from '../types/types';
import { useBoardsContext } from '../context/boardsContext';

interface UpdateOrDeleteBoardModalProps {
  boardId: string;
}

function UpdateOrDeleteBoardModal({ boardId }: UpdateOrDeleteBoardModalProps) {
  const { boards } = useBoardsContext();
  const [isComponentLoading, toggleIsComponentLoading] =
    React.useState<boolean>(true);
  const board: Board | null =
    boards.find((board) => board._id === boardId) ?? null;

  React.useEffect(() => {
    if (isComponentLoading && (board === null || board)) {
      toggleIsComponentLoading(false);
    }
  }, [isComponentLoading, board]);

  const [title, setTitle] = React.useState(board?.title ?? '');
  const [description, setDescription] = React.useState(
    board?.description ?? ''
  );
  const [isConsideringBoardDeletion, toggleIsConsideringBoardDeletion] =
    React.useState<boolean>(false);

  const {
    mutateAsync: updateBoard,
    isLoading: isUpdatingBoard,
    isSuccess: isUpdateBoardSuccess,
  } = usePatchBoard();
  const {
    mutateAsync: deleteBoard,
    isLoading: isDeletingBoard,
    isSuccess: isDeleteBoardSuccess,
  } = useDeleteBoard();

  const { closeModal } = useModalContext();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    boardId: string
  ) => {
    e.preventDefault();
    updateBoard({
      boardId,
      data: {
        title,
        description,
      },
    });
  };

  const handleDelete = (boardId: string) => {
    deleteBoard(boardId);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isUpdateBoardSuccess || isDeleteBoardSuccess) {
      closeModal();
      navigate('/boards');
    }
  }, [closeModal, isUpdateBoardSuccess, isDeleteBoardSuccess, navigate]);

  return (
    <Modal title={isConsideringBoardDeletion ? 'Delete Board' : 'Update Board'}>
      {isComponentLoading || isUpdatingBoard || isDeletingBoard ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </Box>
      ) : isConsideringBoardDeletion && board ? (
        <>
          <Typography>
            Are you sure you want to delete this board and its associated
            sections and tasks?
          </Typography>
          <br />
          <Button
            variant='contained'
            color='warning'
            fullWidth
            onClick={() => handleDelete(board._id)}
          >
            Confirm Delete
          </Button>
        </>
      ) : !isConsideringBoardDeletion && board ? (
        <>
          <form onSubmit={(event) => handleSubmit(event, board._id)}>
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
              Save
            </Button>
          </form>
          <br />
          <Button
            variant='contained'
            color='warning'
            fullWidth
            onClick={() => toggleIsConsideringBoardDeletion(true)}
          >
            Delete Board
          </Button>
        </>
      ) : (
        <div>
          <p>There was an unexpected error</p>
        </div>
      )}
    </Modal>
  );
}

export { UpdateOrDeleteBoardModal };
