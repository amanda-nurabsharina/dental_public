import type { DoctorContent, Doctor, Branch, BranchDropdownItem } from '~/composables/useApi'

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