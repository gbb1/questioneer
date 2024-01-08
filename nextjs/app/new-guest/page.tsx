'use client'
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/router'

const createNewGuest = async () => {
  const user = await currentUser();

  const guestId = await axios.post(
    `http://localhost:8089/api/users/new-guest`,
    {
      username: 'test',
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(guestId)

  redirect("/home");
};

const NewGuest = async () => {
  await createNewGuest();
  return <div>...loading</div>;
};

export default NewGuest;
