# Hướng dẫn điền nội dung

Dành cho Ban chuyên môn và ban Truyền thông. Không cần biết lập trình, chỉ cần sửa chữ trong vài file.

---

## Quy tắc vàng

> **Đừng sửa thẳng các file `.html`.**
> Cả 15 trang được sinh ra từ `tools/build_pages.py`. Sửa `.html` sẽ mất trắng ở lần chạy script tiếp theo.

Quy trình đúng, mỗi lần cập nhật nội dung ban/mảng:

```bash
python3 tools/build_pages.py
```

Chạy xong, mở `index.html` kiểm tra lại là được.

**Ngoại lệ duy nhất**: bộ câu hỏi trắc nghiệm và hồ sơ % của 8 lựa chọn chuyên môn dùng cho bài kiểm tra định hướng — xem Việc 6 bên dưới, không sửa qua `tools/build_pages.py`.

---

## Việc 1 — Điền các liên kết còn thiếu

Mở `js/config.js`, điền vào giữa hai dấu nháy:

```js
formEmbedUrl: "",   // link nhúng Google Form:  .../viewform?embedded=true
formOpenUrl:  "",   // link mở tab mới:          .../viewform
bookletUrl:   "",   // link booklet R.E.S.D Spring 2026
contactEmail: "",   // email đầu mối
```

**Lấy link nhúng Google Form ở đâu**: mở Form → nút `Gửi` → chọn biểu tượng `< >` → sao chép phần trong `src="..."`. Link đó đã có sẵn đuôi `?embedded=true`.

Để rỗng cũng không sao — website sẽ hiện "đang chờ cập nhật" thay vì link hỏng. Nhưng nếu `formEmbedUrl` rỗng thì sau khi làm bài test sẽ không có form để điền.

`fanpageUrl` đã được điền sẵn (fanpage Đoàn - Hội khoa). Chỉ sửa nếu link fanpage đổi.

**Mốc đếm ngược** cũng nằm trong file này:

```js
date: "2026-09-23T08:00:00+07:00",
note: "Dự kiến, chờ xác nhận từ Ban chuyên môn",
```

Khi ngày đã chốt, sửa `date` và **xoá chữ trong `note`** (để `note: ""`) để bỏ nhãn "dự kiến".

---

## Việc 2 — Thêm nhân sự thành viên

Mở `tools/build_pages.py`, tìm tới ban của bạn trong biến `BANS` (tìm theo tên, ví dụ `Ban Tổ chức - Xây dựng`), rồi tìm tới đúng mảng bên trong (mỗi mảng nay có trang riêng, nhưng nội dung vẫn khai báo lồng bên trong ban ở file này).

Mỗi ban có một dòng `"people"` và mỗi mảng cũng có một dòng `"people"` riêng:

```python
"people": [("", "Trưởng ban"), ("", "Phó ban"), ("", "Phó ban")],
```

Mỗi cặp là `("Tên hiển thị", "Chức danh")`. Điền tên vào ô đầu:

```python
"people": [("Nguyễn Văn A", "Trưởng ban"), ("Trần Thị B", "Phó ban")],
```

Ô tên để rỗng thì thẻ tự hiện nhãn **"Đang cập nhật"** — dùng khi chức danh đã có nhưng chưa chốt người.

Thêm hoặc bớt người: cứ thêm/bớt một cặp `("...", "...")`, nhớ dấu phẩy giữa các cặp. Số lượng bao nhiêu cũng được, lưới tự dãn.

> **Lưu ý về quyền riêng tư**: chỉ đăng tên người đã đồng ý. Không đăng số điện thoại, email cá nhân hay ảnh chưa xin phép.

---

## Việc 3 — Thay lời nhắn nhủ

Mỗi ban và mỗi mảng có mục `"voices"`:

```python
"voices": [
    {"q": "Nội dung lời nhắn...",
     "who": "Chờ cập nhật", "role": "Thành viên Ban Tổ chức - Xây dựng"},
],
```

- `q` — câu nói, nên 2-3 dòng, viết như nói chuyện thật, tránh khẩu hiệu.
- `who` — tên người nói.
- `role` — vai trò, ví dụ "Thành viên mảng Nhân sự, khoá 48".

**Quan trọng**: mọi lời nhắn hiện tại là **nội dung mẫu do máy viết**, đang gắn nhãn `Nội dung mẫu · chờ duyệt`. Nhãn này tự biến mất khi bạn đổi `who` thành một tên thật (khác `"Chờ cập nhật"`). Vì vậy **đừng điền tên thật vào một câu nói mà người đó chưa từng nói** — nhãn sẽ tắt và câu nói mẫu sẽ trông như phát ngôn thật.

Cách làm đúng: hỏi thành viên một câu ngắn, ví dụ *"Điều gì ở ban khác với những gì bạn tưởng tượng lúc mới vào?"*, rồi chép lại nguyên văn.

---

## Việc 4 — Sửa các nội dung khác

Trong mỗi ban và mỗi mảng còn các mục sau, sửa trực tiếp phần chữ:

| Khoá | Là gì | Gợi ý |
| --- | --- | --- |
| `tagline` | Câu dẫn ngay dưới tên ban | 1-2 câu |
| `mission` | Sứ mệnh | danh sách 2 đoạn văn |
| `lede` | Câu dẫn của mảng | 1 câu |
| `duties` | Nhiệm vụ | 4-5 gạch đầu dòng, mỗi dòng 1 việc cụ thể |
| `programs` | Chương trình nổi bật | mỗi mục có `name`, `meta` (nhãn ngắn), `desc` — hiển thị thành khung ảnh khổ dọc, di chuột/chạm mới lộ `desc` |
| `must` | Yêu cầu bắt buộc | 3-4 cụm ngắn |
| `plus` | Điểm cộng | 3-4 cụm ngắn |
| `stats` | Ba con số trên đầu trang ban | cặp `("số", "chú thích")` |

Viết chữ tiếng Việt bình thường, có dấu. Nếu trong câu có dấu nháy kép `"` thì viết thành `\"` hoặc đổi sang nháy đơn để khỏi lỗi.

**Chương trình nổi bật hiện chưa có ảnh thật.** Khung ảnh đang hiện chữ cái đầu của tên chương trình kèm nhãn "Ảnh minh hoạ · chờ cập nhật" làm chỗ giữ chỗ. Khi có ảnh đã duyệt, bỏ vào `assets/images/` theo Việc 5, sau đó báo để gắn ảnh thật vào đúng chương trình trong `tools/build_pages.py`.

---

## Việc 5 — Thêm ảnh

Bỏ file ảnh vào `assets/images/`. Chỉ dùng ảnh đã được duyệt và đã xin phép người trong ảnh.

Nên nén ảnh xuống dưới 300 KB trước khi thêm, vì website tải trực tiếp không qua xử lý. Ảnh cho khung "chương trình nổi bật" nên là ảnh khổ dọc (ví dụ tỉ lệ 3:4) để vừa khung.

---

## Việc 6 — Cập nhật bộ câu hỏi trắc nghiệm / hồ sơ % của 8 lựa chọn

Đây là phần **duy nhất không đi qua `tools/build_pages.py`**. Bài kiểm tra định hướng đọc dữ liệu từ hai file CSV trong thư mục `assets/data/`, ngay trên host — không cần chạy script, không cần đụng tới code.

| File | Nội dung | Cột bắt buộc |
| --- | --- | --- |
| `cau-hoi-mau.csv` | 24 câu hỏi trắc nghiệm | `ma_cau, truc, huong, noi_dung_cau_hoi` |
| `ho-so-mang-mau.csv` | Hồ sơ % của 8 lựa chọn theo 4 trục | `ma_ban, ten_ban, ma_mang, ten_mang, nhip_lam_viec, nguon_nang_luong, cach_tao_gia_tri, vi_tri_trong_doi, mo_ta_ngan` |

**Cách cập nhật**:
1. Mở file bằng Excel hoặc Google Sheets, sửa nội dung (thêm/sửa câu hỏi, đổi % của mảng...), rồi lưu lại **đúng định dạng CSV, mã hoá UTF-8** (giữ nguyên tên cột ở dòng đầu).
2. Ghi đè trực tiếp lên file cùng tên trong `assets/data/` trên host (qua trình quản lý file / FTP của nơi lưu trữ trang) — **không** đổi tên file, không sửa qua giao diện website.
3. Mở lại trang `test-dinh-huong.html`: trang tự đọc file mới ngay từ lần tải đó, không cần làm gì thêm.

Ghi chú về cột:
- `truc` (bộ câu hỏi) nhận một trong bốn giá trị: `nhip`, `nangluong`, `giatri`, `vitri`. `huong` là `+1` hoặc `-1` (chiều của câu hỏi so với trục).
- 4 cột trục trong hồ sơ lựa chọn nhận giá trị từ `-100` đến `100` (%). `ma_mang` phải khớp mã sẵn có: NS, ĐN, KT, PTTN, IDEA, DEP, HT, NCKH. Mã `PTTN` đại diện trực tiếp cho Ban Phong trào - Tình nguyện vì ban này không chia mảng.

**Vì sao không có nút "tải file lên" trên website**: việc đổi bộ câu hỏi là thao tác quản trị nội bộ, không nên hiện ra cho sinh viên vào làm bài thấy. Nếu file trên host bị lỗi định dạng hoặc không đọc được, trang sẽ tự lặng lẽ dùng bộ mặc định có sẵn trong `js/test-dinh-huong.js` — bài test vẫn chạy bình thường, không có gì hiển thị lỗi cho người làm bài.

Nút **"Tải kết quả (CSV)"** ở màn hình kết quả (dành cho người làm bài, không phải Ban chuyên môn) xuất ra một file cùng kiểu cột, gồm câu hỏi, câu trả lời đã chọn và độ tương đồng tham khảo của từng ban/mảng — mở được ngay bằng Excel.

---

## Điểm đã xác nhận và điểm còn chờ

1. **"KT"** trong TC-XD đã được **xác nhận qua PDF giới thiệu Đoàn - Hội khoa**: đây là mảng quản lý/phát triển sản phẩm số & website Đoàn - Hội, training học phần cơ sở ngành, và kỹ thuật chương trình — không phải hậu cần/âm thanh/ánh sáng như bản nháp đầu tiên.
2. **"DEP"** trong TT hiện vẫn đang được hiểu là **Thiết kế - Hình ảnh**, còn chờ Ban chuyên môn xác nhận lại.

Nếu hiểu khác, sửa `"name"` của mảng đó trong `tools/build_pages.py` rồi chạy lại script. Tên viết tắt (`"code"`) và slug trang (`"id"`) nên giữ nguyên để không làm hỏng liên kết trên navbar và các trang mảng đã chia sẻ.

---

## Sau khi sửa xong

1. Nếu sửa nội dung ban/mảng: chạy `python3 tools/build_pages.py`.
2. Nếu chỉ sửa hai file CSV ở Việc 6: không cần chạy script, chỉ cần ghi đè file trên host.
3. Mở `index.html`, bấm qua trang ban/mảng vừa sửa, kiểm nội dung hiện đúng.
4. Thu nhỏ cửa sổ trình duyệt xuống cỡ điện thoại, kiểm chữ không bị tràn.
5. Nếu đã đổi tên hoặc mã mảng, kiểm menu cấp 3 trên navbar và bảng lệnh `Ctrl/⌘ + K` vẫn nhảy đúng chỗ.

Danh sách kiểm tra đầy đủ nằm trong `README.md`.
