'use client'
import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface Props {
  children: React.ReactNode;
  socket: Socket | null;
  lobbyId: String;
}

const PORT = 8089;
const SERVER_URL = `http://localhost:${PORT}`;

interface gameContextType {
  game: any;
  updateGame: () => void;
}

export const GameContext = createContext<gameContextType>({
    game: {},
    updateGame: () => {},
})

const GameContextProvider: React.FC<Props> = ({ children, socket, lobbyId }) => {
  const [game, setGame] = useState<any>({});

  useEffect(() => {
    socket?.emit('get-lobby-info', { lobby_id: lobbyId })
    socket?.on('lobby-info', (data) => {
      setGame(data)
    })

    return () => {
      socket?.off()
    }
  }, [socket, lobbyId])

  const updateGame = () => {
    socket?.emit('get-lobby-info', { lobby_id: lobbyId });
  }

  const contextObject = {
    game,
    updateGame,
  }

  return (
    <GameContext.Provider value={contextObject}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
