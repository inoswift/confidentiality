document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/creator/performance');
    const data = await response.json();

    const performanceMetrics = document.getElementById('performanceMetrics');

    performanceMetrics.innerHTML = `
      <p class="text-lg font-semibold">Total Subscribers: ${data.totalSubscribers}</p>
      <p class="text-lg">Most Popular Content: ${data.topContent}</p>
      <p class="text-lg">Total Views: ${data.totalViews}</p>
    `;
  } catch (error) {
    console.error('Error fetching performance data:', error);
  }
});