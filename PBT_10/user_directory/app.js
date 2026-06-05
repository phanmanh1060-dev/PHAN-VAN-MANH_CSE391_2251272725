// ==========================================
// 1. GLOBAL STATE (Quản lý trạng thái Client)
// ==========================================
let globalUsers = []; // Chứa danh sách users hiện tại trên ứng dụng

// ==========================================
// 2. API LAYER (Xử lý tác vụ mạng)
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Không thể tải danh sách người dùng.");
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`Không thể tải chi tiết user ID: ${id}`);
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error("Lỗi khi thêm người dùng mới.");
        return await response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!response.ok) throw new Error(`Không thể cập nhật user ID: ${id}`);
        return await response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Không thể xóa user ID: ${id}`);
        return true; // DELETE thành công
    }
};

// ==========================================
// 3. UI LAYER (Thao tác hiển thị DOM)
// ==========================================
const ui = {
    container: document.getElementById('user-container'),
    modal: document.getElementById('user-modal'),
    form: document.getElementById('user-form'),
    modalTitle: document.getElementById('modal-title'),
    toastContainer: document.getElementById('toast-container'),

    // READ: Render danh sách người dùng thành thẻ Card
    renderUsers(users) {
        this.container.innerHTML = '';
        if (users.length === 0) {
            this.container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Không tìm thấy người dùng phù hợp.</p>`;
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.setAttribute('data-id', user.id);
            
            // Lấy thông tin an toàn vì JSONPlaceholder trả về cấu trúc lồng nhau (company.name)
            const companyName = user.company?.name || user.company || 'Trống';

            card.innerHTML = `
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p class="email">📧 ${user.email}</p>
                    <p>📱 ĐT: ${user.phone || 'Chưa cập nhật'}</p>
                    <p>🏢 Công ty: ${companyName}</p>
                </div>
                <div class="user-actions">
                    <button class="btn btn-edit" onclick="handleEditClick(${user.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="handleDeleteClick(${user.id})">Xóa</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    },

    // LOADING STATES: Hiện Skeleton loader 6 thẻ mô phỏng dạng card sắp tải
    showLoading() {
        this.container.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-line skeleton-title"></div>
                <div class="skeleton-line skeleton-text"></div>
                <div class="skeleton-line skeleton-subtext"></div>
            `;
            this.container.appendChild(skeleton);
        }
    },

    hideLoading() {
        // Hàm renderUsers chạy sau đó sẽ tự động dọn sạch container
    },

    // TOAST NOTIFICATIONS (Alert/Toast hệ thống lỗi & thành công)
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        this.toastContainer.appendChild(toast);
        
        // Tự động biến mất sau 3 giây
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showError(message) { this.showToast(message, 'error'); },
    showSuccess(message) { this.showToast(message, 'success'); },

    // QUẢN LÝ ĐÓNG/MỞ DIALOG MODAL FORM
    openModal(title, userData = null) {
        this.modalTitle.textContent = title;
        this.form.reset(); // Clear sạch form
        document.getElementById('form-user-id').value = '';

        // Nếu có truyền data cũ vào -> Điền sẵn dữ liệu (Trường hợp UPDATE)
        if (userData) {
            document.getElementById('form-user-id').value = userData.id;
            document.getElementById('form-name').value = userData.name;
            document.getElementById('form-email').value = userData.email;
            document.getElementById('form-phone').value = userData.phone || '';
            document.getElementById('form-company').value = userData.company?.name || userData.company || '';
        }
        this.modal.classList.remove('hidden');
    },

    closeModal() {
        this.modal.classList.add('hidden');
    }
};

// ==========================================
// 4. APP EVENT CONTROL / HANDLERS (Bộ điều khiển logic nghiệp vụ)
// ==========================================

// Khởi chạy ứng dụng: Load data ban đầu
async function initApp() {
    ui.showLoading();
    try {
        globalUsers = await api.getUsers();
        ui.renderUsers(globalUsers);
    } catch (error) {
        ui.showError(error.message);
    }
}

// SEARCH FUNCTION: Bộ lọc Client-side (Tìm kiếm realtime không gọi mạng lại)
document.getElementById('search-input').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filteredUsers = globalUsers.filter(user => 
        user.name.toLowerCase().includes(keyword) || 
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filteredUsers);
});

// XỬ LÝ SỰ KIỆN SUBMIT FORM (Cả CREATE lẫn UPDATE)
ui.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('form-user-id').value;
    const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        company: document.getElementById('form-company').value
    };

    try {
        if (id) {
            // ---- THỰC HIỆN UPDATE (PUT) ----
            const updatedUser = await api.updateUser(id, formData);
            // Vì Mock API gán cứng ID trả về hoặc bị đổi cấu trúc, ta ép lại ID chuẩn local
            updatedUser.id = parseInt(id); 

            // Cập nhật trạng thái mảng local không reload trang
            const index = globalUsers.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) globalUsers[index] = updatedUser;

            ui.showSuccess("Cập nhật thông tin người dùng thành công!");
        } else {
            // ---- THỰC HIỆN CREATE (POST) ----
            const newUser = await api.createUser(formData);
            
            // Xử lý tạo ID giả cho local (vì JSONPlaceholder luôn trả về id: 11)
            newUser.id = globalUsers.length > 0 ? Math.max(...globalUsers.map(u => u.id)) + 1 : 1;
            
            // Thêm trực tiếp vào đầu danh sách local
            globalUsers.unshift(newUser);
            ui.showSuccess("Thêm người dùng mới thành công!");
        }

        ui.closeModal();
        ui.renderUsers(globalUsers); // Render lại giao diện mới cập nhật
        document.getElementById('search-input').value = ''; // Reset ô tìm kiếm
    } catch (error) {
        ui.showError(error.message);
    }
});

// Click nút "Edit" trên thẻ Card người dùng
async function handleEditClick(id) {
    // Tìm data trực tiếp từ mảng local để điền nhanh lên Form
    const user = globalUsers.find(u => u.id === id);
    if (user) {
        ui.openModal("Cập Nhật Thông Tin Người Dùng", user);
    }
}

// Click nút "Delete" trên thẻ Card người dùng
async function handleDeleteClick(id) {
    const user = globalUsers.find(u => u.id === id);
    if (!user) return;

    // Confirm dialog bắt buộc
    const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.name}" không?`);
    if (!isConfirmed) return;

    try {
        await api.deleteUser(id);
        
        // Xóa khỏi danh sách mảng local (Không reload trang)
        globalUsers = globalUsers.filter(u => u.id !== id);
        ui.renderUsers(globalUsers);
        
        ui.showSuccess("Xóa người dùng thành công!");
    } catch (error) {
        ui.showError(error.message);
    }
}

// --- GÁN SỰ KIỆN ĐÓNG MỞ MODAL BAN ĐẦU ---
document.getElementById('open-modal-btn').addEventListener('click', () => ui.openModal("Thêm Người Dùng Mới"));
document.getElementById('close-modal-btn').addEventListener('click', () => ui.closeModal());
document.getElementById('cancel-modal-btn').addEventListener('click', () => ui.closeModal());

// Khi click ra ngoài vùng Modal thì tự động đóng
window.addEventListener('click', (e) => {
    if (e.target === ui.modal) ui.closeModal();
});

// Chạy ứng dụng khi trình duyệt đã sẵn sàng
document.addEventListener('DOMContentLoaded', initApp);