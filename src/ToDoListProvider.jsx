/* eslint-disable react/prop-types */
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState } from "react";
const ToDoListContext = createContext();

const initialList = [
  {
    category: "sports",
    icon: "SportsVolleyballRounded",
    id: "1a0dd2a6-03a0-4eee-a0d7-3657c5487896",
  },
  {
    category: "travel",
    icon: "AirplanemodeActiveOutlined",
    id: "cfdf51a7-3365-499b-9e50-f951678e0f74",
  },
  {
    category: "home ",
    icon: "House",
    id: "d65cad93-6b4f-43a0-96ac-8c602d57c92d",
  },
];

const initialTaskList = [
  {
    task: "buy prime",
    catId: "1a0dd2a6-03a0-4eee-a0d7-3657c5487896",
    id: "1406ea9c-c849-4ca1-85e3-c4e575f6cc0d",
  },
  {
    task: "run 2 kms",
    catId: "1a0dd2a6-03a0-4eee-a0d7-3657c5487896",
    id: "da2dbefe-709a-42de-90c6-8296346bfac1",
  },
  {
    task: "fix the roof",
    catId: "d65cad93-6b4f-43a0-96ac-8c602d57c92d",
    id: "2242c170-57f7-4d9c-85d8-a227566ae232",
  },
  {
    task: "get the tickets",
    catId: "cfdf51a7-3365-499b-9e50-f951678e0f74",
    id: "f2e31822-dba4-4908-98e0-b09a429e40e3",
  },
  {
    task: "book travel van",
    catId: "cfdf51a7-3365-499b-9e50-f951678e0f74",
    id: "25f50f14-00a9-4def-b723-64141ff729de",
  },
];

function ToDoListProvider({ children }) {
  const [toDoList, setToDoList] = useState(initialList);
  const [taskList, setTaskList] = useState(initialTaskList);
  // const items = useLiveQuery(() => db.toDoListStore.toArray(), []);
  return (
    <ToDoListContext.Provider
      value={{ toDoList, setToDoList, taskList, setTaskList }}
    >
      {children}
    </ToDoListContext.Provider>
  );
}

function useToDoList() {
  const context = useContext(ToDoListContext);
  if (context === undefined)
    throw new Error("context used outside of provider");
  return context;
}

export { ToDoListProvider, useToDoList };
