import { Router } from 'express';
import { generateTestCase, testConnection } from '../controllers/llmController';

const router = Router();

// Test connection to a specific LLM provider
router.post('/test-connection', testConnection);

// Generate test case from requirement
router.post('/generate', generateTestCase);

export default router;
