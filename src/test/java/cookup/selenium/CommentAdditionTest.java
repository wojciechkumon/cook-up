package cookup.selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.Random;

import static cookup.selenium.SeleniumUtils.BASE_URL;
import static cookup.selenium.SeleniumUtils.newWebDriver;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CommentAdditionTest {
  private WebDriver driver;

  @BeforeEach
  void setUp() {
    driver = newWebDriver();
  }

  @Test
  @Disabled
  void addComment() {
    String commentText = "new comment test " + new Random().nextInt(1_000_000);
    driver.get(BASE_URL + "/recipe/430");

    driver.findElement(By.name("content")).click();
    driver.findElement(By.name("content")).clear();
    driver.findElement(By.name("content")).sendKeys(commentText);
    int numberOfComments = driver.findElements(By.xpath("/html/body/div[1]/div/main/div/div/div[3]/div[1]/div")).size();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='a year ago'])[1]/following::button[1]")).click();

    String newCommentText = driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div/div[3]/div[1]/div[" + (numberOfComments + 1) + "]/p[2]"))
        .getText();
    assertEquals(commentText, newCommentText);
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
