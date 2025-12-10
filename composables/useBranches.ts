import type { 
  Branch,
  BranchDropdownItem,
  BranchDropdownResponse
} from './useApi'

export const useBranches = () => {
  const { API_BASE_URL } = useApi()

  // Fetch all branches for dropdown from the public appointment API endpoint
  const fetchBranches = async (): Promise<Branch[]> => {
    try {
      // Use the new public appointment branches dropdown endpoint
      const response = await $fetch<{ data: Branch[] }>(`${API_BASE_URL}/publicappointment/branches/dropdown`)
      
      if (response && response.data) {
        return response.data.map((branch): Branch => ({
          id: branch.id,
          name: branch.name,
          address: branch.address || '',
          phone_number: branch.phone_number || '',
          description: branch.description || '',
          email: branch.email || '',
        }))
      }
      
      return []
    } catch (error) {
      console.error('Error fetching branches:', error)
      // Return fallback data if API fails
      return [
        { id: '1', name: 'Cabang Jakarta Pusat', address: 'Jl. Sudirman No. 1' },
        { id: '2', name: 'Cabang Jakarta Selatan', address: 'Jl. Senopati No. 2' },
        { id: '3', name: 'Cabang Jakarta Utara', address: 'Jl. Kelapa Gading No. 3' },
        { id: '4', name: 'Cabang Jakarta Barat', address: 'Jl. Kebon Jeruk No. 4' },
        { id: '5', name: 'Cabang Jakarta Timur', address: 'Jl. Rawamangun No. 5' },
      ]
    }
  }

  // Fetch dropdown items directly (optimized for dropdown usage)
  const fetchBranchDropdownItems = async (): Promise<BranchDropdownItem[]> => {
    try {
      const response = await $fetch<BranchDropdownResponse>(`${API_BASE_URL}/branch/branchDropdown`)
      
      if (response && !response.error && response.data) {
        return response.data
      }
      
      return []
    } catch (error) {
      console.error('Error fetching branch dropdown items:', error)
      throw error
    }
  }

  // Create a new branch (for admin functionality)
  const createBranch = async (name: string, description?: string): Promise<Branch | null> => {
    try {
      const response = await $fetch<{
        error: boolean
        message: string
        data: Branch
      }>(`${API_BASE_URL}/branch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name,
          description: description || '',
        }
      })
      
      if (response && !response.error && response.data) {
        return response.data
      }
      
      return null
    } catch (error) {
      console.error('Error creating branch:', error)
      throw error
    }
  }

  // Delete a branch (for admin functionality)
  const deleteBranch = async (id: string): Promise<boolean> => {
    try {
      const response = await $fetch<{
        error: boolean
        message: string
      }>(`${API_BASE_URL}/branch/${id}`, {
        method: 'DELETE'
      })
      
      return response && !response.error
    } catch (error) {
      console.error('Error deleting branch:', error)
      throw error
    }
  }

  return {
    fetchBranches,
    fetchBranchDropdownItems,
    createBranch,
    deleteBranch,
  }
}