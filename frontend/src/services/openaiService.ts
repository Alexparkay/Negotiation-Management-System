import axios from 'axios';
import { 
  mockChatResponse, 
  mockStoreInfo, 
  mockVendorInfo, 
  mockTaskInfo, 
  mockAssistantResponse 
} from './mockOpenaiService';

// This service will communicate with our backend API which will handle the actual OpenAI API calls
// If the backend is not available, it will fall back to mock responses

const API_URL = '/api/openai'; // This will be proxied to our backend

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function getChatResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/chat`, { messages });
    return response.data.response || "No response";
  } catch (error) {
    console.error('Error calling OpenAI API, falling back to mock response:', error);
    // Fall back to mock response
    return mockChatResponse(messages);
  }
}

// Function to get store-related information
export async function getStoreInfo(query: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/store-info`, { query });
    return response.data.response || "No information found";
  } catch (error) {
    console.error('Error fetching store information, falling back to mock response:', error);
    // Fall back to mock response
    return mockStoreInfo(query);
  }
}

// Function to get vendor-related information
export async function getVendorInfo(query: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/vendor-info`, { query });
    return response.data.response || "No information found";
  } catch (error) {
    console.error('Error fetching vendor information, falling back to mock response:', error);
    // Fall back to mock response
    return mockVendorInfo(query);
  }
}

// Function to get task-related information
export async function getTaskInfo(query: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/task-info`, { query });
    return response.data.response || "No information found";
  } catch (error) {
    console.error('Error fetching task information, falling back to mock response:', error);
    // Fall back to mock response
    return mockTaskInfo(query);
  }
}

// General assistant function that will determine the type of query and route to the appropriate function
export async function getAssistantResponse(query: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/assistant`, { query });
    return response.data.response || "I don't have information about that.";
  } catch (error) {
    console.error('Error getting assistant response, falling back to mock response:', error);
    // Fall back to mock response
    return mockAssistantResponse(query);
  }
} 