document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const alertBox = document.getElementById('alertMessage');

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();

    if (data.success) {
      alertBox.className = 'alert success';
      alertBox.textContent = 'Account registered successfully! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      alertBox.className = 'alert error';
      alertBox.textContent = data.message || 'Registration failed.';
    }
  } catch (error) {
    alertBox.className = 'alert error';
    alertBox.textContent = 'Network error. Please try again later.';
  }
});