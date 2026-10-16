import createShoppingAgent from '../agent/shoppingAgent.js';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import pool from '../config/db.js';

// Create one agent instance (reused across requests)
const agent = createShoppingAgent();

// Extract unique product IDs from tool call results
const extractProductIds = (messages) => {
  const ids = new Set();
  for (const msg of messages) {
    // Check tool response messages for product data
    if (msg._getType() === 'tool' && msg.content) {
      try {
        const data = JSON.parse(msg.content);
        const items = Array.isArray(data) ? data : data.reviews ? [] : [data];
        items.forEach((item) => { if (item.id) ids.add(item.id); });
      } catch { /* not JSON, skip */ }
    }
  }
  return [...ids];
};

// Fetch product cards for the recommended products
const getProductCards = async (productIds) => {
  if (productIds.length === 0) return [];
  const placeholders = productIds.map(() => '?').join(',');
  const [rows] = await pool.query(
    `SELECT id, name, brand, price, rating, image_url, category, stock FROM products WHERE id IN (${placeholders})`,
    productIds
  );
  return rows;
};

export const chat = async (req, res, next) => {
  try {
    const { query, chatHistory = [] } = req.body;

    if (!query) return res.status(400).json({ success: false, message: 'Query is required' });

    // Build messages array: chat history + new user message
    const messages = chatHistory.map((msg) =>
      msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );
    messages.push(new HumanMessage(query));

    // Run the agent
    const result = await agent.invoke({ messages });

    // Extract the final AI response (last AIMessage with content)
    const aiMessages = result.messages.filter((m) => m._getType() === 'ai' && m.content);
    const finalResponse = aiMessages.length > 0
      ? aiMessages[aiMessages.length - 1].content
      : 'Sorry, I could not process your request.';

    // Extract tool calls for transparency
    const toolSteps = result.messages
      .filter((m) => m._getType() === 'ai' && m.tool_calls && m.tool_calls.length > 0)
      .flatMap((m) => m.tool_calls.map((tc) => ({
        tool: tc.name,
        input: tc.args,
      })));

    // Extract product IDs from tool results and fetch card data
    const productIds = extractProductIds(result.messages);
    const products = await getProductCards(productIds);

    res.json({
      success: true,
      response: finalResponse,
      toolsUsed: toolSteps,
      products, // product cards for interactive display
    });
  } catch (err) {
    next(err);
  }
};
