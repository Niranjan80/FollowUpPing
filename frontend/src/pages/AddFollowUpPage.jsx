import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../api/client'
import { ArrowLeft } from 'lucide-react'

export default function AddFollowUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    person_name: '',
    context: 'Job Application',
    followup_date: '',
    notes: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!formData.person_name.trim()) {
      setError('Person name is required')
      return
    }
    if (!formData.followup_date) {
      setError('Follow-up date is required')
      return
    }

    try {
      setLoading(true)
      await apiClient.createFollowUp(formData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold text-lg"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-dark mb-2">Create New Follow-up</h1>
          <p className="text-lg text-text-muted">Add a reminder to track your important follow-ups.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-300">
              <div className="font-semibold">Error</div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Person Name */}
            <div>
              <label htmlFor="person_name" className="block text-sm font-semibold text-text-dark mb-2">
                Person Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="person_name"
                name="person_name"
                placeholder="e.g., Google Recruiter, Jane Doe, etc."
                value={formData.person_name}
                onChange={handleChange}
                className="input-field focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Context */}
            <div>
              <label htmlFor="context" className="block text-sm font-semibold text-text-dark mb-2">
                Context <span className="text-red-600">*</span>
              </label>
              <select
                id="context"
                name="context"
                value={formData.context}
                onChange={handleChange}
                className="dropdown-field focus:ring-2 focus:ring-blue-500"
              >
                <option value="Job Application">💼 Job Application</option>
                <option value="Client Project">🤝 Client Project</option>
                <option value="Sales Lead">🎯 Sales Lead</option>
                <option value="Networking">🌐 Networking</option>
                <option value="Other">📌 Other</option>
              </select>
            </div>

            {/* Follow-up Date */}
            <div>
              <label htmlFor="followup_date" className="block text-sm font-semibold text-text-dark mb-2">
                Follow-up Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="followup_date"
                name="followup_date"
                value={formData.followup_date}
                onChange={handleChange}
                className="input-field focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-text-muted mt-1">📌 You can select past dates to track overdue follow-ups</p>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-text-dark mb-2">
                Notes <span className="text-text-muted">(Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Add any additional details... e.g., 'Sent resume on Feb 15', 'Waiting for response'"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="textarea-field focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? '⏳ Adding...' : '✓ Add Follow-up'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
