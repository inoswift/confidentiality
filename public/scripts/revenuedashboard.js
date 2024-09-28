document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/creator/revenue');
    const data = await response.json();

    const revenueSummary = document.getElementById('revenueSummary');
    
    revenueSummary.innerHTML = `
      <p class="text-lg font-semibold">Total Earnings: $${data.totalEarnings / 100}</p>
      <p class="text-lg">Total Tips: $${data.totalTips / 100}</p>
      <p class="text-lg">Total Subscriptions: $${data.totalSubscriptions / 100}</p>
    `;
  } catch (error) {
    console.error('Error fetching revenue data:', error);
  }
});