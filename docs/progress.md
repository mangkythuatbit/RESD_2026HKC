# Tiến độ R.E.S.D

## 2026-09-15 — Khởi tạo Navbar và Hero

- Website tĩnh: HTML, Bootstrap 5.3.8 qua jsDelivr CDN, CSS và JavaScript thuần; không cần build.
- Cấu trúc: `index.html`, `css/style.css`, `js/main.js`, `assets/images/`, `docs/`.
- Navbar thu gọn dưới 992px, hỗ trợ đóng bằng Escape và khi chọn liên kết.
- Hero nền không gian, hành tinh và bốn đá quý được dựng bằng CSS; hỗ trợ giảm chuyển động.
- Nút “Khám phá hành tinh” dẫn đến hình hành tinh trong Hero và kích hoạt ánh sáng ngắn.
- Các mục điều hướng đến section chưa có được vô hiệu hóa, chưa tạo section còn lại.
- Slogan và lời giới thiệu trong Hero là bản nháp cần duyệt. Chưa có booklet trong workspace để đối chiếu nhận diện chính thức.
- Chưa thêm đăng ký, form, iframe, backend hoặc database; không sử dụng lịch tuyển.
- Đã kiểm tra tĩnh: đích liên kết nội bộ hợp lệ, file cục bộ tồn tại, chỉ có một section Hero và không có form/iframe. `git diff --check` không báo lỗi khoảng trắng trên file được Git theo dõi.
- Chưa kiểm thử trực quan trong trình duyệt hoặc thực thi JavaScript; môi trường chưa có Node.js trên PATH. Danh sách kiểm tra thủ công nằm trong README.

## Tiếp theo

- Duyệt Hero, slogan và nhận diện với booklet.
- Triển khai các section tiếp theo khi được yêu cầu, sau đó bật liên kết điều hướng tương ứng.
