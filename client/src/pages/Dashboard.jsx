import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge.jsx'

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  )
}

export default function Dashboard({ jobs }) {
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const total = jobs.length
    const interviews = jobs.filter((j) => j.status === 'Interview').length
    const offers = jobs.filter((j) => j.status === 'Offer').length
    const active = jobs.filter((j) =>
      ['Wishlist', 'Applied', 'Interview', 'Offer'].includes(j.status)
    ).length
    return { total, interviews, offers, active }
  }, [jobs])

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track your job search across statuses
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={() => navigate('/jobs/new')}
          >
            Add Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-semibold text-gray-900">
              No applications yet
            </div>
            <div className="mt-1 text-sm text-gray-600">
              Add your first job to get started
            </div>
            <button
              type="button"
              className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => navigate('/jobs/new')}
            >
              Add Job
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total" value={stats.total} />
              <StatCard label="Interviews" value={stats.interviews} />
              <StatCard label="Offers" value={stats.offers} />
              <StatCard label="Active" value={stats.active} />
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs font-semibold tracking-wide text-gray-600">
                      <th className="px-4 py-3">ROLE</th>
                      <th className="px-4 py-3">COMPANY</th>
                      <th className="px-4 py-3">STATUS</th>
                      <th className="px-4 py-3">LOCATION</th>
                      <th className="px-4 py-3">DATE</th>
                      <th className="px-4 py-3">SALARY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {job.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {job.company}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {job.location || '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {job.dateApplied || '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {job.salary || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

