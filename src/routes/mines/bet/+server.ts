import { json } from "@sveltejs/kit";
import { wait } from "../../../utils/timeout";
import { getGameState, updateGameState } from "$lib/server/mockDatabase";

export const POST = async ({ request }) => {
    await wait();
    const { bet, mines } = await request.json();
    let gameState = await getGameState();
    const tileArray = new Array(gameState.tileCount).fill(null).map((_, i) => i);
    const shuffledTiles = tileArray.sort(_ => 0.5 - Math.random());
    const newState = await updateGameState({ ...gameState, bet, minesCount: mines, mines: shuffledTiles.slice(0, mines), revealedTiles: [], state: 'progress' });
    return json({ ...newState, mines: newState.state === 'progress' ? [] : newState.mines }, { status: 200 });
}