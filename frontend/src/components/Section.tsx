import { Box, Paper, Typography, List, useTheme } from '@mui/material';
import { Section as ISection } from '../types/types';

interface SectionProps {
  section: ISection;
}

function Section({ section }: SectionProps) {
  const theme = useTheme();
  console.log(theme.palette.primary.light);
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
          {/* {section.tasks.map(task => (
              <Task key={task.id} task={task} />
            ))} */}
          <div>Hello</div>
        </List>
      </Paper>
    </Box>
  );
}

export { Section };
