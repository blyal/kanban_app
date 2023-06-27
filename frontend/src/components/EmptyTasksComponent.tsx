import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';

interface TaskProps {
  sectionId: string;
  handleDropTask: (
    taskId: string,
    dropOrder: number,
    newSectionId: string
  ) => void;
}

interface DraggedTask {
  _id: string;
}

function EmptyTasksComponent({ sectionId, handleDropTask }: TaskProps) {
  const [, drop] = useDrop({
    accept: 'task',
    drop: (item: DraggedTask) => {
      handleDropTask(item._id, 0, sectionId);
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '-7.5px',
        opacity: 0,
      }}
    >
      <div
        ref={drop}
        style={{
          borderRadius: 5,
          width: '100%',
          height: '100%',
          padding: '6px 8px',
          paddingTop: 15,
        }}
      />
    </Box>
  );
}

export { EmptyTasksComponent };
