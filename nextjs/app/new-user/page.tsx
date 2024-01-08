import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/router'

const createNewUser = async () => {
  const user = await currentUser();

  const response = await axios.post(
    `http://localhost:8089/api/users/new-user`,
    {
      clerk_id: user?.id as string,
      email: user?.emailAddresses[0].emailAddress as string,

    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // const guestId = await axios.post(
  //   `http://localhost:8089/api/users/new-guest`,
  //   {
  //     username: 'test',
  //   },
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // console.log(guestId)

  redirect("/home");
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUser;
