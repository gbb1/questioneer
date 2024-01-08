import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn />
    </div>
  )
}

export default SignInPage