
/**
 * Hàm tính toán và in hóa đơn chi tiết
 * @param {Array} items - Danh sách món ăn [{ name, price, quantity }]
 * @param {string} dayOfWeek - Ngày trong tuần (e.g., "Monday", "Wednesday"...)
 * @param {boolean} includeTip - Có tính 5% tiền Tip hay không
 */
function printReceipt(items, dayOfWeek, includeTip = true) {
    // 1. Tính tổng tiền gốc (Subtotal)
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price * items[i].quantity;
    }

    // 2. Tính phần trăm giảm giá theo hạn mức bậc thang
    let discountPercent = 0;
    if (subtotal > 1000000) {
        discountPercent = 15; // Giảm 15% nếu > 1 triệu
    } else if (subtotal > 500000) {
        discountPercent = 10; // Giảm 10% nếu > 500k
    }

    // 3. Kiểm tra ngày Thứ Tư (Wednesday) để giảm thêm 5%
    if (dayOfWeek.trim().toLowerCase() === "wednesday") {
        discountPercent += 5;
    }

    // Tính số tiền được giảm
    const discountAmount = (subtotal * discountPercent) / 100;
    
    // Số tiền sau khi đã giảm giá
    const amountAfterDiscount = subtotal - discountAmount;

    // 4. Tính Thuế VAT (8%) và Tip (5% nếu có) dựa trên số tiền SAU GIẢM GIÁ
    const vatAmount = (amountAfterDiscount * 8) / 100;
    const tipAmount = includeTip ? (amountAfterDiscount * 5) / 100 : 0;

    // 5. Tổng số tiền cuối cùng phải thanh toán
    const finalTotal = amountAfterDiscount + vatAmount + tipAmount;

    // ===================================================
    // TIẾN HÀNH IN HÓA ĐƠN ĐỊNH DẠNG ĐẸP (KHUNG CỐ ĐỊNH 46 KÝ TỰ)
    // ===================================================
    
    // Hàm phụ trợ định dạng tiền tệ sang dạng "200.000đ" cho thuần Việt
    const formatMoney = (num) => num.toLocaleString('vi-VN') + "đ";

    console.log("Subtotal gốc để tính giảm giá:", formatMoney(subtotal));
    console.log(`Ngày ăn: ${dayOfWeek} (Tổng giảm giá: ${discountPercent}%)`);
    console.log("\n");

    console.log("╔══════════════════════════════════════════════╗");
    console.log("║              HÓA ĐƠN NHÀ HÀNG                ║");
    console.log("╠══════════════════════════════════════════════╣");

    // In danh sách các món ăn
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemTotal = item.price * item.quantity;
        
        // Chuỗi hiển thị thông tin số lượng và đơn giá (e.g., "x2    @65k")
        const qtyAndPrice = `x${item.quantity}`.padEnd(5) + `@${item.price / 1000}k`;
        
        // Tạo nội dung dòng (Tên món + số lượng đơn giá)
        const leftPart = `${i + 1}. ${item.name}`.padEnd(18) + qtyAndPrice;
        const rightPart = `= ${itemTotal / 1000}k`;
        
        // Căn lề hai bên cho vừa khít với khung trống bên trong (44 ký tự)
        const lineContent = leftPart.padEnd(36) + rightPart.padStart(8);
        console.log(`║ ${lineContent} ║`);
    }

    console.log("╠══════════════════════════════════════════════╣");

    // In các thông số tổng kết
    const printRow = (label, value) => {
        const content = label.padEnd(25) + value.padStart(19);
        console.log(`║ ${content} ║`);
    };

    printRow("Tổng cộng:", formatMoney(subtotal));
    printRow(`Giảm giá (${discountPercent}%):`, formatMoney(discountAmount));
    printRow("VAT (8%):", formatMoney(vatAmount));
    printRow(`Tip (${includeTip ? "5%" : "0%"}):`, formatMoney(tipAmount));

    console.log("╠══════════════════════════════════════════════╣");
    
    // In dòng tổng thanh toán đậm nét
    const finalContent = "THANH TOÁN:".padEnd(25) + formatMoney(finalTotal).padStart(19);
    console.log(`║ ${finalContent} ║`);
    
    console.log("╚══════════════════════════════════════════════╝");
}


// ==========================================
// KỊCH BẢN KIỂM THỬ (TEST CASES)
// ==========================================

// Test Case 1: Giống hệt mẫu của cậu (Không đạt ngưỡng giảm giá, đi ăn vào ngày Monday)
const order1 = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];
console.log("--- TEST CASE 1: ĐI ĂN NGÀY THỨ HAI ---");
printReceipt(order1, "Monday", true);

console.log("\n" + "=".repeat(50) + "\n");

// Test Case 2: Hóa đơn khủng > 1 triệu + đi ăn đúng ngày Thứ Tư vàng (Wednesday) để xem giảm giá cộng dồn
const order2 = [
    { name: "Lẩu Cá Hồi", price: 450000, quantity: 2 },
    { name: "Sashimi Tổng Hợp", price: 250000, quantity: 1 },
    { name: "Bia Sài Gòn", price: 20000, quantity: 10 }
];
console.log("--- TEST CASE 2: ĐI ĂN NGÀY THỨ TƯ VÀNG (> 1 TRIỆU) ---");
printReceipt(order2, "Wednesday", true);