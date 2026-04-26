import React, { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  )
}

function RateBox({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="mt-2 text-xl font-bold text-gray-900">{value}</div>
    </div>
  )
}

function pct(n, d) {
  if (!d) return 0
  return Math.round((n / d) * 100)
}

export default function Analytics({ jobs }) {
  const total = jobs.length

  const counts = useMemo(() => {
    const map = Object.fromEntries(STATUSES.map((s) => [s, 0]))
    for (const job of jobs) {
      const key = STATUSES.includes(job.status) ? job.status : 'Applied'
      map[key] += 1
    }
    return map
  }, [jobs])

  const interviewCount = counts.Interview || 0
  const offerCount = counts.Offer || 0
  const rejectedCount = counts.Rejected || 0
  const pendingCount =
    (counts.Wishlist || 0) + (counts.Applied || 0) + (counts.Interview || 0)

  const interviewRate = pct(interviewCount, total)
  const offerRate = pct(offerCount, total)
  const rejectionRate = pct(rejectedCount, total)
  const pendingRate = pct(pendingCount, total)

  const chartData = useMemo(() => {
    return STATUSES.map((s) => ({
      status: s,
      count: counts[s] || 0,
    }))
  }, [counts])

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

        {total === 0 ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-semibold text-gray-900">No data yet</div>
            <div className="mt-1 text-sm text-gray-600">
              Add some jobs to see analytics.
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Total Applications" value={total} />
              <StatCard label="Interview Rate (%)" value={`${interviewRate}%`} />
              <StatCard label="Offer Rate (%)" value={`${offerRate}%`} />
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 text-sm font-semibold text-gray-900">
                Applications by Status
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-900">Key rates</div>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <RateBox label="Interview Rate" value={`${interviewRate}%`} />
                <RateBox label="Offer Rate" value={`${offerRate}%`} />
                <RateBox label="Rejection Rate" value={`${rejectionRate}%`} />
                <RateBox label="Pending" value={`${pendingRate}%`} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

