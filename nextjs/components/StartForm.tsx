"use client";
import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const btn = "text-xs bg-black text-white px-4 py-3 rounded-sm flex-row flex gap-2 items-center hover:bg-green-400 transition-all justify-between"

const StartForm = () => {
  const [username, setUsername] = useState<string>('')

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (userId) redirect('/home')

  let href = userId ? '/home' : '/new-user'

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username])

  useEffect(() => {
    return () => {
      setUsername('')
    }
  }, [])

  return (
    <div>
      <form>
        <input placeholder="username" value={username} onChange={handleChange}/>
      </form>
      <div>
        <div>
          <Link href={{ pathname: href, query: { username }, }}>
            <button disabled={username.length === 0} className={btn}>Sign up</button>
          </Link>
        </div>
        <div>
          <Link href={{ pathname: href, query: { username }, }}>
            <button disabled={username.length === 0} className={btn}>Play as guest</button>
          </Link>
        </div>
      </div>
    </div>
  )

};

export default StartForm;
