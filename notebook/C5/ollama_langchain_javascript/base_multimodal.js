import { Ollama } from "@langchain/community/llms/ollama";
import * as fs from "node:fs/promises";

const imageData = await fs.readFile("../../../docs/images/img-5-1-4.png"); // 可以替换为你想询问的图片
const model = new Ollama({
  model: "llava",
  baseUrl: "http://127.0.0.1:11434",
}).bind({
  images: [imageData.toString("base64")],
});
const res = await model.invoke("图片里是什么动物呀？");

console.log({ res });