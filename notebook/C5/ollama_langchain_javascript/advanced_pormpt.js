import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";

// 初始化ChatOllama模型
const model = new ChatOllama({
  model: "llama3.1",
  temperature: 0.7,
});

const systemMessageContent = `
你是一位经验丰富的电商文案撰写专家。你的任务是根据给定的产品信息创作吸引人的商品描述。
请确保你的描述简洁、有力，并且突出产品的核心优势。
`;

const humanMessageTemplate = `
请为以下产品创作一段吸引人的商品描述：
产品类型: {product_type}
核心特性: {key_feature}
目标受众: {target_audience}
价格区间: {price_range}
品牌定位: {brand_positioning}

请提供以下三种不同风格的描述，每种大约50字：
1. 理性分析型
2. 情感诉求型
3. 故事化营销型
`;

const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(systemMessageContent),
  HumanMessagePromptTemplate.fromTemplate(humanMessageTemplate),
]);

const chain = prompt.pipe(model);

async function generateProductDescriptions(productInfo) {
  const response = await chain.invoke(productInfo);
  return response.content;
}

// 示例使用
const productInfo = {
  product_type: "智能手表",
  key_feature: "心率监测和睡眠分析",
  target_audience: "注重健康的年轻专业人士",
  price_range: "中高端",
  brand_positioning: "科技与健康的完美结合"
};

generateProductDescriptions(productInfo)
  .then((result) => console.log(result))
  .catch((error) => console.error("Error:", error));