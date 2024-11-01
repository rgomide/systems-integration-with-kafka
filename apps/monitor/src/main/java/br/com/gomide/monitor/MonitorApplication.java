package br.com.gomide.monitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MonitorApplication {

	public static void main(String[] args) {
		System.out.println("Starting Monitor Application");
		SpringApplication.run(MonitorApplication.class, args);
	}

}
