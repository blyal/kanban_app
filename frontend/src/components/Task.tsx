import { Button, Box, ListItem, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Task as ITask } from '../types/types';

interface TaskProps {
  task: ITask;
  handleEditTask: (task: ITask) => void;
  handleDeleteTask: (task: ITask) => void;
}

function Task({ task, handleEditTask, handleDeleteTask }: TaskProps) {
  const theme = useTheme();

  return (
    <ListItem
      sx={{
        padding: 0,
        display: 'flex', // Add this line to use flexbox
        alignItems: 'center', // This will vertically center your items
      }}
    >
      <Button
        // variant='outlined'
        sx={{
          mt: 0.5, // margin top
          mb: 0.5, // margin bottom
          borderRadius: 2,
          width: '100%',
          backgroundColor: theme.palette.primary.main,
          textTransform: 'none',
          position: 'relative',
          '&:hover .delete-task-button': {
            opacity: 1,
          },
        }}
        onClick={() => handleEditTask(task)}
      >
        <Typography
          variant='body1'
          color='white'
          sx={{ width: '100%', position: 'relative' }}
        >
          {task.title}
        </Typography>
        <Box
          // size='small'
          // sx={{ ml: 1 }} // You can adjust the margin to your needs
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteTask(task);
          }} // replace with your delete function
          className='delete-task-button'
          sx={{
            position: 'absolute',
            mr: 1,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0,
          }}
        >
          <CloseIcon
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'grey',
              '&:hover': {
                color: 'black',
              },
            }}
          />
        </Box>
      </Button>
    </ListItem>
  );
}

export { Task };
