
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { FaissStore } from "langchain/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { RunnableSequence } from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";

// 初始化 OllamaLLM
const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.1",
});

console.log("OllamaLLM 初始化 llama3.1 完成");

// 基本使用示例：ChatPromptTemplate
async function basicChatExample() {
  const template = `
  你是一个乐于助人的AI，擅长于解决回答各种问题。
  问题：{question}
  `;

  const prompt = ChatPromptTemplate.fromTemplate(template);
  const chain = prompt.pipe(model);

  const result = await chain.invoke({ question: "你比GPT4厉害吗？" });
  console.log(result.content);
}

// 流式输出示例
async function streamExample() {
  const streamModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.1",
    temperature: 0.7,
  });

  const messages = [
    ["human", "你好呀"],
  ];

  const stream = await streamModel.stream(messages);

  for await (const chunk of stream) {
    process.stdout.write(chunk.content);
  }
}

// 工具调用示例
async function toolCallExample() {
  function simpleCalculator(operation, x, y) {
    switch (operation) {
      case "add":
        return x + y;
      case "subtract":
        return x - y;
      case "multiply":
        return x * y;
      case "divide":
        if (y !== 0) return x / y;
        throw new Error("Cannot divide by zero");
      default:
        throw new Error("Invalid operation");
    }
  }

  const llm = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.1",
    temperature: 0,
  }).bind({
    tools: [
      {
        type: "function",
        function: {
          name: "simpleCalculator",
          description: "Perform basic arithmetic operations",
          parameters: {
            type: "object",
            properties: {
              operation: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
              x: { type: "number" },
              y: { type: "number" },
            },
            required: ["operation", "x", "y"],
          },
        },
      },
    ],
  });

  const result = await llm.invoke("你知道一千万乘二是多少吗？");
  console.log("结果:", result.content);
  console.log("工具调用:", result.additional_kwargs.tool_calls);
}

// ConversationChain 示例
async function conversationChainExample() {
  const memory = new BufferMemory();

  const conversation = new ConversationChain({
    llm: model,
    memory: memory,
    verbose: true,
  });

  let response = await conversation.call({ input: "你好，我想了解一下人工智能。" });
  console.log("AI:", response.response);

  response = await conversation.call({ input: "能给我举个AI在日常生活中的应用例子吗？" });
  console.log("AI:", response.response);

  response = await conversation.call({ input: "这听起来很有趣。AI在医疗领域有什么应用？" });
  console.log("AI:", response.response);
}

// 自定义提示模板示例
async function customPromptExample() {
  const systemTemplate = `
  你是一位经验丰富的电商文案撰写专家。你的任务是根据给定的产品信息创作吸引人的商品描述。
  请确保你的描述简洁、有力，并且突出产品的核心优势。
  `;

  const humanTemplate = `
  请为以下产品创作一段吸引人的商品描述：
  产品类型: {productType}
  核心特性: {keyFeature}
  目标受众: {targetAudience}
  价格区间: {priceRange}
  品牌定位: {brandPositioning}

  请提供以下三种不同风格的描述，每种大约50字：
  1. 理性分析型
  2. 情感诉求型
  3. 故事化营销型
  `;

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    HumanMessagePromptTemplate.fromTemplate(humanTemplate),
  ]);

  async function generateProductDescriptions(productInfo) {
    const formattedPrompt = await chatPrompt.formatMessages(productInfo);
    const response = await model.call(formattedPrompt);
    return response.content;
  }

  const productInfo = {
    productType: "智能手表",
    keyFeature: "心率监测和睡眠分析",
    targetAudience: "注重健康的年轻专业人士",
    priceRange: "中高端",
    brandPositioning: "科技与健康的完美结合",
  };

  const result = await generateProductDescriptions(productInfo);
  console.log(result);
}

// RAG 问答系统示例
async function ragExample() {
  const llm = new ChatOllama({ model: "llama3.1" });
  const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text" });

  const text = `
  Datawhale 是一个专注于数据科学与 AI 领域的开源组织，汇集了众多领域院校和知名企业的优秀学习者，聚合了一群有开源精神和探索精神的团队成员。
  Datawhale 以"for the learner，和学习者一起成长"为愿景，鼓励真实地展现自我、开放包容、互信互助、敢于试错和勇于担当。
  同时 Datawhale 用开源的理念去探索开源内容、开源学习和开源方案，赋能人才培养，助力人才成长，建立起人与人，人与知识，人与企业和人与未来的联结。
  如果你想在Datawhale开源社区发起一个开源项目，请详细阅读Datawhale开源项目指南[https://github.com/datawhalechina/DOPMC/blob/main/GUIDE.md]
  `;

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 20 });
  const chunks = await textSplitter.splitText(text);

  const vectorstore = await FaissStore.fromTexts(chunks, chunks.map(() => ({})), embeddings);
  const retriever = vectorstore.asRetriever();

  const template = `只能使用下列内容回答问题:
  {context}

  Question: {question}
  `;
  const prompt = ChatPromptTemplate.fromTemplate(template);

  const chain = RunnableSequence.from([
    {
      context: async (input) => {
        const relevantDocs = await retriever.getRelevantDocuments(input.question);
        return relevantDocs.map((doc) => doc.pageContent).join("\n");
      },
      question: (input) => input.question,
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  const question = "我想为datawhale贡献该怎么做？";
  const response = await chain.invoke({ question });
  console.log(response);
}

// 运行所有示例
async function runAllExamples() {
  console.log("Running basic chat example:");
  await basicChatExample();

  console.log("\nRunning stream example:");
  await streamExample();

  console.log("\nRunning tool call example:");
  await toolCallExample();

  console.log("\nRunning conversation chain example:");
  await conversationChainExample();

  console.log("\nRunning custom prompt example:");
  await customPromptExample();

  console.log("\nRunning RAG example:");
  await ragExample();
}

runAllExamples().catch(console.error);