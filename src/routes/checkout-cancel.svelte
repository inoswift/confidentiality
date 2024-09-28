<script>
  let message = 'You have canceled the payment process.';

  // Optionally handle cancel reasons
</script>

<template>
  <div class="container">
    <h2>Payment Canceled</h2>
    <p>{message}</p>
    <a href="/checkout">Go back to checkout</a>
  </div>
</template>

<style>
  .container {
    margin: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    text-align: center;
  }
</style>