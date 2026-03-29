let authHTML = `        <div class="header-container">
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
                <a href="../../pages/login/login.html" class="header-nav-login">Đăng nhập</a>
                <a href="../../pages/upload/upload.html" class="header-nav-upload">Tải App lên</a>
            </div>
        </div>`
document.getElementsByTagName("header")[0].innerHTML = authHTML;