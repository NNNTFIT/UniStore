
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
        "unnamed.webp"
    ],
    fileName: "sample.apk",
    uploadDate: new Date().toLocaleDateString('vi-VN')
};

let projects = JSON.parse(localStorage.getItem("projects") || "[]");
if (!projects.some(p => p.id === sampleProject.id)) {
    projects.push(sampleProject);
    localStorage.setItem("projects", JSON.stringify(projects));
}

const logoInput = document.getElementById('logoInput');
const logoPreview = document.getElementById('logoPreview');
const plusIcon = document.getElementById('plusIcon');

document.querySelector('.logo-preview-box').onclick = () => {
    logoInput.click();
};

logoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        logoPreview.src = e.target.result;
        logoPreview.style.display = 'block';
        plusIcon.style.display = 'none';
    };
    reader.readAsDataURL(file);
});
const previewInput = document.getElementById('previewInput');
const previewBox = document.getElementById('previewBox');
const previewList = document.getElementById('previewList');
const placeholder = document.querySelector('.preview-placeholder');

let previewFiles = [];
const maxImages = 3;
previewBox.addEventListener("click", () => {
    previewInput.click();
});
previewInput.addEventListener("change", function () {
    const files = Array.from(this.files);

    files.forEach(file => {
        if (!file.type.startsWith("image/")) return;

        if (previewFiles.length < maxImages) {
            previewFiles.push(file);
        } else {
            alert("Chỉ tối đa 3 ảnh!");
        }
    });

    this.value = "";
    renderImages();
});
function renderImages() {
    previewList.innerHTML = "";
    placeholder.style.display = previewFiles.length === 0 ? "block" : "none";

    previewFiles.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const div = document.createElement("div");
            div.className = "preview-item";

            const img = document.createElement("img");
            img.src = e.target.result;

            const removeBtn = document.createElement("span");
            removeBtn.className = "preview-remove";
            removeBtn.innerText = "x";
            removeBtn.onclick = (ev) => {
                ev.stopPropagation();
                previewFiles = previewFiles.filter((_, i) => i !== index);
                renderImages();
            };

            div.appendChild(img);
            div.appendChild(removeBtn);
            previewList.appendChild(div);
        };

        reader.readAsDataURL(file);
    });
}
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const dropZone = document.getElementById('dropZone');
dropZone.onclick = () => fileInput.click();

fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        const file = this.files[0];

        if (!file.name.endsWith('.apk')) {
            alert("Chỉ nhận file .apk");
            this.value = "";
            fileNameDisplay.textContent = "";
            return;
        }

        fileNameDisplay.textContent = "Đã chọn: " + file.name;
    }
});
['dragover', 'dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

dropZone.addEventListener('dragover', () => {
    dropZone.classList.add('active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
    dropZone.classList.remove('active');

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        const file = files[0];

        if (file.name.endsWith('.apk')) {
            fileInput.files = files;
            fileNameDisplay.textContent = "Đã chọn: " + file.name;
        } else {
            alert("Chỉ nhận file .apk");
        }
    }
});
document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (previewFiles.length === 0) {
        alert("Vui lòng thêm ít nhất 1 ảnh minh hoạ!");
        return;
    }
    if (!fileInput.files.length) {
        alert("Vui lòng chọn file APK!");
        return;
    }
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    const newProject = {
        id: Date.now(),
        appName: document.getElementById('appName').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        author: loggedInUser.name || loggedInUser.email || "Người dùng",
        authorEmail: loggedInUser.email,
        logo: logoPreview.src,
        previews: [],
        fileName: fileInput.files[0].name,
        uploadDate: new Date().toLocaleDateString('vi-VN')
    };
    const images = document.querySelectorAll("#previewList img");
    images.forEach(img => newProject.previews.push(img.src));
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    projects.unshift(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Đăng dự án thành công!");
    window.location.href = "../home/index.html";
});