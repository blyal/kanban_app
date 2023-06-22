import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  return (
    <Drawer anchor='left' open={isSidebarOpen} onClose={closeSidebar}>
      <List>
        {/* Map through boards */}
        <ListItem>
          <ListItemText primary='Board 1' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Board 2' />
        </ListItem>
        {/* End mapping */}
        <ListItem>
          <ListItemText primary='Add new board' />
        </ListItem>
      </List>
    </Drawer>
  );
}

export { Sidebar };
