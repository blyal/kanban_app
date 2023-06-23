import { Box, Button, Paper, Typography, List, useTheme } from '@mui/material';
import { Section as ISection, Task as ITask } from '../types/types';
import { useModalContext, ModalType } from '../context/modalContext';
import { Task } from './Task';

interface SectionProps {
  section: ISection;
  sectionTasks: ITask[];
}

function Section({ section, sectionTasks: tasks }: SectionProps) {
  const theme = useTheme();
  const { openModal } = useModalContext();

  return (
    <Box
      sx={{
        minWidth: 300,
        mr: 2, // margin right
        mb: 3, // margin bottom
        borderRadius: 2,
        boxShadow: 1,
        textAlign: 'center',
      }}
    >
      <Paper
        sx={{
          backgroundColor: theme.palette.primary.light,
          padding: 3,
        }}
      >
        <Typography variant='h6'>{section.title}</Typography>
        <List>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
          <Button
            variant='outlined'
            onClick={() => openModal(ModalType.ADD_TASK)}
            sx={{
              mt: 2, // margin top
              mb: 2, // margin bottom
              borderRadius: 2,
            }}
          >
            <Typography variant='body1'>+ Add Task</Typography>
          </Button>
        </List>
      </Paper>
    </Box>
  );
}

export { Section };
