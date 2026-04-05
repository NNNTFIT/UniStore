document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (projectId) {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const data = projects.find(p => p.id == projectId);
        if (data) {
            document.querySelector(".app-hero img").src = data.logo;
            document.querySelector(".app-hero h1").textContent = data.appName;
            document.querySelector(".app-author").textContent = data.author;
            document.querySelector(".section-detail-bottom-gird-item-content-text").textContent = data.author;
            const screenshotContainer = document.querySelector(".screenshots");
            screenshotContainer.innerHTML = "";
            data.previews.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.className = "screen-img";
                screenshotContainer.appendChild(img);
            });
            const descBox = document.getElementById("display-detail");
            descBox.innerHTML = `
                <h2 class="section-title">Mô tả ứng dụng</h2>
                ${data.description.replace(/\n/g, "<br>")}
                <button id="btn-more">Xem thêm</button>
            `;
            document.querySelectorAll(".section-detail-bottom-gird-item-content-text")[1].textContent = data.uploadDate;
            document.querySelectorAll(".section-detail-bottom-gird-item-content-text")[3].textContent = data.category;
        }
    }
});