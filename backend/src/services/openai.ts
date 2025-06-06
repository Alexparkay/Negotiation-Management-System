import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here', // Replace with your actual API key if not using env vars
});

// Store context about our application to help guide the AI responses
const storeContext = `
You are an AI assistant for a store opening management platform called Marx Technology.
The platform helps manage global store openings, vendors, contracts, and procurement.
Here's information about the platform:

1. Stores: The platform tracks store openings globally with details like location, opening date, 
   budget, and completion status. Stores can be in planning, in-progress, completed, or delayed status.
   Current store projects include:
   - Downtown Flagship Store in New York City (65% complete, opening June 15, 2024)
   - Oxford Street Branch in London (30% complete, opening July 22, 2024)
   - Yorkdale Mall Kiosk in Toronto (80% complete, opening May 10, 2024)
   - Sydney Harbour Store (15% complete, opening August 5, 2024)
   - Berlin Central Store (100% complete, opened April 30, 2024)
   - Chicago Riverside Mall (45% complete, delayed, new opening date May 28, 2024)

2. Tasks: Each store opening has associated tasks that need to be completed, such as lease agreements,
   hiring staff, setting up IT systems, etc. Tasks have priorities (high, medium, low) and statuses.
   High priority tasks include:
   - Complete lease agreement for Downtown Flagship Store (due May 20, 2024)
   - Finalize store layout design for Oxford Street Branch (due June 10, 2024)
   - Hire store manager for Sydney Harbour Store (due May 15, 2024)
   - Obtain business permits for Downtown Flagship Store (OVERDUE, was due April 30, 2024)

3. Vendors: The platform manages relationships with vendors who provide services or products for store openings.
   Key vendors include Global Construction Ltd (Construction), Elite Fixtures & Fittings (Fixtures),
   TechPoint Systems (IT), and Secure Solutions Inc (Security).

4. Contracts: Legal agreements with vendors are tracked, including contract value, start/end dates, and renewal options.
   Some contracts are expiring soon and need attention.

5. Procurement: The platform manages purchase orders for store openings, tracking items, costs, and delivery status.

6. Checklists: Templates for store opening procedures based on store type and country.

While you should be helpful with information about the platform and store openings, you should also be able to
engage in general conversation and answer questions on any topic. Be conversational, helpful, and friendly.
`;

// Function to get a chat response from OpenAI
export async function getChatCompletion(messages: Array<{ role: string; content: string }>): Promise<string> {
  try {
    // Add system message with context if not already present
    if (!messages.some(msg => msg.role === 'system')) {
      messages.unshift({
        role: 'system',
        content: storeContext,
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0].message.content || 'No response generated.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes('API key')) {
      return 'The OpenAI API key is missing or invalid. Please check your configuration.';
    }
    
    // Fall back to mock response if OpenAI API is unavailable
    return generateMockResponse(messages);
  }
}

// Function to generate a mock response when OpenAI API is unavailable
function generateMockResponse(messages: Array<{ role: string; content: string }>): string {
  // Get the last user message
  const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user')?.content || '';
  const lowerQuery = lastUserMessage.toLowerCase();
  
  // Store-related queries
  if (lowerQuery.includes('new york') || lowerQuery.includes('downtown flagship')) {
    return 'The Downtown Flagship Store in New York City is scheduled to open on June 15, 2024. It is currently at 65% completion with a budget of $2.5 million. The store will be 12,500 sq ft and will employ approximately 45 staff members. The store manager is John Smith.';
  } else if (lowerQuery.includes('london') || lowerQuery.includes('oxford street')) {
    return 'The Oxford Street Branch in London, UK is scheduled to open on July 22, 2024. It is currently in the planning phase at 30% completion with a budget of $1.8 million. The store will be 8,200 sq ft and will employ approximately 32 staff members.';
  } else if (lowerQuery.includes('store') && lowerQuery.includes('opening')) {
    return 'We have 5 stores scheduled to open in the coming months. The next opening is Yorkdale Mall Kiosk in Toronto on May 10, 2024. Overall, our store openings are progressing well with an average completion rate of 47%.';
  } 
  // Task-related queries
  else if (lowerQuery.includes('task') || lowerQuery.includes('priority')) {
    return 'There are 122 pending tasks across all stores. 4 of these are high priority tasks that require immediate attention. The most urgent task is obtaining business permits for the Downtown Flagship Store, which is currently overdue.';
  } 
  // Vendor-related queries
  else if (lowerQuery.includes('vendor') || lowerQuery.includes('supplier')) {
    return 'We have 6 active vendors across different categories: Global Construction Ltd (Construction), Elite Fixtures & Fittings (Fixtures), TechPoint Systems (IT), Secure Solutions Inc (Security), EcoClean Services (Cleaning), and Precision Logistics (Logistics).';
  } 
  // Contract-related queries
  else if (lowerQuery.includes('contract') || lowerQuery.includes('agreement')) {
    return 'We have 3 active contracts with vendors. 1 contract is expiring within the next 90 days: Security Systems Maintenance with Secure Solutions Inc (expires April 30, 2024).';
  }
  // Status-related queries
  else if (lowerQuery.includes('progress') || lowerQuery.includes('status')) {
    return 'Overall store opening progress is at 56%. The most advanced project is Yorkdale Mall Kiosk at 80% completion, followed by Downtown Flagship Store at 65%. Berlin Central Store is already completed.';
  }
  // Joke
  else if (lowerQuery.includes('joke')) {
    return "Why don't scientists trust atoms? Because they make up everything!";
  }
  // General greeting
  else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return "Hello! I'm your Marx Technology assistant. I can help you with information about store openings, tasks, vendors, or answer general questions. How can I assist you today?";
  }
  // General fallback
  else {
    return "I'm here to help with information about our store openings and other aspects of the Marx Technology platform. I can also chat about other topics. What would you like to know?";
  }
}

// Function to get store-related information
export async function getStoreInfo(query: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `${storeContext}\nThe user is asking specifically about store information. Focus your response on store openings, locations, and related data.`,
    },
    {
      role: 'user',
      content: query,
    },
  ];

  return getChatCompletion(messages);
}

// Function to get vendor-related information
export async function getVendorInfo(query: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `${storeContext}\nThe user is asking specifically about vendor information. Focus your response on vendors, their categories, and relationships.`,
    },
    {
      role: 'user',
      content: query,
    },
  ];

  return getChatCompletion(messages);
}

// Function to get task-related information
export async function getTaskInfo(query: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: `${storeContext}\nThe user is asking specifically about tasks related to store openings. Focus your response on tasks, priorities, and completion status.`,
    },
    {
      role: 'user',
      content: query,
    },
  ];

  return getChatCompletion(messages);
}

// General assistant function that determines the type of query and provides an appropriate response
export async function getAssistantResponse(query: string): Promise<string> {
  // For direct queries, we'll just use a simple approach
  const messages = [
    {
      role: 'system',
      content: storeContext,
    },
    {
      role: 'user',
      content: query,
    },
  ];
  
  return getChatCompletion(messages);
}
