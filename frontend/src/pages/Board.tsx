import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSectionsByBoard } from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section as ISection } from '../types/types';
import { Section } from '../components/Section';
import { useModalContext, ModalType } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';

function Board() {
  const theme = useTheme();
  const { boardId } = useParams();
  const { sections, isLoading, isError } = useGetSectionsByBoard(boardId);
  const { openModal, typeOfModalOpen } = useModalContext();

  if (isLoading)
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

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      {Boolean(typeOfModalOpen) && <ModalsWrapper />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          p: 1,
          margin: 3,
          alignItems: 'start',
        }}
      >
        {sections.map((section: ISection) => (
          <Section key={section._id} section={section} />
        ))}
        <Box
          onClick={() => openModal(ModalType.ADD_SECTION)}
          sx={{
            width: 300, // whatever fixed width
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
      </Box>
    </>
  );
}

export { Board };
