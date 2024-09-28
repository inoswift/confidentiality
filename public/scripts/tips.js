document.getElementById('tipForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const tipAmount = document.getElementById('tipAmount').value;
  
  try {
    const response = await fetch('/api/payments/tip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: tipAmount }),
    });
    
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;  // Redirect to Stripe payment
    } else {
      document.getElementById('message').textContent = 'Error: Unable to process tip.';
    }
  } catch (error) {
    console.error('Error processing tip:', error);
    document.getElementById('message').textContent = 'Error: Unable to process tip.';
  }
});