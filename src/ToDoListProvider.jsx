/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./db";
const ToDoListContext = createContext();

function ToDoListProvider({ children }) {
  const [toDoList, setToDoList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  useEffect(function () {
    async function fetchData() {
      const todolist = await db.toDoList.toArray();
      setToDoList(todolist);
      const tasks = await db.taskList.toArray();
      setTaskList(tasks);
    }
    fetchData();
  }, []);
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
