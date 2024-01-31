'use client'
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useContext } from "react";
import { SocketContext } from "@/context/socketContext";
import Members from "@/components/gameLobby/Members";
import GameContextProvider from "@/context/gameContext";
import TextInput from "@/components/game/TextInput";
import GameContainer from "@/components/game/GameContainer";


const Game = () => {
  const params = useParams()
  const { socket } = useContext(SocketContext)
  const id = params.id[0]

  useEffect(() => {
    socket?.emit('get-lobby-info', { lobby_id: id })
    socket?.on('lobby-info', (data) => {
      console.log('result', data)
    })
  }, [socket, id])

  return (
    <GameContextProvider socket={socket} lobbyId={id}>
      <GameContainer id={id} />
    </GameContextProvider>
  )
}

export default Game