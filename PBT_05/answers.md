# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Viewport & Mobile-First
1. Thẻ <meta viewport> và giải thích các thuộc tính
- Cú pháp chính xác:
```<meta name="viewport" content="width=device-width, initial-scale=1.0">```
- Giải thích từng thuộc tính:
  + name="viewport": Khai báo với trình duyệt rằng thẻ này dùng để thiết lập vùng hiển thị (viewport) cho màn hình thiết bị.
  + width=device-width: Đặt chiều rộng của trang web bằng đúng chiều rộng màn hình của thiết bị.
  + initial-scale=1.0: Đặt tỷ lệ phóng to (zoom) ban đầu là 1.0 (kích thước gốc 100%) ngay khi trang web vừa được tải xong, giúp trang không bị tự động phóng to hay thu nhỏ.
2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?
- iPhone sẽ tự động coi trang web đó là trang web dành riêng cho máy tính (Desktop).
- Giao diện sẽ bị thu nhỏ xíu lại để nhét vừa toàn bộ trang web vào màn hình điện thoại.
- Hậu quả trực tiếp: Chữ nhỏ xíu, các nút bấm chồng lên nhau, người dùng phải zoom in để đọc và phải scroll ngang liên tục để xem nội dung.
3. Phân biệt Mobile-First và Desktop-First
- Sự khác nhau:
  + Mobile-First: Viết code CSS cho màn hình điện thoại (nhỏ nhất) trước làm mặc định, sau đó dùng Media Queries với min-width để bổ sung, mở rộng layout khi màn hình lớn dần lên (Tablet, Desktop).
  + Desktop-First: Viết code CSS cho màn hình máy tính (lớn nhất) trước làm mặc định, sau đó dùng Media Queries với max-width để thu gọn, co nhỏ layout lại cho phù hợp với các màn hình nhỏ hơn.
- Ví dụ CSS với breakpoint 768px:
  + Cách 1: Mobile-First (Dùng min-width)
```
/* 1. Code cho mobile trước (mặc định dưới 768px) */
.col { 
    width: 100%; 
}

/* 2. Từ kích thước 768px trở lên (Tablet/Desktop) */
@media (min-width: 768px) {
    .col { 
        width: 50%; 
    }
}
```
  + Cách 2: Desktop-First (Dùng max-width)
```
/* 1. Code cho desktop trước (mặc định màn hình lớn) */
.col { 
    width: 50%; 
}
/* 2. Khi màn hình nhỏ dưới 768px (Mobile) */
@media (max-width: 767.98px) {
    .col { 
        width: 100%; 
    }
}
```
- Tại sao Mobile-First được khuyên dùng?
  + Tối ưu hiệu năng & tốc độ: Điện thoại di động tải ít CSS hơn sẽ xử lý nhanh hơn. Thiết bị di động có cấu hình và mạng yếu hơn máy tính, việc chạy code mặc định nhẹ nhàng rồi "thêm" CSS cho desktop thì tốt hơn là bắt mobile gánh đống CSS nặng nề của desktop rồi "giảm tải/ẩn bớt" đi (gây lãng phí).
  + Lượng người dùng áp đảo: Hiện nay có tới 60% lượt truy cập web đến từ MOBILE. Thiết kế ưu tiên nơi có nhiều người dùng nhất là chiến lược thông minh.
  + Tránh bị phạt SEO: Google áp dụng cơ chế đánh giá ưu tiên di động, nếu trang web không thân thiện với mobile (mobile-friendly) thì sẽ bị Google phạt SEO, làm giảm thứ hạng tìm kiếm một cách nghiêm trọng.

## Câu A2 (5đ) — Điểm ngắt
BẢNG TIÊU CHUẨN BREAKPOINTS & BỐ TRÍ LƯỚI SẢN PHẨM
| Tên Breakpoint	| Kích thước Pixel	| Thiết bị đại diện	| Số cột hiển thị (Lưới sản phẩm) |
| :--- | :----: | ---: |---: |
| xs	| < 576px	| Điện thoại dọc (Mobile Portrait) |	1 cột (Layout mặc định, xếp chồng dọc) |
| sm	| ≥ 576px	| Điện thoại ngang (Mobile Landscape)	| 1 - 2 cột (Tùy thuộc vào kích thước sản phẩm) |
| md	| ≥ 768px	| Máy tính bảng (Tablet)	|2 cột (grid-template-columns: repeat(2, 1fr)) |
| lg	| ≥ 992px	| Máy tính màn hình nhỏ (Small Desktop/Laptop)	| 3 - 4 cột (Bắt đầu chia nhiều cột hơn) |
| xl	| ≥ 1200px	| Máy tính màn hình lớn (Large Desktop)	| 4 cột (grid-template-columns: repeat(4, 1fr)) |

## Câu A3 (5đ) — Truy vấn phương tiện
| Kích thước màn hình	| .container chiều rộng |
| :--- | :---- |
| 375px (iPhone SE) |	100% |
| 600px	| 540px |
| 800px	| 720px |
| 1000px	| 960px |
| 1400px	| 1140px |

## Câu A4 (5đ) — Kiến thức cơ bản về SCSS
**1. Biến ( $primary-color)**
- **Giải thích:** Giúp lưu trữ các giá trị được sử dụng lặp đi lặp lại nhiều lần (như mã màu, font chữ, bo góc) vào một cái "tên gợi nhớ" bắt đầu bằng ký hiệu $. Khi muốn thay đổi giao diện, bạn chỉ cần sửa giá trị của biến ở một nơi duy nhất, toàn bộ những chỗ sử dụng biến đó sẽ tự động cập nhật theo.
- **Ví dụ:**
```
// Khai báo biến
$primary-color: #805ad5; 
$radius-base: 8px;
// Sử dụng
.button {
    background-color: $primary-color;
    border-radius: $radius-base;
}
.sidebar-title {
    color: $primary-color; // Đổi biến ở trên, chỗ này tự đổi theo
```

**2. Nesting (viết CSS lồng nhau)**
- **Giải thích:** Cho phép chúng ta viết các bộ chọn (selectors) lồng vào trong nhau, mô phỏng trực quan theo đúng cấu trúc phân cấp các thẻ của sơ đồ HTML. Điều này giúp code gọn gàng, tránh việc phải viết đi viết lại thẻ cha. Ký tự & được dùng để đại diện trực tiếp cho thẻ cha ngay trước nó (thường dùng cho :hover, :focus).
- **Ví dụ:**
```
.navbar {
    background: #1a202c;
    padding: 16px;

    ul {
        list-style: none;
        display: flex;

        li {
            margin-right: 24px;

            a {
                color: white;
                
                &:hover { // & tương đương với "a:hover"
                    color: $primary-color;
                }
            }
        }
    }
}
```

**3. Mixins ( @mixin, @include)**
- **Giải thích:** Đóng vai trò như một chiếc "hàm" trong lập trình. Nó cho phép bạn gom một tập hợp nhiều thuộc tính CSS hay dùng chung lại với nhau. Khi cần xài, bạn chỉ việc gọi tên nó ra thay vì viết lại toàn bộ các dòng code đó.
  + Định nghĩa bằng từ khóa: @mixin
  + Sử dụng bằng từ khóa: @include
- **Ví dụ:**
// Định nghĩa một mixin để căn giữa nhanh bằng flexbox
```
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
// Sử dụng mixin cho vùng Hero
.hero {
    height: 100vh;
    @include flex-center; // Gọi hàm ra dùng
}
```

**4. @extend/ Thừa kế**
- **Giải thích:** Cho phép một selector có thể "gộp chung" và thừa hưởng lại toàn bộ tất cả các thuộc tính CSS của một selector khác đã có sẵn. Tính năng này giúp giảm thiểu việc lặp lại code và giữ cho các component có chung một kiểu thiết kế nền tảng (Ví dụ: Các loại nút bấm khác nhau nhưng chung một kiểu khung cơ bản).
- **Ví dụ:**
```
// Lớp cơ sở (Base)
.btn-base {
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
}
// Các nút kế thừa lại lớp cơ sở và chỉ đổi màu sắc
.btn-success {
    @extend .btn-base; // Thừa kế toàn bộ padding, radius, font-weight
    background-color: green;
    color: white;
}
.btn-danger {
    @extend .btn-base; // Thừa kế toàn bộ padding, radius, font-weight
    background-color: red;
    color: white;
}
```

**Tại sao trình duyệt KHÔNG đọc được tệp .scss? Bước chuyển đổi cụ thể**
- **Tại sao trình duyệt không đọc được?** Bởi vì Hiệp hội Web Quốc tế (W3C) chỉ quy định các trình duyệt (Chrome, Safari, Edge, Firefox) hiểu và thực thi được mã nguồn CSS thuần chuẩn (.css). Các tính năng nâng cao của SCSS như biến ($), vòng lặp, lồng nhau hay hàm (@mixin) hoàn toàn không nằm trong đặc tả kỹ thuật cốt lõi của trình duyệt; nếu đưa trực tiếp file .scss vào, trình duyệt sẽ báo lỗi cú pháp và không thể hiển thị giao diện.
- **Cần bước gì để chuyển SCSS $\rightarrow$ CSS?** Chúng ta cần một bước gọi là Compile (Biên dịch). Mã nguồn SCSS sau khi viết xong phải được chạy qua một công cụ dịch thuật (Sass Compiler) để quét sạch các cú pháp nâng cao, tính toán và xử lý chúng rồi xuất ra thành một file .css tiêu chuẩn mà trình duyệt có thể đọc hiểu bình thường.
  + Các cách thực hiện bước biên dịch này trong thực tế:
    + Dùng công cụ hỗ trợ trong VS Code: Cài đặt Extension có tên là "Live Sass Compiler", sau đó nhấp vào nút "Watch Sass" ở thanh trạng thái bên dưới. Mỗi khi bạn nhấn Ctrl + S để lưu file .scss, extension này sẽ tự động biên dịch ngay lập tức ra file .css.
    + Dùng các bộ đóng gói trong dự án lớn: Trong các dự án thực tế sử dụng các framework lớn, các công cụ tự động hóa như Webpack hoặc Vite đã được cấu hình tích hợp sẵn bộ biên dịch ngầm, bạn chỉ việc code và hệ thống sẽ tự lo phần chuyển đổi.

# PHẦN B — THỰC HÀNH CODE (60 điểm)
## Bài B3 (20đ) — SCSS Refactor
**Ghi lại các phương thức biên dịch trong dự án**
- **Cách 1: Sử dụng Extension "Live Sass Compiler" trên VS Code.** Đây là công cụ tự động hóa trực quan nhất được tích hợp ngay bên trong trình chỉnh sửa mã nguồn VS Code:
* **Bước 1:** Cài đặt Extension **Live Sass Compiler** (Tác giả: Glenn Marks) từ chợ ứng dụng Extensions (`Ctrl + Shift + X`).
* **Bước 2:** Di chuyển chuột xuống thanh trạng thái (Status Bar) dưới đáy màn hình VS Code.
* **Bước 3:** Nhấn chuột vào nút **`Watch Sass`**. Ngay lập tức trạng thái sẽ chuyển sang **`Watching...`**.
* **Bước 4:** Mỗi khi nhấn tổ hợp phím `Ctrl + S` để lưu tệp `scss/style.scss`, hệ thống ngầm sẽ tự động biên dịch và tạo ra tệp đầu ra `scss/style.css` và tệp sơ đồ ánh xạ `scss/style.css.map`.
- **Cách 2: Sử dụng lệnh biên dịch qua Terminal / Command Line (Dùng Sass CLI).** Nếu không dùng extension giao diện đồ họa, dự án có thể được biên dịch trực tiếp thông qua cửa sổ dòng lệnh Terminal (như Git Bash, PowerShell trong ảnh chụp màn hình dự án) bằng các lệnh sau:
* **Lệnh biên dịch thủ công một lần (Compile Once):**
  ```bash
  sass scss/style.scss scss/style.css

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Phân tích trang web thực tế
**2. PHÂN TÍCH ĐÁP ỨNG (RESPONSIVE) TRÊN TRANG WEB YOUTUBE**
- Điều hướng thay đổi thế nào?
  + Phiên bản di động (375px): Thanh điều hướng chính phía trên được thu gọn tối đa. Menu danh mục bên trái hoàn toàn bị ẩn đi và thay thế bằng nút Menu Hamburger (☰) ở góc trên cùng bên trái để người dùng bấm vào khi cần mở rộng.
  + Máy tính bảng (768px): Thanh tìm kiếm (Search bar) bắt đầu xuất hiện rõ ràng ở giữa Header. Nút Hamburger vẫn tồn tại nhưng Menu bên trái lúc này thu nhỏ lại thành một dải dọc chứa các icon nhỏ (Trang chủ, Shorts, Kênh đăng ký) để tiết kiệm diện tích.
  + Màn hình máy tính (1440px): Header hiển thị đầy đủ nhất với thanh tìm kiếm rộng và đầy đủ các icon tiện ích góc phải. Menu bên trái tự động mở rộng hoàn toàn (hiển thị cả icon và chữ mô tả dài) giúp người dùng thao tác nhanh mà không cần bấm mở.
- Nội dung lưới thay đổi như thế nào?
  + Phiên bản di động (375px): Bố cục chuyển hoàn toàn thành lưới 1 cột (1 column layout). Video đang phát chiếm trọn chiều rộng màn hình, và danh sách các video gợi ý bên dưới xếp chồng theo hàng dọc một cách tuần tự để người dùng dễ dàng lướt bằng ngón tay.
  + Máy tính bảng (768px): Khi xoay ngang hoặc dùng iPad, không gian rộng hơn giúp giao diện chia thành các khu vực rõ ràng hơn, tuy nhiên danh sách video gợi ý bên dưới vẫn được ưu tiên xếp dọc gọn gàng dưới video chính.
  + Màn hình máy tính (1440px): Layout chuyển sang dạng đa cột (Multi-column layout) một cách tối ưu. Màn hình được chia làm 2 phần lớn rõ rệt: Khung bên trái (chiếm khoảng 70% độ rộng) hiển thị nội dung video đang phát + phần bình luận; Khung bên phải (chiếm 30% còn lại) là một lưới danh sách các thẻ video gợi ý/kế tiếp.
- Thành phần nào bị ẩn trên thiết bị di động? Khi co về màn hình 375px, để trang web tải nhanh và không bị rối, YouTube đã ẩn đi rất nhiều thành phần:
  + Khung hiển thị danh sách video gợi ý đặt ở bên phải (được đẩy xuống dưới cùng thay vì song song).
  + Thanh tìm kiếm mặc định bị ẩn, chỉ chừa lại icon kính lúp (khi nào cần bấm mới hiện ô nhập).
  + Một số thông tin phụ như nút chia sẻ, tải xuống, hoặc số lượt bình luận hiển thị thu gọn lại hoặc ẩn bớt chữ.
- Cỡ chữ có thay đổi không? Có thay đổi rất rõ rệt. Cỡ chữ (Font size) được thiết kế linh hoạt bằng các đơn vị tương đối (như rem, em hoặc căn theo phần trăm).
  + Trên màn hình máy tính (1440px), tiêu đề video và tên kênh có kích thước lớn, dễ đọc từ khoảng cách xa.
  + Khi thu nhỏ về di động (375px), kích thước phông chữ của tiêu đề video, số lượt xem và phần mô tả tự động giảm xuống một vài pixel (cậu có thể thấy trong ảnh, chữ tiêu đề video nhỏ gọn lại rõ rệt) giúp nội dung không bị tràn màn hình hoặc nhảy dòng quá nhiều làm vỡ giao diện.

## Câu C2 (10đ) — Thiết kế Chiến lược đáp ứng
1. Phiên bản Di động (Mobile — Dưới 768px)
- Bố cục tổng thể: 1 cột duy nhất (1-column layout), các thành phần xếp chồng vertically để người dùng dễ dàng lướt bằng 1 ngón tay.
- Những gì bị ẩn? * Số điện thoại đặt bàn trên Header được ẩn đi (hoặc thay bằng một icon nút gọi điện nhỏ gọn để tiết kiệm không gian).
- Lưới 6 ảnh món ăn sẽ bị ẩn bớt 4 ảnh, chỉ hiển thị 2 ảnh tiêu biểu nhất để tăng tốc độ tải trang trên mạng di động 3G/4G.
- Biểu mẫu đặt bàn (Form) nằm ở đâu? Form đặt bàn được đẩy lên vị trí rất cao—ngay phía dưới hình ảnh chính toàn trang—giúp khách hàng thực hiện hành động chuyển đổi (đặt bàn) nhanh nhất mà không cần cuộn trang quá nhiều. Bản đồ nhúng sẽ nằm ở dưới cùng, ngay trên footer.
2. Phiên bản Máy tính bảng (Tablet — Từ 768px đến 1024px)
- Lưới ảnh món ăn (Grid): Chuyển từ xếp dọc thành Lưới 2 cột (grid-template-columns: repeat(2, 1fr)) hiển thị đầy đủ 4 hoặc 6 ảnh món ăn.
- Bản đồ Google Maps nằm ở đâu? Bản đồ dịch chuyển lên nằm song song ngay cạnh Biểu mẫu đặt bàn thành cấu trúc 2 cột cân xứng (Form bên trái chiếm 50%, Bản đồ bên phải chiếm 50% độ rộng).
3. Phiên bản Máy tính (Desktop — Trên 1024px)
- Layout tổng thể: Chuyển sang dạng Đa cột (Multi-column layout) với vùng nội dung chính giới hạn tối đa (max-width: 1200px) căn giữa màn hình.
- Cấu trúc lưới: Lưới ảnh món ăn mở rộng hoàn toàn thành Lưới 3 cột hoặc 6 cột xếp gọn gàng trên cùng các hàng ngang.
- Thanh bên (Sidebar): Xuất hiện một thanh bên cố định ở phía bên phải. Thanh bên này sẽ gom Biểu mẫu đặt bàn và Số điện thoại hotline vào trong để nó luôn ghim chặt bên mắt người dùng, trong khi vùng nội dung lớn bên trái hiển thị Hình ảnh chính, Giới thiệu và Lưới món ăn.