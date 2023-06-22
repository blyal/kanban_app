import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  openSidebar: () => void;
}

function Header({ openSidebar }: HeaderProps) {
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
          Taskz
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export { Header };
