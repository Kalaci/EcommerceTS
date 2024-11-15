import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './NavBar.css';
import { Link } from 'react-router-dom';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor: 'aliceblue'}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ text: 'Shop', path: '/' },
          { text: 'Cart', path: '/cart' },
          { text: 'Purchase History', path: '/purchase-history' },
          { text: 'Add Product', path: '/add-product' }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <Link to={item.path}> <ListItemText primary={item.text} /> </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='navBarBody'>
      <Button onClick={toggleDrawer("left", true)}>Ham</Button>
      <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
             {list("left")}
          </Drawer>
    </div>
  );
}
