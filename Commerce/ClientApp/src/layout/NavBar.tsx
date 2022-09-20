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
      sx={{
        borderRight: "1px solid #a8a7a7",
        height: "100%",
        display: { xs: "none", sm: "block" },
        maxWidth: "10rem",
      }}
    >
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              display: { xs: "none", lg: "block" },
              margin: "0",
              padding: "0",
            }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/products">
          <ListItemIcon>
            <Sell />
          </ListItemIcon>
          <ListItemText
            primary="Products"
            sx={{
              display: { xs: "none", lg: "block" },
            }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
