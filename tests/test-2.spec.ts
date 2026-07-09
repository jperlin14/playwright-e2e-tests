import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  // Click Make Apointment link and verify expected page navigation
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();
  // Enter valid username and password
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();
  // Assert successful login
  await expect(page.locator("h2")).toContainText("Make Appointment");
});
