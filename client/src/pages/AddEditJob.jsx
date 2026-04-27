import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']
const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected']

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  )
}

export default function AddEditJob({ jobs, addJob, updateJob }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const existing = useMemo(() => {
    if (!isEdit) return null
    const jobId = Number(id)
    return jobs.find((j) => j.id === jobId) || null
  }, [id, isEdit, jobs])

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [jobType, setJobType] = useState('Full-time')
  const [status, setStatus] = useState('Applied')
  const [dateApplied, setDateApplied] = useState('')
  const [url, setUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    if (!existing) return

    setTitle(existing.title || '')
    setCompany(existing.company || '')
    setLocation(existing.location || '')
    setSalary(existing.salary || '')
    setJobType(existing.jobType || 'Full-time')
    setStatus(existing.status || 'Applied')
    setDateApplied(existing.dateApplied || '')
    setUrl(existing.url || '')
    setNotes(existing.notes || '')
  }, [existing, isEdit])

  const pageTitle = isEdit ? 'Edit Application' : 'Add Application'

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {isEdit
            ? 'Update the application details below.'
            : 'Add a new job application to your tracker.'}
        </p>

        {isEdit && !existing ? (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">
              Job not found
            </div>
            <div className="mt-1 text-sm text-gray-600">
              You can go back and select a different application.
            </div>
            <button
              type="button"
              className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        ) : (
          <form
            className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault()
              setError('')

              if (!title.trim() || !company.trim()) {
                setError('Job Title and Company are required.')
                return
              }

              const payload = {
                title: title.trim(),
                company: company.trim(),
                location: location.trim(),
                salary: salary.trim(),
                jobType,
                status,
                dateApplied,
                url: url.trim(),
                notes: notes.trim(),
              }

              if (!isEdit) {
                addJob?.(payload)
                navigate('/dashboard')
                return
              }

              updateJob?.({ id: Number(id), ...payload })
              navigate(`/jobs/${id}`)
            }}
          >
            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Job Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Frontend Developer"
                />
              </Field>

              <Field label="Company">
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Acme Inc."
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Location">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Remote / City"
                />
              </Field>

              <Field label="Salary">
                <input
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="$120,000"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Job Type">
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Date Applied">
                <input
                  type="date"
                  value={dateApplied}
                  onChange={(e) => setDateApplied(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Field>

              <Field label="Job URL">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </Field>
            </div>

            <Field label="Notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes, follow-ups, or context..."
              />
            </Field>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

