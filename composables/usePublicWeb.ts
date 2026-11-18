export interface WebHeroContent {
  id?: string;
  tagline?: string;
  title?: string;
  description?: string;
  btn_primary_text?: string;
  btn_primary_url?: string;
  btn_secondary_text?: string;
  btn_secondary_url?: string;
  is_active?: boolean;
}

export interface WebHeroBanner {
  id: string;
  title?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface WebAboutFeature {
  id: string;
  title: string;
  description: string;
  icon_type: 'icon' | 'image';
  icon_name?: string;
  order_index?: number;
  is_active: boolean;
}

export interface WebTestimonial {
  id: string;
  patient_name: string;
  rating: number;
  comment: string;
  order_index?: number;
  is_active: boolean;
}

export interface WebContactBranch {
  id: string;
  branch_name: string;
  address: string;
  email: string;
  whatsapp: string;
  latitude?: number;
  longitude?: number;
  map_url?: string;
  order_index?: number;
  is_active: boolean;
}

export interface WebHeaderFooterConfig {
  id?: string;
  brand_name?: string;
  brand_description?: string;
  phone_number?: string;
  email?: string;
  instagram_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  copyright_text?: string;
}

export const usePublicWeb = () => {
  const { API_BASE_URL } = useApi();

  const fetchHero = async (): Promise<WebHeroContent | null> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/hero`);
      return res?.data || null;
    } catch (e) {
      console.warn('Failed to fetch public hero config, using fallback:', e);
      return null;
    }
  };

  const getHeroImageUrl = () => `${API_BASE_URL}/publicweb/hero/image`;

  const fetchHeroBanners = async (): Promise<WebHeroBanner[]> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/hero/banners`);
      return res?.data || [];
    } catch (e) {
      console.warn('Failed to fetch public hero banners:', e);
      return [];
    }
  };

  const getHeroBannerUrl = (id: string) => `${API_BASE_URL}/publicweb/hero/banner/${id}`;

  const fetchAbout = async (): Promise<WebAboutFeature[]> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/about`);
      return res?.data || [];
    } catch (e) {
      console.warn('Failed to fetch public about features, using fallback:', e);
      return [];
    }
  };

  const getAboutImageUrl = (id: string) => `${API_BASE_URL}/publicweb/about/image/${id}`;

  const fetchTestimonials = async (): Promise<WebTestimonial[]> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/testimonials`);
      return res?.data || [];
    } catch (e) {
      console.warn('Failed to fetch public testimonials, using fallback:', e);
      return [];
    }
  };

  const getTestimonialAvatarUrl = (id: string) => `${API_BASE_URL}/publicweb/testimonials/avatar/${id}`;

  const fetchContactBranches = async (): Promise<WebContactBranch[]> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/contact`);
      return res?.data || [];
    } catch (e) {
      console.warn('Failed to fetch public contact branches, using fallback:', e);
      return [];
    }
  };

  const fetchHeaderFooter = async (): Promise<WebHeaderFooterConfig | null> => {
    try {
      const res: any = await $fetch(`${API_BASE_URL}/publicweb/header-footer`);
      return res?.data || null;
    } catch (e) {
      console.warn('Failed to fetch public header-footer config, using fallback:', e);
      return null;
    }
  };

  const getHeaderLogoUrl = () => `${API_BASE_URL}/publicweb/header-footer/logo`;

  return {
    fetchHero,
    getHeroImageUrl,
    fetchHeroBanners,
    getHeroBannerUrl,
    fetchAbout,
    getAboutImageUrl,
    fetchTestimonials,
    getTestimonialAvatarUrl,
    fetchContactBranches,
    fetchHeaderFooter,
    getHeaderLogoUrl,
  };
};
