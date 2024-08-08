import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const systemTemplate = `
你是一位医疗领域的专家，擅长创建知识图谱。请将所有响应格式化为具有以下结构的JSON对象：
{
  "节点": [
    {"id": "string", "标签": "string", "类型": "string"}
  ],
  "关系": [
    {"源": "string", "目标": "string", "关系": "string"}
  ]
}
确保所有节点id都是唯一的，并且关系引用的是已存在的节点id。
`;

const humanTemplate = `
请为医疗主题"{topic}"创建一个知识图谱。包括以下相关概念: {concepts}。
提供至少5个节点和5个关系。请确保使用中文回答。
`;

const systemMessage = new SystemMessage(systemTemplate);

const humanPrompt = PromptTemplate.fromTemplate(humanTemplate);

const llmJsonMode = new ChatOllama({
  baseUrl: "http://localhost:11434", // 默认值
  model: "llama3.1",
  format: "json",
});

async function generateMedicalKnowledgeGraph(topic, concepts) {
  try {
    const humanMessageContent = await humanPrompt.format({
      topic: topic,
      concepts: concepts.join("、"),
    });

    const humanMessage = new HumanMessage(humanMessageContent);

    const messages = [systemMessage, humanMessage];

    const result = await llmJsonMode.call(messages);
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error("生成知识图谱时出错:", error);
  }
}

// 使用示例
const topic = "糖尿病";
const concepts = ["胰岛素", "血糖", "并发症", "饮食管理", "运动疗法"];

generateMedicalKnowledgeGraph(topic, concepts);