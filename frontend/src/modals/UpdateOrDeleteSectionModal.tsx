import {
  Box,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';
import { usePatchSection, useDeleteSection } from '../api/useSectionsApi';
import { useModalContext } from '../context/modalContext';
import { Modal } from './Modal';
import { Section } from '../types/types';

interface UpdateOrDeleteSectionModalProps {
  section: Section;
}

function UpdateOrDeleteSectionModal({
  section,
}: UpdateOrDeleteSectionModalProps) {
  const [title, setTitle] = React.useState(section.title);
  const [isConsideringSectionDeletion, toggleIsConsideringSectionDeletion] =
    React.useState<boolean>(false);

  const {
    mutateAsync: updateSection,
    isLoading: isUpdatingSection,
    isError: isUpdateSectionError,
    isSuccess: isUpdateSectionSuccess,
  } = usePatchSection();
  const {
    mutateAsync: deleteSection,
    isLoading: isDeletingSection,
    isError: isDeleteSectionError,
    isSuccess: isDeleteSectionSuccess,
  } = useDeleteSection();

  const { closeModal } = useModalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection({ title, sectionId: section._id });
  };

  const handleDelete = () => {
    deleteSection(section._id);
  };

  React.useEffect(() => {
    if (isUpdateSectionSuccess || isDeleteSectionSuccess) {
      closeModal();
    }
  }, [closeModal, isUpdateSectionSuccess, isDeleteSectionSuccess]);

  return (
    <Modal title='Edit Section'>
      {isUpdatingSection || isDeletingSection ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </Box>
      ) : isUpdateSectionError || isDeleteSectionError ? (
        <div>
          <p>There was an unexpected error</p>
        </div>
      ) : isConsideringSectionDeletion ? (
        <>
          <Typography>
            Are you sure you want to delete this section and its associated
            tasks?
          </Typography>
          <br />
          <Button
            variant='contained'
            color='warning'
            fullWidth
            onClick={handleDelete}
          >
            Confirm Delete
          </Button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Title'
              variant='outlined'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin='normal'
              inputProps={{ maxLength: 18 }}
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
            onClick={() => toggleIsConsideringSectionDeletion(true)}
          >
            Delete Section
          </Button>
        </>
      )}
    </Modal>
  );
}

export { UpdateOrDeleteSectionModal };
