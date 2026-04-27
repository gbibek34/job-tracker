import React from 'react'

export default function JobCard({ job, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50"
    >
      <div className="text-sm font-semibold text-gray-900">
        {job?.title || 'Untitled'}
      </div>
      <div className="mt-1 text-sm text-gray-600">{job?.company || '—'}</div>
      <div className="mt-3 text-xs text-gray-500">
        {job?.dateApplied ? `Applied: ${job.dateApplied}` : 'Date: —'}
      </div>
    </button>
  )
}

