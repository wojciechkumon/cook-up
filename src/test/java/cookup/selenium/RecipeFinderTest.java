package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

import static cookup.selenium.LoginTest.login;
import static cookup.selenium.SeleniumUtils.newWebDriver;

class RecipeFinderTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  @Disabled
  void findRecipe() {
    login(driver);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::div[4]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).sendKeys("coffee");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).sendKeys(Keys.ENTER);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).sendKeys("soy milk");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='What do you have in your fridge?'])[1]/following::input[1]")).sendKeys(Keys.ENTER);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='water'])[1]/preceding::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='water'])[1]/preceding::input[1]")).sendKeys("water");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='water'])[1]/preceding::input[1]")).sendKeys(Keys.ENTER);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='×'])[4]/following::label[1]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='×'])[4]/following::button[1]")).click();
    driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div/div/div[2]/div/div/table/tbody/tr[1]/td[1]")).click();
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
