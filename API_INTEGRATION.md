# API Integration Guide

This document describes how the frontend integrates with the Go backend API for the Dental Reservation System.

## API Configuration

The API base URL is configured in `nuxt.config.ts` and can be overridden using environment variables:

```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
  },
}
```

## Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env
```

```env
# .env
API_BASE_URL=http://localhost:8080/api/v1
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

## API Endpoints Used

### Public Appointments

- **POST** `/publicappointment` - Create new appointment
- **GET** `/publicappointment` - List appointments with pagination and search
- **GET** `/publicappointment/:id` - Get appointment by ID  
- **DELETE** `/publicappointment/:id` - Delete appointment

### Branches (if available)
- **GET** `/branches` - Get clinic branches

### Doctors (if available)
- **GET** `/doctors` - Get doctors list

## Data Models

### CreatePublicAppointmentRequest
```typescript
interface CreatePublicAppointmentRequest {
  doctor_id: string
  clinic_branch_id: string  
  phone_number: string
  treatment_plan: string
  appointment_date: string // ISO format
  name: string
  status_patient: 'married' | 'single'
  description: string
}
```

### PublicAppointment (Response)
```typescript
interface PublicAppointment {
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
```

### DoctorContent (New API)
```typescript
interface DoctorContent {
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

interface DoctorSchedule {
  day_of_week: string
  shift1_start: string
  shift1_end: string
  shift2_start: string
  shift2_end: string
  is_active: boolean
}

interface DoctorContentListResponse {
  data: DoctorContent[]
  page: number
  limit: number
  total: number
}
```

### BranchDropdown (New API)
```typescript
interface BranchDropdownItem {
  id: string
  name: string
}

interface BranchDropdownResponse {
  error: boolean
  message: string
  data: BranchDropdownItem[]
}
```

### AvailableDoctors (Schedule API)
```typescript
interface AvailableDoctorInfo {
  doctor_info_id: string
  doctor_name: string
  user_id: string
}

interface AvailableDoctorsResponse {
  error: boolean
  message: string
  data: {
    doctors: AvailableDoctorInfo[]
  }
}
```

## Composables

### useAppointments()
Manages appointment CRUD operations:
- `createPublicAppointment(data)` - Create new appointment
- `getAppointmentById(id)` - Get appointment by ID
- `listAppointments(params)` - List with search & pagination
- `deleteAppointment(id)` - Delete appointment

### useBranches()
Enhanced branch management with the new branch API:

#### Methods:
- `fetchBranches()` - Get branches list (transformed for backward compatibility)
- `fetchBranchDropdownItems()` - Get dropdown-specific branch data
- `createBranch(name, description?)` - Create new branch (admin function)
- `deleteBranch(id)` - Delete branch (admin function)

#### Usage Examples:

```typescript
// Basic branch list for select inputs (backward compatible)
const { fetchBranches } = useBranches()
const branches = await fetchBranches()

// Optimized dropdown data
const { fetchBranchDropdownItems } = useBranches()
const dropdownItems = await fetchBranchDropdownItems()

// Admin operations
const { createBranch, deleteBranch } = useBranches()
const newBranch = await createBranch('New Branch Name', 'Description')
await deleteBranch('branch-id')
```

#### API Endpoints Used:
- `GET /branch/branchDropdown` - Get branches for dropdown
- `POST /branch` - Create new branch
- `DELETE /branch/:id` - Delete branch

#### Data Transformation:
The `fetchBranches()` method transforms the API `BranchDropdownItem` format to the legacy `Branch` format:

```typescript
// BranchDropdownItem (from API) -> Branch (legacy format)
{
  id: branchItem.id,
  name: branchItem.name,
  address: '', // Not available in dropdown API
  phone_number: '', // Not available in dropdown API
}
```

### useDoctors()  
Enhanced doctor management with the new doctor-content API:

#### Methods:
- `fetchDoctors(search?, page?, limit?)` - Get transformed doctors list for backward compatibility
- `fetchDoctorContents(search?, page?, limit?)` - Get full doctor content data with schedules
- `fetchDoctorById(id)` - Get single doctor content by ID
- `getDoctorImageUrl(id)` - Get doctor image URL
- `getAvailableDoctors(date, time?, procedureId?)` - Get doctors available on specific date/time

#### Usage Examples:

```typescript
// Basic doctor list for select inputs (backward compatible)
const { fetchDoctors } = useDoctors()
const doctors = await fetchDoctors()

// Full doctor content with schedules and credentials  
const { fetchDoctorContents } = useDoctors()
const response = await fetchDoctorContents('search term', 1, 10)
console.log(response.data) // Array of DoctorContent objects

// Get single doctor with full details
const { fetchDoctorById } = useDoctors()  
const doctor = await fetchDoctorById('doctor-id')

// Display doctor image
const { getDoctorImageUrl } = useDoctors()
const imageUrl = getDoctorImageUrl('doctor-id')

// Get available doctors for a specific date and time
const { getAvailableDoctors } = useDoctors()
const availableDoctors = await getAvailableDoctors('2024-12-25', '10:00', 'procedure-id')
```

#### API Endpoints Used:
- `GET /doctorcontent?search=&page=&limit=` - List doctors with search and pagination
- `GET /doctorcontent/:id` - Get doctor by ID
- `GET /doctorcontent/image/:id` - Get doctor image
- `GET /doctor-schedule/available?date=&time=&procedure_id=` - Get available doctors for date/time

#### Data Transformation:
The `fetchDoctors()` method transforms the API `DoctorContent` format to the legacy `Doctor` format for backward compatibility:

```typescript
// DoctorContent (from API) -> Doctor (legacy format)  
{
  id: doctorContent.doctor_id,
  user: {
    id: doctorContent.doctor_id,
    profile: {
      full_name: doctorContent.doctor_name,
      specialization: doctorContent.title,
      email: doctorContent.doctor_email
    }
  }
}
```

## Pages

### /reservation
Form for creating new appointments with:
- Form validation
- API integration
- Loading states
- Error handling

### /appointments  
Admin page for managing appointments with:
- Search functionality
- Pagination
- Delete confirmation
- Detail view modal

## Error Handling

All API calls include error handling with user-friendly messages. Fallback data is provided when API endpoints are not available.

## CORS Configuration

Make sure your Go backend allows CORS for the frontend domain:

```go
// In your Go backend
router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:3000"}, // Nuxt dev server
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Content-Type", "Authorization"},
    AllowCredentials: true,
}))
```

## Running the Application

1. Start the Go backend server on port 8080
2. Start the Nuxt frontend:

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Features

- ✅ Create public appointments
- ✅ List appointments with search  
- ✅ Delete appointments
- ✅ View appointment details
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Fallback data when API unavailable