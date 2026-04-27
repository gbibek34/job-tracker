import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard.jsx'

const COLUMNS = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function KanbanBoard({ jobs }) {
  const navigate = useNavigate()

  const jobsByStatus = useMemo(() => {
    const map = Object.fromEntries(COLUMNS.map((c) => [c, []]))
    for (const job of jobs) {
      const key = COLUMNS.includes(job.status) ? job.status : 'Applied'
      map[key].push(job)
    }
    return map
  }, [jobs])

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Board</h1>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {COLUMNS.map((col) => {
            const list = jobsByStatus[col] || []
            return (
              <div
                key={col}
                className="rounded-xl bg-gray-100 p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900">
                    {col}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-200">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {list.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white/60 px-3 py-4 text-center text-sm text-gray-500">
                      No jobs
                    </div>
                  ) : (
                    list.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

