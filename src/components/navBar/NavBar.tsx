import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

export default function LeftDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Shop', path: '/shop' },
    { text: 'Cart', path: '/cart' },
    { text: 'Purchase History', path: '/purchase-history' },
    { text: 'Add Product', path: '/add-product' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px' }}>
        <Button onClick={toggleDrawer(true)} sx={{ color: "#5AB2FF" }}>
          <MenuIcon />
        </Button>
        <div>
        <Link to="/">
          <Button sx={{ color: "#5AB2FF" }}>          
             <HomeIcon />
          </Button>
          </Link>
          <Link to="/cart">
          <Button sx={{ color: "#5AB2FF" }}>          
             <ShoppingCartIcon />
          </Button>
          </Link>
        </div>
        
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
                    <ListItemText primary={item.text} sx={{ color: "black" }} />
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
