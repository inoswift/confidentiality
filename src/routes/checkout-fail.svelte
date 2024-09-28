<script>
  let errorMessage = 'Payment failed. Please try again.';

  // Optionally fetch more details on why the payment failed
  const fetchFailureDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      try {
        const response = await fetch(`/api/payments/fail?session_id=${sessionId}`);
        const data = await response.json();
        errorMessage = data.errorMessage || errorMessage;
      } catch (error) {
        console.error('Error fetching payment failure details:', error);
      }
    }
  };

  fetchFailureDetails();
</script>

<template>
  <div class="container">
    <h2>Payment Failed</h2>
    <p>{errorMessage}</p>
    <a href="/checkout">Try Again</a>
  </div>
</template>

<style>
  .container {
    margin: 20px;
    padding: 20px;
    background: #ffe6e6;
    border-radius: 8px;
    text-align: center;
  }
</style>