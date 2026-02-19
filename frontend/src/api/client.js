const API_BASE_URL = 'http://localhost:5000/api'

export const apiClient = {
  // Get all follow-ups
  async getFollowUps() {
    try {
      const response = await fetch(`${API_BASE_URL}/followups`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch follow-ups')
      return await response.json()
    } catch (error) {
      console.error('Error fetching follow-ups:', error)
      throw error
    }
  },

  // Get stats
  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/followups/stats`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error('Failed to fetch stats')
      return await response.json()
    } catch (error) {
      console.error('Error fetching stats:', error)
      throw error
    }
  },

  // Create a follow-up
  async createFollowUp(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/followups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create follow-up')
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating follow-up:', error)
      throw error
    }
  },

  // Update a follow-up
  async updateFollowUp(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/followups/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update follow-up')
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating follow-up:', error)
      throw error
    }
  },

  // Delete a follow-up
  async deleteFollowUp(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/followups/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete follow-up')
      }
      return await response.json()
    } catch (error) {
      console.error('Error deleting follow-up:', error)
      throw error
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      return response.ok
    } catch (error) {
      return false
    }
  }
}
