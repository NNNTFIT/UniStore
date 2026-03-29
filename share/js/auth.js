function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function register(email, password) {
    const users = getUsers();

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        alert("Email đã tồn tại!");
        return false;
    }

    users.push({ email, password });
    saveUsers(users);

    alert("Đăng ký thành công!");
    window.location.href = "../../pages/login/login.html";
}
function login(email, password) {
    const users = getUsers();

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (user) {
        const loggedInUser = {
            email: user.email,
            avatar: `https://ui-avatars.com/api/?name=${user.email}&background=1570EF&color=fff`
        };

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location.href = "../../pages/home/index.html";
    } else {
        alert("Sai thông tin đăng nhập!");
    }
}