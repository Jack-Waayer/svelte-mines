<script lang="ts">
	import { scale } from 'svelte/transition';
	import { cx } from '../utils/classes';

	export let index: number;
	export let disabled: boolean;
	export let masked = false;
	export let revealed = false;
	export let loading = false;
	export let revealTile: (index: number) => void;
</script>

<button
	class={cx('cell', masked ? 'masked' : '', loading ? 'animate' : '')}
	on:click={() => revealTile(index)}
	{disabled}
>
	{#if revealed}
		<div in:scale={{ duration: 300 }} class={cx('tile-icon', masked ? 'masked' : '')}><slot /></div>
	{:else}
		<div class="base-tile" />
	{/if}
</button>

<style>
	@keyframes rock {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-5deg);
		}
		100% {
			transform: rotate(5deg);
		}
	}
	button {
		padding: 0;
	}
	.cell {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		background-color: #061c2b;
		border-radius: 0.5rem;
		border: none;

		&.masked {
			&::before {
				content: '';
				display: flex;
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: black;
				opacity: 0.3;
				border-radius: 0.5rem;
			}
		}
	}
	.animate {
		animation: rock 0.5s ease-in-out alternate infinite;
	}
	.tile-icon {
		width: 50%;
		height: 50%;

		&.masked {
			width: 30%;
			height: 30%;
		}
	}
	.base-tile {
		cursor: pointer;
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #213743;
		border-radius: 0.5rem;
		overflow: hidden;

		&:hover {
			bottom: 0.2rem;
		}
		&::before {
			content: '';
			position: absolute;
			bottom: 0.3rem;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #2f4553;
			border-radius: 0.5rem;
			transition: background-color 0.3s;
		}
		&:hover::before {
			background-color: #557085;
		}
	}
</style>
