# 1 下载
官网：[https://www.cherry-ai.com/](https://www.cherry-ai.com/)

<!-- 这是一张图片，ocr 内容为：YOUR AI PRODUCTIVITY STUDIO SMART CHAT - AUTONOUS AGENT - LIMITLESS CREATION - UNIFIED ACCESS TO FRONTIER LLMS DOWNLOAD V1.7.13 DOCS -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106291914-4635b636-d9b8-4bba-8ec2-0d47334f1733.png)

<!-- 这是一张图片，ocr 内容为：CHERRYSTUDIOV1.7.13 PUBLISHED AT:2026/1/9 CURRENT SYSTEM:MACOS WINDOWS LINUX MACOS RECOMMENDED DOWNLOAD APPLE CHIP DOWNLOAD NOW APPLE SILICON (M1/M2/M3/M4) CHERRY-STUDIO-1.7.13-ARM64.DMG OTHER VERSIONS SLOW DOWNLOAD? TRY QUARK CLOUD DRIVE -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106302747-9ed8ae1a-5f26-4073-848d-f9f7e43d6c1f.png)

之后打开就好，点击继续。

# 2 导入ollama
<!-- 这是一张图片，ocr 内容为：十 首页 话题 设置 助手 团 DEEPSEEK-F1:1.5B | OLLAMA 默认助手 你好,我是默认助手.你可以立刻开始跟我聊天 添加助手 用户 01/1112:35 你好吗 甘 TOKENS:3 DEEPSEEK-R1:1.5B | OLLAMA 01/1112:35 已深度思考(用时0.1秒) 你好!我是一个人工智能助手.有什么我可以帮YOUR的?无论是问题,建议还是闲聊,我都很乐意HELP. ON@文化合三 TOKENS:541351 在这里输入消息,按ENTER 发送... -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106384850-15eb49b6-c753-45b9-b335-f558e651f792.png)

<!-- 这是一张图片，ocr 内容为：首页 模型服务 CHERRYIN OLLAMA 默认模型 OLLAMA ON Q 模型 常规设置 GLM-4.5 3 显示设置 炎 GLM-4.... 免费 POWEREDBY智谱开放平台 数据设置 QWEN MCP 浓色免费 POWERED BY 硅基流动 QWEN3-8B 笔记 查看CHERRYLN文档和模型获取更多详情 网络搜索 全局记忆 API服务器 文档处理 快捷短语 添加 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106530035-429bff8a-50c3-48ef-b05a-8f08c3fc8a33.png)

<!-- 这是一张图片，ocr 内容为：OLLAMA OLLAMA OLLAMA ON API密钥 API密钥 检测 多个密钥使用逗号或空格分隔 API 地址 HTTP://LOCALHOST:11434 结尾忽略V1版本,#结尾强制使用输入地址 HTTP://LOCALHOST:11434/V1/CHAT/COMPLETIONS 模型1Q DEEPSEEK-R1 DEEPSEEK-R1:1.5B 查看OLL.  文档和模型获取更多详情 三 管理 +添加 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106654875-3f2bf46a-4f7e-422a-901c-a842524d56b3.png)

<!-- 这是一张图片，ocr 内容为：首页 模型服务 OLLAMA OLLAMA 默认模型 OLLAMA ON API密钥 检测 常规设置 添加模型 多个密钥使用逗号或空格分隔 显示设置 必填例如GPT-3.5-TURBO 模型ID R 数据设置 忽略V1版本,#结尾强制使用输入地址 模型名称 例如GPT-4 MCP 笔记 例如 CHATGPT 分组名称 网络搜索 添加模型 全局记忆 查看OLLAMA文档和模型获取更多详情 API服务器 管理 +添加 文档处理 快捷短语 +添加 快捷键 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106668247-0e220d8a-5a0e-4ac7-96ec-135b098b42ae.png)

在终端输入`ollama list`

```bash
~ % ollama list
NAME                        ID              SIZE      MODIFIED     
deepseek-r1:1.5b            e0979632db5a    1.1 GB    47 hours ago    
qwen2.5-coder:7b            dae161e27b0e    4.7 GB    2 days ago      
nomic-embed-text:latest     0a109f422b47    274 MB    2 days ago      
qwen3-coder:480b-cloud      e30e45586389    -         2 days ago      
deepseek-v3.1:671b-cloud    d3749919e45f    -         2 days ago      
gpt-oss:20b-cloud           875e8e3a629a    -         2 days ago      
gpt-oss:120b-cloud          569662207105    -         2 days ago 
```

以`gpt-oss:120b-cloud`为例

<!-- 这是一张图片，ocr 内容为：首页 模型服务 OLLAMA OLLAMA 默认模型 OLLAMA ON API密钥 检测 常规设置 添加模型 多个密钥使用逗号或空格分隔 显示设置 模型IDR 数据设置 GPT-OSS120B-CLOUD 忽略V1版本,#结尾强制使用输入地址 模型名称 MCP GPT-OSS:120B-CLOUD 笔记 分组名称 GPT-OSS 网络搜索 添加模型 全局记忆 查看OLLAMA文档和模型获取更多详情 API服务器 管理 +添加 文档处理 快捷短语 +添加 快捷键 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106751287-aa2bfdd4-bd98-47c6-8772-f0277e403f94.png)

只需要填模型ID，其余的空会自动填写。

添加模型后，回到首页。

<!-- 这是一张图片，ocr 内容为：首页 十 话题 设置 助手 团 GPT-OSS:120B-CLOUD | OLLAMA 新建话题 你好,我是默认助手.你可以立刻开始跟我聊天 你好帮助 用户 01/1112:46 你好 G940 TOKENS: 2 GPT-OSS:120B-CLOUD | OLLAMA 黑犬 01/1112:46 已深度思考(用时0.7秒) 你好!有什么我可以帮助你的吗?如果有任何问题或需要信息,随时告诉我.祝你今天愉快! TOKENS:73 12 171 用户 01/1112:47 在这里输入消息,按ENTER发送... -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768106840358-3feb7a05-e059-43f6-a2b1-c7cf517d660d.png)

