import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useBoardsContext } from '../context/boardsContext';
import { ModalType, useModalContext } from '../context/modalContext';

interface HeaderProps {
  openSidebar: () => void;
}

function Header({ openSidebar }: HeaderProps) {
  const { boards } = useBoardsContext();
  const { openModal } = useModalContext();

  const [headerTitle, setHeaderTitle] = React.useState<string>('');

  const { pathname } = useLocation();
  const pathParts = pathname.split('/');

  React.useEffect(() => {
    if (pathParts[1] === 'boards') {
      if (pathParts[2]) {
        // The path is /boards/:boardId
        const boardId = pathParts[2];
        const board = boards.find((board) => board._id === boardId);
        if (board) {
          setHeaderTitle(board.title);
        }
      } else {
        // The path is /boards
        setHeaderTitle('All Boards');
      }
    }
  }, [pathParts, boards]);

  return (
    <AppBar position='static'>
      <Toolbar className='header-toolbar'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={openSidebar}
          className='header-burger-button'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className='header-title'>
          {headerTitle}
        </Typography>
        {Boolean(pathParts[2]) && (
          <IconButton
            edge='end'
            color='inherit'
            aria-label='settings'
            onClick={() => openModal(ModalType.UPDATE_OR_DELETE_BOARD)}
            style={{ position: 'absolute', right: '10px' }}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { Header };
