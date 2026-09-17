# R.E.S.D — Đoàn - Hội BIT

Microsite giới thiệu R.E.S.D bằng HTML, Bootstrap 5 qua CDN, CSS và JavaScript thuần.

## Xem website

Mở `index.html` trong trình duyệt hoặc dùng Live Server trong VS Code. Cần kết nối Internet để tải Bootstrap từ CDN. Không cần cài dependency hoặc chạy build.

## Cấu trúc

```text
index.html            # Navbar và Hero
css/style.css         # Giao diện và responsive
js/main.js            # Điều hướng và tương tác Hero
assets/images/        # Dành cho hình ảnh được duyệt
docs/project-brief.md # Phạm vi và định hướng
docs/progress.md      # Tiến độ
```

Hiện chỉ triển khai Navbar và Hero. Menu của các phần chưa triển khai được vô hiệu hóa. Slogan là bản nháp chờ duyệt.

## Kiểm tra thủ công

- Xem ở chiều rộng 320px, 375px, 768px, 992px và 1440px; kiểm tra chữ, hành tinh và tràn ngang.
- Trên mobile: mở/đóng menu, chọn Trang chủ, nhấn Escape.
- Dùng Tab kiểm tra focus và liên kết bỏ qua điều hướng.
- Chọn “Khám phá hành tinh”; kiểm tra cuộn và hiệu ứng sáng, cả khi bật giảm chuyển động.

Tham khảo tích hợp CDN: https://getbootstrap.com/docs/5.3/getting-started/introduction/
