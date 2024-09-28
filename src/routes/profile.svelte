<script>
  let email = '';
  let password = '';

  async function updateProfile() {
    const response = await fetch('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  }
</script>

<h1>Update Profile</h1>
<input type="email" bind:value={email} placeholder="Email" />
<input type="password" bind:value={password} placeholder="New Password (optional)" />
<button on:click={updateProfile}>Update Profile</button>