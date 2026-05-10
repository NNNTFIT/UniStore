  function renderHeader(){

        const loggedInUser =
            JSON.parse(localStorage.getItem("user"));

        let authContent = "";

        const uploadBtn = `
            <a href="../../pages/upload/upload.html"
               class="header-nav-upload">
               Đăng APK
            </a>
        `;

        if(loggedInUser){

            authContent = `

                ${uploadBtn}

                <div class="user-profile">

                    <!-- AVATAR GIỮ NGUYÊN -->

                    <img src="${loggedInUser.avatar}"
                         class="user-avatar"
                         onclick="toggleDropdown()">

                    <span class="user-name">
                        ${loggedInUser.name || loggedInUser.email}
                    </span>

                    <div id="user-dropdown"
                         class="dropdown-content">

                        <a href="../../pages/user/user.html">
                            Tài khoản
                        </a>

                        <a href="../../pages/admin/admin.html">
                            Quản lý sản phẩm
                        </a>

                        <a href="#"
                           onclick="handleLogout()">
                           Đăng xuất
                        </a>

                    </div>

                </div>
            `;

        }else{

            authContent = `
                <a href="../../pages/login/login.html"
                   class="header-nav-login">
                   Đăng nhập
                </a>

                ${uploadBtn}
            `;
        }

        document.querySelector("header").innerHTML = `

            <div class="header-container">

                <!-- LOGO GIỮ NGUYÊN -->

                <a href="../../pages/home/index.html"
                   class="logo">

                    <img src="../../share/img/logo.svg" alt="">

                    <p>UniStore</p>

                </a>

                <!-- DESKTOP -->

                <div class="header-nav">

                    <a href="../../pages/home/index.html">
                        Trang chủ
                    </a>

                    <a href="../../pages/explore/explore.html">
                        Khám phá
                    </a>

                </div>

                <!-- SEARCH -->

                <div class="header-search">

                    <input type="text"
                           placeholder="Tìm kiếm ứng dụng">

                </div>

                <!-- DESKTOP AUTH -->

                <div class="header-nav-btn desktop-auth">

                    ${authContent}

                </div>

                <!-- MOBILE -->

                <div class="mobile-right">

                    ${
                        loggedInUser
                        ?
                        `
                        <div class="user-profile">

                            <img src="${loggedInUser.avatar}"
                                 class="user-avatar"
                                 onclick="toggleDropdown()">

                            <div id="user-dropdown"
                                 class="dropdown-content">

                                <a href="../../pages/user/user.html">
                                    Tài khoản
                                </a>

                                <a href="../../pages/admin/admin.html">
                                    Quản lý sản phẩm
                                </a>

                                <a href="#"
                                   onclick="handleLogout()">
                                   Đăng xuất
                                </a>

                            </div>

                        </div>
                        `
                        :
                        ""
                    }

                    <!-- 3 GẠCH -->

                    <div class="hamburger">

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                </div>

            </div>

            <!-- MOBILE MENU -->

            <div class="mobile-menu">

                <div class="header-nav">

                    <a href="../../pages/home/index.html">
                        Trang chủ
                    </a>

                    <a href="../../pages/explore/explore.html">
                        Khám phá
                    </a>

                </div>

                <div class="header-nav-btn">

                    ${
                        loggedInUser
                        ?
                        uploadBtn
                        :
                        `
                        <a href="../../pages/login/login.html"
                           class="header-nav-login">
                           Đăng nhập
                        </a>

                        ${uploadBtn}
                        `
                    }

                </div>

            </div>
        `;

        initMenu();
    }


    function initMenu(){

        const hamburger =
            document.querySelector(".hamburger");

        const mobileMenu =
            document.querySelector(".mobile-menu");

        hamburger.addEventListener("click", function(){

            hamburger.classList.toggle("active");

            mobileMenu.classList.toggle("active");

        });
    }

    function toggleDropdown(){

        document
            .querySelectorAll("#user-dropdown")
            .forEach(dropdown => {

                dropdown.classList.toggle("show");

            });
    }

    function handleLogout(){

        localStorage.removeItem("user");

        location.reload();
    }

    window.addEventListener("click", function(e){

        if(!e.target.closest(".user-profile")){

            document
                .querySelectorAll("#user-dropdown")
                .forEach(dropdown => {

                    dropdown.classList.remove("show");

                });
        }

        if(
            !e.target.closest(".hamburger") &&
            !e.target.closest(".mobile-menu")
        ){

            const hamburger =
                document.querySelector(".hamburger");

            const mobileMenu =
                document.querySelector(".mobile-menu");

            if(hamburger && mobileMenu){

                hamburger.classList.remove("active");

                mobileMenu.classList.remove("active");
            }
        }
    });

    renderHeader();
