import requests

def call_ollama_api(prompt, model_name="llama3.1:latest"):
    url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": model_name,
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

# 示例调用
response = call_ollama_api("黑神话好玩吗")
print(response)