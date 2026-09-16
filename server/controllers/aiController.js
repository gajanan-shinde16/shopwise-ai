import createShoppingAgent from '../agent/shoppingAgent.js';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

// Create one agent instance (reused across requests)
const agent = createShoppingAgent();

export const chat = async (req, res, next) => {
  try {
    const { query, chatHistory = [] } = req.body;

    if (!query) return res.status(400).json({ success: false, message: 'Query is required' });

    // Convert chat history to LangChain message format
    const formattedHistory = chatHistory.map((msg) =>
      msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );

    // Run the agent
    const result = await agent.invoke({
      input: query,
      chat_history: formattedHistory,
    });

    // Extract tool steps for transparency (shows user what the agent did)
    const toolSteps = (result.intermediateSteps || []).map((step) => ({
      tool: step.action.tool,
      input: step.action.toolInput,
    }));

    res.json({
      success: true,
      response: result.output,
      toolsUsed: toolSteps,
    });
  } catch (err) {
    next(err);
  }
};
