import React, { useState, useEffect } from 'react';
import { X, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [provider, setProvider] = useState('ollama');
  const [baseUrl, setBaseUrl] = useState('http://localhost:11434');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('llama3');
  
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('llm_config');
    if (saved) {
      const config = JSON.parse(saved);
      setProvider(config.provider);
      setBaseUrl(config.baseUrl || '');
      setApiKey(config.apiKey || '');
      setModel(config.model || '');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('llm_config', JSON.stringify({
      provider, baseUrl, apiKey, model
    }));
    onClose();
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    try {
      const response = await axios.post('http://localhost:5000/api/test-connection', {
        config: { provider, baseUrl, apiKey, model }
      });
      setTestStatus('success');
      setTestMessage(response.data.message);
    } catch (error: any) {
      setTestStatus('error');
      setTestMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">LLM Configuration</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Provider Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Provider</label>
            <select 
              value={provider} 
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none cursor-pointer font-medium"
            >
              <option value="ollama">Ollama (Local)</option>
              <option value="lmstudio">LM Studio (Local)</option>
              <option value="groq">Groq</option>
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>

          {/* Model Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Model Name</label>
            <input 
              type="text" 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. llama3, mixtral-8x7b-32768, gpt-4o"
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          {/* Base URL (For Local) */}
          {(provider === 'ollama' || provider === 'lmstudio') && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Base URL</label>
              <input 
                type="text" 
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          )}

          {/* API Key (For Cloud) */}
          {['groq', 'openai', 'claude', 'gemini'].includes(provider) && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">API Key</label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          )}

          {/* Connection Test Status */}
          {testStatus !== 'idle' && (
            <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
              testStatus === 'testing' ? 'bg-blue-50 text-blue-700' :
              testStatus === 'success' ? 'bg-emerald-50 text-emerald-700' :
              'bg-red-50 text-red-700'
            }`}>
              {testStatus === 'testing' && <Loader2 className="w-5 h-5 animate-spin" />}
              {testStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {testStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              <span>{testStatus === 'testing' ? 'Testing connection...' : testMessage}</span>
            </div>
          )}

        </div>

        <div className="p-6 border-t bg-gray-50/50 flex gap-3">
          <button 
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Test Connection
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-primary hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
