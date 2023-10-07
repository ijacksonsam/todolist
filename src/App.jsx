/* eslint-disable react/prop-types */
import { Container, Box } from "@mui/material";

import { useState } from "react";
import Header from "./Components/Header";
import NewListDialog from "./Components/NewListDialog";
import MenuBar from "./Components/MenuBar";
import Main from "./Components/Main";

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
        }}
      >
        <Header onOpen={handleOpen} />
        <NewListDialog open={isOpen} setIsOpen={setIsOpen} />
        <Box
          display={"grid"}
          sx={{ gridTemplateColumns: "2fr 5fr", height: "100%" }}
        >
          <MenuBar />
          <Main />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
