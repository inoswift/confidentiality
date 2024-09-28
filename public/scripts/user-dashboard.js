// Fetch user subscriptions and profile data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchSubscriptions();
  fetchUserProfile();
});

// Fetch active and expired subscriptions from backend
async function fetchSubscriptions() {
  try {
    const response = await fetch('/api/user/subscriptions');
    const data = await response.json();

    const activeContainer = document.getElementById('activeSubscriptions');
    const expiredContainer = document.getElementById('expiredSubscriptions');

    // Populate active subscriptions
    data.active.forEach(sub => {
      activeContainer.innerHTML += `
        <div class="bg-gray-100 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold">${sub.name}</h3>
          <p>Expires on: ${sub.expirationDate}</p>
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel Subscription</button>
        </div>
      `;
    });

    // Populate expired subscriptions
    data.expired.forEach(sub => {
      expiredContainer.innerHTML += `
        <div class="bg-gray-100 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold">${sub.name}</h3>
          <p>Expired on: ${sub.expirationDate}</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Renew Subscription</button>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
}

// Fetch user profile data
async function fetchUserProfile() {
  try {
    const response = await fetch('/api/user/profile');
    const data = await response.json();

    document.getElementById('email').value = data.email;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

// Update profile on form submission
document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
});