const refreshBtn = document.getElementById('refresh-btn');
const globalLoading = document.getElementById('global-loading');
const loadTimeDisplay = document.getElementById('load-time');

// Cấu hình danh sách các endpoint API cần fetch
const apiEndpoints = [
    "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true", // API 0: Thời tiết HN
    "https://jsonplaceholder.typicode.com/posts?_limit=4",                                       // API 1: Lấy 4 bài viết
    "https://dog.ceo/api/breeds/image/random"                                                    // API 2: Ảnh chó ngẫu nhiên
];

// Trình bao bọc xử lý fetch cơ bản và tự động quăng lỗi nếu HTTP Status không đạt 200-299
async function customFetch(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return await res.json();
}

// --- HÀM CHÍNH: KHỞI CHẠY DASHBOARD SONG SONG ---
async function loadDashboard() {
    const startTime = Date.now();
    
    // 1. Kích hoạt Loading tổng thể & dọn sạch nội dung cũ, chèn loading nội bộ cho từng Card
    globalLoading.classList.remove('hidden');
    refreshBtn.disabled = true;
    
    for (let i = 0; i < apiEndpoints.length; i++) {
        document.querySelector(`#widget-${i} .widget-content`).innerHTML = `
            <div class="widget-loading"><div class="spinner" style="margin:0 auto 10px;"></div>Đang tìm nạp...</div>
        `;
    }

    try {
        // 2. Kỹ thuật mấu chốt: Chạy song song và bắt trọn mọi trạng thái bất kể thành hay bại
        const results = await Promise.allSettled([
            customFetch(apiEndpoints[0]),
            customFetch(apiEndpoints[1]),
            customFetch(apiEndpoints[2])
        ]);

        // 3. Duyệt mảng kết quả trả về từ Promise.allSettled
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                // Thao tác thành công -> Đổ dữ liệu vào UI Widget tương ứng
                renderWidget(index, result.value);
            } else {
                // Thao tác thất bại -> Render thông báo lỗi riêng cho Widget đó, các Widget khác vẫn chạy
                renderWidgetError(index, result.reason.message);
            }
        });

    } catch (criticalError) {
        console.error("Lỗi hệ thống nghiêm trọng:", criticalError);
    } finally {
        // 4. Kết thúc: Tính toán thời gian phản hồi bằng mili-giây (ms) & Tắt hiệu ứng tải
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        loadTimeDisplay.textContent = `Dữ liệu được tải trong ${duration} ms (Vừa xong lúc: ${new Date().toLocaleTimeString()})`;
        globalLoading.classList.add('hidden');
        refreshBtn.disabled = false;
    }
}

// --- HÀM RENDER UI KHI THÀNH CÔNG (SUCCESS STATE) ---
function renderWidget(index, data) {
    const container = document.querySelector(`#widget-${index} .widget-content`);
    container.innerHTML = ''; // Xóa sạch chữ "Đang tìm nạp..."

    if (index === 0) {
        // Render Widget Thời Tiết
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        container.innerHTML = `
            <div class="temp-text">${temp}°C</div>
            <p>📍 Tọa độ: Hà Nội, VN</p>
            <p>💨 Tốc độ gió: ${wind} km/h</p>
        `;
    } 
    else if (index === 1) {
        // Render Widget Bài Viết JSONPlaceholder
        const listHtml = data.map(post => `<li><strong>${post.title.substring(0, 30)}...</strong></li>`).join('');
        container.innerHTML = `<ul class="post-list">${listHtml}</ul>`;
    } 
    else if (index === 2) {
        // Render Widget Dog Image
        container.innerHTML = `<img src="${data.message}" class="dog-img" alt="Random Dog">`;
    }
}

// --- HÀM RENDER UI KHI THẤT BẠI (ERROR STATE CỦA TIỆN ÍCH) ---
function renderWidgetError(index, errorMessage) {
    const container = document.querySelector(`#widget-${index} .widget-content`);
    container.innerHTML = `
        <div class="widget-error">
            <strong>⚠️ Lỗi tải dữ liệu:</strong>
            <p style="margin: 5px 0 0 0; font-size:13px;">${errorMessage || "Mất kết nối với máy chủ API."}</p>
        </div>
    `;
}

// --- ĐĂNG KÝ SỰ KIỆN KHỞI CHẠY ---
refreshBtn.addEventListener('click', loadDashboard);

// Tự động kích hoạt nạp dữ liệu ngay lần đầu truy cập trang
document.addEventListener('DOMContentLoaded', loadDashboard);