<script>
  let items = [];
  let totalAmount = 0;

  // Fetch selected items from backend
  const fetchSelectedItems = async () => {
    try {
      const response = await fetch('/api/checkout/items');
      const data = await response.json();
      items = data.items;
      totalAmount = data.totalAmount;
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Initiate Stripe Checkout
  const initiatePayment = async () => {
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  fetchSelectedItems();
</script>

<template>
  <div class="container">
    <h2>Your Selected Items</h2>
    <ul>
      {#each items as item}
        <li>{item.name} - ${item.price}</li>
      {/each}
    </ul>
    <p>Total: ${totalAmount}</p>
    <button on:click={initiatePayment}>Proceed to Payment</button>
  </div>
</template>

<style>
  .container {
    margin: 20px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
</style>