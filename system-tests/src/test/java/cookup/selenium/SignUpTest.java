package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Random;

import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated;

class SignUpTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  void testSignUp() {
    String randomEmail = "wojtek" + new Random().nextInt(1_000_000) + "@gmail.com";

    driver.get(BASE_URL);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[3]/a"))
        .click();
    driver.findElement(By.name("email")).click();
    driver.findElement(By.name("email")).clear();
    driver.findElement(By.name("email")).sendKeys(randomEmail);
    driver.findElement(By.name("password")).clear();
    driver.findElement(By.name("password")).sendKeys("wojtek123");
    driver.findElement(By.name("matchingPassword")).clear();
    driver.findElement(By.name("matchingPassword")).sendKeys("wojtek123");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Sign in'])[1]/following::button[1]")).click();


    new WebDriverWait(driver, 30).until(invisibilityOfElementLocated(
        By.xpath("/html/body/div[2]/div[2]/div/div/div[2]/form/div/div[1]")));

    assertTrue(driver.getCurrentUrl().endsWith("/signInSuccess"));
  }

  @Test
  void testFailedSignUp() {
    String randomEmail = "wrong" + new Random().nextInt(1_000_000) + "@gmail.com";

    driver.get(BASE_URL);
    driver.findElement(By.xpath("/html/body/div[1]/div/nav/div/div/div[2]/ul/li[3]/a"))
        .click();
    driver.findElement(By.name("email")).click();
    driver.findElement(By.name("email")).clear();
    driver.findElement(By.name("email")).sendKeys(randomEmail);
    driver.findElement(By.name("password")).clear();
    driver.findElement(By.name("password")).sendKeys("wojtek123");
    driver.findElement(By.name("matchingPassword")).clear();
    driver.findElement(By.name("matchingPassword")).sendKeys("notMatchingPassword");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Sign in'])[1]/following::button[1]")).click();

    String text = driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div/div[2]/form/div/div[3]/div"))
        .getText();

    assertEquals("Passwords must match", text);
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
