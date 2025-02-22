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
