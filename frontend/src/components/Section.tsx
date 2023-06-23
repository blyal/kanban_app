import { useDrag, useDrop } from 'react-dnd';
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
  handleMoveSection: (sectionId: string, dropOrder: number) => void;
}

interface DraggedSection {
  _id: string;
}

function Section({
  section,
  sectionTasks: tasks,
  handleClickTitle,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleMoveSection,
}: SectionProps) {
  const theme = useTheme();

  const [, drag] = useDrag(() => ({
    type: 'section',
    item: { _id: section._id, originalOrder: section.order },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'section',
    drop: (item: any) => {
      handleMoveSection((item as DraggedSection)._id, section.order);
    },
  }));

  return (
    <div ref={(el) => drag(drop(el))}>
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
    </div>
  );
}

export { Section, DraggedSection };
