# 1 下载obsidian
官网：[https://obsidian.md/](https://obsidian.md/)

<!-- 这是一张图片，ocr 内容为：OBSIDIAN DOWNLOAD PRICING ENTERPRISE PUBLISH SYNC ACCOUNT COMMUNITY SHARPEN YOUR THINKING. THE FREE AND FLEXIBLE APP FOR YOUR PRIVATE THOUGHTS. GET OBSIDIAN FOR MACOS MORE PLATFORMS & GRAPH OF WRITING IS T C X + WRITING IS TELEPATHY EVERGREEN NOTES X可田刃 个 LDEAS/GRAPH OF WRITING IS TELEPATHY IDEAS WRITING IS TELEPATHY 99 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768289410171-df85e7e3-1f60-4e44-907c-26959a257e6e.png)

点击红圈部分直接下载obsidian，obsidian-1.11.4.dmg。

# 2 打开
界面类似这样

<!-- 这是一张图片，ocr 内容为：OBSIDIAN VAULT OBSIDIAN 版本1.10.6 新建仓库 创建 在指定文件夹下创建一个新的仓库. 打开本地仓库 打开 将一个本地文件夹作为仓库在OBSIDIAN 中打开. 同步远程仓库 设置 将OBSIDIAN 同步服务中的远程仓库同步到本地. 简体中文 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768289570093-d615acc8-1a73-47f4-be5b-e41783f236f8.png)

创建新仓库。

<!-- 这是一张图片，ocr 内容为：OBSIDIAN 版本1.10.6 <返回 创建本地仓库 仓库名称 本地知识库 给新仓库起一个名字 仓库位置 浏览 /本地知识库 新仓库将存放于 创建 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768289643476-78d33055-de75-44da-bcca-fd2357727250.png)

<!-- 这是一张图片，ocr 内容为：欢迎 欢迎 欢迎 欢迎 品 这是你的新仓库. 写点笔记,创建链接,或者试一试导入器心插件! 品 当你准备好了,就将该笔记文件删除,使这个仓库为你所用. 本地知识库 0条反向链接255个词11个字符 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768289681169-0d7c9005-2bf8-4dd0-a4c2-e7d16432a905.png)

# 3 创建个虚拟环境
用`conda create -n handllm python=3.11`，或者用`python -m venv handllm`推荐用conda。

激活环境`conda activate handllm`，或`source handllm/bin/activate`

### 安装包
```bash
pip install llama-index-llms-ollama
pip install llama-index-embeddings-ollama
pip install -U llama-index-readers-file
pip install llama-index-embeddings-dashscope
pip install llama-index-llms-openai-like
```

# 4 导入所有包
```bash
from llama_index.embeddings.dashscope import DashScopeEmbedding,DashScopeTextEmbeddingModels
from llama_index.core import SimpleDirectoryReader,VectorStoreIndex
from llama_index.llms.openai_like import OpenAILike
from llama_index.core import Settings
from pathlib import Path
import getpass
import json
import os
```

# 5 查看有多少`.md`文件
```bash
from pathlib import Path
vault_path = Path("/path_to_local_knowledge")
md_files = list(vault_path.rglob("*.md"))
print(len(md_files))
print(vault_path)
```

obsidian里的文件路径可以从如下图片得到：

<!-- 这是一张图片，ocr 内容为：欢迎 在新标签页中打开 在新标签组中打开 在新窗口中打开 创建副本 将文件移动到.... 收藏 将该笔记合并到.... 复制OBSIDIANURI COPY PATH COPY RELATIVE PATH 打开版本历史 使用默认应用打开 在访达中显示 里命名 删除 -->
![](https://cdn.nlark.com/yuque/0/2026/png/49299071/1768290172535-b501c92b-3e18-41e1-9da8-120619082ced.png)

再把文件拖到终端，就可以知道路径。

# 5 输入api_key
```bash
DASHSCOPE_API_KEY = getpass.getpass("未找到存放Key的文件，请输入你的api_key:").strip()
Key = {
"DASHSCOPE_API_KEY": DASHSCOPE_API_KEY
}
        # 指定文件名
file_name = './Key.json'
with open(file_name, 'w') as json_file:
            # dump把python对象转成json字符串
    json.dump(Key, json_file, indent=4)
os.environ['DASHSCOPE_API_KEY'] = Key["DASHSCOPE_API_KEY"]
```

本地模型太慢了，使用`<font style="color:#000000;">bge-m3:latest</font>`<font style="color:#000000;">进行向量化，跑了一个多小时才跑完。</font>

本文档用阿里的百炼平台的模型，需要api_key。如果本地电脑性能好，可以直接下载ollama里面更大的embedding模型。

使用ollama本地模型的代码放最后面作为参考。

# 6 保存索引
```bash
from llama_index.embeddings.dashscope import DashScopeEmbedding,DashScopeTextEmbeddingModels
from llama_index.core import SimpleDirectoryReader,VectorStoreIndex
from llama_index.llms.openai_like import OpenAILike
from llama_index.core import Settings

documents = SimpleDirectoryReader(
    input_dir=vault_path,
    recursive=True,
    required_exts=[".md"]
).load_data()
```

```bash
Settings.llm = OpenAILike(
        model="qwen-plus",
        api_base="https://dashscope.aliyuncs.com/compatible-mode/v1",
        api_key=os.getenv("DASHSCOPE_API_KEY"),
        is_chat_model=True
)

Settings.embed_model = DashScopeEmbedding(
        model_name=DashScopeTextEmbeddingModels.TEXT_EMBEDDING_V2
)

from llama_index.core import VectorStoreIndex
index = VectorStoreIndex.from_documents(documents)
index.storage_context.persist(persist_dir="./storage_ali")
```

# 7 读取索引
先构造一个提示词，让模型根据召回信息回答的时候，尽量不偏移。

```bash
from llama_index.core import PromptTemplate
QA_PROMPT_TMPL = (
    "Context information is below.\n"
    "---------------------\n"
    "{context_str}\n"
    "---------------------\n"
    "请仅根据上述提供的上下文信息回答问题。限制如下：\n"
    "1. 你的回答必须完全基于提供的上下文，不得使用你已有的外部知识。\n"
    "2. 如果上下文中没有关于该问题的答案，请直接回答：'抱歉，在您的笔记库中没有找到相关描述。'\n"
    "3. 保持回答简洁专业。\n\n"
    "Query: {query_str}\n"
    "Answer: "
)

qa_prompt = PromptTemplate(QA_PROMPT_TMPL)
```

```bash
# 将本地索引文件加载为索引
from llama_index.core import StorageContext,load_index_from_storage
storage_context = StorageContext.from_defaults(persist_dir="./storage_ali")
index = load_index_from_storage(storage_context,embed_model=DashScopeEmbedding(
        model_name=DashScopeTextEmbeddingModels.TEXT_EMBEDDING_V2
    ))
print("成功从./storage_ali路径加载索引")
```

# 8 问答
```bash
query_engine = index.as_query_engine(
    similarity_top_k=5,
    streaming=True,
    text_qa_template=qa_prompt  # 关键点：绑定提示词
)

# 3. 执行查询
response = query_engine.query("今天星期几了？")
response.print_response_stream()
```

输出

```bash
抱歉，在您的笔记库中没有找到相关描述。
```

继续问

```bash
response = query_engine.query("读者为什么看网文？")
response.print_response_stream()
```

输出

```bash
读者读网文是为了通过“压抑 → 反转 → 补偿”的循环，过度补偿现实生活中无法满足的情绪缺口。网文提供现实中得不到的东西，如力量感、被看见、公平、被爱、价值感和方向感等，并通过镜像机制让读者在主角身上看到自己，经历委屈后实现反转与补偿，从而获得情绪上的满足和多巴胺奖赏。这种循环可不断延续，使读者持续获得心理代偿。
```

使用平台的大模型有时候会出现报错：

```bash
APIError: Output data may contain inappropriate content. For details, see: https://help.aliyun.com/zh/model-studio/error-code#inappropriate-content
```

大致原因是：

```bash
generally indicates that a content moderation or safety filter, usually implemented by the service provider (like OpenAI, Microsoft Azure, or other platforms), has flagged the generated output as violating its usage policies. 
```

# 9 使用本地模型
```bash
from pathlib import Path

vault_path = Path("/path_to_local_knowledge")

from llama_index.core import SimpleDirectoryReader

documents = SimpleDirectoryReader(
    input_dir=vault_path,
    recursive=True,
    required_exts=[".md"]
).load_data()

from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core import Settings

Settings.llm = Ollama(
    # ollama的云模型，本地模型跑不动
    model="gpt-oss:120b-cloud",
    temperature=0
)

Settings.embed_model = OllamaEmbedding(
    model_name="bge-m3:latest",
)

from llama_index.core import VectorStoreIndex
index = VectorStoreIndex.from_documents(documents)
index.storage_context.persist(persist_dir="./storage")
```

```bash
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding

# 将本地索引文件加载为索引
from llama_index.core import StorageContext,load_index_from_storage
storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)
print("成功从./storage路径加载索引")

from llama_index.core import PromptTemplate
QA_PROMPT_TMPL = (
    "Context information is below.\n"
    "---------------------\n"
    "{context_str}\n"
    "---------------------\n"
    "请仅根据上述提供的上下文信息回答问题。限制如下：\n"
    "1. 你的回答必须完全基于提供的上下文，不得使用你已有的外部知识。\n"
    "2. 如果上下文中没有关于该问题的答案，请直接回答：'抱歉，在您的笔记库中没有找到相关描述。'\n"
    "3. 保持回答简洁专业。\n\n"
    "Query: {query_str}\n"
    "Answer: "
)

qa_prompt = PromptTemplate(QA_PROMPT_TMPL)

# 2. 在创建查询引擎时，通过 text_qa_template 传入自定义提示词
query_engine = index.as_query_engine(
    similarity_top_k=5,
    streaming=True,
    text_qa_template=qa_prompt  # 关键点：绑定提示词
)

# 3. 执行查询
response = query_engine.query("读者为什么看网文？")
response.print_response_stream()
```

