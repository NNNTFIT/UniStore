let authHTML = `        <div class="header-container">
            <div class="logo">
                <img src="../../share/img/logo.svg" alt="">
                <p>UniStore</p>
            </div>
            <div class="header-search">
                <input type="text" placeholder="Tìm kiếm ứng dụng">
            </div>
            <div class="header-nav">
                <a href="../../pages/home/index.html">Trang chủ</a>
                <a href="../../pages/explore/explore.html">Khám phá</a>
                <a href="../../pages/upload/upload.html" class="header-nav-upload">Tải App lên</a>
            </div>
        </div>`
document.getElementsByTagName("header")[0].innerHTML = authHTML;