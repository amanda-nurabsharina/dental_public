import type { 
  Doctor,
  DoctorContent,
  DoctorContentListResponse
} from './useApi'

export const useDoctors = () => {
  const { API_BASE_URL } = useApi()

  // Fetch all doctors from doctor-content endpoint
  const fetchDoctors = async (search = '', page = 1, limit = 100): Promise<Doctor[]> => {
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: limit.toString()
      })
      
      const response = await $fetch<DoctorContentListResponse>(`${API_BASE_URL}/doctorcontent?${params.toString()}`)
      
      // Transform DoctorContent to Doctor format for compatibility
      return response.data.map((doctorContent): Doctor => ({
        id: doctorContent.doctor_id,
        user: {
          id: doctorContent.doctor_id,
          profile: {
            full_name: doctorContent.doctor_name,
            specialization: doctorContent.title, // Use title as specialization
            phone_number: '', // Not available in doctor-content
            email: doctorContent.doctor_email,
          }
        }
      }))
    } catch (error) {
      console.error('Error fetching doctors:', error)
      // Return fallback data if API fails
      return [
        
      ]
    }
  }

  // Fetch all doctor contents with full details
  const fetchDoctorContents = async (search = '', page = 1, limit = 100): Promise<DoctorContentListResponse> => {
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: limit.toString()
      })
      
      return await $fetch<DoctorContentListResponse>(`${API_BASE_URL}/doctorcontent?${params.toString()}`)
    } catch (error) {
      console.error('Error fetching doctor contents:', error)
      throw error
    }
  }

  // Fetch doctor by ID
  const fetchDoctorById = async (id: string): Promise<DoctorContent | null> => {
    try {
      const response = await $fetch<DoctorContent>(`${API_BASE_URL}/doctorcontent/${id}`)
      return response
    } catch (error) {
      console.error(`Error fetching doctor with id ${id}:`, error)
      return null
    }
  }

  // Get doctor image URL
  const getDoctorImageUrl = (id: string): string => {
    return `${API_BASE_URL}/doctorcontent/image/${id}`
  }

  return {
    fetchDoctors,
    fetchDoctorContents,
    fetchDoctorById,
    getDoctorImageUrl,
  }
}

export const useUsers = () => {
  // You can add more user-related functions here in the future
  return {}
}
