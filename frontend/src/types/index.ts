export interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export interface Task {
    id: number;
    username: string;
    email: string;
    text: string;
    completed: boolean;
    created_at: string;
    edited_by_admin: boolean;
}

export interface TaskResponse {
    tasks: Task[];
    total: number;
    pages: number;
    current_page: number;
    per_page: number;
}

export interface LoginData {
    username: string;
    password: string;
}
