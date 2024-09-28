document.addEventListener('DOMContentLoaded', async () => {
  try {
    const financialResponse = await fetch('/api/admin/financial-overview');
    const financialData = await financialResponse.json();

    document.getElementById('totalRevenue').textContent = (financialData.totalRevenue / 100).toFixed(2);
    document.getElementById('totalTips').textContent = (financialData.totalTips / 100).toFixed(2);
    document.getElementById('totalSubscriptions').textContent = (financialData.totalSubscriptions / 100).toFixed(2);

    const engagementResponse = await fetch('/api/admin/engagement-overview');
    const engagementData = await engagementResponse.json();

    document.getElementById('totalClicks').textContent = engagementData.totalClicks;
    document.getElementById('topContent').textContent = engagementData.topContent;
  } catch (error) {
    console.error('Error fetching admin data:', error);
  }
});