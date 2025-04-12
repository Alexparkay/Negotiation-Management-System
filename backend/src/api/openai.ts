import express from 'express';
import { getChatCompletion, getStoreInfo, getVendorInfo, getTaskInfo, getAssistantResponse } from '../services/openai';

const router = express.Router();

// Route for general chat completions
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request. Messages array is required.' });
    }
    
    const response = await getChatCompletion(messages);
    return res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Route for store-related information
router.post('/store-info', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid request. Query string is required.' });
    }
    
    const response = await getStoreInfo(query);
    return res.json({ response });
  } catch (error) {
    console.error('Error in store-info endpoint:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Route for vendor-related information
router.post('/vendor-info', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid request. Query string is required.' });
    }
    
    const response = await getVendorInfo(query);
    return res.json({ response });
  } catch (error) {
    console.error('Error in vendor-info endpoint:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Route for task-related information
router.post('/task-info', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid request. Query string is required.' });
    }
    
    const response = await getTaskInfo(query);
    return res.json({ response });
  } catch (error) {
    console.error('Error in task-info endpoint:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Route for general assistant responses
router.post('/assistant', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid request. Query string is required.' });
    }
    
    const response = await getAssistantResponse(query);
    return res.json({ response });
  } catch (error) {
    console.error('Error in assistant endpoint:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

export default router; 