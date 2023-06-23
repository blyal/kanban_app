import { Button, Typography, useTheme } from '@mui/material';

interface AddTaskButtonProps {
  sectionId: string;
  handleAddTask: (sectionId: string) => void;
}

function AddTaskButton({ sectionId, handleAddTask }: AddTaskButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant='outlined'
      onClick={() => handleAddTask(sectionId)}
      sx={{
        mt: 2, // margin top
        mb: 2, // margin bottom
        borderRadius: 2,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Typography variant='body1' color='white'>
        + Add Task
      </Typography>
    </Button>
  );
}

export { AddTaskButton };
