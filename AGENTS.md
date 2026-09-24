# Cổng thông tin R.E.S.D

Đọc `docs/project-brief.md` và `docs/progress.md` trước khi đề xuất hoặc sửa code.

## Mục tiêu
Cổng thông tin tĩnh giới thiệu chương trình R.E.S.D của Đoàn - Hội khoa Công nghệ thông tin kinh doanh, UEH. Đây là cổng của **một chương trình**, không phải website của Đoàn - Hội khoa; tránh nội dung trùng với Fanpage, và tránh làm cho trang chủ đọc như một bài so sánh lộ liễu với web khoa — sự khác biệt nên tự nhiên hiện ra qua nội dung, không cần một khối riêng "khác gì web khoa".

## Công nghệ
- HTML5, Bootstrap 5.3 qua CDN
- CSS thuần trong `css/style.css`
- JavaScript thuần, nạp theo thứ tự `js/config.js → js/site.js → (js/main.js | js/test-dinh-huong.js)`
- Google Fonts: Be Vietnam Pro (tiếng Việt), Space Grotesk (số và mã latin)
- Không React, không backend, không database, không đăng nhập, không bước build bắt buộc

**Iframe và Google Form được phép** kể từ 2026-09-17, dùng cho đúng một chỗ là form đăng ký trong `test-dinh-huong.html`. Quy tắc cấm cũ đã bị ghi đè có chủ đích; lý do ghi trong `docs/project-brief.md`.

**`fetch()` được phép** kể từ phiên tách trang, dùng cho đúng một việc: `js/test-dinh-huong.js` tự đọc hai file `assets/data/cau-hoi-mau.csv` và `assets/data/ho-so-mang-mau.csv` ngay khi tải trang, để nạp bộ câu hỏi / hồ sơ % của Ban chuyên môn nếu có bản mới trên host. Luôn bọc try/catch (hoặc `.catch()`) và có giới hạn thời gian chờ (timeout) — nếu lỗi, offline, hoặc mở qua `file://` thì lặng lẽ dùng bộ mặc định nhúng sẵn trong mã nguồn, không được hiện lỗi cho người làm bài thấy.

## Cấu trúc trang (15 trang)
Toàn bộ trang được sinh từ `tools/build_pages.py`. Mỗi ban chuyên môn có một trang tổng quan; bảy mảng trực thuộc có trang riêng. **Ban Phong trào - Tình nguyện là một ban thống nhất, không chia thành hai mảng PT/TN.**

```
index.html                             Trang chủ
gioi-thieu.html                        Ý tưởng, so sánh 4 ban, nút "bốc ngẫu nhiên lựa chọn"
ban-to-chuc-xay-dung.html              Sapphire · TC-XD (tổng quan)
  ban-to-chuc-xay-dung-ns.html           Mảng Nhân sự
  ban-to-chuc-xay-dung-dn.html           Mảng Đối ngoại
  ban-to-chuc-xay-dung-kt.html           Mảng Kỹ thuật
ban-phong-trao-tinh-nguyen.html        Diamond · PT-TN (ban thống nhất, không chia mảng)
ban-truyen-thong.html                  Ruby · TT (tổng quan)
  ban-truyen-thong-content.html          Mảng IDEA (Nội dung)
  ban-truyen-thong-dep.html              Mảng Thiết kế - Hình ảnh (DEP)
ban-hoc-tap-nckh.html                  Emerald · HT-NCKH (tổng quan)
  ban-hoc-tap-nckh-ht.html                Mảng Học tập
  ban-hoc-tap-nckh-nckh.html              Mảng Nghiên cứu khoa học
test-dinh-huong.html                   Bài kiểm tra định hướng + form đăng ký nhúng
lien-he.html                           Kênh liên hệ + FAQ
```

Trang tổng quan của ba ban có mảng chỉ còn thẻ dẫn sang từng trang mảng (`mang_cards()`), không lặp lại nội dung chi tiết. Trang PT-TN trình bày trực tiếp nội dung của toàn ban và không có menu cấp 3.

## Quy tắc sửa nội dung

**Không sửa thẳng file `.html`.** Toàn bộ 15 trang được sinh ra từ `tools/build_pages.py`; nội dung chữ nằm trong biến `BANS`. Quy trình đúng:

```bash
python3 tools/build_pages.py
```

Sửa thẳng `.html` sẽ bị ghi đè ở lần chạy script tiếp theo. Website vẫn chạy được mà không cần Python; script chỉ dùng khi cập nhật nội dung.

**Ngoại lệ**: bộ câu hỏi trắc nghiệm và hồ sơ % của 8 lựa chọn chuyên môn (7 mảng + Ban PT-TN) dùng cho bài kiểm tra định hướng **không** nằm trong `tools/build_pages.py`, mà nằm ở hai file `assets/data/cau-hoi-mau.csv` và `assets/data/ho-so-mang-mau.csv`. Ban chuyên môn chỉnh sửa trực tiếp hai file này trên host (qua trình quản lý file của nơi lưu trữ trang), không cần chạy lại script, không cần vào giao diện website. Trang tự đọc lại hai file này mỗi lần tải; xem `docs/content-guide.md` mục cập nhật bộ câu hỏi.

## Quy tắc nội dung

- **Không bịa tên người thật.** Thẻ nhân sự để trống tên với nhãn "Đang cập nhật" kèm chức danh. Lời nhắn nhủ là nội dung mẫu, phải gắn `draft-badge` "Nội dung mẫu · chờ duyệt" cho tới khi có bản duyệt (nhãn tự ẩn khi tên thật thay vào, xem hàm `draft_flag()`).
- **Không tự tạo hoặc thay đổi ngày tuyển, deadline, thông tin liên hệ** khi chưa được xác nhận. Mốc chưa chốt phải ghi kèm chú thích "dự kiến".
- **Mọi liên kết ngoài và mốc thời gian khai báo trong `js/config.js`**, không viết cứng vào HTML. Để chuỗi rỗng nếu chưa có; giao diện tự hiện trạng thái "đang chờ cập nhật" thay vì link hỏng.
- Bài kiểm tra định hướng phải luôn nói rõ nó **không phải công cụ tâm lý đã kiểm định** và **không ảnh hưởng tới xét tuyển**.
- Không sao chép nguyên 33 trang booklet thành 33 màn hình.
- Không cho người dùng công khai (sinh viên làm bài test) thấy công cụ nạp/tải file CSV câu hỏi. Việc cập nhật bộ câu hỏi/hồ sơ mảng là việc nội bộ của Ban chuyên môn, làm trực tiếp trên host — không lộ ra giao diện public.

## Thiết kế
- Chủ đề không gian, quỹ đạo, tên lửa và đá quý. Bốn ban được gọi là **bốn viên đá**, không gọi là hành tinh; mỗi ban một màu qua biến `--gem`.
- Chương trình nổi bật của mỗi ban/mảng hiển thị dạng khung ảnh khổ dọc (`program-card`/`programs_grid()`): tên chương trình luôn hiện, di chuột hoặc focus mới lộ mô tả. Chưa có ảnh thật thì khung hiện chữ cái đầu + nhãn "Ảnh minh hoạ · chờ cập nhật", không bịa ảnh.
- Responsive, ưu tiên điện thoại. Dùng Bootstrap cho layout, CSS riêng cho nhận diện.
- Tôn trọng `prefers-reduced-motion`; giữ `@media print` hoạt động.
- Navbar 3 cấp: Bootstrap chỉ hỗ trợ 2 cấp nên cấp 3 tự xử lý trong `js/site.js`. Sửa navbar thì kiểm cả desktop lẫn mobile.

## Quy tắc kỹ thuật
- Không thêm thư viện mới nếu chưa giải thích lý do.
- Mọi thao tác localStorage phải bọc try/catch (đã có sẵn `RESD_STORE`). Key đang dùng: `resd.passport.v1`, `resd.test.v1`.
- Mọi thao tác canvas phải bọc try/catch; canvas lỗi thì chỉ ẩn khu ảnh, không làm hỏng phần kết quả chữ.
- Mọi thao tác `fetch()` (đọc CSV từ `assets/data/`) phải bọc try/catch/`.catch()`, có timeout, và thất bại thì lặng lẽ dùng dữ liệu mặc định — không hiện lỗi kỹ thuật cho người dùng cuối.
- Sau thay đổi: chạy `node --check` trên file JS, kiểm liên kết nội bộ, xem lại giao diện desktop và mobile.
