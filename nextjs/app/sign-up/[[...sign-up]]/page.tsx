import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignUp />
    </div>
  )
}

export default SignUpPage