import { useRef, useEffect } from 'react';
import type { Message, Tag } from '../types';
import { Sparkles } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { TagManager } from './TagManager';

interface ChatInterfaceProps {
    sessionId?: string;
    initialTags?: Tag[];
    messages: Message[];
    loading: boolean;
    onTagsChange?: () => void;
    model?: string;
    totalTokens?: number;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    sessionId,
    initialTags = [],
    messages,
    loading,
    onTagsChange,
    model,
    totalTokens
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
                <span className="text-sm">Loading conversation...</span>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-white">
                <Sparkles size={48} className="mb-4 text-gray-200" />
                <p>Select a session to start viewing</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
            {sessionId && (
                <div className="border-b border-gray-100 p-4 flex items-center justify-between bg-white flex-shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <div className="font-mono text-sm text-gray-500">{sessionId}</div>
                            {(model || totalTokens) && (
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                                    {model && <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium">{model}</span>}
                                    {totalTokens && <span>• {totalTokens.toLocaleString()} tokens</span>}
                                </div>
                            )}
                        </div>
                        {onTagsChange && (
                            <TagManager
                                sessionId={sessionId}
                                initialTags={initialTags}
                                onTagsChange={onTagsChange}
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
                    {messages.map((msg, idx) => (
                        <MessageItem key={idx} msg={msg} />
                    ))}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </div>
        </div>
    );
};
