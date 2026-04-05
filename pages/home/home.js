function renderHomeProjects() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const container = document.querySelector(".carousel-container");
    projects.forEach(project => {
        const item = document.createElement("a");
        item.href = `../detail/detail.html?id=${project.id}`;
        item.className = "carousel-item";
        item.innerHTML = `
                <img src="${project.logo}" alt="" class="carousel-item-logo">
                <div class="carousel-item-title">${project.appName}</div>
                <div class="carousel-item-cre">${project.author}</div>
                <button class="carousel-item-btn" type="button">Chi tiết</button>
            `;
        container.prepend(item);
    });
}
document.addEventListener("DOMContentLoaded", renderHomeProjects);