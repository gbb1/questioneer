'use client'
import Members from "@/components/gameLobby/Members";
import GameContextProvider, { GameContext } from "@/context/gameContext";
import TextInput from "@/components/game/TextInput";
import { useContext } from "react";
import LobbyStart from "./LobbyStart";

const GameContainer = ({ id }) => {
  const { game, updateGame } = useContext(GameContext)

  return (
    <div className="border-2 w-full flex-col flex">
      <LobbyStart id={id} />
      {/* <TextInput type={'question'} actionData={null} />
      <TextInput type={'answer'} actionData={{ question: 'Why do cats do this shit?', playerData: { points: 1500, } }} /> */}
    </div>
  )
}

export default GameContainer;