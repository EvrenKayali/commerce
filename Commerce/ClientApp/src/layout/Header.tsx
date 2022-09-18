import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Typography,
  Toolbar,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Typography variant="h4" color="white">
          Commerce
        </Typography>

        <Box flexGrow="1" display="flex" justifyContent="center">
          <Link href="/about">
            <Typography>about</Typography>
          </Link>
        </Box>
        <Box border={1}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
