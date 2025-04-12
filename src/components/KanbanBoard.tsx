"use client";

import React from "react";
import TaskColumn from "./TaskColumn";
import { useTasks } from "@/hooks/useTasks";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Task } from "@/type/task";

const statusList: Task["status"][] = ["pendiente", "en-progreso", "completada"];

const KanbanBoard: React.FC = () => {
  const { tasks, changeStatus } = useTasks();

  const grouped: Record<Task["status"], Task[]> = {
    pendiente: [],
    "en-progreso": [],
    completada: [],
  };

  tasks.forEach((task) => {
    if (!grouped[task.status]) {
      console.warn("Estado inválido encontrado:", task.status);
      return;
    }
    grouped[task.status].push(task);
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = parseInt(draggableId, 10); // Aseguramos que es un número
    const newStatus = destination.droppableId as Task["status"];
    const movedTask = tasks.find((task) => task.id === taskId);
    if (movedTask) changeStatus(movedTask, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {statusList.map((status) => (
          <TaskColumn
            key={status}
            droppableId={status}
            title={
              status === "pendiente"
                ? "Pendiente"
                : status === "en-progreso"
                ? "En progreso"
                : "Completada"
            }
            tasks={grouped[status]}
            onStatusChange={changeStatus}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
