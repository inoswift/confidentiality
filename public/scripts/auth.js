document.getElementById('authForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isLogin = e.submitter.id === 'loginBtn';

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('accessToken');
    window.location.href = 'index.html';
});