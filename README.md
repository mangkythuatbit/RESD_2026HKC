# Cổng thông tin R.E.S.D — Đoàn - Hội khoa Công nghệ thông tin kinh doanh, UEH

Website tĩnh giới thiệu chương trình R.E.S.D: 4 ban chuyên môn, 9 mảng (mỗi mảng một trang riêng), bài kiểm tra định hướng cá nhân và đường dẫn tới form đăng ký cùng booklet.

HTML5 + Bootstrap 5.3 qua CDN + CSS/JavaScript thuần. Không cần cài đặt, không cần build.

## Xem website

Mở `index.html` bằng trình duyệt, hoặc dùng Live Server trong VS Code. Cần Internet để tải Bootstrap và Google Fonts từ CDN.

> Bài kiểm tra định hướng dùng `localStorage`, tải ảnh PNG, và tự `fetch()` hai file CSV trong `assets/data/` để lấy bộ câu hỏi/hồ sơ mảng mới nhất. Một số trình duyệt chặn các tính năng này khi mở bằng `file://` (đặc biệt là `fetch()` do CORS) — khi đó trang vẫn chạy bình thường, chỉ là dùng bộ câu hỏi mặc định nhúng sẵn thay vì bản trên host. Nếu muốn kiểm cả phần đọc CSV, chạy máy chủ tĩnh:
>
> ```bash
> python3 -m http.server 8000
> # rồi mở http://localhost:8000
> ```

## Cấu trúc

```text
index.html                             Trang chủ cổng thông tin
gioi-thieu.html                        Ý tưởng, giá trị nhận được, so sánh 4 ban, nút "bốc ngẫu nhiên mảng"
ban-to-chuc-xay-dung.html              Sapphire · TC-XD (tổng quan)
  ban-to-chuc-xay-dung-ns.html           Mảng Nhân sự
  ban-to-chuc-xay-dung-dn.html           Mảng Đối ngoại
  ban-to-chuc-xay-dung-kt.html           Mảng Kỹ thuật
ban-phong-trao-tinh-nguyen.html        Diamond · PT-TN (tổng quan)
  ban-phong-trao-tinh-nguyen-pt.html     Mảng Phong trào
  ban-phong-trao-tinh-nguyen-tn.html     Mảng Tình nguyện
ban-truyen-thong.html                  Ruby · TT (tổng quan)
  ban-truyen-thong-content.html          Mảng Nội dung (Content)
  ban-truyen-thong-dep.html              Mảng Thiết kế - Hình ảnh (DEP)
ban-hoc-tap-nckh.html                  Emerald · HT-NCKH (tổng quan)
  ban-hoc-tap-nckh-ht.html                Mảng Học tập
  ban-hoc-tap-nckh-nckh.html              Mảng Nghiên cứu khoa học
test-dinh-huong.html                   Bài kiểm tra định hướng + form đăng ký nhúng
lien-he.html                           Kênh liên hệ + FAQ

css/style.css                          Toàn bộ giao diện, các khối đánh số
js/config.js                           ★ Liên kết ngoài và mốc thời gian
js/site.js                             Hành vi dùng chung mọi trang (navbar 3 cấp, hộ chiếu, bảng lệnh, bốc ngẫu nhiên mảng)
js/main.js                             Hiệu ứng riêng của Trang chủ
js/test-dinh-huong.js                  Bài kiểm tra: đọc CSV từ host, chấm điểm, kết quả, canvas PNG, xuất CSV
tools/build_pages.py                   ★ Bộ sinh 17 trang, chứa toàn bộ nội dung chữ của ban/mảng
assets/data/cau-hoi-mau.csv            ★ 24 câu hỏi trắc nghiệm — sửa trực tiếp, không qua script
assets/data/ho-so-mang-mau.csv         ★ Hồ sơ % của 9 mảng — sửa trực tiếp, không qua script
assets/images/                         Ảnh đã được duyệt
docs/project-brief.md                  Phạm vi và định hướng
docs/progress.md                       Tiến độ
docs/content-guide.md                  Hướng dẫn điền nội dung cho Ban chuyên môn
```

Thứ tự nạp JavaScript: `config.js → site.js → (main.js | test-dinh-huong.js)`.

## Cập nhật nhanh

### 1. Điền liên kết — `js/config.js`

Bốn giá trị đang để rỗng (đã điền sẵn `fanpageUrl`):

| Khoá | Điền gì |
| --- | --- |
| `formEmbedUrl` | Link nhúng Google Form, dạng `.../viewform?embedded=true` |
| `formOpenUrl` | Link mở Google Form ở tab mới, dạng `.../viewform` |
| `bookletUrl` | Link booklet R.E.S.D Spring 2026 |
| `contactEmail` | Email đầu mối |

Để rỗng thì giao diện tự hiện trạng thái "đang chờ cập nhật" thay vì link hỏng — không bao giờ vỡ trang.

Mốc đếm ngược nằm ở `event.date`, đang đặt `2026-09-23T08:00:00+07:00` kèm chú thích "dự kiến, chờ xác nhận".

### 2. Sửa nội dung chữ của ban/mảng — `tools/build_pages.py`

⚠️ **Đừng sửa thẳng file `.html`.** Cả 17 trang được sinh ra từ script này; nội dung nằm trong biến `BANS`. Sửa xong chạy lại:

```bash
python3 tools/build_pages.py
```

Sửa thẳng `.html` sẽ bị ghi đè ở lần chạy sau. Website vẫn chạy bình thường mà không cần Python — script chỉ dùng khi cập nhật nội dung.

Chi tiết cách thêm nhân sự và thay lời nhắn nhủ: xem `docs/content-guide.md`.

### 3. Sửa bộ câu hỏi trắc nghiệm / hồ sơ % mảng — `assets/data/*.csv`

**Không đi qua `tools/build_pages.py`.** Sửa trực tiếp `assets/data/cau-hoi-mau.csv` (24 câu) và `assets/data/ho-so-mang-mau.csv` (hồ sơ % của 9 mảng) rồi ghi đè lên host — trang tự đọc lại khi tải. Chi tiết cột và quy trình: xem `docs/content-guide.md`, mục "Cập nhật bộ câu hỏi trắc nghiệm".

Chủ đích thiết kế: việc nạp file này **không có giao diện công khai** trên website (không có nút "tải file lên" cho khách vào xem thấy) — đây là thao tác quản trị nội bộ, làm thẳng trên host. Nếu file lỗi hoặc không đọc được, trang lặng lẽ dùng bộ mặc định nhúng sẵn trong `js/test-dinh-huong.js`.

## Tính năng đáng chú ý

- **Navbar 3 cấp** — Bootstrap chỉ hỗ trợ 2 cấp, cấp 3 được tự xử lý trong `js/site.js`: mở ngang từ 992px, thu thành accordion ở mobile.
- **9 mảng, 9 trang riêng** — mỗi mảng có URL độc lập (`tools/build_pages.py` → `build_mang()`), trang ban chỉ còn thẻ tổng quan dẫn sang từng mảng.
- **Bài kiểm tra định hướng** — 4 trục, 24 câu Likert, cho ra mã 4 chữ và 1 trong 16 nhóm, kèm xếp hạng 9 mảng và 4 ban. Phím `1`-`5` chọn đáp án, `←` `→` chuyển câu. Bộ câu hỏi/hồ sơ mảng tự nạp từ `assets/data/*.csv` trên host (im lặng dùng mặc định nếu không đọc được).
- **Ảnh kết quả** — render bằng canvas 1080×1350, tải về dạng `resd-dinh-huong-<MÃ>.png`.
- **Xuất kết quả CSV** — nút "Tải kết quả (CSV)" ở màn hình kết quả, xuất câu hỏi + câu trả lời + % phù hợp từng ban/mảng, mở được bằng Excel.
- **Chương trình nổi bật dạng khung ảnh khổ dọc** — tên luôn hiện, di chuột/chạm mới lộ mô tả (`programs_grid()`); chưa có ảnh thật thì hiện chữ cái đầu làm chỗ giữ chỗ.
- **Bốc ngẫu nhiên một mảng** — nút ở `gioi-thieu.html`, đưa thẳng người đọc tới một trong 9 trang mảng.
- **Hộ chiếu vũ trụ** — 8 trạm tự đóng dấu khi ghé thăm đủ 8 nhóm trang (4 ban + trang chủ, giới thiệu, test, liên hệ).
- **Bảng lệnh tìm nhanh** — `Ctrl/⌘ + K`, 17 mục, tìm được không dấu ("nhan su" → Nhân sự, "thiet ke" → DEP).
- **In / lưu PDF** — toàn site có `@media print`.

Dữ liệu lưu cục bộ trên máy người dùng, không gửi đi đâu. Key: `resd.passport.v1`, `resd.test.v1`.

## Kiểm tra thủ công trước khi công bố

**Bố cục**
- Xem ở 320px, 375px, 768px, 992px, 1440px; kiểm tràn ngang, chữ và hành tinh.
- Trên mobile: mở/đóng menu, mở dropdown ban, mở tiếp menu cấp 3, chọn một mảng và kiểm nó dẫn đúng sang trang mảng riêng (không phải anchor).
- Nhấn Escape để đóng menu.

**Bàn phím và trợ năng**
- Dùng Tab đi hết trang, kiểm viền focus và liên kết bỏ qua điều hướng.
- Bật "giảm chuyển động" trong hệ điều hành rồi tải lại: hiệu ứng `.reveal` và quỹ đạo phải dừng, nội dung vẫn hiện đủ.

**Bài kiểm tra**
- Làm trọn 24 câu bằng chuột, rồi làm lại bằng phím `1`-`5`.
- Kiểm thanh tiến độ chạm 100% ở câu cuối.
- Bấm Tải ảnh, mở file PNG kiểm chữ có dấu hiển thị đúng.
- Bấm Tải kết quả (CSV), mở bằng Excel kiểm cột và dấu tiếng Việt hiển thị đúng.
- Bấm Sao chép kết quả, dán thử.
- Tải lại trang: kết quả cũ phải còn. Bấm Làm lại: phải sạch.
- Sửa thử một dòng trong `assets/data/cau-hoi-mau.csv`, tải lại trang qua `http://localhost:8000` (không phải `file://`): câu hỏi mới phải xuất hiện. Đổi lại như cũ sau khi kiểm xong.
- Khi `formEmbedUrl` còn rỗng, kiểm thẻ hướng dẫn hiện thay cho iframe. Sau khi điền link, kiểm iframe tải được trên cả mobile.

**Liên kết**
- Bấm thử mọi nút dùng link từ config khi còn rỗng: phải hiện thông báo ngắn, không nhảy trang lỗi.
- Bấm nút Fanpage: mở tab mới.
- Bấm nút "Bốc ngẫu nhiên một mảng" vài lần ở `gioi-thieu.html`: phải đưa tới các trang mảng khác nhau trong 9 mảng.

**In**
- `Ctrl/⌘ + P` trên trang mảng và trang kết quả test, kiểm bản in đọc được.

Tham khảo tích hợp CDN: https://getbootstrap.com/docs/5.3/getting-started/introduction/
