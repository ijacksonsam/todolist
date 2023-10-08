/* eslint-disable react/prop-types */
import { Container, Box, Grid } from "@mui/material";

import { useState } from "react";
import Header from "./Components/Header";
import NewListDialog from "./Components/NewListDialog";
import MenuBar from "./Components/MenuBar";
import Main from "./Components/Main";
import { grey } from "@mui/material/colors";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    setIsOpen(true);
  }
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          border: "1px solid",
          borderColor: grey[400],
        }}
      >
        <Header onOpen={handleOpen} />
        <NewListDialog open={isOpen} setIsOpen={setIsOpen} />
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sm={4} sx={{ height: { sm: "100%" } }}>
            <MenuBar />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              borderLeft: { xs: "none", sm: "1px solid" },
              borderTop: { xs: "1px solid", sm: "none" },
              borderLeftColor: grey[300],
              borderTopColor: grey[300],
            }}
          >
            <Main />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
