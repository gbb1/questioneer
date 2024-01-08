"use client";
import { useState, useEffect, ChangeEvent } from 'react'

const FormBasic = () => {
  const [input, setInput] = useState<string>('')

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  useEffect(() => {
    return () => {
      setInput('')
    }
  }, [])

  return (
    <div>
      <form>
        <input placeholder="username" value={input} onChange={handleChange}/>
      </form>
    </div>
  )

};

export default FormBasic;
