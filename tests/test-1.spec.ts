import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Click on 'Make Appointment' link
  await page.getByRole("link", { name: "Make Appointment" }).click();
  // assert that 'Please login to make' will be visible
  await expect(page.getByText("Please login to make")).toBeVisible();

  // Login
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  // Verify 'Make Appointment' text after attempting to log in
  await expect(page.locator("h2")).toContainText("Make Appointment");
});
