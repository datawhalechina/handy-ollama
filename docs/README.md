![动手学Ollama](images/header.svg)

# 💻 handy-ollama 🦙
Learning to deploy Ollama with hands-on practice, making the deployment of large language models accessible to everyone!

## 项目简介
动手学 Ollama 教程，轻松上手实现大模型本地化部署，快速在本地管理以及运行大模型，让 CPU 也可以玩转大模型推理部署！

本教程涵盖从基础入门到进阶使用的全方位内容，并通过实际应用案例深入理解和掌握大模型部署以及应用技术。我们的教程提供清晰的步骤和实用的技巧，无论是刚刚接触大模型部署的小白，还是有一定经验的开发者，都可以从零开始学习 Ollama ，实现本地部署大模型以及相关应用。

目录结构说明：

      docs ---------------------- Markdown 文档文件
      notebook ------------------ Notebook 源代码文件以及部分 Python、Java 和 JavaScript 源文件 
      images -------------------- 图片

## 项目亮点
随着大模型的飞速发展，市面上出现了越来越多的开源大模型，但是许多模型的部署需要利用 GPU 资源，如何让大模型时代的红利普惠到每一个人，让每一个人都可以部署属于自己的大模型。Ollama 是一个开源的大语言部署服务工具，只需 CPU 即可部署大模型。本项目旨在使用 CPU 部署本地大模型，虽然目前已经有很多 LLM 相关的教程，但是这些教程中模型基本上都需要 GPU 资源，这对于很多资源受限的学习者不是很友好。因此，本项目通过动手学 Ollama ，帮助学习者快速上手本地 CPU 部署大模型。我们希望通过动手学 Ollama 这一开源教程，帮助学习者快速上手 Ollama ，让每一位大模型爱好者、学习者以及开发者都能在本地部署自己的大模型，进而开发一些大模型应用，让大模型赋能千行百业！


## 项目受众
- 希望不受 GPU 资源限制，在本地运行大模型；
- 希望在消费级硬件上进行大模型有效的推理；
- 希望在本地部署大模型，开发大模型应用；
- 希望在本地管理大模型，让本地模型安全可靠。


## 项目规划
### 目录（持续更新中...）
- [x] 1 [Ollama 介绍](C1/1.%20Ollama%20介绍.md) @[友东](https://github.com/AXYZdong)
- [x] 2 Ollama 安装与配置 
  - [x] [macOS](C2/1.%20Ollama%20在%20macOS%20下的安装与配置.md) @[天奥](https://github.com/lta155)
  - [x] [Windows](C2/2.%20Ollama%20在%20Windows%20下的安装与配置.md) @[Yuki](https://github.com/fuyueagain)
  - [x] [Linux](C2/3.%20Ollama%20在%20Linux%20下的安装与配置.md) @[Yuki](https://github.com/fuyueagain)
  - [x] [Docker](C2/4.%20Ollama%20在%20Docker%20下的安装与配置.md) @[Yuki](https://github.com/fuyueagain)
- [x] 3 [自定义导入模型](C3/1.%20自定义导入模型.md) @[杨卓](https://github.com/little1d)
- [x] 4 Ollama REST API
  - [x] [Ollama API 使用指南](C4/1.%20Ollama%20API%20使用指南.md) @[林通](https://github.com/kjlintong) @[春阳](https://github.com/Springff)
  - [x] [在 Python 中使用 Ollama API](C4/2.%20在%20Python%20中使用%20Ollama%20API.md) @[春阳](https://github.com/Springff)
  - [x] [在 Java 中使用 Ollama API](C4/3.%20在%20Java%20中使用%20Ollama%20API.md) @[林通](https://github.com/kjlintong)
  - [x] [在 JavaScript 中使用 Ollama API](C4/4.%20在%20JavaScript%20中使用%20Ollama%20API.md) @[春阳](https://github.com/Springff)
- [x] 5 Ollama 在 LangChain 中的使用
    - [x] [在 Python 中的集成](C5/1.%20Ollama%20在%20LangChain%20中的使用%20-%20Python%20集成.md) @[鑫民](https://github.com/fancyboi999)
    - [x] [在 JavaScript 中的集成](C5/2.%20Ollama%20在%20LangChain%20中的使用%20-%20JavaScript%20集成.md) @[鑫民](https://github.com/fancyboi999)
- [x] 6 Ollama 可视化界面部署
    - [x] [使用 FastAPI 部署 Ollama 可视化对话界面](C6/1.%20使用%20FastAPI%20部署%20Ollama%20可视化对话界面.md) @[友东](https://github.com/AXYZdong)
    - [x] [使用 WebUI 部署 Ollama 可视化对话界面](C6/2.%20使用%20WebUI%20部署%20Ollama%20可视化对话界面.md) @[友东](https://github.com/AXYZdong)
- [ ] 7 应用案例
    - [x] [搭建本地的 AI Copilot 编程助手](C7/1.%20搭建本地的%20AI%20Copilot%20编程助手.md) @[越](https://github.com/rainsubtime)
    - [x] [Dify 接入 Ollama 部署的本地模型](C7/2.%20Dify%20接入%20Ollama%20部署的本地模型.md) @[春阳](https://github.com/Springff)
    - [x] 使用 LangChain 搭建本地 RAG 应用 @[舒凡](https://github.com/Tsumugii24)


## 致谢

特别感谢以下为教程做出贡献的同学！

<a href="https://github.com/AXYZdong/handy-ollama/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AXYZdong/handy-ollama" />
</a>