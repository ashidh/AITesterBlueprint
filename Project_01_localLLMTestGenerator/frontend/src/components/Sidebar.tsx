import React from 'react';
import { History, Plus } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-background flex flex-col h-full border-r border-gray-100">
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          New Generation
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="flex items-center gap-2 px-3 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>History</span>
        </div>
        
        {/* Placeholder History Items */}
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <button key={i} className="w-full text-left px-4 py-3 rounded-lg text-sm text-secondary hover:bg-gray-100 transition-colors truncate">
              Generate Auth API tests...
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
