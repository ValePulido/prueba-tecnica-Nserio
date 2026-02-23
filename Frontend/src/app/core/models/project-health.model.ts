export interface ProjectHealth {
  projectId: number;
  name: string;
  clientName: string;
  status: string;
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
}