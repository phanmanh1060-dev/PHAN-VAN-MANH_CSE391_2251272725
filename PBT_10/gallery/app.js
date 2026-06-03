// --- CẤU HÌNH TRẠNG THÁI (PAGINATION STATE) ---
let currentPage = 1;
const limitPerPage = 20;
let isLoading = false;

const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

// --- 1. PHƯƠNG THỨC TẢI HÌNH ẢNH TỪ API ---
async function fetchPhotos(page, limit) {
    // Sử dụng API Lorem Picsum để lấy danh sách ảnh
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error("Không thể nạp dữ liệu hình ảnh.");
    return await response.json();
}

async function loadMorePhotos() {
    if (isLoading) return; // Chặn trùng lặp request khi người dùng cuộn liên tục quá nhanh
    isLoading = true;

    try {
        const photos = await fetchPhotos(currentPage, limitPerPage);
        
        if (photos.length === 0) {
            // Hết ảnh trên server -> Ngắt theo dõi và ẩn loader đi
            loadMoreObserver.unobserve(loadTrigger);
            loadTrigger.innerHTML = "<p>🎉 Bạn đã xem hết tất cả hình ảnh!</p>";
            return;
        }

        // Tạo DocumentFragment để tối ưu hiệu năng chèn DOM liên tục
        const fragment = document.createDocumentFragment();

        photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            // Xử lý giảm độ phân giải ảnh (300x300) để làm thumbnail tối ưu dung lượng tải lưới
            const thumbnailSrc = `https://picsum.photos/id/${photo.id}/300/300`;
            const originalSrc = photo.download_url; // Đường dẫn chất lượng gốc khi click xem to

            item.innerHTML = `
                <div class="img-wrapper">
                    <img data-src="${thumbnailSrc}" alt="Photo by ${photo.author}">
                </div>
                <p>📸 Tác giả: ${photo.author}</p>
            `;

            // Đăng ký sự kiện click mở hộp thoại Lightbox ảnh lớn
            item.addEventListener('click', () => openLightbox(originalSrc, `Tác giả: ${photo.author}`));
            
            fragment.appendChild(item);
        });

        galleryGrid.appendChild(fragment);
        
        // Sau khi đưa các thẻ vào DOM, kích hoạt Lazy Load cho các tấm ảnh mới này
        initLazyLoading();

        currentPage++; // Tăng số trang lên cho lần cuộn kế tiếp
    } catch (error) {
        console.error("Lỗi nạp thư viện:", error);
    } finally {
        isLoading = false;
    }
}

// --- 2. TẢI HÌNH ẢNH LƯỜI BIẾNG (LAZY LOADING OBSERVER) ---
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Chuyển URL từ data-src sang src thực tế để trình duyệt bắt đầu tải file
            img.src = img.getAttribute('data-src');
            
            img.addEventListener('load', () => {
                img.classList.add('loaded'); // Tạo hiệu ứng mượt mà (Fade-in)
            });

            observer.unobserve(img); // Tải xong rồi thì ngừng theo dõi tấm ảnh này
        }
    });
}, {
    rootMargin: "0px 0px 200px 0px" // Tải trước ảnh khi nó cách khung nhìn phía dưới 200px (tăng độ mượt)
});

function initLazyLoading() {
    const images = galleryGrid.querySelectorAll('img[data-src]');
    images.forEach(img => lazyImageObserver.observe(img));
}

// --- 3. CUỘN VÔ HẠN (INFINITE SCROLL OBSERVER) ---
const loadMoreObserver = new IntersectionObserver((entries) => {
    // Khi phần tử chân trang #load-trigger bắt đầu giao thoa/xuất hiện ở đáy màn hình
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    threshold: 0.1 // Chỉ cần chạm nhẹ 10% diện tích là kích hoạt ngay
});

// Bắt đầu theo dõi phần tử chân trang kích hoạt
loadMoreObserver.observe(loadTrigger);

// --- 4. ĐIỀU KHIỂN HỘP THOẠI LIGHTBOX (MODAL VIEW) ---
function openLightbox(src, captionText) {
    lightboxImg.src = src;
    lightboxCaption.textContent = captionText;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Khóa thanh cuộn trang chính khi đang xem lightbox
}

function closeLightboxView() {
    lightbox.classList.add('hidden');
    lightboxImg.src = ''; // Xóa nguồn ảnh cũ để giải phóng bộ nhớ tạm thời
    document.body.style.overflow = ''; // Trả lại thanh cuộn bình thường
}

// Gán sự kiện đóng Lightbox
closeLightbox.addEventListener('click', closeLightboxView);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxView(); // Click ra ngoài vùng đen thì đóng modal
});

// Thêm trải nghiệm người dùng: Nhấn phím Escape (ESC) để đóng nhanh Lightbox
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightboxView();
    }
});