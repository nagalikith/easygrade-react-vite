'use client'

import { useState, useEffect } from 'react'

export default function CookieManager() {
  const [cookieValue, setCookieValue] = useState<string>('')

  const setCookie = async (value: string) => {
    try {
      const response = await fetch('/api/set-cookie', {
        method: 'POST',
        credentials: 'include', // Important for cookie handling
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      })
      
      if (response.ok) {
        console.log('Cookie set successfully')
        getCookie() // Verify the cookie was set
      }
    } catch (error) {
      console.error('Error setting cookie:', error)
    }
  }

  const getCookie = async () => {
    try {
      const response = await fetch('/api/get-cookie', {
        credentials: 'include', // Important for cookie handling
      })
      
      if (response.ok) {
        const data = await response.json()
        setCookieValue(data.value)
      }
    } catch (error) {
      console.error('Error getting cookie:', error)
    }
  }

  useEffect(() => {
    getCookie()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Cookie Manager</h2>
      <div className="space-y-4">
        <div>
          <p>Current Cookie Value: {cookieValue || 'No cookie set'}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCookie('test-value')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Set Cookie
          </button>
          <button
            onClick={getCookie}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Refresh Cookie
          </button>
        </div>
      </div>
    </div>
  )
}