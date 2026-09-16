import { ChatOpenAI } from '@langchain/openai';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';

// Import all tools
import searchProducts from '../tools/searchProducts.js';
import filterProducts from '../tools/filterProducts.js';
import compareProducts from '../tools/compareProducts.js';
import getProductReviews from '../tools/getProductReviews.js';
import checkStock from '../tools/checkStock.js';

// All tools available to the agent
const tools = [searchProducts, filterProducts, compareProducts, getProductReviews, checkStock];

// System prompt — defines the agent's personality and behavior
const SYSTEM_PROMPT = `You are ShopWise AI, an intelligent shopping assistant. Your job is to help users find the perfect product based on their requirements.

BEHAVIOR:
1. When a user describes what they need, extract key requirements (category, budget, specs, purpose).
2. Use the available tools to search and filter products from the database.
3. When you have multiple candidates, compare them to find the best match.
4. Check reviews to validate product quality before recommending.
5. Verify stock availability before making a final recommendation.

RESPONSE FORMAT:
- Always explain WHY you recommend a product, not just what it is.
- Mention key specs that match the user's requirements.
- If comparing products, explain the trade-offs clearly.
- Use ₹ for prices (Indian Rupees).
- Be conversational but concise.

IMPORTANT:
- Always search the database first. Never make up product information.
- If no products match, say so honestly and suggest adjusting the requirements.
- You can call multiple tools in sequence to gather complete information.`;

// Create the agent
const createShoppingAgent = () => {
  const llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0.3, // Lower temperature for more consistent, factual responses
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT],
    new MessagesPlaceholder('chat_history'),
    ['human', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const agent = createToolCallingAgent({ llm, tools, prompt });

  const executor = new AgentExecutor({
    agent,
    tools,
    verbose: true,          // Logs tool calls to console — helpful for debugging
    maxIterations: 8,       // Prevent infinite loops
    returnIntermediateSteps: true,  // Return which tools were called — key for transparency
  });

  return executor;
};

export default createShoppingAgent;
