package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import pages.LoginPage;

public class InvalidLoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeTest
    public void setUp() {
        try {
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless=new");
            driver = new ChromeDriver(options);
            driver.manage().window().maximize();
            driver.get("https://login.salesforce.com/?locale=in");
            loginPage = new LoginPage(driver);
        } catch (Exception e) {
            throw new RuntimeException("Exception in setUp: " + e.getMessage(), e);
        }
    }

    @Test
    public void testInvalidLogin() {
        try {
            loginPage.enterUsername("invalid@example.com");
            loginPage.enterPassword("WrongPassword");
            loginPage.clickLogin();
            String errorText = loginPage.getErrorMessageText();
            Assert.assertTrue(errorText.toLowerCase().contains("incorrect") || errorText.toLowerCase().contains("invalid"), "Error message not as expected");
        } catch (Exception e) {
            Assert.fail("Test failed due to exception: " + e.getMessage(), e);
        }
    }

    @AfterTest
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            throw new RuntimeException("Exception in tearDown: " + e.getMessage(), e);
        }
    }
}
