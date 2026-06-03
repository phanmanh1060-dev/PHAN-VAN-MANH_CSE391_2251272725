
function playGame() {
    // 1. Máy sinh số ngẫu nhiên từ 1 đến 100
    // Math.random() ra số từ 0 đến cận 1 -> Nhân 100 + làm tròn xuống + cộng 1
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    // Khai báo các biến quản lý trạng thái game
    const maxAttempts = 7;      // Giới hạn số lần đoán
    let attempts = 0;           // Đếm số lần đã đoán
    const guessedHistory = [];  // Mảng lưu lại các số user đã từng đoán
    let isWin = false;          // Trạng thái thắng game

    alert("Trò chơi bắt đầu! Hãy bấm OK để đưa ra lượt đoán đầu tiên.");

    // 2. Vòng lặp chính của game (chạy cho đến khi hết lượt hoặc thắng)
    while (attempts < maxAttempts) {
        let remainingTurns = maxAttempts - attempts;
        let userInput = prompt(`[Lượt ${attempts + 1}/${maxAttempts}] Nhập một số từ 1 đến 100:\n(Số lượt còn lại: ${remainingTurns})`);

        // Xử lý trường hợp user nhấn "Cancel" ở ô prompt
        if (userInput === null) {
            alert("Bạn đã thoát game!");
            return; 
        }

        // 3. Ép kiểu dữ liệu từ String sang Number
        // Dùng Number() để đảm bảo tính tường minh
        let guess = Number(userInput.trim());

        // 4. VALIDATE INPUT (Kiểm tra dữ liệu đầu vào)
        // Kiểm tra nếu không phải là số hợp lệ, hoặc trống, hoặc nằm ngoài khoảng 1-100
        if (userInput.trim() === "" || Number.isNaN(guess) || guess < 1 || guess > 100) {
            alert(" Lỗi: Vui lòng chỉ nhập một số NGUYÊN hợp lệ trong khoảng từ 1 đến 100!");
            continue; // Bỏ qua lượt này, bắt nhập lại, không tính vào số lần đoán
        }

        // 5. VALIDATE LỊCH SỬ ĐOÁN (Tránh đoán trùng số)
        let isDuplicated = false;
        for (let i = 0; i < guessedHistory.length; i++) {
            if (guessedHistory[i] === guess) {
                isDuplicated = true;
                break;
            }
        }

        if (isDuplicated) {
            alert(` Cảnh báo: Bạn đã đoán số ${guess} này rồi! Hãy chọn số khác.`);
            continue; // Bỏ qua lượt này, không trừ lượt đoán
        }

        // Nếu hợp lệ hoàn toàn, thêm số vừa đoán vào lịch sử và tăng số lần đoán lên
        guessedHistory.push(guess);
        attempts++;

        // 6. KIỂM TRA ĐÁP ÁN VÀ ĐƯA RA GỢI Ý
        if (guess === targetNumber) {
            isWin = true;
            alert(` Đúng rồi! Đáp án chính xác là ${targetNumber}.\n Bạn đoán đúng sau ${attempts} lần!`);
            break; // Thoát vòng lặp ngay lập tức vì đã thắng
        } else if (guess < targetNumber) {
            alert("📈 Thấp hơn! Số của máy lớn hơn số bạn đoán.");
        } else {
            alert("📉 Cao hơn! Số của máy nhỏ hơn số bạn đoán.");
        }
    }

    // 7. XỬ LÝ KẾT CỤC THUA CUỘC
    if (!isWin) {
        alert(` Hết lượt mất rồi! Bạn đã thua cuộc.\n🎯 Đáp án chính xác của máy là: ${targetNumber}.\nChúc bạn may mắn lần sau!`);
    }
}

// Tự động chạy game ngay khi vừa tải trang xong lần đầu tiên
playGame();