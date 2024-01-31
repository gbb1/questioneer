'use client'
import Members from "../gameLobby/Members";
import { Button } from "../ui/button";

const LobbyStart = ({ id }) => {
  return (
    <div className="w-full flex-col flex gap-4 h-full">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Join with code: {id}
      </h4>
      <div>
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Connected:
        </h3>
        <Members />
      </div>
      <Button className="mt-10">Start game</Button>
    </div>
  )
}

export default LobbyStart;