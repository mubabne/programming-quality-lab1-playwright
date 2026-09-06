# Лаборатори 1 — Playwright

- **Оюутан:** Ч. Мөнхбаяр
- **Оюутны код:** B242270045
- **Хичээл:** Программ хангамжийн чанар
- **Тестийн сайт:** https://www.saucedemo.com/
- **GitHub:** https://github.com/mubabne/programming-quality-lab1-playwright

## Суулгах, ажиллуулах

Node.js болон npm суулгасан, интернэт холболттой орчинд repository-ийн үндсэн хавтаснаас:

```sh
npm install
npx playwright install
npx playwright test
```

`package-lock.json` дахь хувилбаруудыг яг ашиглах бол `npm install`-ийн оронд `npm ci` ажиллуулж болно.

```sh
npx playwright test --project=chromium
npx playwright show-report
npx playwright show-trace docs/successful-login-trace.zip
```

## Хийсэн тестүүд

Бүх тест `tests/mytest.spec.ts` файлд байна.

| Тест | Үйлдэл | Шалгалт |
| --- | --- | --- |
| successful login | Зөв хэрэглэгч, нууц үгээр нэвтрэх | Inventory URL болон Products текст; дараа нь Logout, Login хуудас |
| failed login with wrong password | Буруу нууц үгээр нэвтрэх | Login URL хэвээр, тодорхой алдааны мэдэгдэл харагдах |
| add product to cart after login | Нэвтрээд эхний барааг сагсанд нэмэх | Remove товч харагдах, сагсны тоо 1 болох; дараа нь Logout |

Chromium, Firefox, WebKit тус бүрт 3 тест буюу нийт **9 тест** ажиллана. Тест бүр өөрийн `page` fixture-ээр шинэ browser context ашигладаг тул өмнөх тестийн нэвтрэлт, сагсны төлөвөөс хамаарахгүй. Амжилттай нэвтэрсэн хоёр тест Logout үйлдлээр дуусна. Буруу нэвтрэх тестэд session үүсэхгүй тул Logout байхгүй.

## Нотолгоо ба trace дасгал

2026-09-06-ны эцсийн үндсэн ажиллуулалт: **9 passed**.

Public GitHub repository-оос шинэ `github-verification-clone` хавтсанд clone хийж, `npm.cmd install`, `npx.cmd playwright test` ажиллуулахад мөн **9 passed (7.6s)** болсон. Windows PowerShell дээр `.cmd` нь npm/npx-ийн Windows launcher-ийг шууд сонгоно.

- [Бүх 9 тестийн HTML report](docs/test-report.html) — файлыг татаж аваад browser-оор нээнэ; GitHub HTML-ийг шууд report хэлбэрээр харуулахгүй.
- [Амжилттай login болон logout trace](docs/successful-login-trace.zip).
- [Санаатай унагасан assertion-ий trace](docs/intentional-failure-trace.zip).
- [Trace дасгалын тайлбар](docs/trace-exercise.md).

Санаатай алдааг зассаны дараа бүх 9 тестийг дахин ажиллуулж ногоон болгосон. Алдаатай assertion эцсийн тестийн кодонд байхгүй. `node_modules/`, `test-results/`, `playwright-report/` нь ignored; сонгосон бодит нотолгоог `docs/` хавтаст тусад нь хадгалсан.

## Locator сонголт, XPath

Нэвтрэх талбаруудыг `getByPlaceholder`, товч болон Logout холбоосыг `getByRole`, гарчиг ба алдааг `getByText` ашиглан олсон. Эдгээр нь тестийн зорилгыг код уншиж буй хүнд шууд харуулдаг. DOM-ийн олон түвшнийг заасан XPath нь дундуур wrapper элемент нэмэгдэхэд эвдрэх эрсдэлтэй тул энэ ажилд ашиглаагүй. Сагсны тоонд `.shopping_cart_badge` гэсэн богино CSS locator ашигласан; энэ элементэд тохирох нэртэй товч эсвэл placeholder байхгүй. `.first()` нь ямар нэг бараа нэмэх шаардлагад нийцнэ, харин тодорхой барааг шалгах бол барааны нэрээр хүрээг хязгаарлах хэрэгтэй.

Эх сурвалж: [Playwright Locators](https://playwright.dev/docs/locators).

## Playwright ба Selenium — харьцуулалт

Playwright болон Selenium нь browser дээр хэрэглэгчийн үйлдлийг автоматжуулж веб системийг шалгахад ашиглагдана. Энэ лабораторийн Playwright Test төсөлд тест ажиллуулагч, assertion, HTML report болон trace нэг хэрэгслийн багцаар ашиглагдсан. Selenium WebDriver ашиглах үед тестийн framework, тайлангийн шийдлийг тухайн төслийн хэл болон орчинд тохируулан сонгодог. Playwright нь click зэрэг үйлдлийн өмнө элементийн бэлэн байдлыг автоматаар шалгадаг бөгөөд locator assertion-ууд нөхцөл биелэхийг хүлээн дахин шалгадаг. Selenium-д мөн implicit болон explicit wait байдаг тул Selenium огт хүлээлт дэмждэггүй гэж ойлгож болохгүй. Энэ ажилд тогтмол sleep оруулахгүйгээр URL, текст, товчны төлөвийг assertion-аар шалгасан. Гурван browser-ийг нэг config-ийн projects хэсэгт тохируулсан нь ижил гурван тестийг есөн удаа ажиллуулахад тохиромжтой байсан. Аль хэрэгслийг сонгох нь төслийн орчин, дэмжих browser болон багийн туршлагаас хамаарна.

Эх сурвалж: [Playwright Locators](https://playwright.dev/docs/locators), [Selenium Waiting Strategies](https://www.selenium.dev/documentation/webdriver/waits/).

## Codegen — гүйцээх хэсэг

Codegen-ийн бодит recording одоогоор энэ repository-д нэмэгдээгүй. Дараах командаар recording хийнэ:

```sh
npx playwright codegen --target=playwright-test --output=docs/codegen-login.ts https://www.saucedemo.com/
```

Нээгдсэн browser дээр `standard_user` / `secret_sauce` ашиглан нэвтэрч, нэг барааг сагсанд нэмээд Open Menu → Logout дарж цонхыг хаана. Үүссэн `docs/codegen-login.ts`-ийг өөрийн тесттэй харьцуулж, ямар locator сонгосон, илүү click бичигдсэн эсэх, ямар assertion өөрөө нэмэх шаардлагатай байсныг бодитоор ажиглан энэ хэсгийг шинэчилнэ. Recording-ийг `tests/`-ээс гадна хадгалснаар үндсэн тестийн тоог өөрчлөхгүй.

Эх сурвалж: [Playwright Test generator](https://playwright.dev/docs/codegen).

## AI ашиглалт

AI тусламжийг тестэд logout нэмэх, тест ажиллуулах, Git commit, trace нотолгоо, README-ийн эх бэлтгэхэд ашигласан. AI-ийн санал болгосон өөрчлөлтүүдийг бодит browser дээр ажиллуулж шалгасан. Энэ README нь AI-ийн тусламжтай бэлтгэсэн эх тул илгээхийн өмнө оюутан өөрөө уншиж, тайлбаруудыг ойлгосноо нягтлан, Codegen-ийн өөрийн ажиглалт болон дүгнэлтээр гүйцээнэ.

## Илгээхийн өмнө

- [x] Гурван тест, гурван browser; 9 passed.
- [x] Нэвтэрсэн тест бүр Logout-оор дууссан.
- [x] Default example тестийг устгасан.
- [x] Бодит trace болон HTML report `docs/` дотор байна.
- [x] README-д нэр, оюутны код оруулсан.
- [ ] Codegen recording болон өөрийн ажиглалтыг нэмсэн.
- [ ] README болон AI-ийн тусламжтай бичсэн тайлбаруудыг өөрөө хянасан.
- [x] Repository-г public GitHub repo руу push хийсэн.
- [x] GitHub-аас шинэ хавтсанд clone хийж `npm install`, `npx playwright test` ажиллуулсан.
- [ ] Teams Assignment-д repository-ийн линкийг хавсаргаж **Turn in** дарсан.
