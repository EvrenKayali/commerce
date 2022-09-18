import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home as HomeIcon, Sell } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <List
      disablePadding
      sx={{ borderRight: "1px solid #a8a7a7", height: "100%" }}
    >
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/products">
          <ListItemIcon>
            <Sell />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
