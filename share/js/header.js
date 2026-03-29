function renderHeader() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    let authContent = "";
    if (loggedInUser) {
        authContent = `
            <a href="../../pages/upload/upload.html" class="header-nav-upload">Tải App lên</a>
            <div class="user-profile">
                <img src="${loggedInUser.avatar}" alt="Avatar" class="user-avatar" onclick="toggleDropdown()">
                <div id="user-dropdown" class="dropdown-content">
                    <a href="#">Tài khoản</a>
                    <a href="#" onclick="handleLogout()">Đăng xuất</a>
                </div>
            </div>`;
    } else {
        authContent = `
            <a href="../../pages/login/login.html" class="header-nav-login">Đăng nhập</a>
            <a href="../../pages/upload/upload.html" class="header-nav-upload">Tải App lên</a>`;
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
renderHeader();