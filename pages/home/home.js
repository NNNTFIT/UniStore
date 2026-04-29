// Khởi tạo dữ liệu mẫu nếu projects trống
function initializeSampleData() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    
    if (projects.length === 0) {
        const sampleProject = {
            id: 1,
            appName: "Canva",
            category: "Công cụ",
            description: "Canva là ứng dụng thiết kế đồ họa trực tuyến phổ biến, cho phép người dùng tạo ra các sản phẩm như poster, bài đăng mạng xã hội, slide thuyết trình hay video một cách dễ dàng. Với kho template phong phú, hình ảnh, icon và font chữ đa dạng, Canva giúp người dùng nhanh chóng tạo ra thiết kế đẹp mắt mà không cần nhiều kỹ năng chuyên môn. Ngoài ra, ứng dụng còn hỗ trợ chỉnh sửa ảnh, làm video, cộng tác nhóm và lưu trữ trên nền tảng đám mây, giúp quá trình làm việc trở nên linh hoạt và hiệu quả hơn.",
            author: "hẹ hẹ",
            authorEmail: "tn6421278@gmail.com",
            logo: "../../img/canva/image.png",
            previews: [
                "../../img/canva/unnamed (1).webp",
                "../../img/canva/unnamed (1).webp"
            ],
            fileName: "file.apk",
            uploadDate: new Date().toLocaleDateString('vi-VN')
        };
        localStorage.setItem("projects", JSON.stringify([sampleProject]));
    }
}

function getDisplayAuthor(author) {
    if (typeof author !== 'string') return author;
    if (!author.includes('@')) return author;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === author);
    return user?.name || author;
}

function renderHomeProjects() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const container = document.querySelector(".carousel-container");
    let updated = false;

    projects.forEach(project => {
        const authorLabel = getDisplayAuthor(project.author);
        if (project.author !== authorLabel) {
            project.author = authorLabel;
            updated = true;
        }

        const item = document.createElement("a");
        item.href = `../detail/detail.html?id=${project.id}`;
        item.className = "carousel-item";
        item.innerHTML = `
                <img src="${project.logo}" alt="" class="carousel-item-logo">
                <div class="carousel-item-title">${project.appName}</div>
                <div class="carousel-item-cre">${authorLabel}</div>
                <button class="carousel-item-btn" type="button">Chi tiết</button>
            `;
        container.prepend(item);
    });

    if (updated) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}
document.addEventListener("DOMContentLoaded", () => {
    initializeSampleData();
    renderHomeProjects();
});