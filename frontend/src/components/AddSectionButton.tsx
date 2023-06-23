import { Box, Typography, useTheme } from '@mui/material';
import { useModalContext, ModalType } from '../context/modalContext';

function AddSectionButton() {
  const theme = useTheme();

  const { openModal } = useModalContext();

  return (
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
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer',
      }}
    >
      <Typography variant='h6' color='white'>
        + Add Section
      </Typography>
    </Box>
  );
}

export { AddSectionButton };
