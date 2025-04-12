const API = process.env.NEXT_PUBLIC_API_URL as string;
import { Task } from "@/type/task";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API}/tasks`);
  return await res.json();
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

        body: JSON.stringify(task),
    })
  return await res.json();
};
