function getDisplayAuthor(author) {
    if (typeof author !== 'string') return author;
    if (!author.includes('@')) return author;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === author);
    return user?.name || author;
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (projectId) {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const data = projects.find(p => p.id == projectId);
        if (data) {
            const authorLabel = getDisplayAuthor(data.author);
            if (data.author !== authorLabel) {
                data.author = authorLabel;
                const index = projects.findIndex(p => p.id == projectId);
                if (index !== -1) {
                    projects[index] = data;
                    localStorage.setItem("projects", JSON.stringify(projects));
                }
            }
            document.querySelector(".app-hero img").src = data.logo;
            document.querySelector(".app-hero h1").textContent = data.appName;
            document.querySelector(".app-author").textContent = authorLabel;
            document.querySelector(".section-detail-bottom-gird-item-content-text").textContent = authorLabel;
            const screenshotContainer = document.querySelector(".screenshots");
            screenshotContainer.innerHTML = "";
            data.previews.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.className = "screen-img";
                screenshotContainer.appendChild(img);
            });
            const descBox = document.getElementById("display-detail");
            const originalDesc = data.description || "";
            const fullDesc = originalDesc.replace(/\n/g, "<br>");
            const truncatedText = originalDesc.length > 200 ? originalDesc.substring(0, 200) + "..." : originalDesc;
            const showMore = originalDesc.length > 200;

            descBox.innerHTML = `
                <h2 class="section-title">Mô tả ứng dụng</h2>
                <span id="desc-text"></span>
                ${showMore ? '<button id="btn-more">Xem thêm</button>' : ''}
            `;

            const descText = document.getElementById("desc-text");
            if (showMore) {
                descText.textContent = truncatedText;
                document.getElementById("btn-more").addEventListener("click", function() {
                    if (this.textContent === "Xem thêm") {
                        descText.innerHTML = fullDesc;
                        this.textContent = "Thu gọn";
                    } else {
                        descText.textContent = truncatedText;
                        this.textContent = "Xem thêm";
                    }
                });
            } else {
                descText.textContent = truncatedText;
            }
            document.querySelectorAll(".section-detail-bottom-gird-item-content-text")[1].textContent = data.uploadDate;
            document.querySelectorAll(".section-detail-bottom-gird-item-content-text")[3].textContent = data.category;
        }
    }
});