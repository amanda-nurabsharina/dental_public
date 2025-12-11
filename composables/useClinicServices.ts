import type {
  ClinicService,
  ClinicServiceListResponse,
} from './useApi';

interface ClinicServiceMutationPayload {
  title?: string;
  description?: string;
  is_active?: boolean;
  image?: File | Blob | null;
}

interface CreateClinicServicePayload
  extends ClinicServiceMutationPayload {
  title: string;
  description: string;
}

export const useClinicServices = () => {
  const { API_BASE_URL } = useApi();

  const buildClinicServiceFormData = (
    payload: ClinicServiceMutationPayload
  ) => {
    const formData = new FormData();

    if (payload.title !== undefined) {
      formData.append('title', payload.title);
    }

    if (payload.description !== undefined) {
      formData.append('description', payload.description);
    }

    if (payload.is_active !== undefined) {
      formData.append(
        'is_active',
        payload.is_active ? 'true' : 'false'
      );
    }

    if (payload.image instanceof File || payload.image instanceof Blob) {
      formData.append('image', payload.image);
    }

    return formData;
  };

  const fetchClinicServices = async (
    search = '',
    page = 1,
    limit = 12
  ): Promise<ClinicServiceListResponse> => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    return await $fetch<ClinicServiceListResponse>(
      `${API_BASE_URL}/clinicservicescontent?${params.toString()}`
    );
  };

  const fetchClinicServiceById = async (
    id: string
  ): Promise<ClinicService> => {
    return await $fetch<ClinicService>(
      `${API_BASE_URL}/clinicservicescontent/${id}`
    );
  };

  const createClinicService = async (
    payload: CreateClinicServicePayload
  ): Promise<ClinicService> => {
    const formData = buildClinicServiceFormData(payload);

    return await $fetch<ClinicService>(
      `${API_BASE_URL}/clinicservicescontent`,
      {
        method: 'POST',
        body: formData,
      }
    );
  };

  const updateClinicService = async (
    id: string,
    payload: ClinicServiceMutationPayload
  ): Promise<void> => {
    const formData = buildClinicServiceFormData(payload);

    await $fetch(`${API_BASE_URL}/clinicservicescontent/${id}`, {
      method: 'PUT',
      body: formData,
    });
  };

  const deleteClinicService = async (id: string): Promise<void> => {
    await $fetch(`${API_BASE_URL}/clinicservicescontent/${id}`, {
      method: 'DELETE',
    });
  };

  const getClinicServiceImageUrl = (id: string): string => {
    return `${API_BASE_URL}/clinicservicescontent/image/${id}`;
  };

  const fetchMultiBranchClinicServices = async (
    search = '',
    page = 1,
    limit = 12,
    branchId?: string
  ): Promise<ClinicServiceListResponse> => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (branchId) {
      params.append('branch_id', branchId);
    }

    const response = await $fetch<any>(
      `${API_BASE_URL}/publicappointment/multibranch/services?${params.toString()}`
    );

    return {
      data: response.data,
      page: response.page,
      limit: response.limit,
      total: response.total
    };
  };

  return {
    fetchClinicServices,
    fetchMultiBranchClinicServices,
    fetchClinicServiceById,
    createClinicService,
    updateClinicService,
    deleteClinicService,
    getClinicServiceImageUrl,
  };
};
