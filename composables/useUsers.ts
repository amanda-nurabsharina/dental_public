import type { 
  Doctor,
  DoctorContent,
  DoctorContentListResponse,
  AvailableDoctorsResponse,
  DoctorDropdownItem
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

  // Get available doctors for a specific date and time
  const getAvailableDoctors = async (date: string, time?: string, procedureId?: string): Promise<Doctor[]> => {
    try {
      const params = new URLSearchParams({ date })
      if (time) params.append('time', time)
      if (procedureId) params.append('procedure_id', procedureId)
      
      const response = await $fetch<AvailableDoctorsResponse>(`${API_BASE_URL}/doctor-schedule/available-doctors?${params.toString()}`)
      
      if (response && !response.error && response.data?.doctors) {
        // Transform AvailableDoctorInfo to Doctor format for compatibility
        return response.data.doctors.map((doctorInfo): Doctor => ({
          id: doctorInfo.user_id,
          user: {
            id: doctorInfo.user_id,
            profile: {
              full_name: doctorInfo.doctor_name,
              specialization: '', // Not available in available doctors API
              phone_number: '',
              email: '',
            }
          }
        }))
      }
      
      return []
    } catch (error) {
      console.error('Error fetching available doctors:', error)
      // Fallback to regular doctor list if available doctors API fails
      return fetchDoctors()
    }
  }

  // Fetch doctors from the public appointment dropdown endpoint
  const fetchDoctorsForDropdown = async (): Promise<Doctor[]> => {
    try {
      const response = await $fetch<DoctorDropdownItem[]>(`${API_BASE_URL}/publicappointment/doctors/dropdown`)
      
      // Transform DoctorDropdownItem to Doctor format for compatibility
      return response.map((doctor): Doctor => ({
        id: doctor.id,
        user: {
          id: doctor.id,
          profile: {
            full_name: doctor.username,
            specialization: 'Dokter Gigi', // Default specialization since not provided by the endpoint
            phone_number: '',
            email: '',
          }
        }
      }))
    } catch (error) {
      console.error('Error fetching doctors for dropdown:', error)
      // Fallback to the regular fetchDoctors if this endpoint fails
      return fetchDoctors()
    }
  }

  return {
    fetchDoctors,
    fetchDoctorContents,
    fetchDoctorById,
    getDoctorImageUrl,
    getAvailableDoctors,
    fetchDoctorsForDropdown,
  }
}

export const useUsers = () => {
  // You can add more user-related functions here in the future
  return {}
}
