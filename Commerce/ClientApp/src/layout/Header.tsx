import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Typography, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Typography variant="h4" color="white" ml="1rem" flexGrow="1">
          Commerce
        </Typography>

        <Box mr="2rem">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
