<script>
  import { goto } from "$app/navigation";
  import { generateAuthLink } from "$lib";

  let { data } = $props();

  if (data.authorized) {
    goto('/');
  }

  const authUrl = generateAuthLink();
</script>

{#if !data.authorized}
  <a href={authUrl}><button>Log In</button></a>
{/if}
