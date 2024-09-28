document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkoutBtn');

  checkoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Include user data and items here
          userId: 1,
          items: [{ fileId: 123, price: 500 }]  // Example data
        })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;  // Redirect to Stripe checkout session
      } else {
        alert('Failed to initiate checkout.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  });
});