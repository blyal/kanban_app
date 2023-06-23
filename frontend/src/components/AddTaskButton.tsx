import { Button, Typography } from '@mui/material';
import { Section } from '../types/types';

interface AddTaskButtonProps {
  section: Section;
  handleAddTask: (section: Section) => void;
}

function AddTaskButton({ section, handleAddTask }: AddTaskButtonProps) {
  return (
    <Button
      variant='outlined'
      onClick={() => handleAddTask(section)}
      sx={{
        mt: 0.5, // margin top
        mb: 0.5, // margin bottom
        borderRadius: 2,
        width: '100%',
        textTransform: 'none',
        // backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography variant='body1' color='black'>
        + Add Task
      </Typography>
    </Button>
  );
}

export { AddTaskButton };
