# PBT_01
# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 (5đ) — HTTP & Browser
### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render) là:
- *Nguồn tham chiếu: tuan_1_html5/01_introduction_html_universe.md/1.WEB HOẠT ĐỘNG NHƯ THẾ NÀO?*
- **B1. Gọi Shipper tìm địa chỉ (DNS Lookup):**
Trước khi gửi yêu cầu HTTP Request, trình duyệt cần biết địa chỉ chính xác của nhà hàng Shopee. Trình duyệt hỏi máy chủ DNS: "Shopee.vn ở địa chỉ IP nào?". DNS trả về cho trình duyệt một địa chỉ số (ví dụ: 111.222.33.44) để biết chính xác máy chủ đang nằm ở đâu trên Internet.
- **B2. Thiết lập kết nối an toàn (TCP/TLS Handshake):**
Vì Shopee dùng HTTPS, trình duyệt cần thiết lập một kết nối bảo mật trước khi truyền tin.
Hành động: Đây là bước "bắt tay" giữa Client và Server để thống nhất cách mã hóa dữ liệu, đảm bảo không ai có thể "ăn trộm" thông tin đơn hàng hay tài khoản của bạn trên đường đi.
- **B3. Gửi thực đơn yêu cầu (HTTP Request - GET):**
Bây giờ, "anh shipper" Internet sẽ mang yêu cầu của bạn đến đúng địa chỉ máy chủ Shopee.
Hành động: Trình duyệt gửi một lệnh GET / HTTP/1.1.
Ý nghĩa: "Cho tôi xem trang chủ của Shopee" (tương đương với việc yêu cầu xem menu tại nhà hàng).
- **B4. Nhà bếp xử lý và trả món (HTTP Response - 200 OK):**
Máy chủ Shopee (Server) tiếp nhận yêu cầu, vào "bếp" để chuẩn bị dữ liệu.
Hành động: Server gửi trả về một gói phản hồi kèm mã trạng thái 200 OK.
Kết quả: Gói hàng này chứa các tệp nguyên liệu thô: HTML (khung xương), CSS (màu sắc) và JavaScript (máy móc vận hành).
- **B5. Kiến trúc sư xây dựng giao diện (Browser Rendering):**
Đây là lúc trình duyệt của bạn làm việc cật lực để biến "nguyên liệu thô" thành trang web đẹp mắt:
Parse HTML: Dựng khung nhà (Tiêu đề, các nút mua sắm).
Parse CSS: Sơn màu cam đặc trưng của Shopee, chỉnh font chữ, sắp xếp các banner.
Execute JS: Chạy các hiệu ứng trượt banner, thông báo nhảy số trong giỏ hàng.
Paint: Cuối cùng, hình ảnh sản phẩm và giá cả hiện lên hoàn chỉnh trên màn hình của bạn.
### 2.
*Nguồn tham chiếu: tuan_1_html5/01_introduction_html_universe.md/4.3. Developer Tools (F12) — "Kính hiển vi" cho website
**Tab Network hiển thị danh sách tất cả các tài nguyên được tải xuống để hiển thị trang web. Các thông tin chính bao gồm:**
  - **Name:** Tên của file hoặc tài nguyên.
  - **Status:** Mã trạng thái HTTP (để biết yêu cầu thành công hay thất bại).
  - **Type:** Loại tài nguyên (ví dụ: document, script, stylesheet, png, fetch).
  - **Initiator:** Đối tượng hoặc dòng mã nào đã khởi tạo yêu cầu này.
  - **Size:** Kích thước của file được tải về.
  - **Time:** Tổng thời gian từ lúc gửi yêu cầu đến khi nhận được dữ liệu.
  - **Waterfall:** Biểu đồ trực quan về thời gian thực hiện của từng giai đoạn trong một yêu
    
**Mã trạng thái của yêu cầu đầu tiên và Tổng thời gian tải trang**
<img width="1907" height="1000" alt="Screenshot 2026-04-22 205659" src="https://github.com/user-attachments/assets/23adbd07-98f3-4fd2-bfc5-2f7f731ccab5" />

**Một yêu cầu trả về file CSS**
<img width="1919" height="968" alt="Screenshot 2026-04-22 210213" src="https://github.com/user-attachments/assets/dbbdf617-ef1f-4f83-82a3-4785d872e8f2" />

## Câu A2 (5đ) — HTML ngữ nghĩa
- Dựa trên nội dung Chương 04 bạn vừa soạn thảo, trang web này bị Google đánh giá SEO thấp vì nó đang gặp tình trạng "Div Soup" (Lạm dụng thẻ div).Google không thể hiểu được cấu trúc trang web nếu mọi thứ đều là <div>, vì thẻ <div> là một phần tử vô nghĩa (non-semantic), nó chỉ có tác dụng làm "hộp" chứa chứ không mô tả nội dung bên trong là gì.
**Các lỗi ngữ nghĩa:**
  - Sử dụng ```<div class="header">```, ```<div class="main">```, ```<div class="footer">```: Chương 04 nêu rõ: "Sử dụng đúng thẻ = Google hiểu nội dung = SEO tốt hơn". Thẻ ```<div>``` không cho Google biết đâu là phần đầu, phần chính hay phần chân trang.
  - Sử dụng ```<div class="menu">```: Menu cần nằm trong thẻ <nav> để trình duyệt và các công cụ đọc màn hình nhận diện đây là tập hợp các liên kết điều hướng chính. Việc dùng ```<div>``` cho từng link cũng làm hỏng cấu trúc danh sách.
  - Dùng ```<div class="product">```: Một sản phẩm (như iPhone 16) là một nội dung hoàn chỉnh, có thể đứng độc lập. Theo bản đồ phần tử ngữ nghĩa, những nội dung như bài viết, sản phẩm, bình luận phải dùng thẻ ```<article>```.
  - Dùng ```<div class="title">``` và ```<div class="price">```: Đây là lỗi nặng nhất về SEO. Tiêu đề phải dùng các thẻ từ ```<h1>``` đến ```<h6>```. Nếu dùng ```<div>```, Google sẽ coi "iPhone 16 Pro" chỉ là một đoạn văn bản bình thường, không phải từ khóa quan trọng của trang.
  - Sử dụng ```<div class="image"><img src="iphone.jpg"></div>```: Chương 04 yêu cầu sử dụng ```<figure>``` cho phương tiện truyền thông có kèm chú thích. Ngoài ra, thẻ ```<img>``` của bạn đang thiếu thuộc tính alt (văn bản thay thế), khiến Google không biết ảnh đó chụp cái gì.
**Sửa lại:**
```
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>        
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro màu Titan">
            <figcaption>Hình ảnh thực tế iPhone 16 Pro</figcaption>
        </figure>
    </article>
</main>
<footer>
    © 2026 ShopTLU
</footer>
```
## Câu A3 (5đ) — Khối vs Nội tuyến
- ```<div>Hộp 1</div>```: Thẻ ```<div>``` là phần tử Khối (Block). Nó "tham lam" chiếm trọn một hàng, làm cho nội dung tiếp theo bắt buộc phải xuống hàng mới.
- ```<span>Text A</span>``` và ```<span>Text B</span>```: Cả hai đều là thẻ <span> - phần tử Nội tuyến (Inline). Chúng "nhún nhường" chỉ chiếm vừa đủ chỗ cho chữ "Text A" và "Text B", nên chúng nằm cạnh nhau trên cùng một hàng (Hàng 2).
- ```<div>Hộp 2</div>```: Gặp thẻ <div> (Block) tiếp theo. Nó không chịu nằm chung hàng với ai cả, nó tự đẩy mình xuống dòng mới (Hàng 3) và chiếm hết chiều ngang.
- ```<span>Text C</span>``` và ```<strong>Text D</strong>```: Thẻ ```<span>``` và ```<strong>``` đều là phần tử Inline. Vì vậy, chúng nằm cạnh nhau trên một hàng mới (Hàng 4). (Lưu ý: "Text D" sẽ được in đậm nhưng vẫn nằm cùng hàng).
- ```<div>Hộp 3</div>```: Thẻ ```<div>``` cuối cùng lại đẩy mọi thứ xuống dòng và chiếm trọn Hàng 5.
  
## Câu A4 (5đ) — Bảng
**Sự khác nhau giữa <thead>, <tbody>, và <tfoot>.** Ba thẻ này dùng để phân nhóm nội dung trong một bảng (```<table>```), giúp trình duyệt và các công cụ tìm kiếm hiểu được cấu trúc dữ liệu:
- ```<thead>``` (Table Header): Chứa các hàng tiêu đề của bảng.
 **Nội dung:** Thường chứa các thẻ ```<th>``` để đặt tên cho các cột (như "Sản phẩm", "Giá", "Số lượng").
 **Đặc điểm:** Khi in một bảng dài ra giấy, một số trình duyệt sẽ tự động lặp lại phần ```<thead>``` ở mỗi đầu trang mới.
- ```<tbody>``` (Table Body): Là phần "thân", chứa nội dung dữ liệu chính của bảng.
  **Nội dung:** Chứa các thẻ ```<td>``` hiển thị thông tin thực tế.
  **Đặc điểm:** Một bảng có thể có nhiều ```<tbody>``` nếu bạn muốn phân nhóm các tập dữ liệu khác nhau.
-```<tfoot>``` (Table Footer): Chứa nội dung tổng kết hoặc chú thích cuối bảng.
  **Nội dung:** Thường dùng để hiển thị tổng số hàng, tổng tiền hoặc các ghi chú chung.
  **Đặc điểm:** Dù nằm ở cuối, nhưng trong mã nguồn HTML cũ, nó thường được viết trước ```<tbody>``` để trình duyệt có thể render (hiển thị) phần tổng kết ngay cả khi dữ liệu thân bảng quá dài chưa tải xong.
**Tại sao KHÔNG NÊN dùng bảng để tạo bố cục trang web?**
- **SEO kém (Search Engine Optimization):** Google và các bộ máy tìm kiếm sử dụng các thuật toán để đọc hiểu nội dung web. Khi bạn dùng bảng để dàn trang, cấu trúc mã nguồn sẽ trở nên cực kỳ phức tạp với hàng tầng thẻ ```<tr>```, ```<td>``` lồng nhau. Google sẽ khó xác định đâu là nội dung chính, đâu là menu, dẫn đến việc xếp hạng website của bạn bị thấp.
- **Không linh hoạt trên thiết bị di động (Responsive):** Bảng có tính chất "cứng nhắc", nó luôn cố gắng giữ đúng số cột và hàng. Trên màn hình máy tính (rộng) thì có thể đẹp, nhưng khi xem trên điện thoại (hẹp), bảng sẽ bị tràn ra ngoài hoặc co lại đến mức không đọc được. Với CSS hiện đại (Flexbox/Grid), chúng ta có thể dễ dàng chuyển từ 3 cột trên máy tính thành 1 cột trên điện thoại, điều mà ```<table>``` làm rất khó khăn.
- **Tốc độ tải trang chậm và khó bảo trì:** Trình duyệt thường phải đợi tải xong toàn bộ mã nguồn của thẻ ```<table>``` thì mới bắt đầu hiển thị bảng đó ra màn hình. Nếu trang web của bạn lồng quá nhiều bảng để dàn trang, người dùng sẽ thấy một màn hình trắng trong thời gian dài. Ngoài ra, khi bạn muốn thay đổi vị trí một cái menu, bạn phải sửa lại toàn bộ cấu trúc hàng/cột của bảng, việc này cực kỳ tốn thời gian và dễ gây lỗi code.

# PHẦN B — THỰC HÀNH CODE (60 điểm)
## Bài B3 (15đ) — Debug HTML
- Lỗi 1: Dòng 1 — Thẻ ```<!DOCTYPE>``` thiếu html — Sửa thành ```<!DOCTYPE html>```.
- Lỗi 2: Dòng 1 — Thiếu thuộc tính lang trong thẻ ```<html>``` — Sửa thành ```<html lang="vi">```.
- Lỗi 3: Dòng 2 — Thẻ ```<title>``` chưa đóng — Thêm ```</title>```.
- Lỗi 4: Dòng 3 — Giá trị utf8 thiếu gạch ngang và sai chuẩn — Sửa thành UTF-8.
- Lỗi 5: Dòng 4 — Thẻ ```<h1>``` đóng sai bằng ```<h1>``` — Sửa thành ```</h1>```.
- Lỗi 6: Dòng 8 — Thẻ ```<a>``` đóng sai bằng ```<a>``` — Sửa thành ```</a>```.
- Lỗi 7: Dòng 15 — Thẻ ```<img>``` thiếu dấu ngoặc kép cho đường dẫn và thiếu thuộc tính alt — Sửa thành src="iphone.jpg" alt="...".
- Lỗi 8: Dòng 17 — Sai thứ tự đóng thẻ lồng nhau: ```<b>``` đóng sau ```<p>``` — Sửa thành ```<b>```...```</b>``````</p>```.
- Lỗi 9: Dòng 22 — Bảng thiếu cấu trúc ```<thead>``` và ```<tbody>``` cho đúng ngữ nghĩa.
- Lỗi 10: Dòng 24 — Tiêu đề bảng dùng ```<td>``` — Sửa thành <th> để đúng ngữ nghĩa tiêu đề.
- Lỗi 11: Dòng 33 — Sử dụng 2 thẻ ```<main>``` (một trang chỉ được có một thẻ main duy nhất) — Sửa cái thứ 2 thành ```<aside>```.
- Lỗi 12: Dòng 37 — Đoạn văn trong ```<footer>``` chưa đóng thẻ ```<p>``` — Thêm ```</p>```.

## Bài B4 (15đ) — Phân tích trang web thật
**1.**
- 3 thẻ semantic HTML5 mà thegioididong.com sử dụng:
  + ```<header>```: Xuất hiện ở dòng có class="header v2024...". Đây là nơi chứa logo và thanh công cụ đầu trang.
  + ```<section>```: Có nhiều thẻ section như id="game", id="news". Trang web dùng thẻ này để phân chia các khu vực nội dung khác nhau (Tin tức, Game...).
  + ```<footer>```: Xuất hiện ở cuối trang (class="footer v2024"), chứa thông tin bản quyền và liên kết phụ.
- 2 thẻ mà trang đó KHÔNG dùng đúng semantic:
  + Thanh thông báo trên cùng: Đang dùng ```<div class="header-top-bar">```. Đúng ra nên dùng thẻ <section> hoặc trực tiếp bên trong ```<header>```.
  + Khu vực chọn vị trí: Dùng ```<div class="locationbox-v2">```. Vì đây là một tiện ích bổ sung, có thể dùng thẻ ```<aside>``` hoặc ```<section>``` sẽ mang tính ngữ nghĩa cao hơn thẻ div trung tính.
**2.**
- Nội dung hiển thị: Thông số chi tiết về cấu hình điện thoại (Màn hình, Hệ điều hành, Camera, Chip...).
- thegioididong.comkhông dùng thẻ <table> truyền thống cho phần này. Thay vì dùng ```<table>```, ```<tr>```, ```<td>```, họ lại dùng danh sách không thứ tự ```<ul>``` và các thẻ ```<li>``` . Bên trong mỗi ```<li>```, họ dùng thẻ ```<span>``` cho tên thông số (ví dụ: "Màn hình:") và thẻ ```<div>``` cho giá trị thông số (ví dụ: "LCD, 6.74", HD+").
**3.** From tìm kiếm
- **Action:** action="/tim-kiem". Điều này có nghĩa là khi người dùng nhấn tìm kiếm, dữ liệu sẽ được gửi về đường dẫn /tim-kiem trên hệ thống của Thế Giới Di Động để xử lý.
- **Method:** Mặc dù trong thẻ không ghi rõ method, nhưng thông thường với các form tìm kiếm công khai như thế này, trình duyệt sẽ mặc định dùng phương thức GET. Có thể thấy các thuộc tính như onsubmit dùng để gọi hàm JavaScript xử lý trước khi gửi.
- **Các Input types được sử dụng:**
  + type="text": Được dùng cho ô nhập từ khóa chính (ô có id="skw"). Đây là nơi người dùng gõ tên sản phẩm.
  + Thẻ ```<button>``` với type="submit": Dùng để kích hoạt việc gửi form (nút có aria-label="button suggest search").

# PHẦN C — SUY LUẬN
## Câu C1 (10đ) — Thiết kế cấu trúc
```
<!DOCTYPE html> <!-- Khai báo HTML5 -->
<html lang="vi"> <!-- Ngôn ngữ trang là tiếng Việt -->
<head>
    <meta charset="UTF-8"> <!-- Hỗ trợ tiếng Việt -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
    <title>Chi tiết sản phẩm</title>
</head>

<body>

    <header> <!-- header chứa phần đầu trang -->
        <h1>Logo / Tên website</h1> <!-- h1 cho tiêu đề chính -->
        <nav> <!-- nav vì đây là khu vực điều hướng -->
            <ul> <!-- ul vì menu không có thứ tự -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>
    <main> <!-- main chứa nội dung chính của trang -->
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb"> <!-- nav vì breadcrumb là điều hướng -->
            <ol> <!-- ol vì breadcrumb có thứ tự cấp bậc -->
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Điện thoại</a></li>
                <li>iPhone 16</li> <!-- item cuối không cần link -->
            </ol>
        </nav>
        <section> <!-- section gom nhóm nội dung sản phẩm -->
            <!-- Khu vực ảnh sản phẩm -->
            <div> <!-- div dùng để layout -->
                <figure> <!-- figure dùng cho hình ảnh minh họa -->
                    <img src="#" alt="Ảnh sản phẩm 1"> <!-- ảnh -->
                </figure>
                <figure>
                    <img src="#" alt="Ảnh sản phẩm 2">
                </figure>
                <figure>
                    <img src="#" alt="Ảnh sản phẩm 3">
                </figure>
                <figure>
                    <img src="#" alt="Ảnh sản phẩm 4">
                </figure>
                <figure>
                    <img src="#" alt="Ảnh sản phẩm 5">
                </figure>
            </div>
            <!-- Thông tin sản phẩm -->
            <article> <!-- article vì đây là nội dung độc lập -->
                <h2>Tên sản phẩm</h2> <!-- tiêu đề sản phẩm -->
                <p>Giá: ...</p> <!-- giá là đoạn văn -->
                <p>Đánh giá: ★★★★★</p> <!-- đánh giá -->
                <p>Mô tả ngắn sản phẩm...</p> <!-- mô tả -->
            </article>
        </section>
        <!-- Bảng thông số kỹ thuật -->
        <section> <!-- section vì đây là phần nội dung riêng -->
            <h2>Thông số kỹ thuật</h2>
            <table> <!-- table vì dữ liệu dạng bảng -->
                <thead> <!-- phần đầu bảng -->
                    <tr>
                        <th>Thuộc tính</th> <!-- tiêu đề cột -->
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody> <!-- nội dung bảng -->
                    <tr>
                        <td>CPU</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>RAM</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <!-- Khu vực đánh giá / bình luận -->
        <section> <!-- section vì nhóm các comment -->
            <h2>Đánh giá & Bình luận</h2>

            <article> <!-- mỗi comment là 1 article độc lập -->
                <h3>Người dùng A</h3>
                <p>Nội dung bình luận...</p>
            </article>

            <article>
                <h3>Người dùng B</h3>
                <p>Nội dung bình luận...</p>
            </article>
        </section>

    </main>
    <!-- Sidebar -->
    <aside> <!-- aside vì nội dung phụ (sản phẩm tương tự) -->
        <h2>Sản phẩm tương tự</h2>
        <ul> <!-- danh sách sản phẩm -->
            <li><a href="#">Sản phẩm 1</a></li>
            <li><a href="#">Sản phẩm 2</a></li>
            <li><a href="#">Sản phẩm 3</a></li>
        </ul>
    </aside>

    <footer> <!-- footer chứa thông tin cuối trang -->
        <p>Bản quyền © 2026</p>
    </footer>
</body>
</html>
```

### Câu C2 (10đ) — So sánh & Tranh luận
Quan điểm "chỉ dùng ```<div>``` và class" thực tế là một lối tư duy tắt có hại cho sự phát triển lâu dài của một sản phẩm web. Việc sử dụng Semantic HTML (HTML ngữ nghĩa) không hề tốn thời gian vô ích mà mang lại những giá trị kỹ thuật cốt lõi mà class không bao giờ thay thế được.
  - Thứ nhất, về tối ưu hóa công cụ tìm kiếm (SEO): Các công cụ như Google, Bing không hiểu được ý nghĩa của một class như .tieude-sanpham. Tuy nhiên, nếu bạn dùng thẻ ```<h1>``` hay ```<article>```, các bot tìm kiếm sẽ ngay lập tức nhận diện được đâu là nội dung quan trọng nhất. Điều này giúp trang web có thứ hạng cao hơn trên kết quả tìm kiếm, một giá trị mà class không thể mang lại.
  - Thứ hai, về khả năng truy cập (Accessibility): Đối với người khiếm thị sử dụng trình đọc màn hình (Screen Readers), thẻ ```<div>``` hoàn toàn vô nghĩa. Khi dùng thẻ ```<nav>```, ```<main>``` hay ```<button>```, trình đọc màn hình sẽ thông báo chính xác cho người dùng biết họ đang ở đâu và có thể tương tác gì. Nếu chỉ dùng ```<div>```, người dùng khuyết tật sẽ bị lạc lối trong một "mê cung" các khối dữ liệu không định danh.
  - **Ví dụ cụ thể:** Hãy tưởng tượng bạn tạo một danh sách thông số kỹ thuật. Nếu dùng ```<ul>``` và ```<li>```, trình duyệt sẽ hiểu đây là một danh sách các mục liên quan. Nếu bạn dùng hàng loạt ```<div>```, trình duyệt chỉ hiểu đó là các khối văn bản rời rạc. Khi người dùng muốn in trang web hoặc dùng chế độ "Reader Mode" trên trình duyệt, Semantic HTML sẽ giúp nội dung được dàn trang lại một cách gọn gàng và dễ đọc, còn cấu trúc div sẽ thường bị vỡ hoặc mất định dạng.
  - Tuy nhiên, ```<div>``` vẫn có chỗ đứng riêng: Thẻ ```<div>``` vẫn cực kỳ phù hợp khi chúng ta cần một vỏ bọc thuần túy cho mục đích CSS hoặc Layout (dàn trang) mà không mang ý nghĩa về mặt nội dung. Ví dụ, khi bạn cần một khối bao quanh để căn giữa trang web bằng Flexbox hoặc tạo hiệu ứng đổ bóng cho một vùng phức tạp, ```<div>``` chính là sự lựa chọn tốt nhất vì nó trung tính và không gây nhiễu cho cấu trúc ngữ nghĩa của tài liệu.
- **Kết luận:** Semantic HTML không chỉ là về việc đặt tên, đó là về việc xây dựng một trang web thông minh, nhân văn và thân thiện với máy móc.



