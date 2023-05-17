export type State = 'idle' | 'progress' | 'cashout' | 'busted';

export type GameState = {
    bet: number;
    tileCount: number;
    minesCount: number;
    mines: number[];
    revealedTiles: number[];
    state: State;
}

let gameState: GameState = {
    bet: 0,
    tileCount: 25,
    minesCount: 5,
    mines: [],
    revealedTiles: [],
    state: 'idle'
};

export const getGameState = async () => {
    return gameState;
}

export const updateGameState = async (state: GameState) => {
    gameState = state;
    return await getGameState();
}

