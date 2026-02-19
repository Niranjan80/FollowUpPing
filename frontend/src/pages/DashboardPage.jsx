import React, { useState, useEffect } from 'react'
import { apiClient } from '../api/client'
import { DeleteConfirmModal } from '../components/index.jsx'
import { Flame, Clock, AlertCircle, CheckCircle } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    due_today: 0,
    upcoming: 0,
    overdue: 0,
    completed: 0
  })
  const [followups, setFollowups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [statsData, followupsData] = await Promise.all([
        apiClient.getStats(),
        apiClient.getFollowUps()
      ])
      setStats(statsData)
      setFollowups(followupsData)
    } catch (err) {
      setError(err.message)
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (id) => {
    try {
      await apiClient.updateFollowUp(id, { status: 'completed' })
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ isOpen: true, id, name })
  }

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.deleteFollowUp(deleteModal.id)
      setDeleteModal({ isOpen: false, id: null, name: '' })
      loadData()
    } catch (err) {
      setError(err.message)
    }
  }

  const statCards = [
    {
      label: 'Due Today',
      value: stats.due_today,
      icon: Flame,
      color: 'bg-red-100 text-red-600'
    },
    {
      label: 'Upcoming',
      value: stats.upcoming,
      icon: Clock,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-gray flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-text-muted">Loading your follow-ups...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">FollowUpPing</h1>
          </div>
          <p className="text-lg text-text-muted font-medium">Never miss an important follow-up again.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
            <button
              onClick={loadData}
              className="ml-4 underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-muted uppercase tracking-wide">{stat.label}</p>
                    <p className="text-4xl font-bold text-text-dark mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon size={32} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* All Follow-ups Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-text-dark">Follow-ups</h2>
                <p className="text-text-muted mt-1">Manage all your important follow-ups</p>
              </div>
              <a
                href="/new"
                className="btn btn-primary flex items-center gap-2"
              >
                <span>+ Add Follow-up</span>
              </a>
            </div>
          </div>

          {followups.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-text-muted text-lg mb-6">No follow-ups yet. Add your first reminder.</p>
              <a href="/new" className="btn btn-primary inline-flex items-center gap-2">
                Create Follow-up
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-text-dark">Person</th>
                    <th className="text-left py-4 px-6 font-semibold text-text-dark">Context</th>
                    <th className="text-left py-4 px-6 font-semibold text-text-dark">Date</th>
                    <th className="text-center py-4 px-6 font-semibold text-text-dark">Days</th>
                    <th className="text-left py-4 px-6 font-semibold text-text-dark">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-text-dark">Notes</th>
                    <th className="text-right py-4 px-6 font-semibold text-text-dark">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {followups.map((followup, idx) => {
                    const followupDate = new Date(followup.followup_date)
                    const now = new Date()
                    const daysLeft = Math.ceil((followupDate - now) / (1000 * 60 * 60 * 24))
                    const isOverdue = daysLeft < 0
                    const isDueToday = daysLeft === 0
                    const isUpcoming = daysLeft > 0

                    return (
                      <tr key={followup.id} className="hover:bg-blue-50 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-text-dark">{followup.person_name}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {followup.context}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-text-dark font-medium">{followupDate.toLocaleDateString()}</div>
                          <div className="text-xs text-text-muted">{followupDate.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {followup.status === 'pending' ? (
                            <span className={`font-bold ${isOverdue ? 'text-red-600' : isDueToday ? 'text-orange-600' : 'text-green-600'}`}>
                              {Math.abs(daysLeft)}d
                            </span>
                          ) : (
                            <span className="text-green-600 font-bold">✓</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {followup.status === 'pending' && isOverdue && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">
                              ⚠️ OVERDUE
                            </span>
                          )}
                          {followup.status === 'pending' && isDueToday && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg">
                              🔥 TODAY
                            </span>
                          )}
                          {followup.status === 'pending' && isUpcoming && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                              ⏳ PENDING
                            </span>
                          )}
                          {followup.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                              ✓ DONE
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {followup.notes ? (
                            <div className="text-sm text-text-muted truncate max-w-xs" title={followup.notes}>
                              {followup.notes}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">—</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex gap-2 justify-end">
                            {followup.status === 'pending' && (
                              <button
                                onClick={() => handleComplete(followup.id)}
                                className="text-green-600 hover:text-green-700 font-semibold text-sm hover:bg-green-50 px-3 py-1 rounded transition"
                                title="Mark as completed"
                              >
                                ✓
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteClick(followup.id, followup.person_name)}
                              className="text-red-600 hover:text-red-700 font-semibold text-sm hover:bg-red-50 px-3 py-1 rounded transition"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        itemName={deleteModal.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
      />
    </div>
  )
}
