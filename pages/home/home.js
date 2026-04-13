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
document.addEventListener("DOMContentLoaded", renderHomeProjects);