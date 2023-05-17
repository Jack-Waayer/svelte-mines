<script lang="ts">
	import GamePanel from './../components/GamePanel.svelte';
	import MinesGrid from './../components/MinesGrid.svelte';
	import Tile from './../components/Tile.svelte';
	import Gem from './../assets/gem.svelte';
	import Mine from './../assets/mine.svelte';
	import type { GameState } from './../lib/server/mockDatabase';
	import { FIFOQueue } from './../utils/array';

	let tileCount: number = 25;
	let gameState: GameState | undefined;
	let revealingTile = false;
	const { queue, enqueue, dequeue, reset } = FIFOQueue<number>();
	$: gameOver = gameState && ['busted', 'cashout'].includes(gameState.state);
	$: if ($queue.length && !revealingTile) {
		(async () => {
			revealingTile = true;
			await revealTile($queue[0]);
			dequeue();
			if (gameOver) reset();
			revealingTile = false;
		})();
	}
	$: revealedTiles = gameState?.revealedTiles ?? [];
	$: mineTiles = gameState?.mines ?? [];
	$: multiplier =
		gameState && gameState.minesCount > 0
			? (gameState.minesCount / (gameState.tileCount - gameState.minesCount)) *
					gameState.revealedTiles.length +
			  1
			: 0;

	const placeBet = async (bet: number, mines: number) => {
		const res = await fetch('/mines/bet', {
			method: 'POST',
			body: JSON.stringify({ bet, mines }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		gameState = await res.json();
	};
	const revealTile = async (tileIndex: number) => {
		const res = await fetch('/mines/reveal', {
			method: 'POST',
			body: JSON.stringify({ tileIndex }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		gameState = await res.json();
	};
	const cashout = async () => {
		const res = await fetch('./mines/cashout', {
			method: 'GET'
		});
		gameState = await res.json();
	};
</script>

<div class="game-board">
	<GamePanel
		state={gameState?.state ?? 'idle'}
		revealedTiles={gameState?.revealedTiles ?? []}
		{placeBet}
		{cashout}
	/>
	<MinesGrid
		columns={Math.sqrt(tileCount)}
		state={gameState?.state}
		{multiplier}
		bet={gameState?.bet}
	>
		{#each new Array(tileCount).fill(null).map((_, i) => i) as tileIndex}
			<Tile
				index={tileIndex}
				revealed={revealedTiles.includes(tileIndex) || gameOver}
				masked={gameOver && !revealedTiles.includes(tileIndex)}
				disabled={!gameState || !!gameOver}
				loading={$queue.includes(tileIndex)}
				revealTile={(tileIndex) => enqueue(tileIndex)}
			>
				{#if revealedTiles.includes(tileIndex) && !mineTiles.includes(tileIndex)}
					<Gem />
				{:else if mineTiles.includes(tileIndex)}
					<Mine />
				{:else if gameOver}
					<Gem />
				{/if}
			</Tile>
		{/each}
	</MinesGrid>
</div>

<style>
	.game-board {
		display: grid;
		grid-template-columns: 1fr 3fr;
		background-color: #0b2231;
		height: 100vh;
		align-items: center;
	}
</style>
