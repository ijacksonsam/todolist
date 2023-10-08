/* eslint-disable react/prop-types */
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Header({ onOpen }) {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ flexDirection: "row", alignItems: "center" }}
      >
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, textAlign: { xs: "start", sm: "center" }, px: 2 }}
        >
          ToDoList App
        </Typography>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton size="large" onClick={onOpen} color="inherit">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
