<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
  console.log({ data })
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
