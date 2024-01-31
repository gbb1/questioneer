"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { GameContext } from "@/context/gameContext";
import { useContext } from "react";

const Members = () => {
  const { game } = useContext(GameContext)

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {game.members?.length > 0
        ? game.members.map((x) => (
            <Badge key={x.clerk_id} variant="outline">{x.username}</Badge>
            // <Card key={x.clerk_id}>
            //   {/* <CardHeader> */}
            //   {/* <CardTitle>Card Title</CardTitle> */}
            //   <CardDescription>{x.username}</CardDescription>
            //   {/* </CardHeader>
            //   <CardContent>
            //     <p>Card Content</p>
            //   </CardContent>
            //   <CardFooter>
            //     <p>Card Footer</p>
            //   </CardFooter> */}
            // </Card>
          ))
        : null}
    </div>
  );
};

export default Members;
