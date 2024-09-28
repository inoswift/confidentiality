<script>
  import { onMount } from 'svelte';
  let files = [];
  let loading = true;

  onMount(async () => {
    const response = await fetch('/api/creator/files');
    files = await response.json();
    loading = false;
  });

  const handleSubmit = async (fileId, priceType, price) => {
    const response = await fetch(`/api/creator/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId, priceType, price }),
    });

    const result = await response.json();
    alert(result.message);
  };
</script>

{#if loading}
  <p>Loading files...</p>
{:else}
  <h2>Manage Your Files</h2>
  <ul>
    {#each files as file}
      <li>
        <p>{file.name}</p>
        <select id="priceType_{file.id}">
          <option value="one_time">One-Time Payment</option>
          <option value="subscription">Subscription</option>
        </select>
        <input type="number" id="price_{file.id}" placeholder="Price (USD)" />
        <button on:click={() => handleSubmit(file.id, document.getElementById(`priceType_${file.id}`).value, document.getElementById(`price_${file.id}`).value)}>
          Assign
        </button>
      </li>
    {/each}
  </ul>
{/if}