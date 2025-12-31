import React, { useState } from 'react';
import { api } from '../api';
import type { SearchResult } from '../types';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
    onResultClick: (projectId: string, sessionId: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onResultClick }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        try {
            const res = await api.search(query);
            setResults(res);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search logs..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    disabled={searching}
                >
                    <SearchIcon size={18} />
                    {searching ? '...' : 'Search'}
                </button>
            </form>

            <div className="space-y-4">
                {results.map((r, i) => (
                    <div
                        key={i}
                        onClick={() => onResultClick(r.project_name, r.session_id)}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{r.project_name} / {r.session_id}</span>
                            <span>{new Date(r.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-800 line-clamp-3 font-mono text-sm">
                            {r.content}
                        </div>
                    </div>
                ))}
                {results.length === 0 && !searching && query && (
                    <div className="text-center text-gray-500 mt-10">No results found.</div>
                )}
            </div>
        </div>
    );
};
