import { tool } from "@langchain/core/tools";
import { ChatOllama } from "@langchain/ollama";
import { z } from "zod";

// 定义简单计算器工具
const simpleCalculatorTool = tool((args) => {
  const { operation, x, y } = args;
  switch (operation) {
    case "add":
      return x + y;
    case "subtract":
      return x - y;
    case "multiply":
      return x * y;
    case "divide":
      if (y !== 0) {
        return x / y;
      } else {
        throw new Error("Cannot divide by zero");
      }
    default:
      throw new Error("Invalid operation");
  }
}, {
  name: "simple_calculator",
  description: "Perform simple arithmetic operations",
  schema: z.object({
    operation: z.enum(["add", "subtract", "multiply", "divide"]),
    x: z.number(),
    y: z.number(),
  }),
});

// 定义模型
const llm = new ChatOllama({
  model: "llama3.1",
  temperature: 0,
});

// 将工具绑定到模型
const llmWithTools = llm.bindTools([simpleCalculatorTool]);

// 使用模型进行工具调用
const result = await llmWithTools.invoke(
  "你知道一千万乘二是多少吗？请使用 'simple_calculator' 工具来计算。"
);

console.log(result);