export const useApi = () => {
  const config = useRuntimeConfig()
  
  // Base API URL - you can set this in nuxt.config.ts or use environment variable
  const API_BASE_URL = config.public.apiBaseUrl || 'http://localhost:8080/api/v1'

  return {
    API_BASE_URL
  }
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  message?: string
  success?: boolean
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  total_pages: number
}

export interface Branch {
  id: string
  name: string
  address?: string
  phone_number?: string
  created_at?: string
  updated_at?: string
}

export interface BranchDropdownItem {
  id: string
  name: string
}

export interface BranchDropdownResponse {
  error: boolean
  message: string
  data: BranchDropdownItem[]
}

export interface AvailableDoctorInfo {
  doctor_info_id: string
  doctor_name: string
  user_id: string
}

export interface AvailableDoctorsResponse {
  error: boolean
  message: string
  data: {
    doctors: AvailableDoctorInfo[]
  }
}

export interface UserProfile {
  id?: string
  full_name: string
  specialization?: string
  phone_number?: string
  email?: string
}

export interface User {
  id: string
  profile?: UserProfile
}

export interface Doctor {
  id: string
  user?: User
}

export interface DoctorContent {
  id: string
  title: string
  description: string
  is_active: boolean
  created_at: string
  updated_at: string
  doctor_id: string
  doctor_name: string
  doctor_email: string
  ihs_number: string
  str_number: string
  s_ip_number: string
  fee_percentage: number
  schedules: DoctorSchedule[]
}

export interface DoctorSchedule {
  day_of_week: string
  shift1_start: string
  shift1_end: string
  shift2_start: string
  shift2_end: string
  is_active: boolean
}

export interface DoctorContentListResponse {
  data: DoctorContent[]
  page: number
  limit: number
  total: number
}

export interface PublicAppointment {
  id: string
  doctor_id: string
  clinic_branch_id: string
  phone_number: string
  treatment_plan: string
  appointment_date: string
  name: string
  status_patient: 'married' | 'single'
  description: string
  created_at: string
  updated_at: string
  branch?: Branch
  user?: User
}

export interface CreatePublicAppointmentRequest {
  doctor_id: string
  clinic_branch_id: string
  phone_number: string
  treatment_plan: string
  appointment_date: string
  name: string
  status_patient: 'married' | 'single'
  description: string
}

export interface PublicAppointmentListResponse {
  appointments: PublicAppointment[]
  pagination: PaginationInfo
}