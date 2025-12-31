import type { Session, Project } from '../types';
import { MessageSquare, Folder, ChevronDown, Box } from 'lucide-react';

import { TagManager } from './TagManager';

interface SidebarProps {
    projects: Project[];
    sessions: Session[];
    selectedProject: string | null;
    selectedSessionId: string | null;
    onSelectProject: (project: string) => void;
    onSelectSession: (sessionId: string) => void;
    onTagsChange: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    projects,
    sessions,
    selectedProject,
    selectedSessionId,
    onSelectProject,
    onSelectSession,
    onTagsChange
}) => {
    return (
        <div className="w-80 bg-[#f9f9fb] border-r border-[#e5e5e5] h-full flex flex-col font-sans flex-shrink-0">
            <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Box className="w-4 h-4" /> Projects
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{projects.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {projects.map(p => {
                    const isSelected = selectedProject === p.name;
                    return (
                        <div key={p.name}>
                            <button
                                onClick={() => onSelectProject(p.name)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 group ${isSelected
                                    ? 'bg-white shadow-sm border border-gray-100 text-gray-900 font-medium'
                                    : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'
                                    }`}
                            >
                                <Folder className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="truncate text-sm">{p.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {p.session_count}
                                        </span>
                                    </div>
                                    {p.last_updated && (
                                        <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                                            {new Date(p.last_updated).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                                {isSelected && <ChevronDown className="w-3 h-3 text-gray-400" />}
                            </button>

                            {isSelected && (
                                <div className="ml-4 mt-1 pl-3 border-l-2 border-gray-100 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                                    {sessions.length === 0 ? (
                                        <div className="text-xs text-gray-400 py-2 pl-2">No sessions found</div>
                                    ) : (
                                        sessions.map(s => (
                                            <div key={s.id} className="relative group/item">
                                                <button
                                                    onClick={() => onSelectSession(s.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-xs flex flex-col gap-1 transition-colors ${selectedSessionId === s.id
                                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                                        : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-800'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare className="w-3 h-3 flex-shrink-0" />
                                                        <span className="truncate">{s.start_time ? new Date(s.start_time).toLocaleString(undefined, {
                                                            month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                                                        }) : s.id}</span>
                                                    </div>

                                                    {/* Session Metadata Badge */}
                                                    {(s.model || s.total_tokens) && (
                                                        <div className="flex items-center gap-1.5 pl-5 mt-0.5 opacity-80">
                                                            {s.model && <span className="text-[9px] border border-current px-1 rounded-sm opacity-70" title={s.model}>{s.model.replace('claude-3-5-', '')}</span>}
                                                            {s.total_tokens && <span className="text-[9px]">{Math.round(s.total_tokens / 1000)}k tks</span>}
                                                        </div>
                                                    )}

                                                    {s.tags && s.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-1 pl-5">
                                                            {s.tags.map(t => (
                                                                <span key={t.id} className={`px-1.5 py-0.5 rounded-sm bg-${t.color}-50 text-${t.color}-700 border border-${t.color}-100 text-[9px]`}>
                                                                    {t.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </button>

                                                {/* Manage Tags Trigger (visible on hover or selected) */}
                                                <div className={`px-3 pb-2 ${selectedSessionId === s.id || 'hidden group-hover/item:block'}`}>
                                                    <TagManager
                                                        sessionId={s.id}
                                                        initialTags={s.tags || []}
                                                        onTagsChange={onTagsChange}
                                                        compact={true}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
