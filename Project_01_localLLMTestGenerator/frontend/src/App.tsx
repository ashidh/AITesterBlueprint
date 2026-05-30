import React, { useState } from 'react';
import { Settings, History, MessageSquarePlus, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import SettingsModal from './components/SettingsModal';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - History */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative bg-surface shadow-xl rounded-l-3xl overflow-hidden my-2 border border-gray-100">
        
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-white/50 backdrop-blur-sm z-10">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            Local LLM Test Generator
          </h1>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-gray-500 hover:text-primary hover:bg-indigo-50 rounded-full transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* Chat Interface */}
        <ChatInterface />
        
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}

export default App;
