// --- 1. DATA SOURCE ---
const IMAGES = [
    { id: 1, title: "Cánh đồng xanh núi rừng", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80" },
    { id: 2, title: "Bãi biển hoàng hôn thơ mộng", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80" },
    { id: 3, title: "Thung lũng đá hùng vĩ", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80" },
    { id: 4, title: "Rừng trúc phủ sương mờ", url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&q=80" }
];

const COMMANDS = [
    { id: "theme", text: "Toggle Dark / Light Theme", shortcut: "T" },
    { id: "play", text: "Start Auto Slideshow", shortcut: "Space" },
    { id: "stop", text: "Stop Auto Slideshow", shortcut: "Space" },
    { id: "photo1", text: "Go to Photo 1: Cánh đồng", shortcut: "1" },
    { id: "photo2", text: "Go to Photo 2: Bãi biển", shortcut: "2" },
    { id: "photo3", text: "Go to Photo 3: Thung lũng", shortcut: "3" },
    { id: "photo4", text: "Go to Photo 4: Rừng trúc", shortcut: "4" }
];

// --- 2. GLOBAL STATE ---
let currentIndex = 0;
let isSlideshowPlaying = false;
let slideshowInterval = null;
let selectedCommandIndex = 0;
let lastActiveElement = null; // Lưu lại element focus trước khi mở modal để khôi phục focus

// --- 3. DOM ELEMENTS ---
const gridContainer = document.querySelector(".gallery-grid");
const lightboxModal = document.querySelector("#lightboxModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modal-image-title");
const closeModalBtn = document.querySelector("#closeModalBtn");
const prevImgBtn = document.querySelector("#prevImgBtn");
const nextImgBtn = document.querySelector("#nextImgBtn");

const playPauseBtn = document.querySelector("#playPauseBtn");
const slideshowStatus = document.querySelector("#slideshowStatus");

const commandPalette = document.querySelector("#commandPalette");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");

// --- 4. INIT APP & ACCESSIBILITY RENDER ---
function initGallery() {
    gridContainer.innerHTML = "";
    IMAGES.forEach((img, index) => {
        const item = document.createElement("button");
        item.className = "gallery-item";
        item.setAttribute("role", "listitem");
        item.setAttribute("aria-label", `Xem ảnh ${img.id}: ${img.title}`);
        
        const image = document.createElement("img");
        image.src = img.url;
        image.alt = img.title;
        
        item.appendChild(image);
        
        item.addEventListener("click", () => openLightbox(index));
        gridContainer.appendChild(item);
    });
    updateActiveThumb();
}

function updateActiveThumb() {
    const thumbs = document.querySelectorAll(".gallery-item");
    thumbs.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add("active");
            thumb.setAttribute("aria-current", "true");
        } else {
            thumb.classList.remove("active");
            thumb.removeAttribute("aria-current");
        }
    });
}

// --- 5. LIGHTBOX SYSTEM ---
function openLightbox(index) {
    lastActiveElement = document.activeElement; // Lưu vết vị trí focus cũ
    currentIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add("show");
    lightboxModal.setAttribute("aria-hidden", "false");
    closeModalBtn.focus(); // Đẩy focus vào trong modal chống thất lạc focus
}

function closeLightbox() {
    lightboxModal.classList.remove("show");
    lightboxModal.setAttribute("aria-hidden", "true");
    if (lastActiveElement) lastActiveElement.focus(); // Khôi phục lại tiêu điểm cũ
}

function updateLightboxContent() {
    const img = IMAGES[currentIndex];
    modalImage.src = img.url;
    modalImage.alt = img.title;
    modalTitle.textContent = img.title;
    updateActiveThumb();
}

function navigateLightbox(direction) {
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % IMAGES.length;
    } else if (direction === "prev") {
        currentIndex = (currentIndex - 1 + IMAGES.length) % IMAGES.length;
    }
    updateLightboxContent();
}

// --- 6. SLIDESHOW SYSTEM ---
function toggleSlideshow() {
    isSlideshowPlaying = !isSlideshowPlaying;
    if (isSlideshowPlaying) {
        playPauseBtn.textContent = "⏸️ Pause Slideshow";
        playPauseBtn.setAttribute("aria-label", "Dừng chạy slideshow tự động");
        slideshowStatus.textContent = "Đang chạy tự động...";
        slideshowInterval = setInterval(() => navigateLightbox("next"), 2500);
    } else {
        playPauseBtn.textContent = "▶️ Play Slideshow";
        playPauseBtn.setAttribute("aria-label", "Bắt đầu chạy slideshow tự động");
        slideshowStatus.textContent = "Đang dừng";
        clearInterval(slideshowInterval);
    }
}

// --- 7. COMMAND PALETTE (VS CODE STYLE) ---
function openCommandPalette() {
    lastActiveElement = document.activeElement;
    commandPalette.classList.add("show");
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    selectedCommandIndex = 0;
    renderCommands(COMMANDS);
    paletteInput.focus();
}

function closeCommandPalette() {
    commandPalette.classList.remove("show");
    commandPalette.setAttribute("aria-hidden", "true");
    if (lastActiveElement) lastActiveElement.focus();
}

function renderCommands(filteredList) {
    commandList.innerHTML = "";
    if (filteredList.length === 0) {
        const empty = document.createElement("li");
        empty.className = "command-item";
        empty.textContent = "Không tìm thấy lệnh phù hợp...";
        commandList.appendChild(empty);
        return;
    }

    filteredList.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.className = "command-item";
        li.setAttribute("role", "option");
        li.id = `cmd-opt-${index}`;
        
        if (index === selectedCommandIndex) {
            li.classList.add("selected");
            li.setAttribute("aria-selected", "true");
            paletteInput.setAttribute("aria-activedescendant", li.id);
        }

        const textSpan = document.createElement("span");
        textSpan.textContent = cmd.text;

        const kbd = document.createElement("kbd");
        kbd.textContent = cmd.shortcut;

        li.append(textSpan, kbd);

        // Sự kiện click chuột trực tiếp lên item của palette
        li.addEventListener("click", () => executeCommand(cmd.id));
        commandList.appendChild(li);
    });
}

function executeCommand(actionId) {
    closeCommandPalette();
    if (actionId === "theme") {
        document.body.classList.toggle("dark-theme");
    } else if (actionId === "play" && !isSlideshowPlaying) {
        toggleSlideshow();
    } else if (actionId === "stop" && isSlideshowPlaying) {
        toggleSlideshow();
    } else if (actionId.startsWith("photo")) {
        const photoNum = parseInt(actionId.replace("photo", "")) - 1;
        openLightbox(photoNum);
    }
}

// --- 8. GLOBAL KEYDOWN INTERCEPTOR (KEYBOARD SHORTCUTS) ---
document.addEventListener("keydown", (e) => {
    const isPaletteOpen = commandPalette.classList.contains("show");
    const isLightboxOpen = lightboxModal.classList.contains("show");

    // 1. Tổ hợp phím toàn cục: Ctrl + K mở Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isPaletteOpen) closeCommandPalette();
        else openCommandPalette();
        return;
    }

    // 2. Xử lý logic phím tắt khi Command Palette đang mở
    if (isPaletteOpen) {
        const currentFiltered = COMMANDS.filter(cmd => 
            cmd.text.toLowerCase().includes(paletteInput.value.toLowerCase())
        );

        if (e.key === "Escape") {
            closeCommandPalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % currentFiltered.length;
            renderCommands(currentFiltered);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + currentFiltered.length) % currentFiltered.length;
            renderCommands(currentFiltered);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentFiltered[selectedCommandIndex]) {
                executeCommand(currentFiltered[selectedCommandIndex].id);
            }
        }
        return; // Chặn các phím điều hướng ảnh ảnh hưởng tới Palette
    }

    // 3. Xử lý logic phím tắt khi Lightbox đang mở hoặc đang ở màn hình chính
    if (e.key === "Escape" && isLightboxOpen) {
        closeLightbox();
    } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
    } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
    } else if (e.key === " ") {
        // Space bar: Chặn scroll màn hình ngoài ý muốn và kích hoạt Slideshow
        e.preventDefault();
        toggleSlideshow();
    } else if (e.key >= "1" && e.key <= "4") {
        // Phím số 1-4 nhảy ảnh tương ứng
        const targetIdx = parseInt(e.key) - 1;
        if (isLightboxOpen) {
            currentIndex = targetIdx;
            updateLightboxContent();
        } else {
            openLightbox(targetIdx);
        }
    }
});

// Ô tìm kiếm lọc danh sách thời gian thực
paletteInput.addEventListener("input", () => {
    selectedCommandIndex = 0; // Reset dòng chọn về vị trí đầu tiên khi gõ lọc chữ
    const filtered = COMMANDS.filter(cmd => 
        cmd.text.toLowerCase().includes(paletteInput.value.toLowerCase())
    );
    renderCommands(filtered);
});

// Các sự kiện click chuột bổ trợ
closeModalBtn.addEventListener("click", closeLightbox);
prevImgBtn.addEventListener("click", () => navigateLightbox("prev"));
nextImgBtn.addEventListener("click", () => navigateLightbox("next"));
playPauseBtn.addEventListener("click", toggleSlideshow);

// --- 9. STARTUP ---
initGallery();