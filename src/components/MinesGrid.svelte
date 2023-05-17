<script lang="ts">
	import type { State } from '$lib/server/mockDatabase';
	import { scale } from 'svelte/transition';

	export let columns = 5;
	export let state: State | undefined;
	export let multiplier: number;
	export let bet: number | undefined;
</script>

<div
	class="grid"
	style={`grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${columns}, 1fr);`}
>
	<slot />
	{#if state === 'cashout'}
		<div class="cashout">
			<div in:scale={{ duration: 300 }} class="multiplier">
				<span>{multiplier}x</span><span>{`$${(bet ?? 0) * multiplier}`}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.grid {
		position: relative;
		display: grid;
		aspect-ratio: 1 / 1;
		gap: 0.5rem;
		margin: 4rem;
		justify-self: center;
		align-self: stretch;
		max-width: 100%;
		box-sizing: border-box;
	}
	.cashout {
		display: flex;
		position: absolute;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.multiplier {
		user-select: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
		padding: 1.5rem 2rem;
		border: 3px solid #00e701;
		border-radius: 0.25rem;
		color: #00e701;
		background-color: #1a2c38;
		font-size: 1.5rem;
		font-weight: 700;
	}
</style>
