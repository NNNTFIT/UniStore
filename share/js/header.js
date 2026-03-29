function renderHeader() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    let authContent = "";
    const uploadBtn = `<a href="javascript:void(0)" onclick="handleUploadClick()" class="header-nav-upload">Tải App lên</a>`;

    if (loggedInUser) {
        authContent = `
            ${uploadBtn}
            <div class="user-profile">
                <img src="${loggedInUser.avatar}" class="user-avatar" onclick="toggleDropdown()">
                <div id="user-dropdown" class="dropdown-content">
                    <a href="#">Tài khoản</a>
                    <a href="#" onclick="handleLogout()">Đăng xuất</a>
                </div>
            </div>`;
    } else {
        authContent = `
            <a href="../../pages/login/login.html" class="header-nav-login">Đăng nhập</a>
            ${uploadBtn}
        `;
    }

    let headerHTML = `
        <div class="header-container">
            <a href="../../pages/home/index.html" class="logo">
                <img src="../../share/img/logo.svg" alt="">
                <p>UniStore</p>
            </a>
            <div class="header-nav">
                <a href="../../pages/home/index.html">Trang chủ</a>
                <a href="../../pages/explore/explore.html">Khám phá</a>
            </div>
            <div class="header-search">
                <input type="text" placeholder="Tìm kiếm ứng dụng">
            </div>
            <div class="header-nav-btn">
                ${authContent}
            </div>
        </div>`;

    document.getElementsByTagName("header")[0].innerHTML = headerHTML;
}
function handleUploadClick() {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
        window.location.href = "../../pages/upload/upload.html";
    } else {
        window.location.href = "../../pages/login/login.html";
    }
}
function toggleDropdown() {
    document.getElementById("user-dropdown").classList.toggle("show");
}

function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload();
}

window.onclick = function(e) {
    if (!e.target.matches('.user-avatar')) {
        const dropdown = document.getElementById("user-dropdown");
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}
renderHeader();