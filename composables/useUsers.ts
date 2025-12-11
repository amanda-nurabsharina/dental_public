import type { 
  Doctor,
  DoctorContent,
  DoctorContentListResponse,
  DoctorContentResponse,
  AvailableDoctorsResponse,
  DoctorDropdownItem,
  DoctorDropdownByDateResponse
} from './useApi'

interface DoctorContentMutationPayload {
  title?: string
  description?: string
  doctor_id?: string
  is_active?: boolean
  image?: File | Blob | null
}

interface CreateDoctorContentPayload extends DoctorContentMutationPayload {
  title: string
  description: string
  doctor_id: string
  is_active?: boolean
}

const isDoctorContentResponse = (
  payload: DoctorContent | DoctorContentResponse
): payload is DoctorContentResponse => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as DoctorContentResponse).data === 'object'
  )
}

const extractDoctorContent = (
  payload: DoctorContent | DoctorContentResponse
): DoctorContent => {
  return isDoctorContentResponse(payload) ? payload.data : payload
}

export const useDoctors = () => {
  const { API_BASE_URL } = useApi()

  const buildDoctorContentFormData = (payload: DoctorContentMutationPayload) => {
    const formData = new FormData()

    if (payload.title !== undefined) {
      formData.append('title', payload.title)
    }

    if (payload.description !== undefined) {
      formData.append('description', payload.description)
    }

    if (payload.doctor_id) {
      formData.append('doctor_id', payload.doctor_id)
    }

    if (payload.is_active !== undefined) {
      formData.append('is_active', payload.is_active ? 'true' : 'false')
    }

    if (payload.image instanceof File || payload.image instanceof Blob) {
      formData.append('image', payload.image)
    }

    return formData
  }

  // Fetch all doctors from doctor-content endpoint
  const fetchDoctors = async (search = '', page = 1, limit = 100): Promise<Doctor[]> => {
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

  const fetchDoctorContentByAssociatedDoctorId = async (doctorUserId: string): Promise<DoctorContent | null> => {
    try {
      const response = await fetchDoctorContents('', 1, 500)
      return response.data.find((doctorContent) => doctorContent.doctor_id === doctorUserId) ?? null
    } catch (error) {
      console.error('Error finding doctor content by doctor user id:', error)
      return null
    }
  }

  const createDoctorContent = async (payload: CreateDoctorContentPayload): Promise<DoctorContent> => {
    const formData = buildDoctorContentFormData(payload)

    return await $fetch<DoctorContent>(`${API_BASE_URL}/doctorcontent`, {
      method: 'POST',
      body: formData,
    })
  }

  const updateDoctorContent = async (id: string, payload: DoctorContentMutationPayload): Promise<void> => {
    const formData = buildDoctorContentFormData(payload)

    await $fetch(`${API_BASE_URL}/doctorcontent/${id}`, {
      method: 'PUT',
      body: formData,
    })
  }

  const deleteDoctorContent = async (id: string): Promise<void> => {
    await $fetch(`${API_BASE_URL}/doctorcontent/${id}`, {
      method: 'DELETE',
    })
  }

  // Fetch doctor by ID
  const fetchDoctorById = async (id: string): Promise<DoctorContent> => {
    try {
      const response = await $fetch<DoctorContent | DoctorContentResponse>(
        `${API_BASE_URL}/doctorcontent/${id}`
      )
      return extractDoctorContent(response)
    } catch (error) {
      const fallbackDoctor = await fetchDoctorContentByAssociatedDoctorId(id)
      if (fallbackDoctor?.id) {
        try {
          const fallbackResponse = await $fetch<DoctorContent | DoctorContentResponse>(
            `${API_BASE_URL}/doctorcontent/${fallbackDoctor.id}`
          )
          return extractDoctorContent(fallbackResponse)
        } catch (fallbackError) {
          console.error(
            `Error fetching fallback doctor content with id ${fallbackDoctor.id}:`,
            fallbackError
          )
        }
        return fallbackDoctor
      }
      console.error(`Error fetching doctor with id ${id}:`, error)
      throw error
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
      throw error
    }
  }

  const transformDropdownDoctors = (items: DoctorDropdownItem[] = []): Doctor[] =>
    items.map((doctor): Doctor => ({
      id: doctor.id,
      user: {
        id: doctor.id,
        profile: {
          full_name: doctor.full_name || doctor.username,
          specialization: 'Dokter Gigi',
          phone_number: '',
          email: doctor.email || '',
        }
      }
    }))

  // Fetch doctors from the public appointment dropdown endpoint with optional branch filter
  const fetchDoctorsForDropdown = async (branchId?: string): Promise<Doctor[]> => {
    try {
      const params = new URLSearchParams()
      if (branchId) {
        params.append('branch_id', branchId)
      }
      
      const url = branchId 
        ? `${API_BASE_URL}/publicappointment/doctors/dropdown?${params.toString()}`
        : `${API_BASE_URL}/publicappointment/doctors/dropdown`
      
      const response = await $fetch<{ data: DoctorDropdownItem[] }>(url)

      return transformDropdownDoctors(response?.data ?? [])
    } catch (error) {
      console.error('Error fetching doctors for dropdown:', error)
      throw error
    }
  }

  const fetchDoctorsForDropdownByDate = async (date: string, time?: string, branchId?: string): Promise<Doctor[]> => {
    if (!date) {
      throw new Error('Date is required to fetch doctors for dropdown by date')
    }

    try {
      const params = new URLSearchParams({ date })
      if (time) {
        params.append('time', time)
      }
      if (branchId) {
        params.append('branch_id', branchId)
      }

      const url = `${API_BASE_URL}/publicappointment/doctors/dropdownwithfilterdate?${params.toString()}`
      console.log('[DEBUG] Fetching doctors from:', url)

      const response = await $fetch<DoctorDropdownByDateResponse | DoctorDropdownItem[]>(url)
      console.log('[DEBUG] Raw response:', response)

      const doctorItems = Array.isArray(response)
        ? response
        : response?.doctors ?? []

      console.log('[DEBUG] Extracted doctor items:', doctorItems)
      const result = transformDropdownDoctors(doctorItems)
      console.log('[DEBUG] Transformed doctors:', result)

      return result
    } catch (error) {
      console.error('Error fetching doctors for dropdown with date filter:', error)
      throw error
    }
  }

  const fetchMultiBranchDoctors = async (
    search = '',
    page = 1,
    limit = 10,
    branchId?: string
  ): Promise<DoctorContentListResponse> => {
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: limit.toString(),
      })
      
      if (branchId) {
        params.append('branch_id', branchId)
      }

      const response = await $fetch<any>(
        `${API_BASE_URL}/publicappointment/multibranch/doctors?${params.toString()}`
      )
      
      return {
        data: response.data,
        page: response.page,
        limit: response.limit,
        total: response.total
      }
    } catch (error) {
      console.error('Error fetching multi-branch doctors:', error)
      throw error
    }
  }

  return {
    fetchDoctors,
    fetchDoctorContents,
    fetchMultiBranchDoctors,
    fetchDoctorById,
    getDoctorImageUrl,
    getAvailableDoctors,
    fetchDoctorsForDropdown,
    fetchDoctorsForDropdownByDate,
    createDoctorContent,
    updateDoctorContent,
    deleteDoctorContent,
  }
}

export const useUsers = () => {
  // You can add more user-related functions here in the future
  return {}
}
