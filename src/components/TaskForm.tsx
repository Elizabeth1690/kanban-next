"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTasks } from "@/hooks/useTasks";
import { createTask } from "@/services/taskService";
import { Task } from "@/type/task";
import { useLoading } from "@/hooks/useLoading";
import { useUsers } from "@/hooks/useUsers";

type FormState = Omit<Task, "id" | "status">;

const TaskForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    assignedTo: "",
  });
  const { addTask } = useTasks();

  const { loading: taskLoading, startLoading, stopLoading } = useLoading();

  const { users, loading: userLoading } = useUsers();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.assignedTo) {
      alert("Debe asignar la tarea a un usuario.");
      return;
    }

    startLoading();
    const newTask: Omit<Task, "id"> = {
      ...form,
      status: "pendiente",
    };

    try {
      const saved = await createTask(newTask);
      addTask(saved);
      setForm({ title: "", description: "", assignedTo: "" });
    } catch (error) {
      console.error("Error Creando tarea:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Nueva Tarea</h3>

      {taskLoading || userLoading ? (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            disabled={taskLoading || userLoading}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            disabled={userLoading}
          />
          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
            disabled={userLoading}
            required
          >
            <option value="">Seleccionar Usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
              userLoading || taskLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={userLoading || taskLoading}
          >
            {taskLoading || userLoading ? "Creando..." : "Crear"}
          </button>
        </>
      )}
    </form>
  );
};

export default TaskForm;
