import React from "react";
import TaskForm from "@/components/TaskForm";
import KanbanBoard from "@/components/KanbanBoard";

const KanbanPage: React.FC = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 ">Tablero Kanban</h1>
      <TaskForm />
      <KanbanBoard />
    </main>
  );
};

export default KanbanPage;
