package cookup.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

class SeleniumUtils {
  static final String BASE_URL = "https://new-cook-up.herokuapp.com";

  static WebDriver newWebDriver() {
    WebDriver driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    return driver;
  }
}
