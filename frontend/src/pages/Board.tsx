import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSectionsByBoard } from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section as ISection } from '../types/types';
import { Section } from '../components/Section';
import { useModalContext } from '../context/modalContext';
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { AddSectionButton } from '../components/AddSectionButton';

function Board() {
  const { boardId } = useParams();
  const { sections, isLoading, isError } = useGetSectionsByBoard(boardId);
  const { typeOfModalOpen } = useModalContext();

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
        <AddSectionButton />
      </Box>
    </>
  );
}

export { Board };
