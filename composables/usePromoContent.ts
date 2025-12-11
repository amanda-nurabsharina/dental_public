import type {
  PromoContent,
  PromoContentListResponse,
} from './useApi';

interface PromoContentMutationPayload {
  title?: string;
  description?: string;
  is_active?: boolean;
  image?: File | Blob | null;
}

interface CreatePromoContentPayload
  extends PromoContentMutationPayload {
  title: string;
  description: string;
}

export const usePromoContent = () => {
  const { API_BASE_URL } = useApi();

  const buildPromoContentFormData = (
    payload: PromoContentMutationPayload
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

  const fetchPromoContents = async (
    search = '',
    page = 1,
    limit = 10
  ): Promise<PromoContentListResponse> => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    return await $fetch<PromoContentListResponse>(
      `${API_BASE_URL}/promocontent?${params.toString()}`
    );
  };

  const fetchPromoContentById = async (
    id: string
  ): Promise<PromoContent> => {
    return await $fetch<PromoContent>(
      `${API_BASE_URL}/promocontent/${id}`
    );
  };

  const createPromoContent = async (
    payload: CreatePromoContentPayload
  ): Promise<PromoContent> => {
    const formData = buildPromoContentFormData(payload);

    return await $fetch<PromoContent>(
      `${API_BASE_URL}/promocontent`,
      {
        method: 'POST',
        body: formData,
      }
    );
  };

  const updatePromoContent = async (
    id: string,
    payload: PromoContentMutationPayload
  ): Promise<void> => {
    const formData = buildPromoContentFormData(payload);

    await $fetch(`${API_BASE_URL}/promocontent/${id}`, {
      method: 'PUT',
      body: formData,
    });
  };

  const deletePromoContent = async (id: string): Promise<void> => {
    await $fetch(`${API_BASE_URL}/promocontent/${id}`, {
      method: 'DELETE',
    });
  };

  const getPromoContentImageUrl = (id: string): string => {
    return `${API_BASE_URL}/promocontent/image/${id}`;
  };

  const fetchMultiBranchPromoContents = async (
    search = '',
    page = 1,
    limit = 10,
    branchId?: string
  ): Promise<PromoContentListResponse> => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (branchId) {
      params.append('branch_id', branchId);
    }

    const response = await $fetch<any>(
      `${API_BASE_URL}/publicappointment/multibranch/promos?${params.toString()}`
    );

    return {
      data: response.data,
      page: response.page,
      limit: response.limit,
      total: response.total
    };
  };

  return {
    fetchPromoContents,
    fetchMultiBranchPromoContents,
    fetchPromoContentById,
    createPromoContent,
    updatePromoContent,
    deletePromoContent,
    getPromoContentImageUrl,
  };
};
