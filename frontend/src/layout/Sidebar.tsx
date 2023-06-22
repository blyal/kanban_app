import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useBoardsContext } from '../context/boardsContext';
import { Box, CircularProgress } from '@mui/material';
import { Board } from '../types/types';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  const { boards, isLoading } = useBoardsContext();

  return (
    <Drawer anchor='left' open={isSidebarOpen} onClose={closeSidebar}>
      <List>
        {/* Map through boards */}
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          boards.map((board: Board) => {
            return (
              <ListItem key={board._id}>
                <ListItemText primary={board.title} />
              </ListItem>
            );
          })
        )}
        <ListItem>
          <Button color='secondary'>
            <ListItemText primary='Add new board' />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            color='primary'
            component={Link}
            to='/boards'
            onClick={closeSidebar}
          >
            <ListItemText primary='See all boards' />
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}

export { Sidebar };
