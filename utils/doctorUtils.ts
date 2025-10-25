import type { DoctorContent, Doctor, Branch, BranchDropdownItem, DoctorSchedule } from '~/composables/useApi'

/**
 * Utility functions for working with doctor data
 */

// Transform DoctorContent to Doctor for backward compatibility
export const transformDoctorContentToDoctor = (doctorContent: DoctorContent): Doctor => {
  return {
    id: doctorContent.doctor_id,
    user: {
      id: doctorContent.doctor_id,
      profile: {
        full_name: doctorContent.doctor_name,
        specialization: doctorContent.title,
        email: doctorContent.doctor_email,
        phone_number: '', // Not available in DoctorContent
      }
    }
  }
}

// Transform array of DoctorContent to Doctor array
export const transformDoctorContentsToDeepDoctors = (doctorContents: DoctorContent[]): Doctor[] => {
  return doctorContents.map(transformDoctorContentToDoctor)
}

// Get doctor display name
export const getDoctorDisplayName = (doctor: Doctor | DoctorContent): string => {
  if ('doctor_name' in doctor) {
    return doctor.doctor_name
  }
  return doctor.user?.profile?.full_name || `Doctor ${doctor.id}`
}

// Get doctor specialization/title
export const getDoctorSpecialization = (doctor: Doctor | DoctorContent): string => {
  if ('title' in doctor) {
    return doctor.title
  }
  return doctor.user?.profile?.specialization || 'Kedokteran Gigi Umum'
}

// Format doctor for select options
export const formatDoctorForSelect = (doctor: Doctor | DoctorContent) => {
  return {
    title: getDoctorDisplayName(doctor),
    value: 'doctor_id' in doctor ? doctor.doctor_id : doctor.id,
    subtitle: getDoctorSpecialization(doctor)
  }
}

/**
 * Branch utility functions
 */

// Transform BranchDropdownItem to Branch for backward compatibility
export const transformBranchDropdownToBranch = (branchItem: BranchDropdownItem): Branch => {
  return {
    id: branchItem.id,
    name: branchItem.name,
    address: '', // Not available in dropdown API
    phone_number: '', // Not available in dropdown API
  }
}

// Transform array of BranchDropdownItem to Branch array
export const transformBranchDropdownsToBranches = (branchItems: BranchDropdownItem[]): Branch[] => {
  return branchItems.map(transformBranchDropdownToBranch)
}

// Get branch display name
export const getBranchDisplayName = (branch: Branch | BranchDropdownItem): string => {
  return branch.name
}

// Format branch for select options
export const formatBranchForSelect = (branch: Branch | BranchDropdownItem) => {
  return {
    title: getBranchDisplayName(branch),
    value: branch.id,
  }
}

/**
 * Schedule and availability utility functions
 */

// Check if a doctor is available at a specific time
export const isDoctorAvailableAtTime = (schedules: DoctorSchedule[], dayOfWeek: string, time: string): boolean => {
  const daySchedule = schedules.find(s => 
    s.day_of_week.toLowerCase() === dayOfWeek.toLowerCase() && s.is_active
  )
  
  if (!daySchedule) return false
  
  const timeMinutes = timeToMinutes(time)
  
  // Check shift 1
  if (daySchedule.shift1_start && daySchedule.shift1_end) {
    const shift1Start = timeToMinutes(daySchedule.shift1_start)
    const shift1End = timeToMinutes(daySchedule.shift1_end)
    if (timeMinutes >= shift1Start && timeMinutes <= shift1End) {
      return true
    }
  }
  
  // Check shift 2
  if (daySchedule.shift2_start && daySchedule.shift2_end) {
    const shift2Start = timeToMinutes(daySchedule.shift2_start)
    const shift2End = timeToMinutes(daySchedule.shift2_end)
    if (timeMinutes >= shift2Start && timeMinutes <= shift2End) {
      return true
    }
  }
  
  return false
}

// Convert time string (HH:MM) to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Get day of week from date string
export const getDayOfWeekFromDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
}

// Format doctor availability status
export const formatDoctorAvailability = (doctor: Doctor | DoctorContent, date?: string, time?: string): string => {
  if (!date) return getDoctorSpecialization(doctor)
  
  const specialization = getDoctorSpecialization(doctor)
  
  if ('schedules' in doctor && doctor.schedules) {
    const dayOfWeek = getDayOfWeekFromDate(date)
    const isAvailable = time 
      ? isDoctorAvailableAtTime(doctor.schedules, dayOfWeek, time)
      : doctor.schedules.some(s => 
          s.day_of_week.toLowerCase() === dayOfWeek && s.is_active
        )
    
    return isAvailable 
      ? `${specialization} - Tersedia` 
      : `${specialization} - Tidak tersedia`
  }
  
  return specialization
}