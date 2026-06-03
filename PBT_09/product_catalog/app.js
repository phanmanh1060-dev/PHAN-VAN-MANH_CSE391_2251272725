// --- 1. DATA SOURCE (Ít nhất 12 sản phẩm thuộc 4 categories) ---
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://placehold.co/250x200/4a90e2/fff?text=iPhone+16", rating: 4.9, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/250x200/34495e/fff?text=Galaxy+S24", rating: 4.8, inStock: true },
    { id: 3, name: "MacBook Air M3", price: 27490000, category: "laptop", image: "https://placehold.co/250x200/7f8c8d/fff?text=MacBook+Air", rating: 4.7, inStock: true },
    { id: 4, name: "ASUS ROG Zephyrus G14", price: 42500000, category: "laptop", image: "https://placehold.co/250x200/2c3e50/fff?text=ROG+G14", rating: 4.6, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/250x200/16a085/fff?text=iPad+Pro", rating: 4.9, inStock: true },
    { id: 6, name: "Samsung Galaxy Tab S9", price: 18490000, category: "tablet", image: "https://placehold.co/250x200/2980b9/fff?text=Galaxy+Tab", rating: 4.4, inStock: true },
    { id: 7, name: "Apple Watch Ultra 2", price: 21990000, category: "watch", image: "https://placehold.co/250x200/d35400/fff?text=Apple+Watch", rating: 4.8, inStock: true },
    { id: 8, name: "Garmin Fenix 7 Pro", price: 22490000, category: "watch", image: "https://placehold.co/250x200/27ae60/fff?text=Garmin+Fenix", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi 14 Ultra", price: 26990000, category: "phone", image: "https://placehold.co/250x200/c0392b/fff?text=Xiaomi+14", rating: 4.6, inStock: true },
    { id: 10, name: "Dell XPS 13 Plus", price: 45990000, category: "laptop", image: "https://placehold.co/250x200/8e44ad/fff?text=Dell+XPS", rating: 4.3, inStock: true },
    { id: 11, name: "Lenovo Tab P12 Pro", price: 12500000, category: "tablet", image: "https://placehold.co/250x200/7f8c8d/fff?text=Lenovo+Tab", rating: 4.2, inStock: false },
    { id: 12, name: "Galaxy Watch Ultra", price: 16990000, category: "watch", image: "https://placehold.co/250x200/f39c12/fff?text=Galaxy+Watch", rating: 4.5, inStock: true }
];

// --- 2. GLOBAL STATE ---
let cartCount = 0;
let filterCategory = "all";
let searchQuery = "";
let currentSort = "default";

// --- 3. DYNAMICALLY INITIALIZE LAYOUT (100% JS) ---
const root = document.querySelector("#root");

const container = document.createElement("div");
container.className = "container";

// Header
const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "Tech Catalog";
const cartContainer = document.createElement("div");
cartContainer.className = "cart-icon-container";
cartContainer.textContent = "🛒 Giỏ hàng";
const cartBadge = document.createElement("span");
cartBadge.className = "cart-badge";
cartBadge.textContent = "0";
cartContainer.appendChild(cartBadge);
header.append(title, cartContainer);

// Controls Panel
const controlsPanel = document.createElement("div");
controlsPanel.className = "controls-panel";

const searchSortGroup = document.createElement("div");
searchSortGroup.className = "search-sort-group";
const searchInput = document.createElement("input");
searchInput.id = "searchInput";
searchInput.placeholder = "Tìm kiếm sản phẩm...";
const sortSelect = document.createElement("select");
sortSelect.id = "sortSelect";
sortSelect.innerHTML = `
    <option value="default">Sắp xếp</option>
    <option value="price-asc">Giá tăng dần</option>
    <option value="price-desc">Giá giảm dần</option>
    <option value="name-asc">Tên A-Z</option>
    <option value="rating-desc">Đánh giá cao nhất</option>
`;
searchSortGroup.append(searchInput, sortSelect);

const categoryFilters = document.createElement("div");
categoryFilters.className = "category-filters";
const categories = ["all", "phone", "laptop", "tablet", "watch"];
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `btn filter-btn ${cat === 'all' ? 'active' : ''}`;
    btn.dataset.category = cat;
    btn.textContent = cat.toUpperCase();
    categoryFilters.appendChild(btn);
});

const themeBtn = document.createElement("button");
themeBtn.className = "btn btn-toggle";
themeBtn.textContent = "🌙 Dark Mode";

controlsPanel.append(searchSortGroup, categoryFilters, themeBtn);

// Product Grid Container
const productGrid = document.createElement("div");
productGrid.className = "product-grid";

container.append(header, controlsPanel, productGrid);
root.appendChild(container);


// --- 4. CORE ENGINE FUNCTIONS ---

// RENDER PRODUCTS
function renderProducts() {
    productGrid.innerHTML = ""; // Xóa danh sách cũ

    // Áp dụng bộ lọc và sắp xếp tuần tự từ mảng gốc
    let processedProducts = [...products];
    processedProducts = filterByCategory(processedProducts);
    processedProducts = searchProducts(processedProducts);
    processedProducts = sortProducts(processedProducts);

    if (processedProducts.length === 0) {
        const noProduct = document.createElement("p");
        noProduct.style.gridColumn = "1/-1";
        noProduct.style.textAlign = "center";
        noProduct.textContent = "Không tìm thấy sản phẩm phù hợp.";
        productGrid.appendChild(noProduct);
        return;
    }

    processedProducts.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = prod.id;

        const img = document.createElement("img");
        img.className = "product-img";
        img.src = prod.image;
        img.alt = prod.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = prod.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = prod.price.toLocaleString('vi-VN') + " đ";

        const meta = document.createElement("div");
        meta.className = "product-meta";
        const rating = document.createElement("span");
        rating.textContent = `⭐ ${prod.rating}`;
        const stock = document.createElement("span");
        stock.textContent = prod.inStock ? "Còn hàng" : "Hết hàng";
        stock.style.color = prod.inStock ? "#27ae60" : "#dc3545";
        meta.append(rating, stock);

        const addCartBtn = document.createElement("button");
        addCartBtn.className = "btn-add-cart";
        addCartBtn.textContent = "Thêm vào giỏ";
        
        // Ngăn chặn sự kiện nổi bọt để tránh mở nhầm Modal khi ấn nút giỏ hàng
        addCartBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        info.append(name, price, meta, addCartBtn);
        card.append(img, info);

        // Mở Modal chi tiết khi bấm vào Card
        card.addEventListener("click", () => openModal(prod));

        productGrid.appendChild(card);
    });
}

// FILTER BY CATEGORY
function filterByCategory(arr) {
    if (filterCategory === "all") return arr;
    return arr.filter(p => p.category === filterCategory);
}

// SEARCH REALTIME
function searchProducts(arr) {
    return arr.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

// SORT PRODUCTS
function sortProducts(arr) {
    if (currentSort === "price-asc") return arr.sort((a, b) => a.price - b.price);
    if (currentSort === "price-desc") return arr.sort((a, b) => b.price - a.price);
    if (currentSort === "name-asc") return arr.sort((a, b) => a.name.localeCompare(b.name));
    if (currentSort === "rating-desc") return arr.sort((a, b) => b.rating - a.rating);
    return arr; // default
}


// --- 5. MODAL SYSTEM (CREATE ON THE FLY) ---
function openModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "modal-close";
    closeBtn.innerHTML = "&times;";

    const title = document.createElement("h2");
    title.style.marginBottom = "15px";
    title.textContent = product.name;

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    img.style.marginBottom = "15px";

    const desc = document.createElement("p");
    desc.style.lineHeight = "1.6";
    desc.innerHTML = `
        <strong>Danh mục:</strong> ${product.category.toUpperCase()}<br>
        <strong>Giá bán:</strong> <span style="color:#e44d26; font-weight:bold">${product.price.toLocaleString('vi-VN')} đ</span><br>
        <strong>Đánh giá:</strong> ⭐ ${product.rating} / 5.0<br>
        <strong>Tình trạng kho:</strong> ${product.inStock ? "Còn hàng sẵn tại showroom" : "Liên hệ đặt trước"}
    `;

    content.append(closeBtn, title, img, desc);
    overlay.appendChild(content);
    root.appendChild(overlay);

    // Đóng Modal
    const closeModal = () => overlay.remove();
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => { if(e.target === overlay) closeModal(); });
}


// --- 6. EVENT ATTACHMENTS ---

// Xử lý ô Input Tìm kiếm (Realtime Search)
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Xử lý Combobox Sắp xếp
sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
});

// Xử lý bộ lọc Category (Event Delegation)
categoryFilters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    filterCategory = e.target.dataset.category;
    renderProducts();
});

// Xử lý nút Chuyển đổi giao diện (Dark Mode)
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }
});


// --- 7. RUN APP ---
renderProducts();