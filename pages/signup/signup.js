function handleRegister() {
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng!");
        return;
    }
    let errors = [];

    if (password.length < 8) {
        errors.push("Ít nhất 8 ký tự");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Ít nhất 1 chữ hoa");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Ít nhất 1 số");
    }

    if (/\s/.test(password)) {
        errors.push("Không được chứa khoảng trắng");
    }
    if (errors.length > 0) {
        alert("Mật khẩu chưa hợp lệ:\n\n" + errors.join("\n"));
        return;
    }
    register(email, password);
}
