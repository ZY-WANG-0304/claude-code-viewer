export interface Project {
    name: string;
    last_updated: string | null;
    session_count: number;
}

export interface Tag {
    id: number;
    name: string;
    color: string;
}

export interface Session {
    id: string;
    project_name: string;
    file_path: string;
    start_time: string | null;
    tags?: Tag[];
    model?: string;
    total_tokens?: number;
}

export interface Message {
    id: number;
    session_id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: string;
}

export interface SearchResult extends Message {
    project_name: string;
}

export interface AnalyticsData {
    total_projects: number;
    total_sessions: number;
    total_messages: number;
    daily_activity: { date: string; count: number }[];
    tag_stats: { name: string; color: string; sessions: number; messages: number }[];
}
