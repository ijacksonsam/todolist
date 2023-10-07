import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(2).stores({
  toDoList: "++id,category,icon",
  taskList: "++id,catId,task,isCompleted",
});
