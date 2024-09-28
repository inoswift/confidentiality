// Fetch and display creator data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchCreatorProfile();
  fetchItemsForSale();
});

// Fetch the creator's profile details
async function fetchCreatorProfile() {
  try {
    const response = await fetch('/api/creator/profile');
    const data = await response.json();

    document.getElementById('creatorName').textContent = data.name || "Unnamed Creator";
    document.getElementById('creatorAbout').textContent = data.about || "This creator has not provided any details yet.";

    const socialLinks = document.getElementById('socialLinks');
    data.socialLinks.forEach(link => {
      socialLinks.innerHTML += `<a href="${link.url}" target="_blank" class="text-blue-500 hover:underline">${link.platform}</a>`;
    });
  } catch (error) {
    console.error('Error fetching creator profile:', error);
  }
}

// Fetch the creator's items for sale
async function fetchItemsForSale() {
  try {
    const response = await fetch('/api/creator/items');
    const data = await response.json();

    const itemsContainer = document.getElementById('itemsForSale');
    data.forEach(item => {
      itemsContainer.innerHTML += `
        <div class="bg-gray-100 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold">${item.name}</h3>
          <p>${item.description}</p>
          <p class="text-blue-500 font-semibold">$${item.price / 100}</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Purchase</button>
        </div>
      `;
    });
  } catch (error) {
    console.error('Error fetching items for sale:', error);
  }
}
``