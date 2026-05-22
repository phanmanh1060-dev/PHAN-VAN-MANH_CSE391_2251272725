# PHẦN A
## Câu A1
```
|Kích thước | < 768px | 768px - 991px | >= 992px |
|-----------|---------|---------------|----------|
| Số cột | 12 | 6 | 3 |
| Box layout | 4 hàng, mỗi hàng 1 box | 2 hàng, mỗi hàng 2 box | 1 hàng, 4 box |
```
```
┌────────────────────────────┐
|          Mobile            |
├────────────────────────────┤
|          [ box 1 ]         |
|          [ box 2 ]         |
|          [ box 3 ]         |
|          [ box 4 ]         |
└────────────────────────────┘
```
```
┌────────────────────────────┐
|          Tablet            |
├────────────────────────────┤
|    [ box 1 ] [ box 2 ]     |
|    [ box 3 ] [ box 4 ]     |
└────────────────────────────┘
```
```
┌───────────────────────────────────────────────┐
|                    Desktop                    |
├───────────────────────────────────────────────┤
|    [ box 1 ] [ box 2 ] [ box 3 ] [ box 4 ]    |
└───────────────────────────────────────────────┘
```
- `col-md-6`: áp dụng cho màn hình >= 768px, box chiếm 6/12 cột = 50% chiều ngang -> 2 box 1 hàng.
- Không viết `col-sm-12` vì bootstrap dùng nguyên tắc mobile-first -> `col-12` áp dụng cho tất cả kích thước nhỏ hơn md => < 768px tự động dùng `col-12`.
## Câu A2
1. Giải thích class d-none d-md-block. Element này hiển thị khi nào, ẩn khi nào?
    - `d-none` -> ẩn element ở tất cả các kích thước
    - `d-md-block` -> hiển thị dạng block khi màn hình >= 768px
2. Liệt kê 5 spacing utilities (margin/padding) và giải thích.
    - `mt-3`: margin-top = 16px / 1rem -> Tạo khoảng cách phía trên = mức 3
    - `px-4`: padding trái + phải = cấp 4 -> làm nội dung rộng ra 2 bên
    - `mb-auto`: margin-bottom = auto -> Đẩy phần tử xuống dưới cùng
    - `py-2`: padding trên + dưới = cấp 2 -> Đẩy chiều cao bên trong
    - `py-5`: margin-left (start) = cấp 5 -> Đẩy phần tử sang phải
3. Sự khác nhau giữa .container, .container-fluid, .container-md?
    - `.container`: co giãn theo từng nấc -> độ rộng tối đa cố định cho từng loại màn hình -> <567px thì bị tràn ra 100%
    - `.container-fluid`: luôn tràn viền -> Luôn luôn chiếm $100\%$ chiều rộng của màn hình ở mọi kích thước, không phân biệt điện thoại hay máy tính lớn.
    - `container-md`: tràn viền ở màn hình nhỏ, cố định ở màn hình lớn -> Nó sẽ tràn màn hình 100\% ở các kích thước nhỏ < 768px. Nhưng bắt đầu từ màn hình >= 768px, nó sẽ hoạt động giống hệt như .container (bị giới hạn max-width).
# PHẦN C
## Câu C1
1. Bạn muốn đổi màu $primary từ xanh mặc định sang #E63946. Giải thích quy trình (cần công cụ gì, modify file nào).
    - Công cụ: Mã nguồn Bootstrap SASS và trình biên dịch SASS
    - Tạo 1 file với biến của riêng mình, đặt tên ví dụ như style.scss -> trình biên dịch SASS quét và tạo ra file style.css -> gắn link file vừa tạo đc = trình biên dịch vào html.
2. Tại sao KHÔNG nên override trực tiếp .btn-primary { background: red; } mà nên dùng SASS variables?
    - Khi override trực tiếp chiếc nút đổi sang đỏ nhưng hiệu ứng phụ biến mất (:hover, border-color,...) và bỏ sót nhiều utility Classes khác
    - Dùng SASS: đổi 1 chỗ sẽ đổi cả hệ thống, đồng bộ UI, dễ maintain.
## Câu C2
1. Tạo 1 navbar responsive + 1 product card
**Navbar responsive**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.menu {
  display: flex;
  gap: 15px;
}

@media (max-width: 768px) {
  .menu {
    display: none;
  }
}
```
**Product card**
```css
.card {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
}

.card img {
  width: 100%;
}
```
2. So sánh
* Số dòng CSS
    - Khoảng >= 20 dòng
* Thời gian phát triển
    - CSS thuần -> lâu
    - Bootstrap -> Nhanh
* Khả năng tùy biến
    - CSS thuần -> vô hạn
    - Bootstrap -> Bị giới hạn
* Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?
    - NÊN khi dự án cần tiến độ nhanh, demo, admin dashboard, không cần design quá custom.
    - KHÔNG NÊN dùng khi làm trang web thương hiệu, thiết kế riêng.