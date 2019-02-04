package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;
import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated;

class LoginTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  void testLogin() {
    login(driver);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[5]/a"))
        .click();
  }

  static void login(WebDriver driver) {
    login(driver, "lolek@gmail.com", "lolek");
  }

  static void login(WebDriver driver, String email, String password) {
    loginWithoutCheck(driver, email, password);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[5]/a"));
  }

  static void loginWithoutCheck(WebDriver driver, String email, String password) {
    driver.get(BASE_URL);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[4]/a"))
        .click();
    WebElement emailElement = driver.findElement(By.name("email"));
    emailElement.clear();
    emailElement.sendKeys(email);
    WebElement passwordElement = driver.findElement(By.name("password"));
    passwordElement.clear();
    passwordElement.sendKeys(password);
    driver.findElement(
        By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Log In'])[1]/following::button[1]"))
        .click();
  }

  @Test
  void testFailedLogin() {
    loginWithoutCheck(driver, "test@test.com", "wrongPassword");
    new WebDriverWait(driver, 30).until(invisibilityOfElementLocated(
        By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[5]/a")));
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
