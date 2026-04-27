import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const linkBase =
  'rounded-full px-3 py-2 text-sm font-medium transition-colors'

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${linkBase} bg-blue-600 text-white`
          : `${linkBase} text-gray-700 hover:bg-gray-100`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar({ isLoggedIn, onSignOut }) {
  const navigate = useNavigate()

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">Job Tracker</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/board" label="Board" />
          <NavItem to="/analytics" label="Analytics" />
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => navigate('/jobs/new')}
              >
                Add Job
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  onSignOut?.()
                  navigate('/login')
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 sm:px-6">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/board" label="Board" />
          <NavItem to="/analytics" label="Analytics" />
        </div>
      </div>
    </header>
  )
}

