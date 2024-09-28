<script>
  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin() {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      // Store tokens in local storage or cookies
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      window.location.href = '/dashboard';  // Redirect to the dashboard
    } else {
      errorMessage = data.message;
    }
  }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={handleLogin}>
  <input type="email" placeholder="Email" bind:value={email} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit">Login</button>
</form>

{#if errorMessage}
  <p style="color:red;">{errorMessage}</p>
{/if}