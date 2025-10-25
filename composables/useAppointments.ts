import type { 
  PublicAppointment, 
  CreatePublicAppointmentRequest, 
  PublicAppointmentListResponse
} from './useApi'

export const useAppointments = () => {
  const { API_BASE_URL } = useApi()

  // Create a new public appointment
  const createPublicAppointment = async (data: CreatePublicAppointmentRequest): Promise<PublicAppointment> => {
    try {
      const response = await $fetch<PublicAppointment>(`${API_BASE_URL}/publicappointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
      return response
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  }

  // Get appointment by ID
  const getAppointmentById = async (id: string): Promise<PublicAppointment> => {
    try {
      const response = await $fetch<PublicAppointment>(`${API_BASE_URL}/publicappointment/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching appointment:', error)
      throw error
    }
  }

  // List appointments with search and pagination
  const listAppointments = async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<PublicAppointmentListResponse> => {
    try {
      const query = new URLSearchParams()
      
      if (params?.search) query.append('search', params.search)
      if (params?.page) query.append('page', params.page.toString())
      if (params?.limit) query.append('limit', params.limit.toString())

      const queryString = query.toString()
      const url = `${API_BASE_URL}/publicappointment${queryString ? `?${queryString}` : ''}`
      
      const response = await $fetch<PublicAppointmentListResponse>(url)
      return response
    } catch (error) {
      console.error('Error fetching appointments:', error)
      throw error
    }
  }

  // Delete appointment
  const deleteAppointment = async (id: string): Promise<void> => {
    try {
      await $fetch(`${API_BASE_URL}/publicappointment/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Error deleting appointment:', error)
      throw error
    }
  }

  return {
    createPublicAppointment,
    getAppointmentById,
    listAppointments,
    deleteAppointment,
  }
}



