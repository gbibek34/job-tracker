import React from 'react'

const stylesByStatus = {
  Applied: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  Interview: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  Offer: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200',
  Rejected: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  Wishlist: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-200',
}

export default function StatusBadge({ status }) {
  const cls =
    stylesByStatus[status] ||
    'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200'

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      {status || 'Unknown'}
    </span>
  )
}

