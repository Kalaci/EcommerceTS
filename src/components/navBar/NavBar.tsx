import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function LeftDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const menuItems = [
    { text: 'Shop', path: '/' },
    { text: 'Cart', path: '/cart' },
    { text: 'Purchase History', path: '/purchase-history' },
    { text: 'Add Product', path: '/add-product' },
  ];

  return (
    <div className="navBarBody">
      <div style={{ justifyContent: "space-between" }}>
        <Button onClick={toggleDrawer(true)}>Menu</Button>
        <Link to="/cart">
          <Button>Cart</Button>
        </Link>
      </div>

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, backgroundColor: "#FBFBFB" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <Link to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemText primary={item.text} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
