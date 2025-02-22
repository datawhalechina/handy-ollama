# 在 Golang 中使用 Ollama API

本文介绍了如何在 Golang 中使用 Ollama API。这篇文档旨在帮助开发者快速上手并充分利用 Ollama
的能力。Ollama 本身是由 Golang 语言开发，Golang 语言版本的接口代码在官方仓库目录中
<https://github.com/ollama/ollama/tree/main/api>，官方文档为<https://pkg.go.dev/github.com/ollama/ollama/api>。
通过学习本文档，你可以轻松集成 Ollama 到你的项目中。

> 官方仓库<https://github.com/ollama/ollama/tree/main/api/examples>提供了一些示例代
码，下文中的代码参考了这些示例并进行了修改。所有示例在`notebook/C4/Golang_API_example`中

## 环境准备

开始之前请确保您的开发环境满足一下条件：

1. Golang 开发环境，通过`go version`查看 golang 版本，本文使用的版本为`go1.23.6`

   > 参考<https://golang.google.cn/doc/install>进行安装

2. 创建项目目录并初始化

```bash
mkdir ollama-demo && cd ollama-demo
go mod init ollama-demo
```

3. 安装依赖

```bash
go get github.com/ollama/ollama/api
```

## 使用方式

创建目录`chat`，在目录中创建文件`main.go`，内容如下（示例中使用的是deepseek-r1:7b模型）：

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/ollama/ollama/api"
)

func main() {
	client, err := api.ClientFromEnvironment()
	if err != nil {
		log.Fatal(err)
	}

	messages := []api.Message{
		api.Message{
			Role:    "user",
			Content: "为什么天空是蓝色的？",
		},
	}

	ctx := context.Background()
	req := &api.ChatRequest{
		Model:    "deepseek-r1:7b",
		Messages: messages,
	}

	respFunc := func(resp api.ChatResponse) error {
		fmt.Print(resp.Message.Content)
		return nil
	}

	err = client.Chat(ctx, req, respFunc)
	if err != nil {
		log.Fatal(err)
	}
}
```

运行 `go run chat/main.go`

## 流式输出

创建目录`generate-streaming`，在目录中创建文件`main.go`

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/ollama/ollama/api"
)

func main() {
	client, err := api.ClientFromEnvironment()
	if err != nil {
		log.Fatal(err)
	}

	// By default, GenerateRequest is streaming.
	req := &api.GenerateRequest{
		Model:  "deepseek-r1:7b",
		Prompt: "为什么天空是蓝色的？",
	}

	ctx := context.Background()
	respFunc := func(resp api.GenerateResponse) error {
		// Only print the response here; GenerateResponse has a number of other
		// interesting fields you want to examine.

		// In streaming mode, responses are partial so we call fmt.Print (and not
		// Println) in order to avoid spurious newlines being introduced. The
		// model will insert its own newlines if it wants.
		fmt.Print(resp.Response)
		return nil
	}

	err = client.Generate(ctx, req, respFunc)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println()
}
```

运行 `go run generate-streaming/main.go`

## 结构化输出

创建目录`structured_output`，在目录中创建文件`main.go`，如下

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"github.com/ollama/ollama/api"
)

type CountryInfo struct {
	Capital    string  `json:"capital"`
	Population float64 `json:"population"`
	Area       float64 `json:"area"`
}

func main() {
	client, err := api.ClientFromEnvironment()
	if err != nil {
		log.Fatal(err)
	}

	messages := []api.Message{
		api.Message{
			Role:    "user",
			Content: "请介绍美国的首都、人口、占地面积信息，并以 JSON 格式返回。",
		},
	}

	ctx := context.Background()
	req := &api.ChatRequest{
		Model:    "deepseek-r1:7b",
		Messages: messages,
		Stream:   new(bool), // false
		Format:   []byte(`"json"`),
		Options: map[string]interface{}{
			"temperature": 0.0,
		},
	}

	respFunc := func(resp api.ChatResponse) error {
		fmt.Printf("%s\n", strings.TrimSpace(resp.Message.Content))
		var info CountryInfo
		err := json.Unmarshal([]byte(resp.Message.Content), &info)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("首都: %s，人口: %f，面积: %f", info.Capital, info.Population, info.Area)
		return nil
	}

	err = client.Chat(ctx, req, respFunc)
	if err != nil {
		log.Fatal(err)
	}
}
```

通过指定`ChatRequest`请求的```Format:   []byte(`"json"`),``` 参数，可以让模型返回结构化
的数据，然后通过`json.Unmarshal`解析返回的数据。

运行 `go run structured_output/main.go` 可以得到如下输出：

```plaintext
{"capital": "Washington, D.C.", "population": 3.672e6, "area": 7.058e6}
首都: Washington, D.C.，人口: 3672000.000000，面积: 7058000.000000
```
