package org.example.simple_example;

//导入Ollama
import de.asedem.Ollama;
import de.asedem.model.GenerationRequest;
import de.asedem.model.GenerationResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class SimpleExampleApplication {

    public static void main(String[] args) {
        // 默认链接端口 localhost:11434
        Ollama ollama = Ollama.initDefault();
        // 模型
        String model = "llama3.1:latest";
        // 提示词
        String prompt = "Why is the sky blue?";
        // 生成回答
        GenerationResponse response = ollama.generate(new GenerationRequest(model, prompt));


        System.out.println(response.response());
    }

}
