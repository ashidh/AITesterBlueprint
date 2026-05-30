import React, { useState } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import axios from 'axios';

const ChatInterface = () => {
  const [requirement, setRequirement] = useState('');
  const [testCase, setTestCase] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!requirement.trim()) return;
    
    setIsLoading(true);
    setTestCase('');
    
    try {
      // Fetch settings from local storage
      const savedConfig = localStorage.getItem('llm_config');
      const config = savedConfig ? JSON.parse(savedConfig) : {
        provider: 'openai',
        model: 'gpt-3.5-turbo'
      };

      const response = await axios.post('http://localhost:5000/api/generate', {
        requirement,
        config
      });
      
      setTestCase(response.data.result);
      setRequirement(''); // Clear the input field on success
    } catch (error: any) {
      setTestCase(`Error: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full">
      {/* Output Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {testCase ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 prose prose-indigo max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 font-medium">
                  {testCase}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <Bot className="w-16 h-16 text-indigo-100" />
            <p className="text-lg">Provide a Jira requirement below to generate test cases.</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-primary transition-all p-2">
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Paste your Jira requirements here..."
            className="flex-1 max-h-48 min-h-[56px] p-3 resize-none outline-none text-secondary bg-transparent placeholder-gray-400"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !requirement.trim()}
            className="p-3 mb-1 bg-primary text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-primary transition-all active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
