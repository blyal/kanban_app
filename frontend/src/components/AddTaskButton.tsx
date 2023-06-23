import { Button, Typography } from '@mui/material';

interface AddTaskButtonProps {
  sectionId: string;
  handleAddTask: (sectionId: string) => void;
}

function AddTaskButton({ sectionId, handleAddTask }: AddTaskButtonProps) {
  return (
    <Button
      variant='outlined'
      onClick={() => handleAddTask(sectionId)}
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
