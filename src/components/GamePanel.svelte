<script lang="ts">
	import type { State } from '$lib/server/mockDatabase';

	let bet = 0;
	let mines = 5;
	export let loading = false;
	export let state: State;
	export let revealedTiles: number[];
	export let placeBet: (bet: number, mines: number) => Promise<void>;
	export let cashout: () => Promise<void>;
</script>

<div class="game-panel">
	<label for="bet-amount" class="panel-label">Bet Amount</label>
	<label for="mines-amount" class="panel-label">Mines</label>
	<input
		bind:value={bet}
		class="number-input"
		name="bet-amount"
		type="float"
		disabled={state === 'progress'}
	/>
	<input
		bind:value={mines}
		class="number-input"
		name="mines-amount"
		type="number"
		disabled={state === 'progress'}
	/>
	{#if ['idle', 'busted', 'cashout'].includes(state)}
		<button class="primary-button" on:click={() => placeBet(bet, mines)} disabled={loading}
			>Bet</button
		>
	{:else}
		<button
			class="primary-button"
			on:click={() => cashout()}
			disabled={revealedTiles.length < 1 || loading}>Cashout</button
		>
	{/if}
</div>

<style>
	.game-panel {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: max-content;
		box-sizing: border-box;
		column-gap: 1rem;
		height: 100%;
		width: 100%;
		background-color: #1e333e;
		padding: 2rem 2rem;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		display: none;
	}
	.panel-label {
		color: whitesmoke;
		font-size: 0.75rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	.number-input {
		color: white;
		background-color: #425b6f;
		height: 2.5rem;
		font-size: 1rem;
		font-weight: 700;
		border: none;
		outline: none;
		margin-bottom: 1rem;
	}
	.primary-button {
		grid-column: span 2;
		width: 100%;
		cursor: pointer;
		color: #013e01;
		background-color: #00e701;
		height: 3rem;
		font-weight: 700;
		border: none;

		&:hover {
			background-color: #1fff20;
		}
		&:disabled {
			cursor: not-allowed;
			background-color: #118f22;
		}
	}
</style>
