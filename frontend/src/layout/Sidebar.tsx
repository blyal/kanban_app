import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useBoardsContext } from '../context/boardsContext';
import { Box, CircularProgress } from '@mui/material';
import { Board } from '../types/types';
import { useModalContext, ModalType } from '../context/modalContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  const { boards, isLoading } = useBoardsContext();
  const { openModal } = useModalContext();

  const handleClickAddNewBoard = () => {
    closeSidebar();
    openModal(ModalType.ADD_BOARD);
  };

  return (
    <Drawer anchor='left' open={isSidebarOpen} onClose={closeSidebar}>
      <Box sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color='primary' />
          </Box>
        ) : (
          <List>
            {boards.map((board: Board) => {
              return (
                <ListItem key={board._id}>
                  <Button
                    component={Link}
                    to={`/boards/${board._id}`}
                    onClick={closeSidebar}
                    variant='outlined'
                    color='primary'
                    fullWidth
                  >
                    {board.title}
                  </Button>
                </ListItem>
              );
            })}
            <ListItem sx={{ paddingBottom: '2px' }}>
              <Button color='secondary' onClick={handleClickAddNewBoard}>
                <ListItemText primary='Add new board' />
              </Button>
            </ListItem>
            <ListItem sx={{ paddingTop: '0px' }}>
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
        )}
      </Box>
    </Drawer>
  );
}

export { Sidebar };
