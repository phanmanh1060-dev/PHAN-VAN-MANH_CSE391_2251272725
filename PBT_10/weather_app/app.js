// --- CẤU HÌNH DOM ELEMENTS ---
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const historyList = document.getElementById('history-list');

// Các State UI
const stateLoading = document.getElementById('state-loading');
const stateError = document.getElementById('state-error');
const stateSuccess = document.getElementById('state-success');
const errorMessage = document.getElementById('error-message');

// Các phần tử hiển thị dữ liệu thành công
const wCity = document.getElementById('w-city');
const wIcon = document.getElementById('w-icon');
const wTemp = document.getElementById('w-temp');
const wDesc = document.getElementById('w-desc');
const wHumidity = document.getElementById('w-humidity');

// --- BẢN ĐỒ MÃ THỜI TIẾT WMO CODE SANG ICON & TIẾNG VIỆT ---
function interpretWeatherCode(code) {
    const mapping = {
        0: { desc: "Trời quang đãng", icon: "☀️" },
        1: { desc: "Ít mây", icon: "🌤️" },
        2: { desc: "Mây rải rác", icon: "⛅" },
        3: { desc: "Nhiều mây", icon: "☁️" },
        45: { desc: "Có sương mù", icon: "🌫️" },
        48: { desc: "Sương mù đóng băng", icon: "🌫️" },
        51: { desc: "Mưa phùn nhỏ", icon: "🌧️" },
        61: { desc: "Mưa nhẹ", icon: "🌧️" },
        63: { desc: "Mưa vừa", icon: "🌧️" },
        65: { desc: "Mưa to", icon: "🌧️" },
        71: { desc: "Tuyết rơi nhẹ", icon: "❄️" },
        80: { desc: "Mưa rào nhẹ", icon: "🌦️" },
        95: { desc: "Có dông bão", icon: "⛈️" }
    };
    return mapping[code] || { desc: "Không xác định", icon: "🌍" };
}

// --- QUẢN LÝ BA STATES (CHUYỂN ĐỔI GIAO DIỆN) ---
function switchState(state, errorMsg = '') {
    // Ẩn tất cả các trạng thái trước
    stateLoading.classList.add('hidden');
    stateError.classList.add('hidden');
    stateSuccess.classList.add('hidden');

    // Bật trạng thái được yêu cầu
    if (state === 'LOADING') {
        stateLoading.classList.remove('hidden');
    } else if (state === 'ERROR') {
        errorMessage.textContent = errorMsg;
        stateError.classList.remove('hidden');
    } else if (state === 'SUCCESS') {
        stateSuccess.classList.remove('hidden');
    }
}

// --- HÀM CHÍNH: GỌI API INTEGRATION ---
async function fetchWeather(cityName) {
    if (!cityName.trim()) return;
    
    switchState('LOADING');

    try {
        // 1. Kiểm tra kết nối Internet cơ bản trước khi fetch
        if (!navigator.onLine) {
            throw new Error("Mất kết nối Internet. Vui lòng kiểm tra mạng.");
        }

        // Bước A: Gọi Geocoding API để đổi tên Thành phố sang Tọa độ (Vĩ độ/Kinh độ)
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) throw new Error("Không thể kết nối tới máy chủ dữ liệu.");
        const geoData = await geoResponse.json();

        // Kiểm tra xem thành phố có tồn tại không
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Thành phố "${cityName}" không tồn tại trên hệ thống.`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Bước B: Gọi API thời tiết thực tế bằng tọa độ vừa lấy được
        // Note: Lấy thêm thuộc tính relative_humidity_2m ở current để có Độ ẩm
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Lỗi tải dữ liệu thời tiết.");
        const weatherData = await weatherResponse.json();

        // 2. Parse và Đổ dữ liệu vào giao diện (SUCCESS STATE)
        const current = weatherData.current;
        const weatherInfo = interpretWeatherCode(current.weather_code);

        wCity.textContent = `${name}, ${country}`;
        wTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
        wHumidity.textContent = `${current.relative_humidity_2m}%`;
        wDesc.textContent = weatherInfo.desc;
        wIcon.textContent = weatherInfo.icon;

        switchState('SUCCESS');

        // 3. Lưu thành phố vào LocalStorage sau khi tìm kiếm thành công
        saveToHistory(name);

    } catch (error) {
        // Xử lý STATE ERROR tập trung
        switchState('ERROR', error.message);
    }
}

// --- QUẢN LÝ LOCALSTORAGE & LỊCH SỬ TÌM KIẾM ---
function getHistory() {
    const history = localStorage.getItem('weather_history');
    return history ? JSON.parse(history) : [];
}

function saveToHistory(cityName) {
    let history = getHistory();
    
    // Xóa trùng lặp (nếu thành phố đã tồn tại trước đó, đưa nó lên đầu)
    history = history.filter(city => city.toLowerCase() !== cityName.toLowerCase());
    
    // Thêm vào vị trí đầu mảng
    history.unshift(cityName);
    
    // Giới hạn tối đa 5 thành phố gần nhất theo yêu cầu đề bài
    if (history.length > 5) {
        history.pop();
    }
    
    localStorage.setItem('weather_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<span style="color:#aaa; font-size:13px;">Chưa có lịch sử</span>';
        return;
    }

    history.forEach(city => {
        const item = document.createElement('span');
        item.className = 'history-item';
        item.textContent = city;
        
        // Sự kiện: Click vào phần tử lịch sử -> gọi lại tìm kiếm
        item.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        
        historyList.appendChild(item);
    });
}

// --- KHỞI TẠO CÁC SỰ KIỆN BAN ĐẦU (EVENT LISTENERS) ---
searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

// Tìm kiếm nhanh khi nhấn nút Enter trên bàn phím
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(cityInput.value);
    }
});

// Lần đầu tiên load trang: Render lại lịch sử cũ (nếu có)
renderHistory();