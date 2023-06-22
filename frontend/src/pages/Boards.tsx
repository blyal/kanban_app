import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useBoardsContext } from '../context/boardsContext';
import { Board } from '../types/types';

function Boards() {
  const { boards, isLoading } = useBoardsContext();
  if (isLoading) {
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
          <CircularProgress size={100} />
        </Box>
      </div>
    );
  }
  console.log(boards);
  return (
    <div>
      {boards.map((board: Board) => {
        return <div key={board._id}>{board.title}</div>;
      })}
    </div>
  );
}

export { Boards };
