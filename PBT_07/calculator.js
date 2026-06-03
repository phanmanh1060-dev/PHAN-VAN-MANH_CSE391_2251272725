
/**
 * Hàm thực hiện phép tính toán học giữa hai số
 * @param {any} num1 - Số thứ nhất
 * @param {string} operator - Toán tử ("+", "-", "*", "/", "%", "**")
 * @param {any} num2 - Số thứ hai
 * @returns {number|string} Kết quả phép tính hoặc thông báo lỗi
 */
function calculate(num1, operator, num2) {
    // 1. Kiểm tra Edge Case: Input không phải là số hợp lệ
    // Sử dụng typeof để check kiểu, kết hợp với Number.isNaN để chặn trường hợp NaN
    if (typeof num1 !== "number" || typeof num2 !== "number" || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Kiểm tra Edge Case: Chia cho 0 (Áp dụng cho cả phép chia lấy dư %)
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // 3. Xử lý các phép tính dựa trên toán tử (Operator)
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        case "**":
            return num1 ** num2; // Phép toán lũy thừa (ES6)
        default:
            // Nếu lọt vào đây tức là toán tử truyền vào không nằm trong danh sách hỗ trợ
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}


console.log("--- BẮT ĐẦU KIỂM TRA MÁY TÍNH --- \n");

console.log("Test 1 (Cộng):", calculate(10, "+", 5));       // Mong đợi: 15
console.log("Test 2 (Chia 0):", calculate(10, "/", 0));      // Mong đợi: Lỗi: Không thể chia cho 0
console.log("Test 3 (Sai op):", calculate(10, "^", 5));      // Mong đợi: Lỗi: Operator '^' không hợp lệ
console.log("Test 4 (Sai type):", calculate("abc", "+", 5)); // Mong đợi: Lỗi: Input không phải số
console.log("Test 5 (Lũy thừa):", calculate(2, "**", 10));   // Mong đợi: 1024


console.log("Test 6 (Chia dư 0):", calculate(5, "%", 0));    // Mong đợi: Lỗi: Không thể chia cho 0
console.log("Test 7 (Dính số NaN):", calculate(NaN, "+", 5)); // Mong đợi: Lỗi: Input không phải số

console.log("\n--- KẾT THÚC KIỂM TRA ---");