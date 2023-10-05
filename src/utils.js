import * as allIcons from "@mui/icons-material";
// import Dexie from "dexie";
// const db = new Dexie("myDatabase");
// db.version(1).stores({
//   toDoListStore: "++id, catogory, icon,tasks",
// });

function fetchIcon(icon) {
  const filteredIcon = Object.entries(allIcons).filter(([name, Icon]) => {
    return name.toLowerCase() === icon.toLowerCase();
  });
  return filteredIcon.length > 0 ? filteredIcon[0][1] : null;
}

export { fetchIcon };
