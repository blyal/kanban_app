import { Box, Paper, Typography, List, useTheme } from '@mui/material';
import { Section as ISection, Task as ITask } from '../types/types';
import { Task } from './Task';
import { AddTaskButton } from './AddTaskButton';

interface SectionProps {
  section: ISection;
  sectionTasks: ITask[];
  handleClickTitle: (section: ISection) => void;
  handleAddTask: (section: ISection) => void;
  handleEditTask: (task: ITask) => void;
  handleDeleteTask: (task: ITask) => void;
}

function Section({
  section,
  sectionTasks: tasks,
  handleClickTitle,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
}: SectionProps) {
  const theme = useTheme();

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
          backgroundColor: theme.palette.secondary.light,
          padding: 3,
          paddingBottom: 0,
        }}
        className='section'
      >
        <Typography
          variant='h6'
          onClick={() => handleClickTitle(section)}
          sx={{ cursor: 'pointer' }}
        >
          {section.title}
        </Typography>
        <List>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
          <AddTaskButton section={section} handleAddTask={handleAddTask} />
        </List>
      </Paper>
    </Box>
  );
}

export { Section };
