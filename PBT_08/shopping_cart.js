function createCart() {
    // Private data - Không thể truy cập trực tiếp từ bên ngoài
    let items = [];
    let currentDiscountCode = "";

    // Định nghĩa cấu trúc các mã giảm giá hợp lệ
    const discountRates = {
        "SALE10": 0.1,    // Giảm 10%
        "SALE20": 0.2,    // Giảm 20%
        "FREESHIP": 30000 // Giảm thẳng 30.000đ
    };

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            // Tìm xem sản phẩm đã tồn tại trong giỏ chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Lưu bản sao và thêm thuộc tính quantity
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Lấy tổng số sản phẩm (tổng các quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },

        // 5. Tính tổng tiền (đã áp dụng discount nếu có)
        getTotal() {
            const subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            // Nếu chưa có mã hoặc mã không hợp lệ
            if (!currentDiscountCode || !discountRates[currentDiscountCode]) {
                return subTotal;
            }

            const discountValue = discountRates[currentDiscountCode];
            
            // Xử lý logic theo từng loại mã
            if (currentDiscountCode === "FREESHIP") {
                const finalTotal = subTotal - discountValue;
                return finalTotal < 0 ? 0 : finalTotal; // Tránh tiền âm
            } else {
                // Các mã dạng phần trăm (SALE10, SALE20)
                return subTotal * (1 - discountValue);
            }
        },

        // 6. Áp dụng mã giảm giá
        applyDiscount(code) {
            if (discountRates.hasOwnProperty(code)) {
                currentDiscountCode = code;
                console.log(`[Hệ thống] Áp dụng mã ${code} thành công!`);
            } else {
                console.log(`[Hệ thống] Mã giảm giá ${code} không hợp lệ!`);
            }
        },

        // 7. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            currentDiscountCode = "";
        },

        // 8. In giỏ hàng dạng bảng bằng console.table hoặc định dạng thủ công
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                const num = String(index + 1).padEnd(2);
                const name = item.name.padEnd(14);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString("vi-VN").padStart(11);
                const total = (item.price * item.quantity).toLocaleString("vi-VN").padStart(12);
                
                console.log(`│ ${num}│ ${name}│ ${qty} │ ${price} │ ${total} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            // Hiển thị thêm thông tin mã giảm giá nếu có
            if (currentDiscountCode) {
                console.log(`│ Mã giảm giá đang áp dụng: ${currentDiscountCode.padEnd(19)} │`);
                console.log("├──────────────────────────────────────────────┤");
            }
            
            const finalTotalStr = this.getTotal().toLocaleString("vi-VN") + "đ";
            console.log(`│ Tổng cộng: ${finalTotalStr.padStart(33)} │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}


// CHẠY SCRIPT TEST (THEO YÊU CẦU ĐỀ BÀI)


const cart = createCart();

// Thêm sản phẩm lần 1
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);

// Thêm sản phẩm trùng id để test tính năng cộng dồn quantity
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

// In giỏ hàng lần đầu
cart.printCart();

// Áp dụng mã giảm giá 10%
cart.applyDiscount("SALE10");

// In lại giỏ hàng xem giá đã giảm chưa
cart.printCart();

// Test đếm tổng số lượng item
console.log("Số SP:", cart.getItemCount()); // Kỳ vọng: 4 (2 iPhone + 2 AirPods)

// Test xóa sản phẩm AirPods Pro (id: 3)
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // Kỳ vọng: 2 (Chỉ còn 2 iPhone)