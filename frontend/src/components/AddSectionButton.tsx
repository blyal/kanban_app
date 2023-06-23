import { Box, Typography } from '@mui/material';
import { useModalContext, ModalType } from '../context/modalContext';

function AddSectionButton() {
  const { openModal } = useModalContext();

  return (
    <Box sx={{ mr: 10 }}>
      <Box
        onClick={() => openModal(ModalType.ADD_SECTION)}
        sx={{
          minWidth: 300,
          mr: 2,
          mb: 3,
          borderRadius: 2,
          boxShadow: 1,
          textAlign: 'center',
          paddingTop: 3,
          paddingBottom: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          cursor: 'pointer',
        }}
      >
        <Typography variant='h6' color='white'>
          + Add Section
        </Typography>
      </Box>
    </Box>
  );
}

export { AddSectionButton };
