import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge.jsx'

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold tracking-wide text-gray-600">
        {label}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-900">
        {value || '—'}
      </div>
    </div>
  )
}

export default function JobDetail({ jobs, deleteJob }) {
  const navigate = useNavigate()
  const { id } = useParams()

  const job = useMemo(() => {
    const jobId = Number(id)
    return jobs.find((j) => j.id === jobId)
  }, [id, jobs])

  if (!job) {
    return (
      <div className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-lg font-semibold text-gray-900">
              Job not found
            </div>
            <div className="mt-1 text-sm text-gray-600">
              The job you are looking for doesn&apos;t exist.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {job.title}
            </h1>
            <div className="mt-1 text-sm text-gray-600">{job.company}</div>
            <div className="mt-3">
              <StatusBadge status={job.status} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => {
                deleteJob?.(job.id)
                navigate('/dashboard')
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Location" value={job.location} />
          <InfoItem label="Salary" value={job.salary} />
          <InfoItem label="Job Type" value={job.jobType} />
          <InfoItem label="Status" value={job.status} />
          <InfoItem label="Date Applied" value={job.dateApplied} />
          <InfoItem
            label="URL"
            value={
              job.url ? (
                <a
                  className="text-blue-600 hover:text-blue-700"
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open link
                </a>
              ) : (
                '—'
              )
            }
          />
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-gray-900">Notes</div>
          <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
            {job.notes || '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

