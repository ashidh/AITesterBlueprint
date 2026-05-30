"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const llmController_1 = require("../controllers/llmController");
const router = (0, express_1.Router)();
// Test connection to a specific LLM provider
router.post('/test-connection', llmController_1.testConnection);
// Generate test case from requirement
router.post('/generate', llmController_1.generateTestCase);
exports.default = router;
//# sourceMappingURL=api.js.map