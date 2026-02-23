export const API_ENDPOINTS = {
    DASHBOARD: {
        DEVELOPER_WORKLOAD: '/dashboard/developer-workload',
        PROJECT_HEALTH: '/dashboard/project-health',
        DEVELOPER_DELAY_RISK: '/dashboard/developer-delay-risk'
    },
    DEVELOPERS: {
        GET_ALL: '/developers'
    },
    PROJECTS: {
        GET_ALL: '/projects'
    },
    TASKS: {
        CREATE: '/tasks',
        GET_BY_PROJECT: (projectId: number) => `/projects/${projectId}/tasks`
    }
};