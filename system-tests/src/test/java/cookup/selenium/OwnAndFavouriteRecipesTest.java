package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import static cookup.selenium.LoginTest.login;
import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;
import static org.junit.jupiter.api.Assertions.assertTrue;

class OwnAndFavouriteRecipesTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  void ownRecipeTest() {
    login(driver);
    driver.get(BASE_URL + "/me");
    driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div[1]/div/div/table/tbody/tr[1]/td[1]"))
        .click();
    assertTrue(driver.getCurrentUrl().matches(BASE_URL + "/recipe/\\d+"));
  }

  @Test
  void favouriteRecipeTest() {
    login(driver);
    driver.get(BASE_URL + "/me");
    driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div[2]/div/div/table/tbody/tr/td[2]"))
        .click();
    assertTrue(driver.getCurrentUrl().matches(BASE_URL + "/recipe/\\d+"));
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
