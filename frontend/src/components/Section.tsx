import { Box, Paper, Typography, List, useTheme } from '@mui/material';
import { Section as ISection, Task as ITask } from '../types/types';
import { Task } from './Task';
import { AddTaskButton } from './AddTaskButton';

interface SectionProps {
  section: ISection;
  sectionTasks: ITask[];
  handleAddTask: (sectionId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

function Section({
  section,
  sectionTasks: tasks,
  handleAddTask,
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
          backgroundColor: theme.palette.primary.light,
          padding: 3,
          paddingBottom: 0,
        }}
        className='section'
      >
        <Typography variant='h6'>{section.title}</Typography>
        <List>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
          <AddTaskButton
            sectionId={section._id}
            handleAddTask={handleAddTask}
          />
        </List>
      </Paper>
    </Box>
  );
}

export { Section };
