import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-[calc(100vh-0px)] bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              onClick={() => {
                onLogin?.({ email, password })
                navigate('/dashboard')
              }}
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-700"
                onClick={() => {}}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

