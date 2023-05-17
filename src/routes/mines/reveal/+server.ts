import { json } from "@sveltejs/kit";
import { wait } from "../../../utils/timeout";
import { getGameState, updateGameState } from "$lib/server/mockDatabase.js";

export const POST = async ({ request }) => {
    await wait();
    const { tileIndex } = await request.json();
    const gameState = await getGameState();
    if (gameState.mines.includes(tileIndex)) {
        const newState = await updateGameState({ ...gameState, revealedTiles: [...gameState.revealedTiles, tileIndex], state: 'busted' });
        return json({ ...newState }, { status: 200 });
    }
    const newState = await updateGameState({ ...gameState, revealedTiles: [...gameState.revealedTiles, tileIndex] });
    return json({ ...newState, mines: newState.state === 'progress' ? [] : newState.mines }, { status: 200 });
}