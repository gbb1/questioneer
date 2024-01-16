'use client'
import { useState, useEffect, useContext } from 'react'
import { AlertCircle } from "lucide-react"
import { DemoContext } from '@/context/demoContext'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const ErrorCard = () => {
  const { error, setError } = useContext(DemoContext)

  if (!error.title) return null

  return (
    <div className='w-full p-4 fixed top-[60px] z-[2]'>
      <Alert variant="destructive" className='bg-white'>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{error.title}</AlertTitle>
        <AlertDescription>
          {error.message}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ErrorCard