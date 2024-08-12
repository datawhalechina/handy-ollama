package org.example.springai_demo.controller;

import jakarta.annotation.Resource;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class OllamaController {
    @Resource
    private OllamaChatModel ollamaChatModel;

    @RequestMapping(value = "/ai/ollama")
    public Object ollama(@RequestParam(value = "msg")String msg){
        ChatResponse chatResponse=ollamaChatModel.call(new Prompt(msg, OllamaOptions.create()
                .withModel("llama3.1:latest")//使用哪个大模型
                .withTemperature(0.5F)));//温度，温度值越高，准确率下降，温度值越低，准确率上升
        System.out.println(chatResponse.getResult().getOutput().getContent());
        return chatResponse.getResult().getOutput().getContent();
    }

}