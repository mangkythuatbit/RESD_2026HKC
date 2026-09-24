# Tiến độ R.E.S.D

## 2026-09-24 (bản mới nhất) — PT-TN là một ban thống nhất, nhận diện bốn viên đá

- Đã xác nhận Ban Phong trào - Tình nguyện **không chia thành hai mảng PT/TN**. Hai trang con cũ được gỡ; website còn **15 trang** gồm 4 trang ban và 7 trang mảng.
- Bài test còn **8 lựa chọn chuyên môn**: 7 mảng và Ban PT-TN. Hai hồ sơ PT/TN cũ được gộp thành hồ sơ `PTTN` bằng trung bình từng trục để giữ nguyên hệ chỉ số.
- Điều hướng, tìm nhanh, nút bốc ngẫu nhiên, CSV mẫu và tài liệu đã được đồng bộ theo cấu trúc mới.
- Nội dung hiển thị gọi nhận diện R.E.S.D là **bốn viên đá**; không gọi bốn ban là các hành tinh.

## 2026-09-17 — 17 trang, CSV tự nạp từ host, gỡ so sánh trang chủ

> Bản ghi này mô tả **trạng thái hiện hành** của dự án và thay thế các con số đã cũ (ví dụ "8 trang") ở mục ghi ngày 2026-09-17 phía dưới. Mục cũ được giữ nguyên làm lịch sử, không sửa lại.

### Phạm vi hoàn thành tính tới thời điểm này

- **Đối chiếu với PDF giới thiệu Đoàn - Hội khoa**: sửa lại cách hiểu mảng **KT (Kỹ thuật)** — không phải hậu cần/âm thanh/ánh sáng/sân khấu như bản nháp đầu, mà là quản lý/phát triển sản phẩm số & website Đoàn - Hội, training học phần cơ sở ngành, và kỹ thuật chương trình. Đã cập nhật mission/duties/programs/must/plus của KT và chương trình nổi bật thật của các mảng khác (Hội diễn UEH League, Hội trại Việt, Liên Xuân, Mùa hè xanh, Hội thi rèn nghề, BIT Genesis Research Award...).
- **Tách 9 mảng thành 9 trang riêng** (trước đây là anchor `#id` trong trang ban): viết `build_mang()` trong `tools/build_pages.py`, `build_ban()` giờ chỉ còn thẻ tổng quan dẫn sang trang mảng. Tổng cộng site có **17 trang tĩnh**. `navbar()`, `mang_slug()`, bảng lệnh `Ctrl+K` trong `js/site.js`, và liên kết kết quả trong `js/test-dinh-huong.js` đều trỏ đúng sang 17 trang này.
- **Bài kiểm tra định hướng có thêm khả năng đọc CSV**: hai file `assets/data/cau-hoi-mau.csv` (24 câu) và `assets/data/ho-so-mang-mau.csv` (hồ sơ % của 9 mảng) chứa dữ liệu ở định dạng CSV có BOM (Excel tiếng Việt mở không lỗi dấu). Màn hình kết quả có thêm nút **"Tải kết quả (CSV)"**, xuất đầy đủ câu hỏi + câu trả lời + % phù hợp từng ban/mảng theo đúng khuôn cột, mở được ngay bằng Excel như một "phiếu điểm" kiểu MBTI/DISC.
- **Gỡ giao diện nạp CSV công khai**: bản đầu của tính năng CSV có một khối `<details>` "Dành cho Ban chuyên môn" hiển thị ngay trên trang test, cho phép bất kỳ khách nào cũng thấy nút tải mẫu và nút nạp file. Vì đây là thao tác quản trị nội bộ, khối này đã bị **gỡ hoàn toàn khỏi `tools/build_pages.py`**. Thay vào đó, `js/test-dinh-huong.js` tự `fetch()` hai file CSV kể trên ngay khi tải trang test (có timeout, có try/catch), áp dụng nếu đọc được và hợp lệ, và **lặng lẽ dùng bộ mặc định nhúng sẵn** nếu không (offline, mở qua `file://`, thiếu file, sai định dạng...) — người làm bài không thấy bất kỳ công cụ nạp file hay lỗi kỹ thuật nào. Ban chuyên môn cập nhật nội dung bằng cách ghi đè thẳng hai file CSV đó trên host.
- **`programs_grid()` viết lại**: khung ảnh khổ dọc cho mỗi chương trình nổi bật, tên chương trình luôn hiện, hover/focus mới lộ mô tả (`program-desc`). Chưa có ảnh thật nên khung hiện chữ cái đầu (`program_initials()`) kèm nhãn "Ảnh minh hoạ · chờ cập nhật" — không bịa ảnh.
- **Gỡ khối so sánh "khác gì web khoa" ở trang chủ** để tránh lộ liễu; sự khác biệt giờ hiện qua nội dung (một chương trình cụ thể, không có bản tin/thư viện ảnh) thay vì một panel đối chiếu trực diện.
- **Thêm "Bốc ngẫu nhiên một mảng"** ở `gioi-thieu.html` (`js/site.js`, dùng lại bảng `INDEX` sẵn có của bảng lệnh Ctrl+K) cho người đọc chưa biết bắt đầu từ đâu.
- `css/style.css` được đánh số lại theo khối mới (hiện có 18 khối, gồm cả khối `.program-card`/`.csv-tools` mới).

### Đã kiểm tra

- `python3 tools/build_pages.py` chạy sạch, sinh đúng 17 file `.html`.
- `node --check` sạch trên cả 4 file JS (`config.js`, `main.js`, `site.js`, `test-dinh-huong.js`).
- Kiểm tra tự động toàn bộ HTML bằng `html.parser`: không thẻ mở/đóng lệch ở 17 trang, không trùng `id` trong cùng trang, không liên kết nội bộ (file cục bộ) hỏng, mọi anchor `href="...#id"` đều trỏ tới `id` có thật.
- Render thử 5 trang tiêu biểu (trang chủ, trang ban, trang mảng, trang test, trang giới thiệu) bằng Playwright/Chromium: không có lỗi JavaScript nghiêm trọng; các lỗi console ghi nhận chỉ là do môi trường kiểm thử chặn domain CDN ngoài (Bootstrap/Google Fonts), không phải lỗi của mã nguồn.
- Tài liệu (`README.md`, `AGENTS.md`, `docs/project-brief.md`, `docs/content-guide.md`) đã đồng bộ lại theo đúng trạng thái 17 trang và cơ chế CSV tự nạp từ host ở trên.

### Còn nợ lại

- **`css/style.css` còn khối CSS chết**: `.csv-tools`, `.csv-field`, `.csv-upload`, `.csv-status`, và `details.panel` được viết cho giao diện nạp CSV công khai đã bị gỡ khỏi HTML — các quy tắc CSS này giờ không còn phần tử nào dùng tới nhưng vẫn còn trong file. Không ảnh hưởng người dùng, nên dọn ở phiên kế tiếp.
- Chưa chụp lại ảnh màn hình sau khi gỡ khối CSV công khai để xác nhận bằng mắt trang test hiển thị gọn, và chưa kiểm bằng tay việc `fetch()` CSV hoạt động đúng khi chạy qua `http://localhost` (mới kiểm tra bằng đọc code, chưa chạy tay đổi nội dung CSV và tải lại trình duyệt).
- **Mốc 23/09/2026**, diễn giải mảng **DEP**, nhân sự/lời nhắn thật, ảnh thật cho chương trình nổi bật, và 3 liên kết rỗng còn lại trong `js/config.js` (`formEmbedUrl`, `formOpenUrl`, `bookletUrl`, `contactEmail`) — tất cả vẫn đang chờ Ban chuyên môn xác nhận như các mục ghi ở dưới.

## 2026-09-17 — Dựng trọn bộ cổng thông tin, bài kiểm tra định hướng và menu 3 cấp

### Phạm vi hoàn thành

Từ trạng thái chỉ có Navbar và Hero, dự án nay có **8 trang tĩnh** chạy được ngay khi mở bằng trình duyệt:

| Trang | Vai trò |
| --- | --- |
| `index.html` | Trang chủ cổng thông tin R.E.S.D |
| `gioi-thieu.html` | Ý tưởng chương trình, giá trị nhận được, bảng so sánh 4 ban |
| `ban-to-chuc-xay-dung.html` | Sapphire · TC-XD, gồm 3 mảng NS, ĐN, KT |
| `ban-phong-trao-tinh-nguyen.html` | Diamond · PT-TN, gồm 2 mảng PT, TN |
| `ban-truyen-thong.html` | Ruby · TT, gồm 2 mảng CONTENT, DEP |
| `ban-hoc-tap-nckh.html` | Emerald · HT-NCKH, gồm 2 mảng HT, NCKH |
| `test-dinh-huong.html` | Bài kiểm tra định hướng + form đăng ký nhúng |
| `lien-he.html` | Kênh liên hệ và FAQ |

### Điểm sửa so với bản cũ

- **Mỗi ban chuyên môn nay có một trang riêng** thay vì gộp chung thành section trong `index.html`. Mỗi trang đều có đủ 5 khối bắt buộc: sứ mệnh, nhiệm vụ, chương trình nổi bật, lời nhắn nhủ thành viên, yêu cầu - kỹ năng.
- **Bài kiểm tra định hướng tách thành trang riêng**, viết lại theo mô hình 4 trục kiểu MBTI thay vì vài câu hỏi vui.
- **Trang chủ được viết lại để ra dáng cổng thông tin chương trình**, không lặp nội dung của website Đoàn - Hội khoa. Trang chủ nay là điểm điều phối: đếm ngược sự kiện, lộ trình 4 bước, hộ chiếu vũ trụ, 4 cửa vào ban, CTA test và booklet. Có hẳn một panel giải thích "Cổng này khác gì trang của Đoàn - Hội khoa" để người đọc không nhầm lẫn hai kênh.
- **Navbar nâng lên 3 cấp.** Bootstrap 5 chỉ hỗ trợ dropdown 2 cấp nên cấp 3 được tự xử lý trong `js/site.js`: mở ngang từ 992px trở lên, thu thành accordion ở mobile, đóng được bằng Escape. Tổng cộng 4 nhóm ban và 13 mục con.

### Cấu trúc mảng

| Ban | Đá quý | Mảng |
| --- | --- | --- |
| Tổ chức - Xây dựng | Sapphire `#6fa8ff` | NS `#ns`, ĐN `#dn`, KT `#kt` |
| Phong trào - Tình nguyện | Diamond `#b9f6ff` | PT `#pt`, TN `#tn` |
| Truyền thông | Ruby `#ff799b` | CONTENT `#content`, DEP `#dep` |
| Học tập - NCKH | Emerald `#6ce8ae` | HT `#ht`, NCKH `#nckh` |

Mảng được dựng thành section sâu trong trang ban (anchor `#ns`, `#dn`...) chứ không tách thành 9 trang rời. Lý do: nội dung mỗi mảng khoảng 1 màn hình, tách ra sẽ khiến người đọc phải quay lại quá nhiều lần; menu cấp 3 trỏ thẳng tới anchor nên trải nghiệm vẫn như trang riêng.

### Bài kiểm tra định hướng

- **4 trục, 24 câu** (6 câu mỗi trục, hướng thuận/nghịch cân bằng 3/3), thang Likert 5 mức từ +2 đến −2.
  1. Nhịp làm việc: **P** chuẩn bị trước ↔ **I** ứng biến
  2. Nguồn năng lượng: **C** làm cùng người ↔ **F** làm sâu một mình
  3. Cách tạo giá trị: **E** biểu đạt ↔ **A** phân tích
  4. Vị trí trong đội: **S** tiền tuyến ↔ **O** vận hành
- Cho ra **mã 4 chữ** và **16 nhóm tính cách**, mỗi nhóm có tên gọi, một câu mô tả, 3 thế mạnh và 1 điều nên rèn.
- **Gợi ý mảng phù hợp**: 9 mảng được mô tả bằng vector 4 chiều; độ hợp tính bằng **độ tương đồng cosine** quy về thang 0-100. Điểm của ban = `0.7 × max(mảng) + 0.3 × trung bình(mảng)`.
- **Render ảnh kết quả bằng canvas 1080×1350** để người tham gia tải về và chia sẻ lên story. Ảnh gồm nền sao, quầng màu theo ban phù hợp nhất, mã 4 chữ, tên nhóm, 4 thanh trục và ban đứng đầu. Tên file `resd-dinh-huong-<MÃ>.png`.
- **Form đăng ký nhúng ngay dưới kết quả** qua iframe, kèm nút mở form ở tab mới và nút điều hướng tới booklet.
- Hỗ trợ bàn phím: phím 1-5 chọn đáp án, mũi tên trái/phải chuyển câu. Kết quả lưu localStorage (`resd.test.v1`) để quay lại vẫn còn.
- Có cảnh báo khi người dùng trả lời lưng chừng gần hết, vì khi đó mã 4 chữ không phản ánh điều gì.

### Chức năng tĩnh bổ sung

- **Hộ chiếu vũ trụ** (`resd.passport.v1`): 8 trạm tương ứng 8 trang, tự đóng dấu khi ghé thăm, hiển thị vòng tròn tiến độ SVG và nút xoá.
- **Bảng lệnh tìm nhanh** `Ctrl/⌘ + K`: 17 mục gồm 4 trang chính, 4 ban và 9 mảng. Tìm được **không dấu** (gõ "nhan su" ra Nhân sự, "thiet ke" ra DEP).
- **Đếm ngược** tới mốc sự kiện khai báo trong `js/config.js`.
- Thanh tiến độ đọc, nút về đầu trang, hiệu ứng `.reveal` theo IntersectionObserver.
- **Bảng so sánh 4 ban** trong `gioi-thieu.html` theo 5 tiêu chí, và **FAQ 6 câu** trong `lien-he.html`.
- Toàn site có `@media print` để in hoặc lưu PDF.

### Kiến trúc mới

- `js/config.js` gom mọi liên kết ngoài và mốc thời gian vào một chỗ. Link để rỗng thì giao diện tự hiện trạng thái "đang chờ cập nhật" thay vì link hỏng.
- `js/site.js` chứa hành vi dùng chung. Thứ tự nạp: `config.js → site.js → (main.js | test-dinh-huong.js)`.
- `css/style.css` viết lại thành 17 khối đánh số. Biến `--gem` đổi màu theo từng trang ban, nhờ vậy 4 trang ban dùng chung một bộ CSS.
- `tools/build_pages.py` là bộ sinh trang. **Toàn bộ nội dung chữ nằm trong biến `BANS` của file này.** Sửa nội dung ở đó rồi chạy lại `python3 tools/build_pages.py`; sửa thẳng file `.html` sẽ bị ghi đè ở lần chạy sau. Website chạy được mà không cần Python, script chỉ dùng khi cần cập nhật nội dung.

### Lỗi đã phát hiện và sửa

1. **Thuật toán chấm điểm thiên vị.** Công thức khoảng cách có trọng số ban đầu ưu ái mảng có hồ sơ "nhạt": trên 20.000 bộ trả lời ngẫu nhiên, HT-NCKH thắng 58% còn TC-XD chỉ 1,2%. Đã thay bằng độ tương đồng cosine và tách lại hồ sơ NS, TN. Phân bố sau khi sửa: TT 29,7% · HT-NCKH 27,3% · PT-TN 24,7% · TC-XD 18,3%.
2. **Thanh tiến độ không chạm 100%** khi trả lời câu cuối. Đã tách `updateProgress()` và gọi ngay trong handler `change`.
3. **Lỗi canvas làm hỏng cả màn hình kết quả.** Đã bọc `drawCard` trong try/catch, thêm guard cho `getContext`, và tách `safePaint` cho nhánh `document.fonts.ready`. Nếu canvas lỗi thì chỉ ẩn khu ảnh và nút tải, phần kết quả chữ vẫn hiện.

### Kết quả kiểm thử

- **Cấu trúc tĩnh**: 8/8 trang khớp thẻ đóng mở, không trùng `id`, 0 liên kết nội bộ hỏng, mọi tài nguyên `css/ js/ assets/` đều tồn tại. `node --check` sạch trên cả 4 file JS.
- **Thuật toán**: đúng 6 câu mỗi trục và 3/3 hướng; 9/9 mảng cho kết quả đúng khi người trả lời khớp hoàn hảo hồ sơ mảng đó; cả 16/16 mã đều xuất hiện và đều có dữ liệu mô tả; điểm luôn nằm trong 0-100.
- **DOM thật bằng jsdom**: đạt toàn bộ. Đã kiểm hộ chiếu, đếm ngược, vô hiệu hoá link rỗng, menu cấp 3 (4 nhóm / 13 mục), số mảng đúng 3/2/2/2 và mọi mảng đủ 5 khối bắt buộc, luồng test intro → quiz → result, mã khớp `^[PI][CF][EA][SO]$`, fallback form, lưu và xoá localStorage, tải PNG, bảng lệnh tìm không dấu.
- Một quan sát thú vị: chọn "Rất đúng với tôi" cho cả 24 câu thì mọi trục triệt tiêu về 0 và hệ thống hiện cảnh báo lưng chừng. Đây là bằng chứng thang đo cân bằng chống được thiên lệch đồng ý.

### Tài liệu

- `README.md` viết lại: cấu trúc 8 trang, cách điền `js/config.js`, cảnh báo không sửa thẳng HTML, danh sách kiểm tra thủ công theo 5 nhóm (bố cục, bàn phím, bài test, liên kết, in).
- `docs/content-guide.md` là file mới, viết cho người không biết lập trình: 5 việc cần làm (điền link, thêm nhân sự, thay lời nhắn, sửa nội dung, thêm ảnh), kèm bảng giải nghĩa từng khoá trong `tools/build_pages.py`.
- `AGENTS.md` và `docs/project-brief.md` đã đồng bộ với thực tế mã nguồn.

### Sửa thêm khi viết tài liệu

Nhãn `Nội dung mẫu · chờ duyệt` trước đây gắn cố định vào tiêu đề khối lời nhắn, nên kể cả khi Ban chuyên môn thay hết bằng phát ngôn thật thì nhãn vẫn còn. Đã thay bằng hàm `draft_flag(voices)`: nhãn chỉ hiện khi còn ít nhất một lời nhắn mang tên giữ chỗ `Chờ cập nhật`. Ban chuyên môn không phải đi xoá nhãn thủ công nữa. Đã kiểm ba trường hợp: còn mẫu → có nhãn, tên thật hết → không nhãn, trộn lẫn → vẫn có nhãn.

### Thay đổi quy tắc đã ghi nhận

- **Gỡ lệnh cấm iframe và Google Form** trong `AGENTS.md` và `docs/project-brief.md`, theo yêu cầu nhúng form đăng ký ngay sau bài test. Đây là đảo ngược có chủ đích so với quyết định cũ.
- **Thêm Google Fonts** (Be Vietnam Pro cho tiếng Việt, Space Grotesk cho số và mã latin). Be Vietnam Pro có bộ dấu tiếng Việt đầy đủ, tránh lỗi dấu vỡ trên font hệ thống.

### Còn chờ xác nhận

- **Mốc 23/09/2026** lấy từ kế hoạch mục 3.2, đang ghi kèm chú thích "dự kiến, chờ xác nhận".
- **Diễn giải tên mảng**: "KT" đang hiểu là **Kỹ thuật** (hậu cần, âm thanh, ánh sáng, sân khấu) và "DEP" là **Thiết kế - Hình ảnh**. Cần Ban chuyên môn duyệt lại.
- **Nhân sự và lời nhắn nhủ**: không bịa tên người thật. Thẻ nhân sự để trống tên với nhãn "Đang cập nhật" kèm chức danh; lời nhắn là nội dung mẫu gắn nhãn "Nội dung mẫu · chờ duyệt". Cách điền xem `docs/content-guide.md`.
- **Liên kết rỗng** trong `js/config.js`: `formEmbedUrl`, `formOpenUrl`, `bookletUrl`, `contactEmail`.

## Tiếp theo

- Ban Truyền thông điền 4 liên kết còn rỗng trong `js/config.js`.
- Các ban gửi danh sách nhân sự và lời nhắn thật để thay nội dung mẫu.
- Duyệt diễn giải KT và DEP, duyệt mốc 23/09/2026.
- Chạy danh sách kiểm tra thủ công trong README trên thiết bị thật trước ngày công bố.
- Bổ sung ảnh vào `assets/images/` khi có ảnh được duyệt.

## 2026-09-15 — Khởi tạo Navbar và Hero

- Website tĩnh: HTML, Bootstrap 5.3.8 qua jsDelivr CDN, CSS và JavaScript thuần; không cần build.
- Cấu trúc: `index.html`, `css/style.css`, `js/main.js`, `assets/images/`, `docs/`.
- Navbar thu gọn dưới 992px, hỗ trợ đóng bằng Escape và khi chọn liên kết.
- Hero nền không gian và bốn viên đá được dựng bằng CSS; hỗ trợ giảm chuyển động.
- Nút "Khám phá bốn viên đá" dẫn đến khối nhận diện trong Hero và kích hoạt ánh sáng ngắn.
- Các mục điều hướng đến section chưa có được vô hiệu hóa, chưa tạo section còn lại.
- Slogan và lời giới thiệu trong Hero là bản nháp cần duyệt. Chưa có booklet trong workspace để đối chiếu nhận diện chính thức.
- Chưa thêm đăng ký, form, iframe, backend hoặc database; không sử dụng lịch tuyển.
- Đã kiểm tra tĩnh: đích liên kết nội bộ hợp lệ, file cục bộ tồn tại, chỉ có một section Hero và không có form/iframe.
- Chưa kiểm thử trực quan trong trình duyệt hoặc thực thi JavaScript; môi trường chưa có Node.js trên PATH.
