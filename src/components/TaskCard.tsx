import React from "react";
import { Task } from "@/type/task";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;
  onStatusChange: (task: Task, status: Task["status"]) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, index }) => {
  const nextStatus: Record<Task["status"], Task["status"] | null> = {
    pendiente: "en-progreso",
    "en-progreso": "completada",
    completada: null,
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white rounded shadow p-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="font-bold">{task.title}</h4>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            Asignado a: {task.assignedTo}
          </p>
          {nextStatus[task.status] && (
            <button
              className="mt-2 bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
              onClick={() =>
                onStatusChange(task, nextStatus[task.status] as Task["status"])
              }
            >
              Mover a {nextStatus[task.status]}
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
