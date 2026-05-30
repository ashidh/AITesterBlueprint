import { Request, Response } from 'express';
import axios from 'axios';

// Interfaces
interface ProviderConfig {
  provider: 'ollama' | 'lmstudio' | 'groq' | 'openai' | 'claude' | 'gemini';
  apiKey?: string;
  baseUrl?: string;
  model: string;
}

interface GenerateRequest {
  requirement: string;
  config: ProviderConfig;
}

export const testConnection = async (req: Request, res: Response) => {
  const config: ProviderConfig = req.body.config;
  
  try {
    // Basic mock logic for testing connection based on provider type
    // In reality, this would hit the provider's /models or /models API
    let success = false;
    
    switch (config.provider) {
      case 'ollama':
      case 'lmstudio':
        // Test local endpoint
        if (config.baseUrl) {
          const response = await axios.get(`${config.baseUrl}/api/tags`); // For Ollama
          success = response.status === 200;
        }
        break;
      case 'groq':
      case 'openai':
      case 'claude':
      case 'gemini':
        // We'll just validate that an API key is provided for now
        success = !!config.apiKey;
        break;
    }

    if (success) {
      return res.json({ status: 'success', message: `Connected to ${config.provider}` });
    } else {
      return res.status(400).json({ status: 'error', message: 'Connection failed' });
    }
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const jiraSystemPrompt = `You are a strict QA Test Case generator. You must output the result strictly in Jira Test Case format. Include Summary, Description, Pre-conditions, Test Steps, Expected Results, and Status. Generate both functional and non-functional test cases based on the provided requirements.`;

export const generateTestCase = async (req: Request, res: Response) => {
  console.log("Received generate request:", req.body);
  const { requirement, config } = req.body as GenerateRequest;

  if (!requirement || !config) {
    return res.status(400).json({ error: 'Missing requirement or configuration' });
  }

  try {
    let generatedText = '';

    // LLM Provider dispatching
    switch (config.provider) {
      case 'ollama':
      case 'lmstudio': {
        // Local providers usually have an OpenAI compatible endpoint or custom like Ollama /api/generate
        const endpoint = config.provider === 'ollama' 
          ? `${config.baseUrl}/api/generate`
          : `${config.baseUrl}/v1/chat/completions`; // LM Studio uses OpenAI format usually

        if (config.provider === 'ollama') {
          const resp = await axios.post(endpoint, {
            model: config.model,
            system: jiraSystemPrompt,
            prompt: requirement,
            stream: false
          });
          generatedText = resp.data.response;
        } else {
          // LM Studio
          const resp = await axios.post(endpoint, {
            model: config.model,
            messages: [
              { role: 'system', content: jiraSystemPrompt },
              { role: 'user', content: requirement }
            ],
            stream: false
          });
          generatedText = resp.data.choices[0].message.content;
        }
        break;
      }
      
      case 'groq': {
        const resp = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
          model: config.model || 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: jiraSystemPrompt },
            { role: 'user', content: requirement }
          ]
        }, {
          headers: { Authorization: `Bearer ${config.apiKey}` }
        });
        generatedText = resp.data.choices[0].message.content;
        break;
      }

      // Add simple stubs for OpenAI, Claude, Gemini...
      case 'openai':
      case 'claude':
      case 'gemini':
        generatedText = `[Simulated generation for ${config.provider}]\n\nSummary: Validate ${requirement.substring(0, 20)}...\nDescription: Generated test cases...`;
        break;

      default:
        return res.status(400).json({ error: 'Unknown provider' });
    }

    return res.json({ result: generatedText });

  } catch (error: any) {
    console.error("Backend Error:", error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const errorMsg = error.response?.data?.error?.message || error.response?.data?.error || error.message;
    return res.status(statusCode).json({ error: errorMsg });
  }
};
