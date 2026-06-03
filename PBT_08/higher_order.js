
// 1. pipe() — Nối chuỗi functions (Chạy từ trái qua phải)

function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị ban đầu (v)
    return function(v) {
        // Dùng reduce để luân chuyển kết quả qua từng hàm trong mảng fns
        return fns.reduce((result, currentFn) => currentFn(result), v);
    };
}

// Test pipe()
const processPipe = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(processPipe(5)); // → "Kết quả: 20"



// 2. memoize() — Caching kết quả dựa vào Closure

function memoize(fn) {
    // Object đóng vai trò là "nhà kho" lưu trữ kết quả (Cache)
    const cache = {};
    
    return function(...args) {
        // Biến mảng các tham số đầu vào thành một chuỗi key duy nhất
        const key = JSON.stringify(args);
        
        // Nếu trong kho đã có key này thì trả về luôn, không cần tính lại
        if (key in cache) {
            return cache[key];
        }
        
        // Nếu chưa có, tiến hành thực thi hàm gốc và lưu kết quả vào kho
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Test memoize()
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== TEST MEMOIZE ===");
console.log(expensiveCalc(1000000)); // In: "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // Lấy từ cache, không in "Đang tính..." -> 499999500000



// 3. debounce() — Trì hoãn thực thi cho tới khi user dừng tương tác

function debounce(fn, delay) {
    let timeoutId = null;
    
    return function(...args) {
        // Cứ mỗi khi hàm được kích hoạt, ta lập tức xóa bỏ bộ đếm thời gian cũ
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Thiết lập một bộ đếm thời gian mới
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// Test debounce()
console.log("\n=== TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Giả lập hành vi gõ bàn phím của người dùng liên tục
search("a");
search("ab");
search("abc"); // Chỉ có lần gọi cuối cùng này được thực thi sau 500ms dừng gõ.



// 4. retry() — Tự động chạy lại hàm bất đồng bộ khi gặp lỗi

async function retry(fn, maxAttempts = 3) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            // Thử thực thi hàm gốc (đợi cho tới khi có kết quả)
            return await fn();
        } catch (error) {
            attempts++;
            console.warn(`[Retry] Lần thử ${attempts} thất bại. Lỗi: ${error.message}`);
            
            // Nếu đã vượt quá số lần thử cho phép thì ném lỗi ra ngoài luôn
            if (attempts >= maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn thất bại!`);
            }
        }
    }
}

// Test retry()
console.log("\n=== TEST RETRY ===");
// Giả lập một hàm gọi API có tỷ lệ lỗi cao
let counter = 0;
const unstableAPI = async () => {
    counter++;
    if (counter < 3) {
        throw new Error("Lỗi kết nối Server 500");
    }
    return "Kết nối thành công! Data: { user: 'Minh' }";
};

// Thực thi bọc trong hàm tự động chạy (IIFE) để dùng await
(async () => {
    try {
        const data = await retry(unstableAPI, 4);
        console.log("👉 Kết quả cuối thu được:", data);
    } catch (err) {
        console.error("❌ Kết cục:", err.message);
    }
})();