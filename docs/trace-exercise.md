# Trace дасгал

Successful login тестэд Products гэсэн зөв текстийг Products - intentional failure болгож түр өөрчилсөн. Тестийг Chromium дээр trace-тай ажиллуулахад 1 failed болсон.

Trace Viewer-д нээж харахад Login click болон inventory URL шалгалт амжилттай болсон байна. Дараагийн toBeVisible assertion нь байхгүй текстийг 5000 ms хүлээгээд element(s) not found алдаа өгсөн. Хуудасны snapshot дээр Products гэсэн бодит гарчиг харагдсан тул шалтгаан нь буруу хүлээгдэж буй текст байсан.

Assertion-д Products гэсэн зөв текстийг буцааж тавьсны дараа үндсэн 9 тест pass болсон. Алдаатай хувилбарыг эцсийн кодонд үлдээгээгүй.

[Алдаатай ажиллуулалтын trace](intentional-failure-trace.zip) · [Зөв login/logout trace](successful-login-trace.zip)
