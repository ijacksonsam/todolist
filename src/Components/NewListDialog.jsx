/* eslint-disable react/prop-types */
import * as allIcons from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useToDoList } from "../ToDoListProvider";
import { fetchIcon } from "../utils";
import { db } from "../db";

const initialIcons = Object.entries(allIcons).map(([name, Icon]) => {
  return { name, Icon };
});
export default function NewListDialog({ open, setIsOpen }) {
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [icons, setIcons] = useState(initialIcons);
  const { setToDoList } = useToDoList();
  const IconComponent = fetchIcon(icon);

  function handleClose() {
    setIsOpen(false);
    setCategory("");
    setIcon("");
    setIcons(initialIcons);
  }

  function handleIconChange(e) {
    setIcon(e.target.value);
    setIcons(
      initialIcons.filter(({ name }) => {
        return icon ? name.toLowerCase().includes(icon.toLowerCase()) : true;
      })
    );
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const newToDo = {
        category,
        icon,
      };
      const id = await db.toDoList.add(newToDo);
      setToDoList((toDoList) => [...toDoList, { ...newToDo, id }]);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(5px) sepia(5%)",
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          px: 3,
        },
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}>Create a new List</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Enter the Category and select the Icon
        </DialogContentText>

        <Box mb={2}>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="icon-search">Icon</InputLabel>
            <OutlinedInput
              id="icon-search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    {IconComponent && <IconComponent />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              fullWidth
              onChange={handleIconChange}
              value={icon}
            />
          </FormControl>
        </Box>
        <Grid container columns={10} spacing={0.5}>
          {icons.map(({ name, Icon }, ind) => {
            return ind >= 20 ? null : (
              <Grid item key={ind} xs={1}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  border={"1px solid"}
                  alignItems={"center"}
                  onClick={() => {
                    setIcon(name);
                  }}
                  sx={{
                    transition: "all 0.3s",
                    borderRadius: "9px",
                    minWidth: "50px",
                    "&:hover": {
                      backgroundColor: "red",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Icon />
                  <Typography fontSize={8}>
                    {name.slice(0, 5) + ".."}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
