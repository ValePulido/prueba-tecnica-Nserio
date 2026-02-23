export interface CreateTask {
  projectId: number;
  title: string;
  description: string;
  assigneeId: number;
  status: string;
  priority: string;
  estimatedComplexity: number;
  dueDate: string;
}