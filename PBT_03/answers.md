# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — 3 Cách nhúng CSS
1. **CSS Nội tuyến:** Đây là cách viết mã CSS trực tiếp bên trong thuộc tính style của một thẻ HTML cụ thể.
  - Ví dụ mã code:
    ```<p style="color: blue; font-weight: bold;">Đây là đoạn văn màu xanh.</p>```
  - Ưu điểm: Áp dụng nhanh, có độ ưu tiên cao nhất, hữu ích khi muốn thay đổi nhanh một phần tử để kiểm tra (debug).
  - Nhược điểm: Làm code HTML bị rối, khó bảo trì khi dự án lớn dần, không thể tái sử dụng style cho các thẻ khác.
  - Khi nào nên dùng: Khi bạn chỉ cần định dạng cho duy nhất một phần tử đặc biệt hoặc dùng để test nhanh kết quả.
2. **CSS Nội bộ:** Cách này đặt toàn bộ mã CSS bên trong cặp thẻ ```<style>```, thường nằm trong phần ```<head>``` của trang HTML.
  - Ví dụ mã code:
    ```
    <head>
    <style>
        p {
            font-size: 18px;
            line-height: 1.5;
        }
    </style>
    </head>
    ```
  - Ưu điểm: Quản lý tập trung style của một trang web tại một nơi, không cần tạo file riêng.
  - Nhược điểm: Chỉ có tác dụng trên trang hiện tại. Nếu website có nhiều trang, bạn phải copy code CSS sang từng file HTML rất mất thời gian.
  - Khi nào nên dùng: Dùng cho các trang web đơn (Single Page) hoặc khi làm các bài tập nhỏ trên lớp.
3. **CSS Bên ngoài:** Đây là cách chuyên nghiệp nhất: Viết CSS vào một file riêng biệt có đuôi .css và kết nối với HTML bằng thẻ ```<link>```.
  - Ví dụ mã code:
      ```html
    <!-- Trong file index.html -->
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    ```
    ```css
    /* Trong file style.css */
    .container { width: 100%; margin: 0 auto; }
    ```
  - Ưu điểm: Tách biệt hoàn toàn nội dung (HTML) và giao diện (CSS). Giúp code sạch sẽ, dễ quản lý và có thể áp dụng một file CSS cho hàng nghìn trang web khác nhau. Tối ưu tốc độ tải trang nhờ bộ nhớ đệm trình duyệt.
  - Nhược điểm: Cần thêm một yêu cầu (request) tải file từ máy chủ (tuy nhiên ảnh hưởng này là cực nhỏ).
  - Khi nào nên dùng: Luôn luôn sử dụng cho các dự án thực tế và chuyên nghiệp.
**Câu hỏi thêm**
Nếu cùng một phần tử (ví dụ: thẻ ```<h1>```) bị cả 3 cách trên "ép" đổi màu khác nhau, thứ tự ưu tiên sẽ như sau:
- VÔ ĐỊCH: CSS Nội tuyến (Inline CSS) – Luôn thắng vì nó nằm "sát" phần tử nhất.
- HẠNG NHÌ: CSS Nội bộ & CSS Bên ngoài – Hai cách này có độ ưu tiên ngang nhau.
Giải thích tại sao: Trong CSS, có một khái niệm gọi là Độ ưu tiên (Specificity) và Thứ tự xuất hiện:
- Về khoảng cách: Trình duyệt coi CSS Nội tuyến là chỉ thị trực tiếp nhất nên ưu tiên nó hàng đầu.
- Về quy tắc "Thác nước" (Cascading): Đối với CSS Nội bộ và Bên ngoài, trình duyệt đọc code từ trên xuống dưới. Quy tắc nào được đọc sau cùng sẽ đè lên quy tắc trước đó.
Ví dụ: Nếu bạn đặt thẻ ```<link>``` (Bên ngoài) ở trên thẻ <style> (Nội bộ), thì CSS Nội bộ sẽ thắng vì nó được trình duyệt đọc sau.

## Câu A2 (8đ) — Bộ chọn CSS — Kết quả mong đợi
Dự đoán kết quả (Phân tích bộ chọn):
1. h1
- Chọn: Văn bản ShopTLU.
- Giải thích: Chọn tất cả các thẻ ```<h1>``` có trong trang.
2. price
- Chọn: 25.990.000đ và 45.990.000đ.
- Giải thích: Chọn tất cả các phần tử có class="price". Ở đây có 2 thẻ <p> thỏa mãn.
3. #app header
- Chọn: Toàn bộ khối header (bao gồm thẻ h1 và nav).
- Giải thích: Chọn thẻ header nằm bên trong phần tử có id="app".
4. nav a:first-child
- Chọn: Văn bản Home.
- Giải thích: Chọn thẻ ```<a>``` đầu tiên nằm bên trong thẻ nav.
5. product.featured h2
- Chọn: Văn bản MacBook Pro.
- Giải thích: Chọn thẻ ```<h2>``` nằm bên trong phần tử có đồng thời cả hai class là product và featured.
6. article > p
- Chọn: Tất cả các thẻ ```<p>``` là con trực tiếp của article (Tổng cộng 4 thẻ: 2 thẻ giá và 2 thẻ mô tả).
- Giải thích: Dấu > chỉ chọn con trực tiếp, không chọn cháu chắt.
7. a[href="/"]
- Chọn: Văn bản Home.
- Giải thích: Bộ chọn thuộc tính, chọn thẻ <a> có đường dẫn chính xác là /.
8. top-bar.dark h1
- Chọn: Văn bản ShopTLU.
- Giải thích: Chọn thẻ h1 nằm trong phần tử có cả 2 class top-bar và dark.
**Ảnh àm hình**
<img width="1802" height="587" alt="Screenshot 2026-05-07 105922" src="https://github.com/user-attachments/assets/21ab9411-c6ce-4437-9916-e337b9de6295" />

## Câu A3 (7đ) — Box Model — Tính toán kích thước
**Trường hợp 1: content-box (Mặc định)**
- Trong chế độ này, width chỉ tính cho phần sản phẩm (content). Padding và Border sẽ đắp thêm vào bên ngoài.
    + Chiều rộng hiển thị (Visible Width): 400(width) + 20*2(padding) + 5*2(border) = 450px
    + Không gian chiếm trên trang (Total Space):450(chiều rộng hiển thị) + 10*2(margin) = 470px

**Trường hợp 2: border-box**
- Trong chế độ này, width là con số cuối cùng của chiếc hộp (bao gồm cả Border và Padding). Nội dung bên trong sẽ tự co lại.
    + Chiều rộng hiển thị (Visible Width): 400px
    + Kích thước content thực tế: 400 - 20*2(padding) - 5*2(border) = 350px
    + Không gian chiếm trên trang (Total Space): 400(chiều rộng hiển thị) + 10*2(margin) = 420px

**Trường hợp 3: Margin Collapse**
- Khoảng cách giữa box-a và box-b: 40px
- Giải thích: Trong CSS, khi hai phần tử dạng khối (block) xếp chồng lên nhau, các lề dọc (vertical margins) sẽ bị "hòa tan" vào nhau thay vì cộng dồn. Trình duyệt sẽ so sánh và chọn giá trị lớn nhất (trong trường hợp này là 40px > 25px). Điều này giúp tránh việc tạo ra những khoảng trắng quá lớn giữa các đoạn văn bản.

**Nâng cao: Margin âm.**
- Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px:
    + Khoảng cách: 30px
    + Cách tính: Khi có sự xuất hiện của số âm trong hiện tượng collapse, công thức sẽ là:{Giá trị dương lớn nhất} + {Giá trị âm nhỏ nhất}
    + Ở đây: 40px + (-10px) = 30px.
    + Góc nhìn thực tế: Margin âm thường được dùng để kéo một phần tử lại gần (hoặc đè lên) phần tử khác, cực kỳ hữu ích khi bạn muốn tạo các hiệu ứng thiết kế phá cách!

## Câu A4 (5đ) — Tính đặc hiệu (Độ ưu tiên)
**1. Tính toán điểm đặc hiệu (Specificity Score)**
- Chúng ta dùng hệ thức (a, b, c) để tính điểm:
  + a (ID): Các lựa chọn dùng #id.
  + b (Class/Attribute/Pseudo-class): Các lựa chọn dùng .class, [type], :hover.
  + c (Element): Các lựa chọn dùng thẻ như p, div, h1.
  
**2. Element sẽ có màu gì? Giải thích**
- Phần tử sẽ có màu đỏ
- **Giải thích:** Trình duyệt so sánh điểm từ trái sang phải. Rule C có 1 điểm ở cột ID, trong khi các quy tắc khác đều bằng 0. Trong CSS, 1 điểm ID "nặng" hơn bất kỳ số lượng Class hay Element nào cộng lại (không bao giờ có chuyện 11 thẻ Class thắng được 1 ID). Do đó, Rule C thắng tuyệt đối.

**3. Nếu thêm ```<p class="price" id="main-price" style="color: orange;">```, phần tử có màu gì?**
- Phần tử sẽ có màu cam
- **Giải thích:** Inline style (viết trực tiếp vào thuộc tính style="" của HTML) có độ ưu tiên cao hơn tất cả các bộ chọn trong file CSS bên ngoài. Nếu coi Specificity là (a, b, c) thì Inline style nằm ở cột thứ tư bên trái: (1, 0, 0, 0).

**4. Nếu thêm Quy tắc A !important, phần tử có màu gì? Tại sao?**
- Phần tử sẽ có màu đen
- **Giải thích:** !important là "nút bấm hạt nhân" trong CSS. Nó phá vỡ mọi quy tắc tính điểm thông thường và ép trình duyệt phải ưu tiên thuộc tính đó. Dù Rule A có điểm đặc hiệu thấp nhất (0,0,1), nhưng khi có !important, nó sẽ đè bẹp cả Inline style và ID.

# PHẦN B — THỰC HÀNH CODE (55 điểm)
## Bài B2 (20đ) — Box Model Lab
- Phần 1 — Chứng minh Box Model:
  + Hộp 1 (content-box): chiều rộng thực tế = 350px (Đo từ DevTools).Cách tính: 300(width) + 20*2(padding) + 5*2 (border) = 350px.
     <img width="1859" height="902" alt="Screenshot 2026-05-10 213250" src="https://github.com/user-attachments/assets/146efab1-3c4d-4a96-b5fb-502c574551ad" />
  + Hộp 2 (border-box): chiều rộng thực tế = 300px (Đo từ DevTools).Cách tính: Trình duyệt tự động co phần content lại còn 250px để tổng độ rộng luôn là 300px.
    <img width="1841" height="889" alt="Screenshot 2026-05-10 213352" src="https://github.com/user-attachments/assets/93e35222-faba-433b-988d-7376e8000bd0" />
  + Giải thích sự khác biệt: content-box chỉ áp dụng kích thước lên phần nội dung, khiến hộp bị phình to khi thêm padding/border. Trong khi đó, border-box bao gồm cả padding và border vào trong kích thước đã định sẵn, giúp kiểm soát bố cục chính xác hơn.
  
-Phần 2 — Bố cục 3 cột:
  + Khi sử dụng border-box: Tổng chiều rộng là 250 + 500 + 250 = 1000px. Cả 3 cột nằm thẳng hàng hoàn hảo.
    <img width="1828" height="859" alt="Screenshot 2026-05-10 213721" src="https://github.com/user-attachments/assets/251c4321-2053-4e8c-a838-8229666ace45" />
  + Nếu KHÔNG sử dụng border-box: Tổng chiều rộng sẽ bị đẩy lên thành 1000 + (15*2) + (20*2) + (15**2) = 1100px. Kết quả là cột bên phải sẽ bị đẩy xuống dòng dưới vì container chỉ rộng 1000px.
     <img width="1832" height="891" alt="Screenshot 2026-05-10 214224" src="https://github.com/user-attachments/assets/1809c48a-e37a-41f7-9c7a-d1fd2a50f604" />

## Bài B3 (15đ) — Specificity Battle
1. Liệt kê 10 rules + specificity score
   | STT | Rule | Specificity (a, b, c) | Màu sắc |
   | :--- | :----: | ---: |---: |
   | 1	| p	| 0, 0, 1	| Gray |
   | 2	| body p | 0, 0, 2 | Silver |
   | 3	| .text	| 0, 1, 0	| Blue |
   | 4	| p.text	| 0, 1, 1	| Green |
   | 5	| .text.highlight	| 0, 2, 0	| Orange |
   | 6	| p.text.highlight	| 0, 2, 1	| Purple |
   | 7	| #demo	| 1, 0, 0	| Brown |
   | 8	| p#demo	| 1, 0, 1	| Cyan |
   | 9	| #demo.text	| 1, 1, 0	| Magenta |
   | 10	| p#demo.text.highlight	| 1, 2, 1	| Crimson |

2. Element cuối cùng hiển thị màu gì? Tại sao?
- Màu cuối cùng hiển thị: Crimson (Đỏ thẫm).
- Tại sao? Vì quy tắc số 10 có điểm đặc hiệu cao nhất (1, 2, 1). Trong CSS, trình duyệt so sánh từ trái sang phải. Chỉ cần cột ID (số 1) lớn hơn là sẽ thắng, nếu bằng nhau mới xét đến cột Class và sau cùng là Element.

3. Chụp screenshot kết quả
  <img width="1835" height="898" alt="Screenshot 2026-05-11 083806" src="https://github.com/user-attachments/assets/ac40d4f4-d87c-4221-915b-3a8365e35381" />
 <img width="1846" height="893" alt="B3-2" src="https://github.com/user-attachments/assets/c7d8b752-5319-4135-b364-999e09afa81f" />

4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.
- Kết quả có đổi không? KHÔNG.
- Giải thích: Khi các quy tắc có điểm đặc hiệu khác nhau, trình duyệt luôn chọn quy tắc có điểm cao nhất bất kể nó nằm ở đầu hay cuối file CSS. Thứ tự viết code (ai viết sau người đó thắng) chỉ có tác dụng khi hai quy tắc có cùng số điểm đặc hiệu.

# PHẦN C — DEBUG & SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug CSS Layout
1. Tính chiều rộng thực tế của sidebar và content (content-box!)
   - Sidebar: 300(width) + 20*2(padding) + 1*2(border) = 342px
   - Content: 660(width) + 30*2 (padding) + 1*2 (border) = 722px

2. Giải thích tại sao layout bị vỡ
- Tổng chiều rộng thực tế của hai khối là: 342px + 722px = 1064px
- Trong khi đó, .container chỉ rộng 960px. Vì 1064 > 960, không gian không đủ chỗ chứa nên trình duyệt bắt buộc phải đẩy khối .content xuống dòng mới để hiển thị.

3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng)
   - Cách 1: Sử dụng border-box. Chúng ta giữ nguyên thông số mong muốn, chỉ cần đổi cách trình duyệt tính toán bằng box-sizing: border-box. Tuy nhiên, vì 300 + 660 = 960, vừa khít 100% chiều rộng, layout vẫn sẽ rất dễ vỡ nếu có sai lệch 1px. Tốt nhất ta nên để tổng width nhỏ hơn hoặc bằng 960.
   - Cách 2: Không dùng border-box (Tính toán thủ công). Ta phải trừ bớt phần Padding và Border ra khỏi width ban đầu: 
     + Width mới Sidebar: 300 - 40 (padding) - 2 (border) = 258px
     + Width mới Content: 660 - 60 (padding) - 2 (border) = 598px

## Câu C2 (10đ) — Cascade Puzzle
1. "Sản phẩm A" (h2) có font-size = ? và color = ?
- Font-size: 20px. Giải thích: Selector .card .title (0, 2, 0) nhắm trực tiếp vào phần tử này. Thuộc tính font-size: 14px của .container chỉ là sự kế thừa (mức ưu tiên thấp nhất), nên bị ghi đè bởi selector trực tiếp.
- Color: Green. Giải thích: Dù #featured .title có ID (1, 1, 0) rất mạnh và định màu đỏ, nhưng lớp .highlight sử dụng !important. Trong CSS, !important là "tối cao", nó đè bẹp mọi điểm đặc hiệu khác.

2. "Mô tả sản phẩm" (p trong card featured) có color = ?
- Color: Blue. Giải thích: Phần tử này có rule .card p { color: inherit; }. Từ khóa inherit buộc nó phải lấy màu từ cha trực tiếp của nó là .card. Mà .card có color: blue. Vì vậy, nó có màu xanh da trời.

3. "Sản phẩm B" (h2) có font-size = ? và color = ?
- Font-size: 20px. Giải thích: Tương tự sản phẩm A, selector .card .title (0, 2, 0) áp dụng cho tất cả tiêu đề trong card.
- Color: Blue. Giải thích: Ở đây không có !important hay ID nào can thiệp vào màu của tiêu đề B. Nó thừa hưởng màu từ cha là .card (màu xanh).

4. "Mô tả sản phẩm B" (p.highlight) có color = ?
- Color: Green. Giải thích: !important trong .highlight xuất hiện. Bất kể các quy tắc kế thừa hay selector khác, cứ có !important là nó thắng.
