# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — DOM Tree
- DOM tree (sơ đồ cây)
```
                        Document
                           |
                        div#app
                       /       \
                  header        main
                 /      \      /    \
               h1       nav  form#todoForm   ul#todoList
                         |     /       \         /      \
                         a     input  button    li      li
                         a                     (.todo-item) (.todo-item.completed)
                         a

```

- querySelector cho:
    + Chọn thẻ ```<h1>```:  ```document.querySelector('h1');```
    + Chọn input trong form: ```document.querySelector('#todoForm input');```
    + Chọn tất cả .todo-item:```document.querySelectorAll('.todo-item');```
    + Chọn link đang active:```document.querySelector('nav a.active');```
    + Chọn ```<li>``` đầu tiên trong #todoList:```document.querySelector('#todoList li');```
    + Chọn tất cả ```<a>``` bên trong ```<nav>```: ```document.querySelectorAll('nav a');```

# Câu A2 (5đ) — innerHTML vs textContent
1. Sự khác nhau giữa innerHTML và textContent

| Tiêu chí	| innerHTML	| textContent |
|--:|--:|--:|
| Bản chất |	Lấy hoặc thay đổi nội dung HTML (bao gồm cả các thẻ tag) bên trong phần tử.	| Lấy hoặc thay đổi văn bản thuần túy (gốc) bên trong phần tử, loại bỏ tất cả thẻ HTML. |
| Hiệu năng	| Chậm hơn vì trình duyệt phải biên dịch (parse) chuỗi thành các phần tử DOM.	| Nhanh hơn vì trình duyệt chỉ xử lý nó như một chuỗi văn bản thuần túy. |
| Độ an toàn | Kém an toàn, dễ bị tấn công Cross-Site Scripting (XSS) nếu chèn dữ liệu chưa kiểm duyệt từ user. | An toàn tuyệt đối trước XSS vì mọi ký tự nguy hiểm (như <, >) đều được biến thành text an toàn. |

- Khi nào nên dùng?
  + Dùng innerHTML khi: Bạn chủ động muốn chèn một đoạn mã cấu trúc HTML mới vào trang (ví dụ: tạo một danh sách <li> từ một mảng dữ liệu có sẵn của hệ thống).
  + Dùng textContent khi: Bạn chỉ muốn cập nhật chữ (text) như tên người dùng, số lượng, tiêu đề bài viết, hoặc hiển thị chính xác những gì người dùng nhập vào.

2. Tại sao innerHTML có thể gây lỗ hổng XSS?
- Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi kẻ tấn công lừa trình duyệt thực thi các đoạn mã JavaScript độc hại trên máy của người dùng khác.
- Khi bạn dùng innerHTML, trình duyệt sẽ đọc chuỗi truyền vào và cố gắng chuyển đổi nó thành các node DOM. Nếu chuỗi đó chứa mã độc, trình duyệt vẫn sẽ biên dịch và chạy nó.
- Phân tích ví dụ minh họa:
```
// Giả sử user cố tình nhập chuỗi này vào ô tìm kiếm:
// <img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

// Trình duyệt biên dịch chuỗi này thành một thẻ <img>
document.querySelector("#result").innerHTML = userInput;
```
- Cơ chế kích hoạt mã độc:
  + Trình duyệt cố gắng tải ảnh từ nguồn src="x" (đây là một nguồn sai/không tồn tại).
  + Vì tải ảnh thất bại, sự kiện lỗi onerror được kích hoạt ngay lập tức.
  + Đoạn mã nằm trong onerror (ở đây là alert('Hacked!'), hoặc nguy hiểm hơn là lấy cắp Token/Cookie document.cookie) sẽ bị thực thi.
3. Cách sửa để đảm bảo an toàn
Có 2 cách chính để khắc phục tùy thuộc vào mục đích hiển thị của bạn:
- **Cách 1:** Thay bằng textContent (Khuyến khích nhất)
Nếu bạn chỉ muốn hiển thị chuỗi tìm kiếm của user ra màn hình dưới dạng văn bản thuần túy, hãy đổi sang textContent. Trình duyệt sẽ tự động mã hóa các ký tự đặc biệt, biến thẻ <img> thành một chuỗi chữ vô hại.
```
const userInput = document.querySelector("#search").value;
// AN TOÀN: Thẻ <img> của user sẽ hiển thị ra màn hình dưới dạng chữ chứ không chạy mã độc
document.querySelector("#result").textContent = userInput;
```
- **Cách 2:** Sử dụng các thư viện "Làm sạch" (Sanitize) HTML
Trong trường hợp bạn bắt buộc phải cho phép người dùng nhập HTML (ví dụ: trình soạn thảo văn bản phong phú - Rich Text Editor) nhưng cần loại bỏ mã độc, hãy sử dụng các thư viện chuyên dụng như DOMPurify trước khi gán vào innerHTML.
```
// Cần nhúng thư viện DOMPurify trước khi dùng
const userInput = document.querySelector("#search").value;

// Làm sạch chuỗi đầu vào, loại bỏ các thuộc tính nguy hiểm như onerror, onload, <script>
const cleanInput = DOMPurify.sanitize(userInput);

// Bây giờ gán vào innerHTML đã an toàn
document.querySelector("#result").innerHTML = cleanInput;

```
## Câu A3 (5đ) — Event Bubbling
1. Khi CLICK vào BUTTON (Mặc định - Chưa bỏ comment e.stopPropagation()).
- Kết quả Output:
```
BUTTON
INNER
OUTER
```
- Giải thích cơ chế:Theo mặc định trong JavaScript, các sự kiện (event) hoạt động theo cơ chế Event Bubbling. Khi bạn click vào một phần tử nằm trong cùng (ở đây là #btn), sự kiện click sẽ kích hoạt hàm xử lý của chính nó trước, sau đó nó sẽ "nổi bọt" ngược lên các phần tử cha bao ngoài nó theo thứ tự từ trong ra ngoài:
    + Đầu tiên, kích hoạt hàm của #btn -> In ra BUTTON.
    + Sự kiện nổi bọt lên phần tử cha trực tiếp là #inner -> In ra INNER.
    + Sự kiện tiếp tục nổi bọt lên phần tử cha ngoài cùng là #outer -> In ra OUTER.2.
2. Nếu BỎ COMMENT e.stopPropagation()
- Kết quả Output:
```
BUTTON
```
- Giải thích cơ chế:Hàm e.stopPropagation() có nhiệm vụ ngăn chặn sự kiện tiếp tục nổi bọt lên các phần tử cha phía trên nó.Khi bạn click vào nút bấm:
    + Trình duyệt chạy hàm xử lý của #btn -> In ra BUTTON.
    + Ngay sau đó, dòng lệnh e.stopPropagation() được thực thi. Nó giống như một bức tường chặn đứng sự kiện click lại tại đây.
    + Sự kiện bị triệt tiêu hoàn toàn và không thể lan truyền lên #inner hay #outer được nữa. Do đó, các hàm xử lý của hai thẻ div cha sẽ không bao giờ được chạy.

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
## Câu C1 (8đ) — Debug DOM Code
- Lỗi ```addEventListener("onclick", ...)``` (Dòng 18):
    + Giải thích: Tên sự kiện truyền vào ```addEventListener``` không có tiền tố on. Phải sửa thành "click".
- Lỗi ghi đè biến DOM countDisplay = count (Dòng 24):
    + Giải thích: Biến ```countDisplay``` đang lưu trữ một phần tử DOM (Element). Lệnh này đã vô tình ghi đè giá trị số của count vào biến đó, làm hỏng tham chiếu DOM khiến các lần bấm nút sau không cập nhật được giao diện nữa. Phải sửa thành ```countDisplay.textContent = count;```.
- Lỗi gán ```historyList.innerHTML = null```; (Dòng 25):
    + Giải thích: Trong DOM, gán một thuộc tính chuỗi bằng null sẽ biến nó thành chuỗi "null". Kết quả là giao diện sẽ hiển thị chữ "null" trên màn hình. Cách đúng để xóa sạch là gán bằng chuỗi rỗng "".
- Lỗi hàm item.remove thiếu dấu ngoặc (Dòng 34):
    + Giải thích: .remove là một phương thức (method), không phải thuộc tính. Thiếu cặp dấu ngoặc () khiến trình duyệt chỉ tham chiếu tới hàm chứ không thực thi lệnh xóa element.
- Lỗi rò rỉ bộ nhớ (Memory Leak) do gán event listener trong vòng lặp (Dòng 11):
    + Giải thích: Mỗi lần bấm nút Increment, code lại tạo ra một thẻ ```<li>``` mới và bind một hàm ẩn danh ```function() { deleteHistory(this); }``` vào nó. Việc này vừa tốn bộ nhớ vừa không tận dụng sức mạnh của Event Delegation (Ủy quyền sự kiện).
- Lỗi Ép kiểu dữ liệu (Type Coercion) khi tải LocalStorage (Dòng 44):
    + Giải thích: ```localStorage.getItem("count")``` trả về một chuỗi (string). Khi thực hiện count++ hoặc count-- ở các lần bấm tiếp theo, JavaScript sẽ thực hiện phép cộng chuỗi (ví dụ: "0" + 1 = "01"). Cần ép kiểu về dạng số bằng  ```parseInt()``` hoặc dấu +.
- Lỗi giá trị mặc định của count khi LocalStorage trống (Dòng 44):
    + Giải thích: Trong lần đầu tiên người dùng vào trang, LocalStorage chưa có dữ liệu -> ```getItem``` trả về null. Ép kiểu dữ liệu của null sẽ làm hỏng biến đếm. Cần có giá trị fallback mặc định là 0.
- Lỗi bảo mật / Hiệu năng innerHTML không cần thiết (Dòng 6 & Dòng 20):
    + Giải thích: Giá trị hiển thị của count hoàn toàn là text thuần túy. Sử dụng ```innerHTML``` bắt trình duyệt phải chạy bộ phân tích cú pháp HTML (HTML parser) một cách dư thừa và kém an toàn. Nên thay bằng ```textContent```.

- **Sửa lại code:**
```
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// 1. Nút tăng giá trị (Increment)
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Thay bằng textContent cho an toàn và nhanh hơn
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Bỏ việc gán addEventListener tại đây để chống rò rỉ bộ nhớ (Memory Leak)
    historyList.append(li);
});

// 2. SỬA LỖI: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

// 3. SỬA LỖI: Sửa việc ghi đè biến DOM và sửa gán innerHTML bằng chuỗi rỗng thay vì null
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; 
    historyList.innerHTML = ""; 
});

// 4. TỐI ƯU: Sử dụng Event Delegation cho danh sách history
// Lắng nghe trực tiếp tại thẻ cha, bấm vào li nào thì xóa li đó
historyList.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "LI") {
        e.target.remove(); // Cú pháp hiện đại, ngắn gọn hơn removeChild
    }
});

// 5. SỬA LỖI: Thêm dấu ngoặc () vào hàm item.remove()
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// 6. Lưu trạng thái vào localStorage khi đóng/refresh trang
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML); // Lưu cấu trúc li cũ
});

// 7. SỬA LỖI: Tải dữ liệu từ localStorage và ép kiểu số, chống lỗi null
window.addEventListener("load", () => {
    const savedCount = localStorage.getItem("count");
    // Ép kiểu chuỗi sang Số, nếu chưa có dữ liệu (null) thì mặc định lấy số 0
    count = savedCount ? parseInt(savedCount, 10) : 0;
    countDisplay.textContent = count;

    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
```

## Câu C2 (7đ) — Performance
1. Tại sao gắn Event lên 1000 elements riêng lẻ là Bad Practice?
Việc sử dụng vòng lặp để gắn addEventListener lên 1000 phần tử riêng biệt là một hướng tiếp cận tồi (Bad Practice) vì hai lý do lớn sau:
- Tốn tài nguyên bộ nhớ (Memory Consumption): Mỗi lần gọi addEventListener, trình duyệt phải khởi tạo và cấp phát một vùng nhớ cho Event Listener Object (đối tượng lắng nghe sự kiện) cùng hàm callback đi kèm. Gắn cho 1000 phần tử nghĩa là bạn ép trình duyệt quản lý 1000 đối tượng riêng biệt, dẫn đến ngốn RAM vô ích.
- Rò rỉ bộ nhớ & Khó quản lý (Memory Leaks): Khi một phần tử bị xóa khỏi DOM bằng JavaScript, nếu bạn không gỡ bỏ sự kiện (removeEventListener) theo cách thủ công, trình duyệt có thể giữ lại hàm callback đó trong bộ nhớ, gây ra hiện tượng rò rỉ RAM.
- Vấn đề với phần tử động: Nếu bạn thêm phần tử thứ 1001 vào trang bằng mã code, phần tử mới này sẽ không có sự kiện, bạn lại phải viết thêm code để gắn sự kiện cho riêng nó.
- Cách Event Delegation giải quyết vấn đề
  + Event Delegation (Ủy quyền sự kiện) tận dụng cơ chế Event Bubbling (Sự kiện nổi bọt) của JavaScript. Thay vì gắn 1000 listener cho 1000 con, ta chỉ gắn duy nhất 1 listener lên phần tử cha bao ngoài chúng.
  + Khi bất kỳ phần tử con nào được click, sự kiện click đó sẽ tự động "nổi bọt" (lan truyền) ngược lên phần tử cha. Tại phần tử cha, ta chỉ cần dùng thuộc tính e.target để kiểm tra chính xác phần tử con nào vừa được click và xử lý logic tương ứng.
  + Kết quả: Từ 1000 listeners giảm xuống chỉ còn 1 listener duy nhất, tiết kiệm bộ nhớ tối đa và tự động áp dụng luôn cho cả các phần tử con được thêm mới sau này.

2. Refactor mã nguồn sử dụng DocumentFragment
Đoạn mã đã được tối ưu:
```
// Tạo một DocumentFragment trong bộ nhớ tạm
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Gắn phần tử trực tiếp vào fragment (Không gây reflow ở cây DOM thật)
    fragment.appendChild(div); 
}

// Thêm fragment vào body — Lúc này toàn bộ 1000 divs được chèn vào DOM cùng 1 lúc
document.body.appendChild(fragment); // ← Chỉ gây ra đúng 1 lần Reflow!
```
**Tại sao sử dụng DocumentFragment lại nhanh hơn?**
Để hiểu tại sao nó nhanh hơn, chúng ta cần nắm được cách trình duyệt hiển thị một trang web:
- Mã nguồn gốc (Tệ): Mỗi khi gọi document.body.appendChild(div), bạn đang trực tiếp can thiệp vào cây DOM hiển thị trên màn hình. Trình duyệt bắt buộc phải dừng lại để tính toán lại kích thước, vị trí của các phần tử xung quanh (Reflow) và vẽ lại giao diện (Repaint). Thực hiện việc này 1000 lần liên tục sẽ làm nghẽn luồng xử lý (UI thread), gây hiện tượng giật, lag trang.
- Giải pháp với DocumentFragment (Tối ưu): DocumentFragment hoạt động giống như một "DOM ảo thu nhỏ" nằm hoàn toàn trong bộ nhớ RAM (Off-screen DOM).
- Khi bạn thực hiện vòng lặp fragment.appendChild(div), các thao tác này diễn ra ngầm nên hoàn toàn không gây ra bất kỳ đợt Reflow hay Repaint nào trên màn hình thật.
- Khi vòng lặp kết thúc, lệnh document.body.appendChild(fragment) sẽ đổ toàn bộ 1000 phần tử vào trang web cùng một lúc. Trình duyệt chỉ cần tính toán lại cấu trúc layout đúng một lần duy nhất, giúp tối ưu hiệu năng render lên gấp nhiều lần.
