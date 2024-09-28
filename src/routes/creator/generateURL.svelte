<script>
  import { onMount } from 'svelte';
  let files = [];
  let loading = true;

  onMount(async () => {
    const response = await fetch('/api/creator/files');
    files = await response.json();
    loading = false;
  });

  const generateUrl = async (fileId) => {
    const response = await fetch(`/api/creator/generateUrl/${fileId}`);
    const result = await response.json();
    alert(`Your shareable URL: ${result.url}`);
  };
</script>

{#if loading}
  <p>Loading files...</p>
{:else}
  <h2>Generate Shareable URL</h2>
  <ul>
    {#each files as file}
      <li>
        <p>{file.name}</p>
        <button on:click={() => generateUrl(file.id)}>
          Generate URL
        </button>
      </li>
    {/each}
  </ul>
{/if}