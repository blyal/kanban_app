import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Card, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useBoardsContext } from '../context/boardsContext';
import { Board } from '../types/types';

function Boards() {
  const theme = useTheme();
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
          <CircularProgress size={100} color='primary' />
        </Box>
      </div>
    );
  }
  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflow: 'auto',
        margin: 3, // add margin around the container
      }}
    >
      <Grid container spacing={3}>
        {boards.map((board: Board) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={board._id}>
              <Link to={`${board._id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.primary.light,
                    // boxShadow: '0 3px 5px 2px rgba(125, 123, 135, 0.3)',
                    borderRadius: 2,
                  }}
                  elevation={4}
                >
                  <Typography variant='h5'>{board.title}</Typography>
                  <Typography>{board.description}</Typography>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export { Boards };
