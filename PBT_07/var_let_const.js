// ==========================================
// FILE: var_let_const.js
// BÀI TẬP KIỂM TRA ĐẦU RA - CHƯƠNG 03
// ==========================================

console.log("--- BẮT ĐẦU CHẠY KIỂM TRA --- \n");

// ------------------------------------------
// Đoạn 1: Hiện tượng Hoisting với var
// ------------------------------------------
console.log("=== Đoạn 1 ===");
console.log("Kết quả in ra:");
console.log(x); 
var x = 5;
console.log("\n----------------------------------\n");


// ------------------------------------------
// Đoạn 5: Block Scope (Phạm vi khối mã) của let
// (Đẩy Đoạn 5 lên trước vì Đoạn 2, 3 sẽ gây lỗi dừng chương trình)
// ------------------------------------------
console.log("=== Đoạn 5 ===");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
console.log("\n----------------------------------\n");


// ------------------------------------------
// Đoạn 4: Tính chất Mutable của Object/Array với const
// ------------------------------------------
console.log("=== Đoạn 4 ===");
const arr = [1, 2, 3];
arr.push(4);
console.log("Mảng sau khi push:", arr);
console.log("\n----------------------------------\n");


// ------------------------------------------
// Đoạn 2 & Đoạn 3: Các đoạn sinh lỗi (Crash code)
// Mình bọc trong try...catch để chương trình không bị dừng đột ngột,
// giúp quan sát được thông báo lỗi thực tế của JavaScript.
// ------------------------------------------

console.log("=== Đoạn 2 (Kiểm tra TDZ) ===");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.error("Lỗi xuất hiện đúng như dự đoán:");
    console.error(error.message);
}
console.log("\n----------------------------------\n");


console.log("=== Đoạn 3 (Gán lại giá trị cho const) ===");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.error("Lỗi xuất hiện đúng như dự đoán:");
    console.error(error.message);
}

console.log("\n--- KẾT THÚC KIỂM TRA ---");