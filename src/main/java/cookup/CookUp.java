package cookup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CookUp {

  public static void main(String[] args) {
    SpringApplication.run(CookUp.class, args);
  }
}
