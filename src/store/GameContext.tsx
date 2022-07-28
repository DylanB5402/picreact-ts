import React from "react";
import { ReactNode } from "react";
import GameStore from "./GameStore";

const GameContext = React.createContext<GameStore | null>(null);


interface GameStoreProviderProps {
    store : GameStore
    children : ReactNode
}

export const GameStoreProvider = ({  store, children } : GameStoreProviderProps) : JSX.Element => {
    return (
        <GameContext.Provider value = {store}>
            {children}
        </GameContext.Provider>
    )
}
    



export default GameContext;