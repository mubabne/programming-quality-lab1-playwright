# Санаатай алдаа ба засвар

2026-09-06-нд successful login тестийн гарчиг шалгах assertion-ийг түр өөрчилсөн:

```ts
await expect(page.getByText('Products - intentional failure', { exact: true })).toBeVisible();
```

Ажиллуулсан команд:

```sh
npx playwright test tests/mytest.spec.ts --project=chromium --grep "successful login" --trace on --reporter=line
```

Үр дүн: **1 failed**. Login үйлдэл болон inventory URL assertion амжилттай болсон боловч дараагийн `toBeVisible()` 5000 ms хүлээгээд element олдоогүй алдаа өгсөн. Playwright-ийн алдааны context-д бодит хуудасны гарчиг `Products` гэж байна. Иймээс шалтгаан нь нэвтрэлт эсвэл сүлжээ биш, assertion-д зориуд буруу текст өгсөн явдал юм.

Trace Viewer-ээр шалгах:

```sh
npx playwright show-trace docs/intentional-failure-trace.zip
```

Улаан assertion-ийг сонгож locator, call log болон хуудасны snapshot-ийг харьцуулна. Энэ тайлбарыг test runner-ийн алдаа ба үүссэн page context дээр үндэслэн бэлтгэсэн; оюутан Trace Viewer дотор мөн нээж шалгана.

Засвар:

```ts
await expect(page.getByText('Products', { exact: true })).toBeVisible();
```

Засварын дараа үндсэн бүх тестийг ажиллуулахад **9 passed (8.6s)** болсон. Repository-ийн эцсийн тестэд санаатай алдаа үлдээгээгүй. Амжилттай trace болон алдааны trace-ийг ялгаатай нэрээр хадгалсан.
