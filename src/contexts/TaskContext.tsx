"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { getAllTasks } from "@/services/taskService";
import { getFromIndexedDB, saveToIndexedDB } from "@/utils/indexedDB";
import { Task } from "@/type/task";

type TaskContextType = {
  tasks: Task[];
  updateTask: (task: Task) => void;
  addTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const local = await getFromIndexedDB();
    if (local.length) {
      setTasks(local);
    } else {
      const data = await getAllTasks();
      setTasks(data);
      saveToIndexedDB("tasks", data);
    }
  };

  const updateTask = (updatedTask: Task) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(newTasks);
    saveToIndexedDB("tasks", newTasks);
  };

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveToIndexedDB("tasks", newTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, updateTask, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
