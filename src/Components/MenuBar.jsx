import { Box, IconButton, Typography } from "@mui/material";
import { useToDoList } from "../ToDoListProvider";
import { blue } from "@mui/material/colors";
import { useSelectedCategory } from "../SelectedCategoryProvider";
import { fetchIcon } from "../utils";
import { Delete } from "@mui/icons-material";
import { db } from "../db";

export default function MenuBar() {
  const { toDoList, taskList, setToDoList, setTaskList } = useToDoList();
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  function handleClick(id) {
    setSelectedCategory((s) => {
      if (id === s?.id) return null;
      return toDoList.filter((i) => i.id === id)[0];
    });
  }

  async function deleteCategory(e, id, name) {
    e.stopPropagation();
    if (window.confirm(`Do you want to delete ${name}?`)) {
      const arr = [];
      taskList.forEach(function (task) {
        if (task.catId === id) arr.push(task.id);
      });
      if (arr.length > 0) await db.taskList.bulkDelete(arr);
      db.toDoList.delete(id);
      const todolist = await db.toDoList.toArray();
      const tasklist = await db.taskList.toArray();
      setTaskList(tasklist);
      setToDoList(todolist);
      setSelectedCategory(null);
    } else {
      // User clicked "Cancel" or closed the dialog
      // Perform the action or execute code when the user cancels or dismisses
      console.log("User canceled or dismissed the action.");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {toDoList.length > 0 ? (
        toDoList.map(({ id, category, icon }) => {
          const Icon = fetchIcon(icon);
          return (
            <Box
              key={id}
              onClick={() => handleClick(id)}
              sx={{
                display: "grid",
                transition: "all 0.3s",
                borderBottom: "1px solid",
                gridTemplateColumns: "1fr 4fr 1fr",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: blue[100],
                  cursor: "pointer",
                },
                backgroundColor:
                  selectedCategory && id === selectedCategory.id
                    ? blue[200]
                    : "white",
              }}
            >
              <Box sx={{ alignSelf: "center" }}>
                <Icon />
              </Box>
              <Typography sx={{ justifySelf: "start" }} fontSize={15}>
                {category}
              </Typography>

              <IconButton
                color="primary"
                onClick={(e) => deleteCategory(e, id, category)}
              >
                <Delete />
              </IconButton>
            </Box>
          );
        })
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", my: "auto" }}>
          Add A New Category
        </Typography>
      )}
    </Box>
  );
}
