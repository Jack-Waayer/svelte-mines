import { json } from "@sveltejs/kit";
import { getGameState, updateGameState } from "../../../lib/server/mockDatabase";
import { wait } from "../../../utils/timeout";

export const GET = async () => {
    await wait();
    const gameState = await getGameState();
    const newState = await updateGameState({ ...gameState, state: 'cashout' });
    return json({ ...newState }, { status: 200 })
}