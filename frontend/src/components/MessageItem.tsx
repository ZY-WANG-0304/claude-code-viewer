import { useState } from 'react';
import { User, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { formatMessageContent } from '../utils/formatMessage';
import type { Message } from '../types';

interface MessageItemProps {
    msg: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ msg }) => {
    const formattedContent = formatMessageContent(msg.content);
    const lineCount = formattedContent.split('\n').length;
    const isLong = lineCount > 30;
    const [isExpanded, setIsExpanded] = useState(!isLong);

    return (
        <div className={`group flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-[#D9C4A9] text-[#7F5539]' // Claude-ish color
                }`}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
            </div>

            {/* Message Content */}
            <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`font-medium text-xs text-gray-400 mb-1.5 px-0.5 flex items-center gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                    <span>{msg.role === 'user' ? 'You' : 'Claude'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{new Date(msg.timestamp).toLocaleString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}</span>
                </div>

                <div className={`inline-block rounded-2xl px-6 py-4 shadow-sm text-[15px] leading-7 text-left max-w-full overflow-hidden ${msg.role === 'user'
                    ? 'bg-[#f4f4f5] text-gray-800 rounded-tr-sm'
                    : 'bg-white border border-[#eaeaea] text-gray-800 rounded-tl-sm shadow-sm'
                    }`}>
                    <div className={`prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-pre:bg-gray-900 prose-pre:rounded-xl break-words overflow-x-auto ${!isExpanded ? 'max-h-[800px] overflow-hidden relative' : ''
                        }`}>
                        <ReactMarkdown>
                            {isExpanded
                                ? formattedContent
                                : formattedContent.split('\n').slice(0, 30).join('\n') + '\n...'}
                        </ReactMarkdown>

                        {!isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                        )}
                    </div>

                    {isLong && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-3 text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp size={12} /> Show less
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={12} /> Show remaining {lineCount - 30} lines
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
