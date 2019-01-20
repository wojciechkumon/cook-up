package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.Random;

import static cookup.selenium.LoginTest.login;
import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AddRecipeTest {

  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  @Disabled
  void addRecipe() {
    login(driver);
    driver.get(BASE_URL + "/addRecipe");
    String recipeName = "water " + new Random().nextInt(1_000_000);

    driver.findElement(By.name("name")).click();
    driver.findElement(By.name("name")).clear();
    driver.findElement(By.name("name")).sendKeys(recipeName);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Recipe name'])[1]/following::button[1]")).click();

    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Ingredient #1'])[1]/following::div[4]")).click();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Ingredient #1'])[1]/following::input[1]")).clear();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Ingredient #1'])[1]/following::input[1]")).sendKeys("coffee");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Ingredient #1'])[1]/following::input[1]")).sendKeys(Keys.ENTER);

    driver.findElement(By.name("ingredients[0].amount")).click();
    driver.findElement(By.name("ingredients[0].amount")).clear();
    driver.findElement(By.name("ingredients[0].amount")).sendKeys("250");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Add ingredient'])[1]/following::button[1]")).click();
    driver.findElement(By.name("cookingTimeMinutes")).click();
    driver.findElement(By.name("cookingTimeMinutes")).clear();
    driver.findElement(By.name("cookingTimeMinutes")).sendKeys("1");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Difficulty level'])[1]/following::label[1]")).click();
    driver.findElement(By.name("kcal")).click();
    driver.findElement(By.name("kcal")).clear();
    driver.findElement(By.name("kcal")).sendKeys("0");
    driver.findElement(By.name("servings")).click();
    driver.findElement(By.name("servings")).clear();
    driver.findElement(By.name("servings")).sendKeys("1");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Previous'])[1]/following::button[1]")).click();
    driver.findElement(By.name("cookingDescription")).click();
    driver.findElement(By.name("cookingDescription")).clear();
    driver.findElement(By.name("cookingDescription")).sendKeys("Put water into glass :)");
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Previous'])[1]/following::button[1]")).click();


    driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div/div[3]/div[1]/h3"));
    driver.get(BASE_URL + "/me");

    List<WebElement> elements = driver.findElements(By.xpath("/html/body/div[1]/div/main/div/div[1]/div/div/table/tbody/tr/td[1]"));

    assertTrue(
        elements.stream()
            .anyMatch(element -> element.getText().equals(recipeName))
    );
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
