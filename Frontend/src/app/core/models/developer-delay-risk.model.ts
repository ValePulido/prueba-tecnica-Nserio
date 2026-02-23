export interface DeveloperDelayRisk {
  developerName: string;
  openTasksCount: number;
  avgDelayDays: number;
  nearestDueDate: string;
  latestDueDate: string;
  predictedCompletionDate: string;
  highRiskFlag: number;
}