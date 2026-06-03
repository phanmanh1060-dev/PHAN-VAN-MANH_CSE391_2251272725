// --- STATE MANAGEMENT ---
// Trạng thái ứng dụng (Source of Truth)
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// --- DOM ELEMENTS ---
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');

// --- FUNCTIONS ---

// Lưu dữ liệu vào LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Hàm đếm số lượng items còn lại (chưa hoàn thành)
function updateCounter() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;
}

// Tạo cấu trúc phần tử DOM thuần túy (Không dùng innerHTML cho thẻ li)
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add('completed');
    }

    // Nếu đang trong trạng thái edit, hiển thị ô input
    if (todo.isEditing) {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;
        li.appendChild(editInput);
        
        // Tự động focus vào ô input khi double click
        setTimeout(() => editInput.focus(), 0);
    } else {
        // Text hiển thị công việc
        const span = document.createElement('span');
        span.className = 'todo-item-text';
        span.textContent = todo.text;
        li.appendChild(span);

        // Nút xóa tác vụ
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'destroy-btn';
        deleteBtn.textContent = '❌';
        li.appendChild(deleteBtn);
    }

    return li;
}

// Hàm hiển thị (Render) giao diện dựa trên State
function render() {
    // Xóa sạch list cũ trước khi render lại
    todoList.innerHTML = '';

    // Lọc danh sách theo bộ lọc hiện tại
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // 'all'
    });

    // Tạo các Node DOM và thêm vào cây danh sách
    filteredTodos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });

    // Cập nhật bộ đếm & lưu bộ nhớ tạm
    updateCounter();
    saveToLocalStorage();
}

// --- EVENT HANDLERS ---

// 1. Thêm mới Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now().toString(), // Tạo ID độc nhất ngẫu nhiên dựa trên thời gian
        text: text,
        completed: false,
        isEditing: false
    };

    todos.push(newTodo);
    todoInput.value = ''; // Reset input
    render();
});

// 2. EVENT DELEGATION: Lắng nghe sự kiện tại thẻ cha #todoList
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('.todo-item');
    if (!li) return;
    const todoId = li.dataset.id;

    // Chức năng: Xóa Todo (Click vào nút ❌)
    if (target.classList.contains('destroy-btn')) {
        todos = todos.filter(todo => todo.id !== todoId);
        render();
    }

    // Chức năng: Toggle Completed (Click vào đoạn chữ)
    if (target.classList.contains('todo-item-text')) {
        todos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        render();
    }
});

// Chức năng: Double-click để mở chế độ Edit (Sử dụng Event Delegation)
todoList.addEventListener('dblclick', (e) => {
    const target = e.target;
    if (target.classList.contains('todo-item-text')) {
        const li = target.closest('.todo-item');
        const todoId = li.dataset.id;

        todos = todos.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, isEditing: true };
            }
            return todo;
        });
        render();
    }
});

// Lắng nghe sự kiện bàn phím/blur trong chế độ Edit (Event Delegation)
todoList.addEventListener('keydown', (e) => {
    if (!e.target.classList.contains('edit-input')) return;
    
    const li = e.target.closest('.todo-item');
    const todoId = li.dataset.id;

    if (e.key === 'Enter') {
        const newText = e.target.value.trim();
        if (newText) {
            todos = todos.map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, text: newText, isEditing: false };
                }
                return todo;
            });
        } else {
            // Nếu xóa sạch chữ, hiểu là hành động xóa todo
            todos = todos.filter(todo => todo.id !== todoId);
        }
        render();
    }

    if (e.key === 'Escape') {
        // Hủy bỏ chỉnh sửa, giữ nguyên text cũ
        todos = todos.map(todo => {
            if (todo.id === todoId) return { ...todo, isEditing: false };
            return todo;
        });
        render();
    }
});

// Nếu user nhấn chuột ra ngoài khi đang sửa (Blur event), cũng lưu lại dữ liệu
todoList.addEventListener('focusout', (e) => {
    if (!e.target.classList.contains('edit-input')) return;
    const li = e.target.closest('.todo-item');
    const todoId = li.dataset.id;
    const newText = e.target.value.trim();

    if (newText) {
        todos = todos.map(todo => {
            if (todo.id === todoId) return { ...todo, text: newText, isEditing: false };
            return todo;
        });
    } else {
        todos = todos.filter(todo => todo.id !== todoId);
    }
    render();
});

// 3. Chức năng Filter: Chuyển đổi bộ lọc (All / Active / Completed)
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Thay đổi class active ở giao diện nút bấm
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Cập nhật State filter và render lại
        currentFilter = e.target.dataset.filter;
        render();
    });
});

// 4. Chức năng: Clear Completed (Xóa tất cả các todo đã hoàn thành)
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    render();
});

// --- CHẠY ỨNG DỤNG LẦN ĐẦU TIÊN (INITIAL RENDER) ---
render();