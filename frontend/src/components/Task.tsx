import { useDrag, useDrop } from 'react-dnd';
import { Button, Box, ListItem, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Task as ITask } from '../types/types';

interface TaskProps {
  task: ITask;
  handleEditTask: (task: ITask) => void;
  handleDeleteTask: (task: ITask) => void;
  handleMoveTask: (
    taskId: string,
    dropOrder: number,
    newSectionId: string
  ) => void;
}

interface DraggedTask {
  _id: string;
}

function Task({
  task,
  handleEditTask,
  handleDeleteTask,
  handleMoveTask,
}: TaskProps) {
  const theme = useTheme();

  const [, drag] = useDrag({
    type: 'task',
    item: {
      _id: task._id,
      originalOrder: task.order,
      originalSection: task.sectionId,
    },
  });

  const [, drop] = useDrop({
    accept: 'task',
    drop: (item: DraggedTask) => {
      if (item._id !== task._id) {
        console.log('drop');
        handleMoveTask(item._id, task.order, task.sectionId);
      }
    },
  });

  return (
    <ListItem
      sx={{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 0.5,
        paddingBottom: 0.5,
      }}
    >
      <Button
        sx={{
          borderRadius: 2,
          width: '100%',
          backgroundColor: theme.palette.primary.main,
          textTransform: 'none',
          position: 'relative',
          padding: 0,
          '&:hover': {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
          },
        }}
        onClick={() => handleEditTask(task)}
      >
        <div
          ref={(el) => drag(drop(el))}
          style={{
            width: '100%',
            height: '100%',
            padding: '6px 8px',
          }}
        >
          <Typography
            variant='body1'
            color='white'
            sx={{ width: '100%', position: 'relative' }}
          >
            {task.title}
          </Typography>

          <Box
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteTask(task);
            }}
            sx={{
              position: 'absolute',
              mr: 1,
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
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
                  color: 'white',
                },
              }}
            />
          </Box>
        </div>
      </Button>
    </ListItem>
  );
}

export { Task };
