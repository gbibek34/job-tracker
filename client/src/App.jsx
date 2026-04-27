import React, { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import KanbanBoard from './pages/KanbanBoard.jsx'
import JobDetail from './pages/JobDetail.jsx'
import AddEditJob from './pages/AddEditJob.jsx'
import Analytics from './pages/Analytics.jsx'
import { mockJobs } from './data/mockJobs.js'

function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation()
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jobs, setJobs] = useState(() => mockJobs || [])

  const addJob = (jobData) => {
    const newJob = { id: Date.now(), ...jobData }
    setJobs((prev) => [newJob, ...prev])
  }

  const updateJob = (updatedJob) => {
    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)))
  }

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id))
  }

  const pageBg = useMemo(() => 'min-h-screen bg-gray-50', [])

  return (
    <div className={pageBg}>
      {isLoggedIn ? (
        <Navbar
          isLoggedIn={isLoggedIn}
          onSignOut={() => {
            setIsLoggedIn(false)
          }}
        />
      ) : null}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <Login
              onLogin={() => {
                setIsLoggedIn(true)
              }}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/board"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <KanbanBoard
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Analytics
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddEditJob
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <JobDetail
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddEditJob
                jobs={jobs}
                addJob={addJob}
                updateJob={updateJob}
                deleteJob={deleteJob}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

