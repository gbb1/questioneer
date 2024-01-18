import QueryTester from '@/components/QueryTester'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import FormBasic from '@/components/FormBasic'


import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage} from '@/components/ui/form'
import { ProfileForm } from '@/components/StartForm'

export default async function Main() {
  const { userId } = await auth()

  if (userId) redirect('/home')

  let href = userId ? '/home' : '/new-user'

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="max-w-full w-[600px] px-4">
        {/* <h1 className="text-6xl mb-4">Journal</h1>
        <p className="text-2xl text-white/60 mb-4">Journaling vibes</p> */}
        {/* <Hero /> */}
        {/* <FormBasic />
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-lg">Sign up</button>
          </Link>
        </div>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-lg">Play as guest</button>
          </Link>
        </div> */}
        <ProfileForm />
      </div>
    </div>
  )
}
