import { Ollama } from "@langchain/community/llms/ollama";

const ollama = new Ollama({
  baseUrl: "http://localhost:11434",  // 确保Ollama服务已经启动
  model: "llama3.1", // 替换为实际使用的模型
});

const stream = await ollama.stream(
  `你比GPT4厉害吗?`
);

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
}

console.log(chunks.join(""));