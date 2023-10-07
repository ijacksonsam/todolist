/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useSelectedCategory } from "../SelectedCategoryProvider";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { useToDoList } from "../ToDoListProvider";
import { useEffect, useRef, useState } from "react";
import { db } from "../db";

export default function Main() {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const { toDoList, setTaskList } = useToDoList();
  const [task, setTask] = useState("");

  useEffect(
    function () {
      if (toDoList.length > 0) {
        setSelectedCategory(toDoList[toDoList.length - 1]);
      }
    },
    [toDoList, setSelectedCategory]
  );

  async function addTask(e, task) {
    e.preventDefault();
    if (!task) return;
    const newTask = {
      task,
      catId: selectedCategory.id,
      isCompleted: false,
    };
    const id = await db.taskList.add(newTask);
    setTaskList((tasks) => {
      return [...tasks, { ...newTask, id }];
    });
    setTask("");
  }

  if (!selectedCategory)
    return (
      <Box p={1}>
        <Typography variant="h2">MAIN</Typography>
      </Box>
    );

  return (
    <Box p={1}>
      <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
        {selectedCategory.category}
      </Typography>
      <form
        onSubmit={(e) => {
          addTask(e, task);
        }}
      >
        <TextField
          label="Enter new task ..."
          sx={{ m: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
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
      </form>
      <TaskList catId={selectedCategory.id} key={selectedCategory.id} />
    </Box>
  );
}

function TaskList({ catId }) {
  const { taskList } = useToDoList();

  return (
    <List>
      {taskList.map((task) => {
        if (task.catId === catId) return <TaskItem task={task} key={task.id} />;
        return null;
      })}
    </List>
  );
}

function TaskItem({ task }) {
  const { setTaskList } = useToDoList();
  const [taskName, setTaskName] = useState(task.task);
  const textFieldRef = useRef(null);

  async function deleteTask(id) {
    await db.taskList.delete(id);
    const todolist = await db.taskList.toArray();
    setTaskList(todolist);
  }

  async function editTask(e) {
    e.preventDefault();
    const editTask = { ...task, task: taskName };
    await db.taskList.update(task.id, editTask);
    setTaskList((tl) => {
      return tl.map((t) => {
        if (t.id === task.id) return editTask;
        return t;
      });
    });
    textFieldRef.current.blur();
  }

  async function taskComplete() {
    const editTask = { ...task, isCompleted: !task.isCompleted };
    await db.taskList.update(task.id, editTask);
    setTaskList((tl) => {
      return tl.map((t) => {
        if (t.id === task.id) return editTask;
        return t;
      });
    });
  }

  return (
    <form
      onSubmit={(e) => {
        editTask(e);
      }}
    >
      <ListItem>
        <Checkbox checked={task.isCompleted} onChange={taskComplete} />
        {task.isCompleted ? (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography
              variant="body1"
              sx={{ textDecoration: "line-through", flex: 1 }}
            >
              {task.task}
            </Typography>
            <IconButton
              onClick={() => deleteTask(task.id)}
              sx={{ justifySelf: "end" }}
            >
              <Delete />
            </IconButton>
          </Box>
        ) : (
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            ref={textFieldRef}
          />
        )}
      </ListItem>
    </form>
  );
}
