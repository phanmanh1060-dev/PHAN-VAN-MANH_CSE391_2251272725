# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — var / let / const
| Đoạn Kết quả | Dự đoán / Thực tế | Khái niệm core cần nhớ |
| :--- | :----: | ---: |
| 1 |	undefined	| Hoisting với var |
| 2 |	ReferenceError: Cannot access 'y' before initialization	| Temporal Dead Zone (TDZ) với let |
| 3	| TypeError: Assignment to constant variable.	| Tính chất không thể gán lại của const |
| 4	| [1, 2, 3, 4]	| Tính chất Mutable (có thể thay đổi) của Object/Array) |
| 5 | Trong block: 2; Ngoài block: 1 | Block Scope của let | 

**Giải thích**
- Đoạn 1: Hiện tượng Hoisting với var
```
console.log(x);
var x = 5;
```
  + Kết quả: undefined
  + Giải thích: Khi JavaScript Engine quét qua đoạn code, nó sẽ "kéo" (hoist) phần khai báo var x; lên trên cùng của scope, nhưng chừa phần gán giá trị = 5 ở lại chỗ cũ. Do đó, tại thời điểm dòng console.log(x) chạy, biến x đã tồn tại trong bộ nhớ nhưng chưa được gán giá trị, dẫn đến kết quả là undefined.
Code thực tế chạy như sau:
```
var x; // Hoisting khai báo
console.log(x); // undefined
x = 5; // Gán giá trị
```
- Đoạn 2: Vùng chết tạm thời — Temporal Dead Zone (TDZ)
```
console.log(y);
let y = 10;
```
  + Kết quả: Báo lỗi ReferenceError
  + Giải thích: Khác với var, các biến khai báo bằng let và const tuy cũng được hoisting nhưng chúng lại bị đưa vào một vùng gọi là Temporal Dead Zone (TDZ) cho đến khi dòng code khai báo thực sự được chạy tới. Trong vùng TDZ này, nếu cậu cố tình truy cập vào biến, JavaScript sẽ lập tức ném ra lỗi để bảo vệ code của cậu khỏi những hành vi không rõ ràng.
- Đoạn 3: Tính chất của Hằng số (const)
```
const z = 15;
z = 20;
console.log(z);
```
  + Kết quả: Báo lỗi TypeError
  + Giải thích: Từ khóa const dùng để khai báo một hằng số (constant). Một khi đã gán giá trị ban đầu cho const, cậu không bao giờ được phép dùng toán tử gán (=) để thay đổi giá trị của nó một lần nữa. Hành động z = 20 là vi phạm luật pháp của JS!
- Đoạn 4: Trầm trồ với Hằng số dạng Reference Type (Mảng/Object)
```
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
  + Kết quả: [1, 2, 3, 4] (Không bị lỗi!)
  + Giải thích: Đây là chỗ rất nhiều bạn bị lừa. const bảo vệ địa chỉ ô nhớ (reference) mà biến đang trỏ tới, chứ không bảo vệ nội dung bên trong ô nhớ đó. Khi cậu arr.push(4), địa chỉ của mảng arr trong bộ nhớ không hề thay đổi, cậu chỉ đang sửa đổi phần tử bên trong cái mảng đó mà thôi (Mutable).
-Đoạn 5: Block Scope (Phạm vi khối mã)
```
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
  + Kết quả: Trong block: 2 ; Ngoài block: 1
  + Giải thích: let và const có tính chất Block Scope (chỉ có giá trị bên trong cặp ngoặc nhọn {} chứa nó). Biến let a = 2 nằm bên trong {} là một biến hoàn toàn cô lập, độc lập với biến a = 1 bên ngoài.

# Câu A2 (5đ) — Các kiểu dữ liệu và ép kiểu
```console.log(typeof null);	``` => "object"

```console.log(typeof undefined);```	=> "undefined" 

```console.log(typeof NaN);	```=> "number"

```console.log("5" + 3);	```=> "53"

```console.log("5" - 3);	```=> 2

```console.log("5" * "3");	```=> 15

```console.log(true + true);	```=> 2

```console.log([] + []);	```=> "" (Chuỗi rỗng)

```console.log([] + {});	```=> "[object Object]"

```console.log({} + []);	```=> 0 hoặc "[object Object]"

**Tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau.**
1. Đối với phép toán "5" + 3
  + Kết quả: "53"
  + Toán tử + trong JavaScript có 2 nhiệm vụ: Phép cộng số học toán học **VÀ** Phép nối chuỗi ký tự.
  + Quy tắc ngầm: Nếu ít nhất một trong hai vế là String, JavaScript sẽ ưu tiên tuyệt đối cho nhiệm vụ Nối chuỗi.Vì vậy, nó tự động chuyển số 3 thành chuỗi "3" thông qua cơ chế Type Coercion và dán chúng lại với nhau thành "53".
2. Đối với phép toán "5" - 3 
+ Kết quả: 2
+ Toán tử - (và các toán tử khác như *, /) chỉ có duy nhất 1 nhiệm vụ: Phép toán số học. Nó không hề có khái niệm "trừ chuỗi".
+ Quy tắc ngầm: JavaScript bắt buộc phải tìm cách đưa cả hai vế về kiểu dữ liệu Number để tính toán.Nó thấy chuỗi "5" có thể chuyển thành số 5 hợp lệ, nên nó âm thầm thực hiện phép tính 5 - 3 = 2. Nếu cậu thay bằng "hello" - 3, kết quả sẽ là NaN vì chữ "hello" không thể biến thành số được.

# Câu A3 (5đ) — So sánh == vs ===
```console.log(5 == "5");	```=> true

```console.log(5 === "5");```=> false

```console.log(null == undefined);```	=> true

```console.log(null === undefined);```	=> false

```console.log(NaN == NaN);```	=> false

```console.log(0 == false);```	=> true

```console.log(0 === false);```	=> false

```console.log("" == false);```	=> true

**Từ giờ trở đi, bạn nên dùng ==hay ===? Tại sao?**
- LUÔN LUÔN DÙNG === (và !==). Hạn chế tối đa hoặc tuyệt đối không dùng == trừ một vài trường hợp cực kỳ đặc biệt có chủ đích.
- Tại sao lại như vậy?
  + **Tránh những Bug ngầm:** Như cậu thấy ở trên, "" == false ra true, 0 == false ra true. Nếu cậu làm tính năng kiểm tra xem người dùng đã nhập tên chưa bằng cách viết: if (username == false), và người dùng nhập vào số 0, code sẽ hiểu lầm là họ chưa nhập! Dùng === sẽ chặn đứng nguy cơ này vì nó ép kiểu dữ liệu phải trùng khớp hoàn toàn.
  + **Code tường minh, dễ đọc:** Khi cậu viết ===, cậu và các đồng đội nhìn vào sẽ hiểu ngay: "Đoạn này bắt buộc phải bằng nhau cả về Giá trị lẫn Kiểu dữ liệu". Cậu làm chủ hoàn toàn dòng chảy của code chứ không phó mặc cho JavaScript tự ý "ép kiểu hộ".
  + **Tối ưu hiệu năng (Performance):** Toán tử === chạy nhanh hơn == một chút vì nếu thấy khác kiểu dữ liệu (ví dụ so sánh Số với Chuỗi), nó sẽ trả về false ngay lập tức mà không cần mất thời gian thực hiện các bước thuật toán ép kiểu phức tạp ở đằng sau.

# Câu A4 (5đ) — Thật & Giả
```if ("0") console.log("A");``` => Có in

```if ("") console.log("B"); ```=> không in

```if ([]) console.log("C");``` => có in

```if ({}) console.log("D");``` => có in

```if (null) console.log("E");``` => không in

```if (0) console.log("F");``` => không in

```if (-1) console.log("G");``` => có in

```if (" ") console.log("H");``` => có in

# Câu A5 (5đ) — Template Literals
```
// Giả định dữ liệu để chạy thử code
const name = "Minh";
const age = 20;
const userId = "USR99";
const page = 2;
const title = "Khóa Học JavaScript";
const description = "Học lập trình JS từ cơ bản đến nâng cao cùng Anh Hùng.";
const price = 499000;

// ------------------------------------------
// Cách 1: Chèn biến cơ bản
// ------------------------------------------
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
console.log("=== Kết quả Cách 1 ===");
console.log(greeting);
console.log("\n----------------------------------\n");
// ------------------------------------------
// Cách 2: Tạo URL API (Nối chuỗi phức tạp)
// ------------------------------------------
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

console.log("=== Kết quả Cách 2 ===");
console.log(url);
console.log("\n----------------------------------\n");
// ------------------------------------------
// Cách 3: Gộp chuỗi nhiều dòng (Multi-line String) để render HTML
// ------------------------------------------
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
console.log("=== Kết quả Cách 3 ===");
console.log(html);
```

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug JavaScript
- **Lỗi 1**: Gán nhầm giá trị thay vì so sánh trong if
  + Dòng lỗi:``` if (giaSauGiam = 0) {```
  + Giải thích: Cậu đang dùng một dấu bằng (=), đây là phép gán chứ không phải phép so sánh. Nó sẽ gán giá trị 0 cho biến giaSauGiam. Trong JavaScript, số 0 mang giá trị falsy, khiến điều kiện if này luôn luôn sai (không bao giờ in ra "Sản phẩm miễn phí!"), đồng thời làm thay đổi luôn kết quả trả về của hàm thành 0.
  + Cách sửa: Sửa thành phép so sánh nghiêm ngặt ===.
- **Lỗi 2:** Thiếu các dấu chấm phẩy dính liền nhau (Syntax Error)
  + Dòng lỗi: ```return giaSauGiam}// Testconst gia = ... và 20)console.log...```
  + Giải thích: JavaScript có cơ chế tự động chèn dấu chấm phẩy (ASI). Tuy nhiên, khi cậu viết gộp hàm và lời gọi hàm dính liền trên cùng một dòng mà không có dấu chấm phẩy hay xuống dòng ngăn cách, JavaScript Engine sẽ bị loạn cú pháp và báo lỗi SyntaxError.
  + Cách sửa: Thêm dấu ; hoặc xuống dòng tường minh giữa các câu lệnh.
- **Lỗi 3:** Không ép kiểu dữ liệu đầu vào (Type Coercion)
  + Dòng lỗi: ```const gia = tinhGiaGiamGia("100000", 20)```
  + Giải thích: Tham số truyền vào "100000" là một Chuỗi (String) chứ không phải Số (Number). Dù phép toán * và / ở bên trong hàm có cơ chế tự ép kiểu ngầm giúp phép tính chạy được, nhưng đây là một thói quen bad practice dễ gây lỗi nghiêm trọng khi cộng chuỗi ở các logic phức tạp hơn.
  + Cách sửa: Truyền vào một số thuần túy 100000 hoặc dùng Number("100000").
- **Lỗi 4:** Sử dụng var bừa bãi bên trong hàm
  + Dòng lỗi: ```var giamGia = giaBan * phanTramGiam / 100```
  + Giải thích: var có cơ chế hoisting và phạm vi hoạt động theo hàm (function-scoped), dễ gây rò rỉ biến và khó kiểm soát. Trong JavaScript hiện đại (ES6+), chúng ta nên dùng let hoặc const để biến có phạm vi khối cụ thể ({}).
  + Cách sửa: Thay var bằng const (vì giá trị giamGia này không bị thay đổi lại ở phía sau).
- **Lỗi 5:** Thiếu ngoặc nhọn {} cho khối lệnh for dính liền
  + Dòng lỗi: ```console.log("Giá: " + gia2)for (var i = 0; i < 5; i++) {```
  + Giải thích: Giống lỗi số 2, câu lệnh in log và từ khóa for bị dính chặt trên một dòng mà không có sự phân tách rõ ràng, gây lỗi biên dịch.
  + Cách sửa: Xuống dòng để phân tách rõ ràng.
- **Lỗi 6 (Lỗi ẩn):** var kết hợp với setTimeout trong vòng lặp for
  + Dòng lỗi: ```for (var i = 0; i < 5; i++) { setTimeout(... console.log("Item " + i) ... ) }```
  + Giải thích tại sao: * Biến var i có cơ chế function-scoped (hoặc global scoped nếu viết ngoài hàm). Nghĩa là trong suốt vòng lặp, hệ thống chỉ tạo ra duy nhất 1 ô nhớ cho biến i này, và giá trị của nó được tăng liên tục sau mỗi vòng lặp.
setTimeout là một hàm bất đồng bộ. Nó không chạy ngay lập tức mà sẽ đợi ít nhất 1000ms (1 giây) sau mới chạy.
Trong 1 giây chờ đợi đó, vòng lặp for đồng bộ đã chạy vèo một phát xong xuôi từ lâu và tăng giá trị của i lên đến số 5.
Đến khi hết 1 giây, cả 5 hàm setTimeout đồng loạt thức dậy và cùng nhìn vào cái ô nhớ i duy nhất lúc này đã bằng 5. Kết quả là màn hình sẽ in ra 5 dòng Item 5 thay vì từ Item 0 đến Item 4.
  + Cách sửa bằng let: Thay var i thành let i. Biến let có cơ chế block-scoped. Cứ mỗi một vòng lặp, JavaScript sẽ tạo ra một ô nhớ hoàn toàn mới để khóa (bind) giá trị của i tại lượt chạy đó lại. Do đó, khi các setTimeout chạy sau 1 giây, chúng sẽ nhớ chính xác giá trị i riêng biệt của từng vòng lặp, in ra đúng thứ tự mong muốn: Item 0, Item 1, Item 2, Item 3, Item 4.
