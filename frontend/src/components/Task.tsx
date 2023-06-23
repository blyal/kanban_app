import { Button, ListItem, Typography, useTheme } from '@mui/material';
import { Task as ITask } from '../types/types';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const theme = useTheme();

  return (
    <ListItem
      sx={{
        padding: 0,
      }}
    >
      <Button
        variant='outlined'
        sx={{
          mt: 0.5, // margin top
          mb: 0.5, // margin bottom
          borderRadius: 2,
          width: '100%',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography variant='body1' color='white'>
          {task.title}
        </Typography>
      </Button>
    </ListItem>
  );
}

export { Task };
