import createShoppingAgent from '../agent/shoppingAgent.js';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

// Create one agent instance (reused across requests)
const agent = createShoppingAgent();

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

    // Extract the final AI response (last AIMessage in the result)
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

    res.json({
      success: true,
      response: finalResponse,
      toolsUsed: toolSteps,
    });
  } catch (err) {
    next(err);
  }
};
