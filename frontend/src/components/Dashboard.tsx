import { useEffect, useState } from 'react';
import { api } from '../api';
import type { AnalyticsData } from '../types';
import { TrendingUp, MessageSquare, Folder, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<AnalyticsData & { avg_messages_per_session?: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.getDashboard().then(res => {
            setData(res);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="flex-1 overflow-y-auto bg-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-purple-600" />
                    Dashboard
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-700">Projects</span>
                            <Folder className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-purple-900">{data.total_projects}</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-700">Sessions</span>
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-blue-900">{data.total_sessions}</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-700">Messages</span>
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-green-900">{data.total_messages.toLocaleString()}</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-orange-700">Avg/Session</span>
                            <Activity className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="text-3xl font-bold text-orange-900">{data.avg_messages_per_session?.toFixed(1) || 0}</div>
                    </div>
                </div>

                {/* Tags Section */}
                {data.tag_stats && data.tag_stats.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tag Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.tag_stats.slice(0, 6).map(tag => (
                                <div key={tag.name} className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="font-medium text-gray-900 mb-2">{tag.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {tag.sessions} sessions • {tag.messages} messages
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Activity Chart */}
                {data.daily_activity && data.daily_activity.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                        <div className="space-y-2">
                            {data.daily_activity.slice(0, 10).map(day => (
                                <div key={day.date} className="flex items-center gap-4">
                                    <div className="w-24 text-sm text-gray-600">{day.date}</div>
                                    <div className="flex-1 bg-white rounded-lg overflow-hidden border border-gray-200">
                                        <div
                                            className="h-8 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end px-3 text-white text-sm font-medium"
                                            style={{ width: `${Math.min(100, (day.count / Math.max(...data.daily_activity.map(d => d.count))) * 100)}%` }}
                                        >
                                            {day.count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
