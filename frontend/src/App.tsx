import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { Search } from './components/Search';
import { Analytics } from './components/Analytics';
import { api } from './api';
import type { Session, Message, Project } from './types';
import { LayoutDashboard, Search as SearchIcon, Settings as SettingsIcon, Folder } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';

function AppContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'dashboard' | 'chat' | 'search' | 'analytics' | 'settings'>('dashboard');

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      api.getSessions(selectedProject).then(setSessions);
    } else {
      setSessions([]);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedSessionId) {
      setLoading(true);
      api.getSession(selectedSessionId).then(res => {
        setMessages(res);
        setLoading(false);
      });
    } else {
      setMessages([]);
    }
  }, [selectedSessionId]);

  const handleSelectProject = (project: string) => {
    setSelectedProject(project);
    setSelectedSessionId(null);
    setView('chat');
  };

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setView('chat');
  };

  const handleSearchResultClick = (project: string, sessionId: string) => {
    setSelectedProject(project);
    setSelectedSessionId(sessionId);
    setView('chat');
  };

  const handleTagsChange = () => {
    if (selectedProject) {
      api.getSessions(selectedProject).then(setSessions);
    }
  };

  const currentSession = sessions.find(s => s.id === selectedSessionId);

  return (
    <div className="flex h-screen bg-white">
      <aside className="w-16 bg-gray-900 flex flex-col items-center py-4 gap-2 text-white">
        <button
          onClick={() => setView('dashboard')}
          className={`p-3 rounded-xl transition-colors ${view === 'dashboard' ? 'bg-purple-600' : 'hover:bg-gray-800 text-gray-400'}`}
          title="Dashboard"
        >
          <LayoutDashboard size={24} />
        </button>
        <button
          onClick={() => setView('chat')}
          className={`p-3 rounded-xl transition-colors ${view === 'chat' ? 'bg-purple-600' : 'hover:bg-gray-800 text-gray-400'}`}
          title="Projects"
        >
          <Folder size={24} />
        </button>
        <button
          onClick={() => setView('search')}
          className={`p-3 rounded-xl transition-colors ${view === 'search' ? 'bg-purple-600' : 'hover:bg-gray-800 text-gray-400'}`}
          title="Search"
        >
          <SearchIcon size={24} />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => setView('settings')}
          className={`p-3 rounded-xl transition-colors ${view === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-800 text-gray-400'}`}
          title="Settings"
        >
          <SettingsIcon size={24} />
        </button>
      </aside>

      {view === 'chat' && (
        <Sidebar
          projects={projects}
          sessions={sessions}
          selectedProject={selectedProject}
          selectedSessionId={selectedSessionId}
          onSelectProject={handleSelectProject}
          onSelectSession={handleSelectSession}
          onTagsChange={handleTagsChange}
        />
      )}

      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {view === 'dashboard' && <Dashboard />}
        {view === 'chat' && (
          <ChatInterface
            messages={messages}
            loading={loading}
            sessionId={selectedSessionId || undefined}
            initialTags={currentSession?.tags}
            onTagsChange={handleTagsChange}
            model={currentSession?.model}
            totalTokens={currentSession?.total_tokens}
          />
        )}
        {view === 'search' && (
          <Search onResultClick={handleSearchResultClick} />
        )}
        {view === 'analytics' && (
          <Analytics />
        )}
        {view === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
