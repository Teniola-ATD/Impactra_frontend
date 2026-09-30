document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const alertBox = document.getElementById('alertMessage');

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      saveAuthData(data.token, data.data || data.user);
      alertBox.className = 'alert success';
      alertBox.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      alertBox.className = 'alert error';
      alertBox.textContent = data.message || 'Invalid credentials.';
    }
  } catch (error) {
    alertBox.className = 'alert error';
    alertBox.textContent = 'Network error. Please check server availability.';
  }
});