# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — Sync vs Async
- Dự đoán kết quả thứ tự Output
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
5 - Timeout 100ms
7 - Nested timeout
```
**Giải thích Event Loop, Microtask Queue, Macrotask Queue.**
- Để hiểu tại sao có thứ tự trên, chúng ta cần nắm rõ cách phối hợp giữa Call Stack, Microtask Queue và Macrotask Queue trong JavaScript Engine.
- Các khái niệm cốt lõi:
  + Call Stack (Ngăn xếp tiếng gọi): Nơi chứa các hàm đang được thực thi tuần tự (LIFO - Last In, First Out). JavaScript là đơn luồng (single-threaded), nên tại một thời điểm chỉ có một tác vụ được xử lý ở Call Stack.
  + Microtask Queue (Hàng đợi vi tác vụ): Chứa các tác vụ có độ ưu tiên cao, chủ yếu là các callback của Promise.then(), async/await, hoặc MutationObserver.
  + Macrotask Queue / Callback Queue (Hàng đợi đại tác vụ): Chứa các tác vụ có độ ưu tiên thấp hơn, như setTimeout, setInterval, setImmediate, hoặc các sự kiện I/O (click, scroll...).
⚠️ Quy tắc vàng của Event Loop: 
1. Thực thi toàn bộ code đồng bộ (Synchronous) trong Call Stack cho đến khi trống rỗng.
2. Kiểm tra và thực thi TẤT CẢ các tác vụ có trong Microtask Queue cho đến khi queue này sạch bóng.
3. Lấy MỘT (chỉ 1) tác vụ từ Macrotask Queue bỏ vào Call Stack để thực thi.
4. Lặp lại bước 2 (Kiểm tra lại Microtask Queue trước khi qua Macrotask tiếp theo).
**Phân tích từng bước thực thi (Step-by-Step)**
- Bước 1: Thực thi Code đồng bộ (Synchronous)
  + ```console.log("1 - Start")```: Chạy ngay lập tức -> In ra: 1 - Start.
  + ```setTimeout(..., 0)``` (Timeout 0ms): Được đẩy sang Web APIs xử lý. Vì thời gian chờ là 0ms, callback của nó (2 - Timeout 0ms) lập tức được đẩy vào Macrotask Queue.
  + ```Promise.resolve().then(...)``` (Promise 1): Callback của nó (3 - Promise) được đưa vào Microtask Queue.
  + ```console.log("4 - End")```: Chạy ngay lập tức -> In ra: 4 - End.
  + ```setTimeout(..., 100)``` (Timeout 100ms): Đẩy sang Web APIs. Sau 100ms, callback (5 - Timeout 100ms) mới được xếp vào Macrotask Queue.Promise.
  + ```resolve().then(...)``` (Promise 2): Callback của nó được đưa vào Microtask Queue.
  + **Trạng thái hiện tại sau khi chạy xong code đồng bộ:**
    + Màn hình đã in: 1 - Start, 4 - End
    + Microtask Queue: [Callback Promise 1, Callback Promise 2]
    + Macrotask Queue: [Callback Timeout 0ms] (Còn Timeout 100ms đang đợi Web APIs đếm giờ).
- Bước 2: Quét sạch Microtask QueueTheo quy tắc, Event Loop sẽ ưu tiên xử lý hết Microtask trước.
  + Lấy Callback Promise 1 ra thực thi -> In ra: 3 - Promise.
  + Lấy Callback Promise 2 ra thực thi:
    + In ra: 6 - Promise 2.
    + Bên trong có một setTimeout(..., 0) (Nested timeout). Callback này lập tức được đẩy vào cuối Macrotask Queue.
  + Trạng thái hiện tại:
    + Màn hình đã in: 1 - Start, 4 - End, 3 - Promise, 6 - Promise 2
    + Microtask Queue: [] (Trống rỗng)
    + Macrotask Queue: [Callback Timeout 0ms, Callback Nested timeout]
Bước 3: Xử lý Macrotask Queue (Từng cái một)
Khi Microtask Queue đã trống, Event Loop chuyển sang Macrotask Queue.
  + Lấy Macrotask đầu tiên (Callback Timeout 0ms) -> In ra: 2 - Timeout 0ms.
  + Event Loop kiểm tra lại xem có Microtask mới không? Không có.
  + Lấy Macrotask tiếp theo (Callback Nested timeout) -> In ra: 7 - Nested timeout.
  + Sau cùng, khi đủ 100ms trôi qua, Callback Timeout 100ms được đẩy vào Macrotask Queue và được thực thi cuối cùng -> In ra: 5 - Timeout 100ms.

## Câu A2 (5đ) — Fetch API
**Giải thích chi tiếp từng dòng code:**
- ```async function getData() {``` : Định nghĩa một hàm bất đồng bộ (asynchronous function) tên là getData. Từ khóa async cho phép chúng ta sử dụng từ khóa await bên trong thân hàm và tự động biến hàm này luôn trả về một Promise.
- ```try {``` : Bắt đầu một khối lệnh try...catch để giám sát và xử lý bất kỳ lỗi (exception) nào có thể xảy ra trong quá trình thực thi các dòng code bên trong.
- ```const response = await fetch("https://api.example.com/data");``` : Gọi hàm fetch() để gửi một yêu cầu HTTP GET đến URL được chỉ định. Từ khóa await sẽ tạm dừng hàm getData cho đến khi Promise của fetch được giải quyết (resolved), sau đó gán đối tượng Response nhận được vào biến response.
- ```if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        ```
Kiểm tra xem phản hồi từ server có thành công hay không (HTTP status nằm trong khoảng 200-299). Nếu không thành công (!response.ok), hàm sẽ chủ động "ném" (throw) ra một lỗi mới kèm theo mã trạng thái HTTP, lập tức nhảy xuống khối catch.
- ```const data = await response.json();``` : Đọc luồng dữ liệu từ thân (body) của phản hồi và chuyển đổi (parse) nó từ định dạng chuỗi JSON thành một đối tượng JavaScript. Vì quá trình đọc và parse này là bất đồng bộ, chúng ta cần await để đợi nó hoàn thành trước khi gán kết quả vào biến data.
- ```return data;``` : Nếu mọi thứ trơn tru, hàm sẽ trả về dữ liệu đã được parse thành công. (Promise của hàm getData lúc này sẽ ở trạng thái fulfilled với giá trị là data).
- ```} catch (error) {``` : Khối lệnh này sẽ được kích hoạt nếu có bất kỳ lỗi nào xảy ra ở các dòng code nằm trong khối try phía trên. Biến error sẽ chứa thông tin về lỗi đó.
- ```console.error("Failed:", error.message);``` : Ghi log thông báo lỗi ra màn hình console để lập trình viên dễ dàng debug.
- ```return null;``` : Trả về null trong trường hợp xảy ra lỗi, giúp hàm không bị crash dữ dội mà vẫn trả về một giá trị an toàn để các hàm gọi nó phía sau xử lý tiếp.
**Giải thích:**
1. await fetch(...) — Fetch trả về gì? Tại sao cần await?
- fetch() trả về gì? Hàm fetch() ngay lập tức trả về một Promise, mà khi được giải quyết (resolved) sẽ trả ra một đối tượng Response (đây mới chỉ là phần headers và thông tin cấu hình của phản hồi, chưa bao gồm dữ liệu body hoàn chỉnh).
- Tại sao cần await? Vì việc gửi yêu cầu qua mạng Internet mất thời gian (bất đồng bộ). await được dùng để tạm dừng việc thực thi hàm, đợi cho đến khi server phản hồi xong và Promise chuyển sang trạng thái thành công, giúp ta lấy được đối tượng Response để xử lý tiếp theo kiểu tuần tự (giống code đồng bộ).
2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.
- Khi nào false? Thuộc tính response.ok sẽ trả về false khi mã trạng thái HTTP (HTTP status code) trả về từ server nằm ngoài khoảng 200–299. Điều này có nghĩa là server đã nhận được request nhưng phản hồi rằng có lỗi xảy ra phía client hoặc server.
- 3 status codes tương ứng:
  + 404 (Not Found - Không tìm thấy trang/API).
  + 500 (Internal Server Error - Lỗi hệ thống phía server).
  + 403 (Forbidden - Bị từ chối truy cập / Không có quyền).
3. response.json() — Tại sao cần await lần nữa?
- Tại sao cần await? Đối tượng Response nhận từ fetch ban đầu mới chỉ là các thông tin Metadata (Headers, Status...). Phần thân dữ liệu (Body) thực tế vẫn đang được truyền về dưới dạng một luồng dữ liệu (Stream).
- Hàm .json() đảm nhận nhiệm vụ đọc toàn bộ luồng dữ liệu này và parse nó thành object. Quá trình đọc stream qua mạng này tốn thời gian (bất đồng bộ), nên bản thân .json() cũng trả về một Promise. Vì vậy ta bắt buộc phải sử dụng await lần thứ hai để đợi quá trình parse này hoàn tất.
4. try...catch — Catch những lỗi gì?
- Khối catch trong đoạn code trên sẽ "bắt" được các loại lỗi sau:
- Network Error (Lỗi mạng): Có lỗi kết nối vật lý như mất mạng Internet, DNS bị lỗi, Server bị sập hoàn toàn không thể phản hồi, hoặc bị chặn bởi chính sách CORS. (Lúc này fetch sẽ tự động reject).
- Lỗi do lập trình viên tự ném ra (throw new Error): Chính là đoạn code if (!response.ok) { throw new Error(...) }. Khi gặp các lỗi HTTP như 404 hay 500, bản thân fetch không tự coi là lỗi (nó vẫn kết nối thành công tới server), nên ta phải tự throw để catch có thể bắt được.
- JSON Parse Error (Lỗi cú pháp JSON): Nếu server phản hồi thành công (ví dụ 200 OK) nhưng dữ liệu trả về lại là một chuỗi HTML lỗi hoặc text thông thường chứ không phải format JSON hợp lệ, hàm response.json() sẽ bị lỗi và khối catch sẽ bắt được lỗi này.

## Câu A3 (5đ) — Promise States
- Sơ đồ 3 trạng thái của Promise:
```
+-------------------+
                  |      PENDING      |  (Đang chờ xử lý,
                  |                   |   chưa có kết quả)
                  +-------------------+
                    /               \
          resolve() /                 \ reject()
                   /                   \
                  v                     v
        +-------------------+     +-------------------+
        |     FULFILLED     |     |     REJECTED      |
        |  (Thành công,     |     |  (Thất bại,       |
        |   có dữ liệu)     |     |   có lỗi/error)   |
        +-------------------+     +-------------------+
```
- Callback Hell là gì?
  + Callback Hell (hay còn gọi là Pyramid of Doom - Kim tự tháp hủy diệt) là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng thông qua các hàm gọi lại (callback).
  + Khi một tác vụ bất đồng bộ phụ thuộc vào kết quả của một tác vụ bất đồng bộ trước đó, lập trình viên buộc phải viết mã lồng vào trong. Khi số lượng tác vụ tăng lên, mã nguồn sẽ phát triển theo chiều ngang (bị thụt đầu dòng quá sâu), dẫn đến cấu trúc code có dạng hình tam giác/kim tự tháp.
  + Hậu quả của Callback Hell:
    + Cực kỳ khó đọc và bảo trì: Rất khó để tracking luồng chạy của dữ liệu.
    + Trầm cảm khi debug: Việc bắt lỗi (try...catch hoặc xử lý tham số err) ở từng tầng trở nên rối rắm.
    + Khó tái sử dụng: Các hàm bị bó chặt và phụ thuộc khăng khít vào nhau.
- Ví dụ: Ví dụ 4 cấp callback hell → Refactor thành async/await.
**Bài toán giả định:** Quy trình mua hàng online gồm 4 bước liên tiếp: Đăng nhập (login) -> 2. Lấy giỏ hàng (getCart) -> 3. Thanh toán (checkout) -> 4. Gửi email xác nhận (sendEmail).
  
❌ Phiên bản "Callback Hell" (4 cấp lồng nhau)JavaScript// Giả định các hàm nhận vào callback cuối cùng
```
function login(username, callback) {
    setTimeout(() => callback(null, { userId: 1, name: username }), 500);
}
function getCart(userId, callback) {
    setTimeout(() => callback(null, { cartId: 101, items: ['Laptop'] }), 500);
}
function checkout(cartId, callback) {
    setTimeout(() => callback(null, { orderId: 999, total: 1500 }), 500);
}
function sendEmail(orderId, callback) {
    setTimeout(() => callback(null, `Email sent for order ${orderId}`), 500);
}

// Thực thi bóc tách dữ liệu theo kiểu Callback Hell
login("john_doe", (err, user) => {
    if (err) return console.error(err);
    console.log("Logged in:", user.name);

    getCart(user.userId, (err, cart) => {
        if (err) return console.error(err);
        console.log("Cart fetched:", cart.items);

        checkout(cart.cartId, (err, order) => {
            if (err) return console.error(err);
            console.log("Checkout success:", order.orderId);

            sendEmail(order.orderId, (err, result) => {
                if (err) return console.error(err);
                console.log(result); // Cấp lồng thứ 4
                // Hết phim! Code bị thụt lề thành hình kim tự tháp.
            });
        });
    });
});
```
**Phiên bản nâng cấp sạch đẹp với Async/Await.** Để dùng được async/await, trước hết ta chuyển đổi các hàm callback truyền thống thành các hàm trả về Promise (đây gọi là quá trình Promisify).
```
const login = (username) => new Promise(resolve => setTimeout(() => resolve({ userId: 1, name: username }), 500));
const getCart = (userId) => new Promise(resolve => setTimeout(() => resolve({ cartId: 101, items: ['Laptop'] }), 500));
const checkout = (cartId) => new Promise(resolve => setTimeout(() => resolve({ orderId: 999, total: 1500 }), 500));
const sendEmail = (orderId) => new Promise(resolve => setTimeout(() => resolve(`Email sent for order ${orderId}`), 500));

// Tiến hành Refactor quy trình xử lý chính
async function runOrderProcess() {
    try {
        const user = await login("john_doe");
        console.log("Logged in:", user.name);

        const cart = await getCart(user.userId);
        console.log("Cart fetched:", cart.items);

        const order = await checkout(cart.cartId);
        console.log("Checkout success:", order.orderId);

        const result = await sendEmail(order.orderId);
        console.log(result);
        
    } catch (error) {
        console.error("Quy trình bị lỗi tại bước nào đó:", error);
    }
}

// Chạy hàm quy trình
runOrderProcess();
```

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Chiến lược xử lý lỗi
1. **Lỗi mạng** (mất cân bằng mạng)
- Hiện tượng: Người dùng mất kết nối Wi-Fi/4G, đường truyền bị ngắt quãng giữa chừng. Lúc này fetch() sẽ lập tức trả về một Rejected Promise.
- Chiến lược xử lý:
  + Sử dụng thuộc tính navigator.onLine để kiểm tra trạng thái vật lý của mạng trước khi gửi request.
  + Lắng nghe sự kiện window.addEventListener('online/offline') để hiển thị một thanh thông báo cố định (Toast/Banner) thông báo: "Bạn đang ngoại tuyến. Một số tính năng có thể không hoạt động".
  + Đóng băng các nút bấm quan trọng (ví dụ: "Thanh toán", "Đặt mua") để tránh user kích hoạt lỗi lặp lại.
 
  
2. **Lỗi phản hồi API (HTTP Status 500, 404, 429)**
- Chúng ta sẽ bóc tách đối tượng response.status để đưa ra các kịch bản UX tương ứng:

| Mã lỗi HTTP	| Bản chất lỗi	| Chiến lược xử lý phía Client |
| :-- | :-- | :-- |
| 404 (Not Found)	| Sai URL hoặc Sản phẩm/Giỏ hàng không còn tồn tại trên hệ thống.	| Không thử lại. Chuyển hướng người dùng về trang danh sách sản phẩm hoặc hiện thông báo: "Sản phẩm này đã ngừng kinh doanh". |
| 500 (Internal Server Error)	| Hệ thống phía Server bị crash, lỗi cơ sở dữ liệu.	| Ghi log lỗi về hệ thống theo dõi (như Sentry). Hiển thị giao diện thân thiện: "Hệ thống đang bảo trì, vui lòng quay lại sau ít phút". |
| 429 (Too Many Requests) | User hoặc IP bị chặn do kích hoạt cơ chế chống dập API (Rate Limiting). | Tuyệt đối không tự động thử lại ngay. Đọc Header Retry-After từ server (nếu có) để biết cần đợi bao nhiêu giây, hiển thị bộ đếm ngược hoặc thông báo: "Thao tác quá nhanh, vui lòng đợi [X] giây trước khi thử lại". |

3. **Hết thời gian chờ (API chậm > 10 giây)**
- Mặc định, fetch() trên trình duyệt không có thời gian timeout cố định (thường kéo dài tới 1-2 phút tùy trình duyệt). Trong E-commerce, nếu khách hàng bấm "Thanh toán" mà phải đợi quá 10 giây, họ sẽ bỏ đi. Ta cần dùng AbortController để chủ động ngắt request quá hạn.
```
/**
 * Gửi yêu cầu fetch kèm theo cấu hình giới hạn thời gian (Timeout)
 * @param {string} url - Đường dẫn API
 * @param {number} ms - Thời gian chờ tối đa (mili-giây)
 * @param {object} options - Các cấu hình khác của fetch (method, body, headers...)
 */
async function fetchWithTimeout(url, ms = 10000, options = {}) {
    // 1. Khởi tạo bộ điều khiển hủy bỏ tác vụ
    const controller = new AbortController();
    const { signal } = controller;

    // 2. Thiết lập bộ đếm giờ: Hết thời gian ms sẽ kích hoạt hàm abort()
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        // 3. Truyền tín hiệu signal vào cấu hình fetch
        const response = await fetch(url, { ...options, signal });
        return response;
    } catch (error) {
        // 4. Bắt lỗi nếu nguyên nhân catch là do lệnh hủy abort() kích hoạt
        if (error.name === 'AbortError') {
            throw new Error(`Yêu cầu bị hủy: API phản hồi quá chậm vượt mức cho phép ${ms}ms`);
        }
        throw error; // Các lỗi mạng khác
    } finally {
        // 5. Xóa bộ đếm giờ nếu fetch thành công trước khi bị timeout nhằm tránh rò rỉ bộ nhớ
        clearTimeout(timeoutId);
    }
}

// ---- Cách sử dụng ----
// fetchWithTimeout("https://api.example.com/checkout", 10000) // Quá 10s sẽ tự ngắt
//     .then(res => console.log(res))
//     .catch(err => console.error(err.message));
```
4. **Thử lại logic (thử lại 3 lần nếu mạng bị lỗi)**
- Khi gặp lỗi mạng tạm thời (chập chờn), việc tự động thử lại (Retry Logic) sẽ giúp tăng tỷ lệ thành công của ứng dụng mà không làm phiền người dùng. Đoạn code dưới đây áp dụng kỹ thuật Exponential Backoff (Thời gian chờ tăng dần sau mỗi lần thất bại để tránh làm nghẽn thêm cho server).
```
/**
 * Tự động gửi lại yêu cầu fetch nếu gặp lỗi mạng chập chờn
 * @param {string} url - Đường dẫn API
 * @param {number} maxRetries - Số lần thử lại tối đa
 * @param {number} delay - Thời gian chờ ban đầu giữa các lần thử (ms)
 * @param {object} options - Cấu hình fetch
 */
async function fetchWithRetry(url, maxRetries = 3, delay = 1000, options = {}) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            
            // Nếu nhận phản hồi thành công hoặc lỗi Client (404) thì không cần thử lại
            if (response.ok || response.status === 404) {
                return response;
            }
            
            // Nếu lỗi 500 hoặc 429, ta có thể chọn ném lỗi để vòng lặp chạy tiếp lần thử sau
            throw new Error(`HTTP Error ${response.status}`);

        } catch (error) {
            // Nếu đã chạm tới giới hạn thử lại cuối cùng mà vẫn lỗi -> Báo tử/ném lỗi ra ngoài
            if (attempt === maxRetries) {
                throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn thất bại. Chi tiết: ${error.message}`);
            }

            // Tính toán thời gian đợi tăng dần (Exponential Backoff): Lần 1 đợi 1s, Lần 2 đợi 2s, Lần 3 đợi 4s...
            const backoffDelay = delay * Math.pow(2, attempt - 1);
            console.warn(`[Lần thử ${attempt} thất bại]: Đang đợi ${backoffDelay}ms trước khi thử lại...`);
            
            // Đợi hết thời gian bằng Promise trước khi tiếp tục vòng lặp sang lượt kế tiếp
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
        }
    }
}

// ---- Cách sử dụng ----
// fetchWithRetry("https://api.example.com/cart", 3, 1000)
//     .then(res => console.log("Thành công:", res))
//     .catch(err => alert(err.message));
```

## Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race
Bảng so sánh 4 phương thức xử lý Promise

| Phương pháp | Khi nào giải quyết (Fulfilled)? | Khi nào từ chối (Rejected)? | Trường hợp sử dụng thực tế |
| :-- | :--| :--| :-- |
| Promise.all()	| Khi TẤT CẢ các Promise trong mảng đều thành công. Trả về mảng kết quả theo đúng thứ tự.	| Chỉ cần MỘT Promise thất bại. Nó sẽ hủy bỏ lập tức và ném ra lỗi của Promise đó (All-or-Nothing).	| Đồng bộ hóa các dữ liệu phụ thuộc nhau (ví dụ: Tải chi tiết bài viết + Danh sách bình luận của bài viết đó). |
| Promise.allSettled()	| Khi TẤT CẢ các Promise đều đã chạy xong (bất kể thành công hay thất bại). Không bao giờ bị từ chối.	| Không bao giờ bị từ chối. Luôn trả về một mảng chứa trạng thái và kết quả/lỗi của từng Promise.	| Xây dựng các Dashboard tổng hợp, nạp các widget độc lập hoặc thực hiện tải file hàng loạt (Bulk Upload). |
| Promise.race()	| Khi có MỘT Promise đầu tiên có kết quả (bất kể thành công hay thất bại). Ai nhanh nhất thì lấy.	| Khi Promise nhanh nhất trong mảng bị thất bại. | Thiết lập cơ chế Timeout cho các yêu cầu mạng (Network Request Timeout). |
| Promise.any()	| Khi có MỘT Promise đầu tiên thành công. Bản chất là đi tìm người thành công nhanh nhất.	| Khi TẤT CẢ các Promise trong mảng đều thất bại. Trả về một AggregateError.	| Gọi dữ liệu từ nhiều Server bản sao (Mirrors/CDNs), lấy dữ liệu từ server nào phản hồi thành công nhanh nhất. |

**Kịch bản Code thực tế cho từng phương pháp**
1. Promise.all() — Kịch bản: Khởi tạo dữ liệu trang chi tiết sản phẩm
- Khi vào trang sản phẩm, bạn cần gọi đồng thời thông tin sản phẩm và danh sách đánh giá. Nếu API thông tin sản phẩm lỗi, trang web không thể hiển thị gì cả, nên ta dùng Promise.all.
```
async function loadProductDetailPage(productId) {
    const productApi = fetch(`https://api.example.com/products/${productId}`).then(r => r.json());
    const reviewsApi = fetch(`https://api.example.com/products/${productId}/reviews`).then(r => r.json());

    try {
        // Chạy song song, nếu 1 trong 2 lỗi (đặc biệt là productApi) -> Nhảy xuống catch
        const [product, reviews] = await Promise.all([productApi, reviewsApi]);
        
        console.log("Hiển thị trang sản phẩm:", product.name);
        console.log(`Đã nạp ${reviews.length} đánh giá.`);
    } catch (error) {
        console.error("Lỗi nghiêm trọng, không thể mở trang:", error.message);
        // Hướng xử lý: Hiển thị giao diện báo lỗi hoặc Redirect sang trang 404
    }
}
```
2. Promise.allSettled() — Kịch bản: Gửi Email Marketing hàng loạt
- Bạn cần gửi thông báo cho 3 khách hàng. Nếu khách hàng thứ 2 bị lỗi email, hệ thống vẫn phải tiếp tục gửi cho khách hàng 1 và 3, đồng thời báo cáo lại cuối ngày email nào thất bại.
```
async function sendBulkEmails(users) {
    // Giả lập hàm gửi email trả về một Promise
    const sendEmail = (user) => fetch(`/api/send-email`, { method: 'POST', body: JSON.stringify(user) });

    const emailPromises = users.map(user => sendEmail(user));
    
    // Đợi tất cả chạy xong, không quan tâm có ai lỗi hay không
    const results = await Promise.allSettled(emailPromises);

    results.forEach((result, index) => {
        const user = users[index];
        if (result.status === "fulfilled") {
            console.log(`✅ Gửi thành công cho: ${user.email}`);
        } else {
            console.error(`❌ Gửi thất bại cho: ${user.email}. Lý do: ${result.reason}`);
            // Hướng xử lý: Lưu vào hàng đợi để gửi lại sau (Retry Queue)
        }
    });
}
```
3. Promise.race() — Kịch bản: Khống chế thời gian tải File nặng (Timeout)
- Bạn cho phép người dùng tải một file báo cáo PDF. Nếu quá 5 giây mà hệ thống chưa xử lý xong, ta phải ngắt và báo lỗi "Hệ thống bận" để tránh nghẽn băng thông của user.
```
function downloadReport(reportId) {
    const downloadTask = fetch(`/api/reports/${reportId}`).then(res => res.blob());
    
    // Tạo một Promise tự động reject sau 5 giây
    const timeoutTask = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Yêu cầu quá hạn (Timeout 5000ms)")), 5000)
    );

    // Cuộc đua: downloadTask thắng -> có file; timeoutTask thắng -> báo lỗi
    Promise.race([downloadTask, timeoutTask])
        .then(fileBlob => {
            console.log("Tải file thành công, tiến hành lưu file...", fileBlob);
        })
        .catch(error => {
            console.error("Thông báo UI:", error.message);
            // Hướng xử lý: Hiển thị popup "Mạng chậm, vui lòng thử lại sau"
        });
}
```
4. Promise.any() — Kịch bản: Lấy ảnh từ các máy chủ dự phòng (CDNs Mirror)
- Ứng dụng của bạn lưu trữ hình ảnh trên 3 server CDN quốc tế khác nhau (Châu Á, Châu Âu, Châu Mỹ). Bạn muốn người dùng lấy được ảnh nhanh nhất có thể từ server có tốc độ phản hồi tốt nhất vào thời điểm đó.
```
async function fetchAvatarFromCDNs(userId) {
    const cdnAsia = fetch(`https://asia.cdn.com/avatars/${userId}`).then(r => r.blob());
    const cdnAmerica = fetch(`https://america.cdn.com/avatars/${userId}`).then(r => r.blob());
    const cdnEurope = fetch(`https://europe.cdn.com/avatars/${userId}`).then(r => r.blob());

    try {
        // Lấy dữ liệu từ CDN nào trả về "thành công" nhanh nhất
        const fastestAvatarBlob = await Promise.any([cdnAsia, cdnAmerica, cdnEurope]);
        
        // Hiển thị ảnh lên giao diện ngay lập tức
        const imgUrl = URL.createObjectURL(fastestAvatarBlob);
        document.getElementById('avatar').src = imgUrl;
    } catch (aggregateError) {
        // Chỉ chạy vào đây nếu CẢ 3 CDN đều sập (tất cả đều bị reject)
        console.error("Tất cả CDNs đều lỗi:", aggregateError.errors);
        document.getElementById('avatar').src = "/images/default-avatar.png"; // Dùng ảnh local dự phòng
    }
}
```
