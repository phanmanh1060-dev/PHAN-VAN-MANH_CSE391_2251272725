// --- DOM ELEMENTS ---
const form = document.querySelector('#registerForm');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const phone = document.querySelector('#phone');
const submitBtn = document.querySelector('#submitBtn');

const strengthBar = document.querySelector('#strengthBar');
const strengthText = document.querySelector('#strengthText');

const successModal = document.querySelector('#successModal');
const modalData = document.querySelector('#modalData');
const closeModalBtn = document.querySelector('#closeModalBtn');

// --- VALIDATION STATE MANAGEMENT ---
// Lưu trạng thái đúng/sai của từng ô input
const fieldStates = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// --- HELPER FUNCTIONS ---

// Thiết lập trạng thái hiển thị Lỗi
function setError(input, message) {
    const formControl = input.closest('.form-control');
    formControl.classList.remove('success');
    formControl.classList.add('error');
    
    const errorMsg = formControl.querySelector('.error-msg');
    errorMsg.textContent = message;
    
    const icon = formControl.querySelector('.status-icon');
    icon.textContent = '❌';

    fieldStates[input.id] = false;
    checkFormValidity();
}

// Thiết lập trạng thái hiển thị Thành công
function setSuccess(input) {
    const formControl = input.closest('.form-control');
    formControl.classList.remove('error');
    formControl.classList.add('success');
    
    const errorMsg = formControl.querySelector('.error-msg');
    errorMsg.textContent = '';
    
    const icon = formControl.querySelector('.status-icon');
    icon.textContent = '✅';

    fieldStates[input.id] = true;
    checkFormValidity();
}

// Bật/Tắt trạng thái nút Đăng ký dựa vào tất cả các ô input
function checkFormValidity() {
    const allValid = Object.values(fieldStates).every(state => state === true);
    submitBtn.disabled = !allValid;
}

// --- CORE VALIDATORS ---

// 1. Validate Username
function validateUsername() {
    const value = username.value.trim();
    if (value.length < 2 || value.length > 50) {
        setError(username, 'Tên phải nằm trong khoảng từ 2 đến 50 ký tự.');
    } else {
        setSuccess(username);
    }
}

// 2. Validate Email
function validateEmail() {
    const value = email.value.trim();
    // Regex chuẩn RFC 5322 kiểm tra định dạng email phổ thông
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!value) {
        setError(email, 'Email không được bỏ trống.');
    } else if (!emailRegex.test(value)) {
        setError(email, 'Định dạng email không hợp lệ (Ví dụ: abc@gmail.com).');
    } else {
        setSuccess(email);
    }
}

// 3. Password Strength Meter
function validatePassword() {
    const value = password.value;
    
    if (!value) {
        setError(password, 'Mật khẩu không được bỏ trống.');
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }

    // Các tiêu chí đánh giá
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    let strength = 0;

    if (value.length < 8) {
        // Dưới 8 ký tự mặc định là YẾU
        strength = 1; 
    } else {
        // Đạt từ 8 ký tự trở lên
        if (hasLetter && hasNumber) strength = 2; // Trung bình
        if (hasUpper && hasLower && hasNumber && hasSpecial) strength = 3; // Mạnh
        if (strength === 0) strength = 1; // Đủ 8 ký tự nhưng không kết hợp chữ + số
    }

    // Cập nhật giao diện thanh Progress Bar theo độ mạnh
    if (strength === 1) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'var(--error-color)';
        strengthText.textContent = 'Mật khẩu: Yếu (Đỏ)';
        strengthText.style.color = 'var(--error-color)';
        setError(password, 'Mật khẩu yếu (Phải có ít nhất 8 ký tự).');
    } else if (strength === 2) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'var(--warning-color)';
        strengthText.textContent = 'Mật khẩu: Trung bình (Vàng)';
        strengthText.style.color = 'var(--warning-color)';
        setSuccess(password);
    } else if (strength === 3) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--success-color)';
        strengthText.textContent = 'Mật khẩu: Mạnh (Xanh)';
        strengthText.style.color = 'var(--success-color)';
        setSuccess(password);
    }

    // Cập nhật lại trường xác nhận mật khẩu nếu nó đã có chữ
    if (confirmPassword.value) {
        validateConfirmPassword();
    }
}

// 4. Validate Confirm Password
function validateConfirmPassword() {
    const pswd = password.value;
    const confirmPswd = confirmPassword.value;

    if (!confirmPswd) {
        setError(confirmPassword, 'Vui lòng xác nhận lại mật khẩu.');
    } else if (pswd !== confirmPswd) {
        setError(confirmPassword, 'Mật khẩu xác nhận không khớp.');
    } else {
        setSuccess(confirmPassword);
    }
}

// 5. Validate Phone & Auto Input Masking (0901-234-567)
function handlePhoneInput(e) {
    // Chỉ lấy các chữ số, loại bỏ ký tự đặc biệt chữ cái khác khi user nhập
    let rawValue = e.target.value.replace(/\D/g, '');
    
    // Tạo cấu trúc định dạng tự động thêm dấu gạch
    let formattedValue = '';
    if (rawValue.length > 0) {
        formattedValue += rawValue.substring(0, 4);
    }
    if (rawValue.length > 4) {
        formattedValue += '-' + rawValue.substring(4, 7);
    }
    if (rawValue.length > 7) {
        formattedValue += '-' + rawValue.substring(7, 10);
    }

    // Gán lại giá trị định dạng vào input
    e.target.value = formattedValue;

    // Validate kiểm tra độ dài chữ số
    if (rawValue.length !== 10) {
        setError(phone, 'Số điện thoại phải chứa chính xác 10 chữ số.');
    } else {
        setSuccess(phone);
    }
}

// --- REAL-TIME EVENT ATTACHMENTS ---
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
phone.addEventListener('input', handlePhoneInput);

// --- MODAL EVENTS & FORM SUBMISSION ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload trang
    
    // Đổ dữ liệu thông tin tài khoản đã nhập vào modal
    modalData.innerHTML = `
        <strong>Họ và tên:</strong> ${username.value.trim()}<br>
        <strong>Email:</strong> ${email.value.trim()}<br>
        <strong>Số điện thoại:</strong> ${phone.value}<br>
        <strong>Trạng thái hệ thống:</strong> Đã lưu trữ tài khoản sạch!
    `;

    // Hiển thị modal
    successModal.classList.add('open');
});

// Sự kiện đóng modal, đồng thời reset form đăng ký
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('open');
    form.reset();
    
    // Đưa toàn bộ trạng thái và biểu tượng về ban đầu
    document.querySelectorAll('.form-control').forEach(control => {
        control.classList.remove('success', 'error');
        const icon = control.querySelector('.status-icon');
        if(icon) icon.textContent = '';
    });
    strengthBar.style.width = '0%';
    strengthText.textContent = '';
    
    // Reset object trạng thái
    Object.keys(fieldStates).forEach(key => fieldStates[key] = false);
    checkFormValidity();
});