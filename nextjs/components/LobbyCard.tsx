import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect } from "react"
import { SocketContext } from "@/context/socketContext"
import Link from 'next/link';

export function LobbyCard({ lobbyData, user }) {
  const { socket } = useContext(SocketContext)

  const leaveLobby = (e) => {
    socket?.emit('leave-lobby', { id: user, lobby_id: lobbyData.lobby_id })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>{`Join with code: ${lobbyData.lobby_id}`}</CardDescription>
      </CardHeader>
      {/* <CardContent> */}
        {/* <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form> */}
      {/* </CardContent> */}
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={leaveLobby}>Leave</Button>
        <Link href={`/game/${lobbyData.lobby_id}`} >
          <Button>Play</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
