<script>
  let sessionId;

  // Fetch success details from the Stripe session
  const fetchSuccessDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    sessionId = params.get('session_id');
    try {
      const response = await fetch(`/api/payments/success?session_id=${sessionId}`);
      const data = await response.json();
      console.log('Payment successful:', data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  fetchSuccessDetails();  // Fetch payment success details
</script>

<template>
  <div class="container">
    <h2>Payment Successful!</h2>
    <p>Your payment was processed successfully. Thank you for your purchase.</p>
    <p>Session ID: {sessionId}</p>
    <a href="/">Go back to home</a>
  </div>
</template>

<style>
  .container {
    margin: 20px;
    padding: 20px;
    background: #e0f7fa;
    border-radius: 8px;
    text-align: center;
  }
</style>