import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home as HomeIcon, Sell } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const linkStyles = {
  "&.active .MuiTypography-root": { color: "secondary.main" },
  "&.active .MuiListItemIcon-root": { color: "secondary.main" },
} as const;

export default function NavBar() {
  return (
    <List
      disablePadding
      sx={{
        borderRight: "1px solid #a8a7a7",
        height: "100%",
        display: { xs: "none", sm: "block" },
      }}
    >
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/" sx={linkStyles}>
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
        <ListItemButton component={NavLink} to="/products" sx={linkStyles}>
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
