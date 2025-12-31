import { useState, useEffect } from 'react';
import type { Tag } from '../types';
import { api } from '../api';
import { Plus, X, Tag as TagIcon } from 'lucide-react';

interface TagManagerProps {
    sessionId: string;
    initialTags: Tag[];
    onTagsChange: () => void;
    compact?: boolean;
}

export const TagManager: React.FC<TagManagerProps> = ({ sessionId, initialTags, onTagsChange, compact = false }) => {
    const [tags, setTags] = useState<Tag[]>(initialTags);
    const [isAdding, setIsAdding] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [allTags, setAllTags] = useState<Tag[]>([]);

    useEffect(() => {
        setTags(initialTags);
    }, [initialTags]);

    useEffect(() => {
        if (isAdding) {
            api.getTags().then(setAllTags);
        }
    }, [isAdding]);

    const handleAddTag = async () => {
        if (!newTagName.trim()) return;
        await api.addTag(sessionId, newTagName);
        setNewTagName('');
        setIsAdding(false);
        onTagsChange();
    };

    const handleRemoveTag = async (tagName: string) => {
        await api.removeTag(sessionId, tagName);
        onTagsChange();
    };

    if (compact) {
        return (
            <div className="flex flex-wrap gap-1">
                {isAdding ? (
                    <div className="flex items-center gap-1 animate-in fade-in duration-200">
                        <input
                            type="text"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="Tag"
                            className="w-20 px-1 py-0.5 text-[10px] rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddTag();
                                if (e.key === 'Escape') setIsAdding(false);
                            }}
                            autoFocus
                            list={`existing-tags-${sessionId}`}
                        />
                        <datalist id={`existing-tags-${sessionId}`}>
                            {allTags.map(t => <option key={t.id} value={t.name} />)}
                        </datalist>
                        <button
                            onClick={handleAddTag}
                            className="text-green-600 hover:text-green-700"
                        >
                            <Plus size={10} />
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <X size={10} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsAdding(true); }}
                        className="text-[10px] text-gray-400 hover:text-purple-600 flex items-center gap-1 opacity-60 hover:opacity-100 transition-all"
                    >
                        <Plus size={8} /> Tag
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {tags.map(tag => (
                <span
                    key={tag.name}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                    <TagIcon size={10} />
                    {tag.name}
                    <button
                        onClick={() => handleRemoveTag(tag.name)}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                        <X size={10} />
                    </button>
                </span>
            ))}

            {isAdding ? (
                <div className="flex items-center gap-1 animate-in fade-in duration-200">
                    <input
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="Tag name"
                        className="w-24 px-2 py-0.5 text-xs rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddTag();
                            if (e.key === 'Escape') setIsAdding(false);
                        }}
                        autoFocus
                        list="existing-tags"
                    />
                    <datalist id="existing-tags">
                        {allTags.map(t => <option key={t.id} value={t.name} />)}
                    </datalist>
                    <button
                        onClick={handleAddTag}
                        className="p-0.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <Plus size={12} />
                    </button>
                    <button
                        onClick={() => setIsAdding(false)}
                        className="p-0.5 text-gray-500 hover:text-gray-700"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                >
                    <Plus size={10} /> Add Tag
                </button>
            )}
        </div>
    );
};
