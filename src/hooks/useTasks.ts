import { useTaskContext } from "@/contexts/TaskContext";
import { Task } from "@/type/task";

export const useTasks = () => {
  const { tasks, updateTask, addTask } = useTaskContext();

  const changeStatus = (task: Task, status: Task["status"]) => {
    const updated = { ...task, status };
    updateTask(updated);
  };
  return { tasks, changeStatus, addTask };
};
