import React from "react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/type/task";
import { Droppable } from "@hello-pangea/dnd";

interface TaskColumnProps {
  title: string;
  droppableId: Task["status"];
  tasks: Task[];
  onStatusChange: (task: Task, status: Task["status"]) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  droppableId,
  tasks,
  onStatusChange,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md min-h-[300px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onStatusChange={onStatusChange}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
