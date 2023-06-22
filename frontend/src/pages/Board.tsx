import { Box, CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSectionsByBoard } from '../api/useSectionsApi';
import { ErrorPage } from '../navigation/ErrorPage';
import { Section } from '../types/types';

function Board() {
  const { boardId } = useParams();
  const { sections, isLoading, isError } = useGetSectionsByBoard(boardId);

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
    <Grid container spacing={3}>
      {sections.map((section: Section) => (
        // <Section key={section.id} section={section} />
        <div>{section.title}</div>
      ))}
    </Grid>
  );
}

export { Board };
