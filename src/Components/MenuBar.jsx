import { Box, Typography } from "@mui/material";
import { useToDoList } from "../ToDoListProvider";
import { grey } from "@mui/material/colors";
import { useSelectedCategory } from "../SelectedCategoryProvider";
import { fetchIcon } from "../utils";

export default function MenuBar() {
  const { toDoList } = useToDoList();
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  function handleClick(id) {
    setSelectedCategory((s) => {
      if (id === s?.id) return null;
      return toDoList.filter((i) => i.id === id)[0];
    });
  }
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      borderRight={"1px solid"}
      py={1}
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
                border: "1px solid",
                gridTemplateColumns: "3fr 1fr",
                "&:hover": {
                  backgroundColor: grey[200],
                  cursor: "pointer",
                },
                backgroundColor:
                  selectedCategory && id === selectedCategory.id
                    ? grey[400]
                    : "white",
              }}
            >
              <Typography>{category}</Typography>
              <Box>
                <Icon />
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography>Add A New Category</Typography>
      )}
    </Box>
  );
}
