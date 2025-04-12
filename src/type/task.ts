export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: "pendiente" | "en-progreso" | "completada";
}
