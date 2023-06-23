import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Card,
  Divider,
  Typography,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useBoardsContext } from '../context/boardsContext';
import { useModalContext } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { Board } from '../types/types';

function Boards() {
  const theme = useTheme();
  const { boards, isLoading } = useBoardsContext();
  const { typeOfModalOpen } = useModalContext();
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
    <>
      {Boolean(typeOfModalOpen) && <ModalsWrapper />}
      <Box
        sx={{
          maxHeight: '100vh',
          overflow: 'auto',
          margin: 3,
        }}
      >
        <Grid container spacing={3}>
          {boards.map((board: Board) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={board._id}>
                <Link to={`${board._id}`} style={{ textDecoration: 'none' }}>
                  <Card
                    className='board-card'
                    sx={{
                      height: 250,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 2,
                      padding: 2,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                    elevation={10}
                  >
                    <Box
                      sx={{
                        flex: '1',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                      }}
                    >
                      <Divider
                        sx={{
                          bgcolor: 'white',
                          height: '1px',
                          my: 3,
                        }}
                      />
                      <Typography variant='h5' color='white'>
                        {board.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: '1',
                        width: '100%',
                      }}
                    >
                      <Typography
                        color='white'
                        sx={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          width: '100%',
                          overflowWrap: 'break-word',
                          textAlign: 'center',
                        }}
                      >
                        {board.description}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export { Boards };
