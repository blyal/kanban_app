import { ListItem, Typography } from '@mui/material';
import { Task as ITask } from '../types/types';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  return (
    <ListItem>
      <Typography>{task.title}</Typography>
    </ListItem>
  );
}

export { Task };
