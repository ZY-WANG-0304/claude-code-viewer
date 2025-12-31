import { useState, useEffect } from 'react';
import { api } from '../api';
import { Settings as SettingsIcon, FileText, Users, Terminal, Save, RefreshCw } from 'lucide-react';

interface ConfigFile {
    name: string;
    path: string;
    type: string;
}

interface ConfigList {
    files: ConfigFile[];
    directories: Record<string, ConfigFile[]>;
}

export const Settings: React.FC = () => {
    const [configs, setConfigs] = useState<ConfigList | null>(null);
    const [activeTab, setActiveTab] = useState<'settings' | 'agents' | 'commands' | 'claude'>('settings');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        loadConfigs();
    }, []);

    const loadConfigs = async () => {
        setLoading(true);
        const data = await api.getConfigs();
        setConfigs(data);
        setLoading(false);
    };

    const loadFile = async (path: string) => {
        setLoading(true);
        const data = await api.getConfig(path);
        setContent(data.content);
        setSelectedFile(path);
        setHasChanges(false);
        setLoading(false);
    };

    const saveFile = async () => {
        if (!selectedFile) return;
        setSaving(true);
        try {
            await api.updateConfig(selectedFile, content);
            setHasChanges(false);
            alert('Saved successfully!');
        } catch (error) {
            alert('Error saving: ' + error);
        }
        setSaving(false);
    };

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
        setHasChanges(true);
    };

    const renderFileList = (files: ConfigFile[]) => (
        <div className="space-y-1">
            {files.map(file => (
                <button
                    key={file.path}
                    onClick={() => loadFile(file.path)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedFile === file.path
                            ? 'bg-purple-100 text-purple-900 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                >
                    {file.name}
                </button>
            ))}
        </div>
    );

    if (loading && !configs) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
            <div className="border-b border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <SettingsIcon className="w-7 h-7 text-purple-600" />
                    Settings
                </h1>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
                    <div className="space-y-1">
                        <button
                            onClick={() => { setActiveTab('settings'); setSelectedFile(null); }}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'settings' ? 'bg-purple-100 text-purple-900 font-medium' : 'hover:bg-gray-100'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Global Settings
                        </button>
                        <button
                            onClick={() => { setActiveTab('agents'); setSelectedFile(null); }}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'agents' ? 'bg-purple-100 text-purple-900 font-medium' : 'hover:bg-gray-100'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Agents
                        </button>
                        <button
                            onClick={() => { setActiveTab('commands'); setSelectedFile(null); }}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'commands' ? 'bg-purple-100 text-purple-900 font-medium' : 'hover:bg-gray-100'
                                }`}
                        >
                            <Terminal className="w-4 h-4" />
                            Commands
                        </button>
                        <button
                            onClick={() => { setActiveTab('claude'); setSelectedFile(null); }}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'claude' ? 'bg-purple-100 text-purple-900 font-medium' : 'hover:bg-gray-100'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Global Instructions
                        </button>
                    </div>

                    {/* File List */}
                    {configs && (
                        <div className="mt-6">
                            {activeTab === 'settings' && renderFileList(configs.files.filter(f => f.name === 'settings.json'))}
                            {activeTab === 'agents' && configs.directories.agents && renderFileList(configs.directories.agents)}
                            {activeTab === 'commands' && configs.directories.commands && renderFileList(configs.directories.commands)}
                            {activeTab === 'claude' && renderFileList(configs.files.filter(f => f.name === 'CLAUDE.md'))}
                        </div>
                    )}
                </div>

                {/* Content Editor */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedFile ? (
                        <>
                            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700">{selectedFile}</span>
                                    {hasChanges && <span className="text-xs text-orange-600 font-medium">● Unsaved changes</span>}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => loadFile(selectedFile)}
                                        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                        disabled={saving}
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        Reload
                                    </button>
                                    <button
                                        onClick={saveFile}
                                        disabled={!hasChanges || saving}
                                        className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <textarea
                                    value={content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    className="w-full h-full p-6 font-mono text-sm resize-none focus:outline-none"
                                    spellCheck={false}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>Select a file to edit</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
