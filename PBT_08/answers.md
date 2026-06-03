# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow
- **Cách 1:** Function Declaration (Khai báo hàm)
```
  function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue, // Giữ nguyên key 'thuong' theo yêu cầu đề bài
        thuc_nhan: luong - thue
    };
}
```
- **Cách 2:** Function Expression (Biểu thức hàm)
```
  const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```
- **Cách 3:** Arrow Function (Hàm mũi tên)
```
  const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```
- Ba cách này **CÓ** khác nhau về cơ chế Hoisting. Khác biệt cốt lõi:
    + **Function Declaration:** Được hoisting hoàn toàn (cả tên và phần thân hàm). Bạn có thể gọi hàm trước khi khai báo nó.
    + **Function Expression & Arrow Function:** Phụ thuộc vào từ khóa khai báo biến (var, let, const). Ở đây chúng ta dùng const, chúng sẽ rơi vào vùng chết tạm thời (Temporal Dead Zone - TDZ). Bạn không thể gọi hàm trước khi khai báo, nếu cố tình gọi sẽ bị lỗi ReferenceError.
- **Ví dụ minh họa TH1:** Chạy tốt với Function Declaration
```
console.log(tinhThueBaoHiemDeclaration(15000000)); 
function tinhThueBaoHiemDeclaration(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
} 
```
- **Ví dụ minh họa TH2:** Lỗi ngay với Function Expression / Arrow Function
```
console.log(tinhThueBaoHiemExpression(15000000)); 
const tinhThueBaoHiemExpression = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
```


## Câu A2 (5đ) — Scope & Closure
- Dự đoán output:
```
//Đoạn 1
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```
- Đoạn 2: 
var: 3

var: 3

var: 3

let: 0

let: 1

let: 2

**Giải thích:** Sự khác biệt cốt lõi nằm ở Scope (Phạm vi) của hai từ khóa này kết hợp với cơ chế bất đồng bộ của setTimeout.
1. Với vòng lặp var (Function/Global Scope)
  - Biến var i không có phạm vi khối (block scope), nên nó được đưa ra làm biến toàn cục (hoặc phạm vi hàm bao ngoài).
  - Trong suốt vòng lặp, chỉ có duy nhất một biến i được tạo ra và bị ghi đè giá trị sau mỗi block for (i tăng từ 0 -> 1 -> 2, và dừng lại khi i = 3).
setTimeout là một hàm bất đồng bộ. Nó xếp hàng các callback trong Web APIs và đợi vòng lặp chạy xong xuôi (Call Stack trống) rồi mới thực thi.
  - Sau 100ms, khi các callback của var bắt đầu chạy, vòng lặp đã kết thúc từ lâu và biến i lúc này đã bằng 3. Do đó, cả 3 callback đều nhìn vào biến i chung này và in ra var: 3.
2. Với vòng lặp let (Block Scope)
  - Biến let j có Block Scope (phạm vi khối).
  - Cơ chế của JavaScript đối với let trong vòng lặp for là: Mỗi một lượt lặp (iteration), JavaScript lại tạo ra một biến j hoàn toàn mới và "chụp" (capture) lại giá trị của j tại thời điểm đó.
  - Chúng ta có 3 lượt lặp tương ứng với 3 biến j riêng biệt nằm ở 3 phạm vi khối khác nhau: j_lượt_1 = 0, j_lượt_2 = 1, j_lượt_3 = 2.
  - Nhờ vào Closure, mỗi callback của setTimeout sẽ "nhớ" chính xác biến j riêng của lượt lặp mà nó được tạo ra. Khi hết 200ms và các callback được gọi, chúng in ra đúng giá trị được "chụp" lại ban đầu: 0, 1, 2.

# Câu A3 (5đ) — Array Methods
1. Lấy các số chẵn
```
const evenNums = nums.filter(n => n % 2 === 0);
```
3. Nhân mỗi số với 3
```
const tripleNums = nums.map(n => n * 3);
```
4. Tính tổng tất cả
```
const totalSum = nums.reduce((sum, n) => sum + n, 0);
```
5. Tìm số đầu tiên > 7
```
const firstGretaterThan7 = nums.find(n => n > 7);
```
6. Kiểm tra CÓ số > 10 không (Dùng .some())
```
const hasGreaterThan10 = nums.some(n => n > 10);
```
7. Kiểm tra TẤT CẢ đều > 0 (Dùng .every())
```
const allGreaterThan0 = nums.every(n => n > 0);
```
8. Tạo mảng "Số X là [chẵn/lẻ]"
```
const parityStrings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
```
9. Đảo ngược mảng mà không làm biến đổi (mutate) mảng gốc
```
const reversedNums = [...nums].reverse(); // Hoặc: nums.toReversed();
```

## Câu A4 (5đ) — Object Destructuring & Spread
**Dự đoán output:**
```
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // LỖI: ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000 (Mảng gốc KHÔNG đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (Bị thay đổi theo!)
```
**Giải thích:**
- Tại sao product.specs.ram lại bị đổi thành 16?
  + Toán tử Spread ... chỉ thực hiện sao chép nông (Shallow Copy). Nghĩa là nó chỉ sao chép các thuộc tính ở tầng bề mặt (tầng thứ 1) của Object.
  + Ở tầng thứ 1, thuộc tính specs của product bản chất là một Object (kiểu dữ liệu tham chiếu) đang trỏ tới một địa chỉ vùng nhớ khác. Khi ta dùng ...product, JavaScript chỉ sao chép cái địa chỉ vùng nhớ (cái tham chiếu) đó sang cho copy.specs.
  + Kết quả là: cả product.specs và copy.specs đều dùng chung một vùng nhớ.
  + Do đó, khi bạn can thiệp sâu vào tầng thứ 2 bằng lệnh copy.specs.ram = 16, bạn đang vô tình sửa đổi trực tiếp dữ liệu trên vùng nhớ chung đó. Hệ quả là object product gốc cũng bị thay đổi theo.

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Refactor Code
**Viết lại code:** ≤ 10 dòng dùng filter, map, sort, destructuring, arrow functions.
```
const processOrders = (orders) => {
    return orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return { id, customer, total, discount, finalTotal: total - discount };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
};
```
## Câu C2 (10đ) — Thiết kế API
```
const miniArray = {
    // 1. Hàm map: Biến đổi từng phần tử và trả về mảng mới có cùng độ dài
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Callback nhận vào 3 tham số tiêu chuẩn: (phần tử hiện tại, chỉ số index, mảng gốc)
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // 2. Hàm filter: Lọc các phần tử thỏa mãn điều kiện (callback trả về true)
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu hàm callback fn trả về giá trị truthy, giữ phần tử đó lại
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // 3. Hàm reduce: Tích lũy mảng thành một giá trị đơn duy nhất
    reduce(arr, fn, initialValue) {
        // Kiểm tra xem người dùng có truyền vào giá trị khởi tạo (initialValue) hay không
        const hasInitialValue = initialValue !== undefined;
        
        // Nếu có initialValue thì biến tích lũy accumulator bằng initialValue và bắt đầu lặp từ index 0.
        // Nếu KHÔNG có, accumulator lấy luôn phần tử đầu tiên của mảng (arr[0]) và bắt đầu lặp từ index 1.
        let accumulator = hasInitialValue ? initialValue : arr[0];
        let startIndex = hasInitialValue ? 0 : 1;

        // Trường hợp mảng rỗng và không có initialValue -> Ném lỗi giống spec của JavaScript
        if (arr.length === 0 && !hasInitialValue) {
            throw new TypeError("Reduce of empty array with no initial value");
        }

        for (let i = startIndex; i < arr.length; i++) {
            // Callback nhận vào: (biến tích lũy, phần tử hiện tại, chỉ số index, mảng gốc)
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        
        return accumulator;
    }
};
// CHẠY SCRIPT TEST (ĐẢM BẢO TOÀN BỘ ĐỀU PASS)
console.log("--- TEST MAP ---");
console.log(miniArray.map([1, 2, 3], x => x * 2));        // Khớp kỳ vọng → [2, 4, 6]

console.log("\n--- TEST FILTER ---");
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // Khớp kỳ vọng → [3, 4]

console.log("\n--- TEST REDUCE ---");
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // Khớp kỳ vọng → 10

// Test nâng cao cho reduce khi không truyền initialValue
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b));    // Vẫn chạy đúng → 10
```
