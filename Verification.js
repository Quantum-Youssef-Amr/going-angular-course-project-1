function registerUser(fullName, email, username, password) {
    const user = { fullName, email, username, password };
    localStorage.setItem('registeredUser', JSON.stringify(user));
}

function verifyUser(username, password) {
    const userStr = localStorage.getItem('registeredUser');
    if (!userStr) return false;
    const user = JSON.parse(userStr);
    return user.username === username && user.password === password;
}

document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('registration-form');
    const regMsg = document.getElementById('register-message');
    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullName = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            registerUser(fullName, email, username, password);
            if (regMsg) {
                regMsg.textContent = 'Registration successful!';
                regMsg.classList.remove('error');
                regMsg.classList.add('success');
            }
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Login
    const loginForm = document.getElementById('login-form');
    const loginMsg = document.getElementById('login-message');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            if (verifyUser(username, password)) {
                if (loginMsg) {
                    loginMsg.textContent = `Welcome back, ${username}!`;
                    loginMsg.classList.remove('error');
                    loginMsg.classList.add('success');
                }
                setTimeout(() => {
                    window.location.href = 'posts.html';
                }, 1000);
            } else {
                if (loginMsg) {
                    loginMsg.textContent = 'Invalid username or password!';
                    loginMsg.classList.remove('success');
                    loginMsg.classList.add('error');
                }
            }
        });
    }
});