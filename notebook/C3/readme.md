**目录结构**

```bash
├── 1.从gguf直接导入/
│   ├── main.ipynb     
│   ├── Modelfile      
│   └── Qwen-0.5B.Q3_K_M.gguf 
├── 2.safetensors导入/
│   ├── llama-3-8b-bnb-4bit/        
│   ├── main.ipynb    
│   ├── Modelfile      
├── 3.模型直接导入/
│   ├── llama.cpp/    
│   ├── Qwen-0.5b/    
│   ├── main.ipynb     
│   ├── Modelfile      
│   └── Qwen_instruct_0.5b.gguf  
└── 4.自定义Prompt实践/
    ├── main.ipynb   
    └── Modelfile     
```

- `Modelfile`：模型配置文件
- `main.ipynb`：Jupyter Notebook 文件
- `Qwen-0.5B.Q3_K_M.gguf`：GGUF 模型文件
- `model.safetensors`：safeTensor 模型文件
- `llama.cpp`：工具包
- `Qwen-0.5b`：模型文件夹
