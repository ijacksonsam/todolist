import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useSelectedCategory } from "../SelectedCategoryProvider";
import { AddCircleOutline } from "@mui/icons-material";
import { useToDoList } from "../ToDoListProvider";
import { useState } from "react";

export default function Main() {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const { taskList, setTaskList } = useToDoList();
  const [task, setTask] = useState("");

  function addTask(task) {
    setTaskList((tasks) => {
      return [
        ...tasks,
        { task, catId: selectedCategory.id, id: crypto.randomUUID() },
      ];
    });
    setTask("");
  }

  if (!selectedCategory)
    return (
      <Box p={1}>
        <Typography>MAIN</Typography>
      </Box>
    );
  return (
    <Box p={1}>
      <Typography>{selectedCategory.category}</Typography>
      <TextField
        label="Enter new task ..."
        sx={{ m: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => addTask(task)}>
                <AddCircleOutline />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <TaskList catId={selectedCategory.id} key={selectedCategory.id} />
    </Box>
  );
}

function TaskList({ catId }) {
  const { selectedCategory } = useSelectedCategory();
  const { taskList } = useToDoList();
  return (
    <List>
      {taskList.map((task) => {
        if (task.catId === catId)
          return (
            <ListItem key={task.id}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AddCircleOutline />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
                value={task.task}
              />
            </ListItem>
          );
        return null;
      })}
    </List>
  );
}
