/* eslint-disable react/prop-types */
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Header({ onOpen }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton size="large" onClick={onOpen} color="inherit">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
