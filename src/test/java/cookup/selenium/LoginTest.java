package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;

class LoginTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  @Disabled
  void testUntitledTestCase() {
    login(driver);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[5]/a"))
        .click();
  }

  static void login(WebDriver driver) {
    driver.get(BASE_URL);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[4]/a"))
        .click();
    WebElement email = driver.findElement(By.name("email"));
    email.clear();
    email.sendKeys("lolek@gmail.com");
    WebElement password = driver.findElement(By.name("password"));
    password.clear();
    password.sendKeys("lolek");
    driver.findElement(
        By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Log In'])[1]/following::button[1]"))
        .click();
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
