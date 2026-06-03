

// ----------------------------------------------------------------
// VERSION 1: CLASSIC FIZZBUZZ (1 - 100)
// ----------------------------------------------------------------
function classicFizzBuzz() {
    console.log("=== VERSION 1: CLASSIC FIZZBUZZ (1 -> 100) ===");
    for (let i = 1; i <= 100; i++) {
        // Kiểm tra chia hết cho cả 3 và 5 trước (hoặc kiểm tra chia hết cho 15)
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}


// ----------------------------------------------------------------
// VERSION 2: CUSTOM FIZZBUZZ (Mở rộng linh hoạt với mọi quy luật)
// ----------------------------------------------------------------
/**
 * Hàm in ra các số từ 1 đến n theo bộ quy tắc động
 * @param {number} n - Số giới hạn trên cần in
 * @param {Array} rules - Mảng các object quy tắc [{ divisor, word }]
 */
function customFizzBuzz(n, rules) {
    console.log(`\n=== VERSION 2: CUSTOM FIZZBUZZ (1 -> ${n}) ===`);
    
    // Chạy vòng lặp từ 1 đến n
    for (let i = 1; i <= n; i++) {
        let outputStr = ""; // Chuỗi rỗng tích lũy các từ (Fizz/Buzz/Jazz...) nếu thỏa mãn

        // Duyệt qua từng quy tắc trong mảng rules để cộng dồn chuỗi
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            
            // Nếu số i hiện tại chia hết cho số divisor của quy tắc này
            if (i % rule.divisor === 0) {
                outputStr += rule.word; // Dán từ vào chuỗi kết quả
            }
        }

        // BIỆN LUẬN KẾT QUẢ:
        // Nếu outputStr vẫn rỗng -> Số i không chia hết cho bất kỳ divisor nào -> In ra chính số i
        // Nếu outputStr có chữ -> In chuỗi tích lũy ra (Ví dụ: "FizzJazz", "FizzBuzzJazz")
        if (outputStr === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${outputStr}"`);
        }
    }
}


// ==========================================
// KỊCH BẢN KIỂM THỬ (RUN TEST)
// ==========================================

// 1. Chạy bản Classic (Có thể comment dòng này lại nếu log ra quá dài)
classicFizzBuzz();

console.log("\n------------------------------------------------\n");

// 2. Chạy bản Custom với bộ 3 quy tắc: 3 (Fizz), 5 (Buzz), 7 (Jazz)
// Chạy đến số 105 để nhìn thấy rõ toàn bộ các pha giao nhau đỉnh cao
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);