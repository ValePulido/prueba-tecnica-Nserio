export interface Task {
  taskId: number;
  title: string;
  description: string;
  assigneeName: string;
  status: string;
  priority: string;
  estimatedComplexity: number;
  dueDate: string;
  completionDate: string | null;
  createdAt: string;
}