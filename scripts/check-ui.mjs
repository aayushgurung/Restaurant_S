import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
const failedLocalRequests = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.url().startsWith(base + "/") && response.status() >= 400)
    failedLocalRequests.push(`${response.status()} ${new URL(response.url()).pathname}`);
});
await mkdir("artifacts", { recursive: true });
try {
  for (const route of [
    "",
    "menu/",
    "about/",
    "order/",
    "reservation/",
    "gallery/",
    "catering/",
    "contact/",
  ]) {
    const response = await page.goto(`${base}/${route}`);
    assert.equal(response.status(), 200, `Route ${route} loads`);
    await page.locator("main h1").waitFor();
    assert.equal(
      await page.locator("main h1").count(),
      1,
      `One main heading on ${route}`,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `No desktop overflow on ${route}`,
    );
    const failedImages = await page
      .locator("main img")
      .evaluateAll((images) =>
        images
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      );
    assert.deepEqual(failedImages, [], `Images load on ${route}`);
  }
  await page.goto(base);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.goto(`${base}/menu/`);
  await page.getByRole("button", { name: "Momo", exact: true }).click();
  assert.equal(await page.locator(".menu-item").count(), 3);
  await page.getByRole("button", { name: "Vegetarian", exact: true }).click();
  assert.equal(await page.locator(".menu-item").count(), 1);
  await page.getByRole("searchbox").fill("nothing matches");
  await page.getByText("No dishes found", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator(".menu-item").count(), 11);
  await page
    .getByRole("button", {
      name: "Add Signature chicken momo to order",
      exact: true,
    })
    .click();
  await page.goto(`${base}/order/`);
  await page
    .getByRole("button", {
      name: "Add one Signature chicken momo",
      exact: true,
    })
    .click();
  assert.equal(
    await page.locator(".cart-total strong").textContent(),
    "$36.00",
  );
  await page.reload();
  await page.getByLabel("Quantity 2", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Delivery", exact: true }).click();
  assert.equal(
    await page.locator(".cart-total strong").textContent(),
    "$41.00",
  );
  await page
    .getByRole("button", { name: "Preview checkout", exact: true })
    .click();
  await page.locator("dialog input[name=name]").fill("Demo Guest");
  await page.locator("dialog input[name=email]").fill("demo@example.com");
  await page.locator("dialog input[name=phone]").fill("0400000000");
  assert.equal(
    await page
      .locator("dialog input[name=address]")
      .evaluate((el) => el.required),
    true,
  );
  await page
    .locator("dialog input[name=address]")
    .fill("1 Example Street, Sydney NSW 2000");
  await page
    .getByRole("button", { name: "Complete demo order", exact: true })
    .click();
  await page.getByText("Thanks, Demo Guest.", { exact: true }).waitFor();
  await page.keyboard.press("Escape");
  await page.getByText("A little empty in here.", { exact: true }).waitFor();
  await page.goto(`${base}/reservation/`);
  const tomorrow = new Date(Date.now() + 2 * 86400000)
    .toISOString()
    .slice(0, 10);
  await page.locator("input[name=date]").fill(tomorrow);
  await page.locator("select[name=time]").selectOption("18:30");
  await page.locator("input[name=name]").fill("Demo Guest");
  await page.locator("input[name=email]").fill("demo@example.com");
  await page.locator("input[name=phone]").fill("0400000000");
  await page
    .getByRole("button", { name: "Request a table", exact: true })
    .click();
  await page
    .getByText("No table has been reserved.", { exact: false })
    .waitFor();
  await page.goto(`${base}/gallery/`);
  assert.equal(await page.locator(".gallery-tile").count(), 6);
  await page.getByRole("button", { name: "A few more moments" }).click();
  assert.equal(await page.locator(".gallery-tile").count(), 10);
  await page.locator(".gallery-tile").first().click();
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await page.locator(".lightbox-bottom small").textContent(),
    "2 / 10",
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog[open]").count(), 0);
  await page.getByRole("button", { name: "Interior", exact: true }).click();
  assert.equal(await page.locator(".gallery-tile").count(), 2);
  for (const route of ["contact/", "catering/"]) {
    await page.goto(`${base}/${route}`);
    await page.locator("input[name=name]").fill("Demo Guest");
    await page.locator("input[name=email]").fill("demo@example.com");
    if (route === "catering/") {
      await page.locator("input[name=phone]").fill("0400000000");
      await page.locator("input[name=date]").fill(tomorrow);
      await page.locator("input[name=guests]").fill("25");
      await page
        .locator("select[name=event]")
        .selectOption("Corporate gathering");
    }
    await page
      .locator("textarea[name=message]")
      .fill("This is a browser verification of the preview form.");
    await page.locator("form button[type=submit]").click();
    await page
      .getByText("Your message has not been sent.", { exact: false })
      .waitFor();
  }
  for (const width of [375, 768, 1024]) {
    await page.setViewportSize({ width, height: 850 });
    for (const route of [
      "",
      "menu/",
      "about/",
      "order/",
      "reservation/",
      "gallery/",
      "catering/",
      "contact/",
    ]) {
      await page.goto(`${base}/${route}`);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `No overflow at ${width}px on ${route}`,
      );
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base);
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation", exact: true })
    .getByRole("link", { name: "Menu", exact: false })
    .click();
  await page.waitForURL("**/menu/");
  assert.equal(await page.locator("dialog[open]").count(), 0);
  assert.equal(
    await page.getByRole("navigation", { name: "Quick actions" }).isVisible(),
    true,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  await page.waitForLoadState("networkidle");
  assert.deepEqual(errors, [], "No uncaught browser errors");
  assert.deepEqual(failedLocalRequests, [], "No failed local requests, including navigation prefetches");
  console.log(
    "PASS: 8 routes, menu filters/search, persistent cart, quantity/totals, delivery checkout, 3 forms, gallery keyboard/lightbox, mobile navigation, 4 viewport sizes, reduced motion.",
  );
} finally {
  await browser.close();
}
