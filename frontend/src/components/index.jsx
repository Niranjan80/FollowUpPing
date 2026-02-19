import { Check, Trash2, AlertCircle, Clock, Flame, CheckCircle } from 'lucide-react'
import { formatDistanceToNow, isPast, isToday, isAfter } from 'date-fns'

export function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: Clock,
      label: 'Pending'
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: CheckCircle,
      label: 'Completed'
    }
  }

  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${config.bg} ${config.text} text-sm font-medium`}>
      <Icon size={16} />
      {config.label}
    </span>
  )
}

export function FollowUpCard({ followup, onComplete, onDelete }) {
  const followupDate = new Date(followup.followup_date)
  const now = new Date()
  
  let urgencyBadge = null
  if (followup.status === 'pending') {
    if (isToday(followupDate)) {
      urgencyBadge = (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
          <Flame size={12} /> DUE TODAY
        </span>
      )
    } else if (isPast(followupDate)) {
      urgencyBadge = (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
          <AlertCircle size={12} /> OVERDUE
        </span>
      )
    }
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-dark">{followup.person_name}</h3>
          <p className="text-sm text-text-muted mt-1">{followup.context}</p>
        </div>
        {urgencyBadge}
      </div>

      <div className="mb-4">
        <p className="text-sm text-text-muted">
          Follow-up Date: <span className="font-semibold text-text-dark">{followupDate.toLocaleDateString()}</span>
        </p>
        {followup.notes && (
          <p className="text-sm text-text-muted mt-2">{followup.notes}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={followup.status} />
        <div className="flex gap-2">
          {followup.status === 'pending' && (
            <button
              onClick={() => onComplete(followup.id)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Check size={16} />
              Mark Completed
            </button>
          )}
          <button
            onClick={() => onDelete(followup.id)}
            className="btn btn-danger"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export function FollowUpTable({ followups, onComplete, onDelete }) {
  if (followups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-lg">No follow-ups yet. Add your first reminder.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Person</th>
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Context</th>
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Follow-up Date</th>
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Status</th>
            <th className="text-right py-3 px-4 font-semibold text-text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {followups.map((followup) => (
            <tr key={followup.id} className="border-b border-border hover:bg-gray-50 transition">
              <td className="py-4 px-4 font-medium text-text-dark">{followup.person_name}</td>
              <td className="py-4 px-4 text-text-muted">{followup.context}</td>
              <td className="py-4 px-4 text-text-muted">{new Date(followup.followup_date).toLocaleDateString()}</td>
              <td className="py-4 px-4">
                <StatusBadge status={followup.status} />
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  {followup.status === 'pending' && (
                    <button
                      onClick={() => onComplete(followup.id)}
                      className="text-primary hover:text-blue-700 font-medium text-sm"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(followup.id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel, itemName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-text-dark mb-2">Delete Follow-up?</h2>
        <p className="text-text-muted mb-6">
          Are you sure you want to delete the follow-up for <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
