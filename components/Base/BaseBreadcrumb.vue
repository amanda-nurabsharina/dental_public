<!--
BaseBreadcrumb Component

A flexible breadcrumb navigation component that automatically generates breadcrumbs
based on the current route, with support for custom breadcrumb items.

Features:
- Auto-generates breadcrumbs from route hierarchy
- Indonesian page title mappings
- Customizable breadcrumb items
- Responsive design
- Accessibility support
- Vuetify theming integration

Usage Examples:

1. Auto-generated breadcrumbs (default):
   <BaseBreadcrumb />
   
2. Custom breadcrumb items:
   <BaseBreadcrumb :items="[
     { title: 'Beranda', to: '/' },
     { title: 'Produk', to: '/products' },
     { title: 'Detail', disabled: true }
   ]" />
   
3. Hide home link:
   <BaseBreadcrumb :show-home="false" />
   
4. Show on homepage (default hides on home):
   <BaseBreadcrumb :hide-on-home="false" />

Props:
- items?: BreadcrumbItem[] - Custom breadcrumb items
- showHome?: boolean - Show home/beranda as first item (default: true)
- hideOnHome?: boolean - Hide breadcrumb on homepage (default: true)

Automatic Route Mapping:
- / → Beranda
- /about → Beranda / Tentang Kami
- /services → Beranda / Layanan
- /doctors → Beranda / Dokter
- /contact → Beranda / Kontak Kami
- etc.
-->

<template>
  <nav v-if="shouldRender" class="bg-primary-20" aria-label="Breadcrumb">
    <div class="container py-6">
      <v-breadcrumbs
        :items="breadcrumbItems"
        density="comfortable"
        class="!p-0 gap-x-4"
      >
        <template #item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            class="!text-medium-normal !text-grey-700"
            :class="{
              '!text-secondary-2 !opacity-100 text-medium-medium':
                item.disabled,
            }"
          >
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>

        <template #divider>
          <svg
            width="8"
            height="15"
            viewBox="0 0 8 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.5L5 7.5L0 2.5L1 0.5L8 7.5L1 14.5L0 12.5Z"
              fill="#6B7280"
            />
          </svg>
        </template>
      </v-breadcrumbs>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string;
  to?: string;
  disabled?: boolean;
}

interface Props {
  /**
   * Custom breadcrumb items. If not provided, will auto-generate from route
   */
  items?: BreadcrumbItem[];
  /**
   * Show home/beranda as first item
   */
  showHome?: boolean;
  /**
   * Hide breadcrumb on homepage
   */
  hideOnHome?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: undefined,
  showHome: true,
  hideOnHome: true,
});

const route = useRoute();

// Page title mappings for Indonesian
const pageTitleMap: Record<string, string> = {
  '': 'Beranda',
  about: 'Tentang Kami',
  contact: 'Kontak Kami',
  doctors: 'Dokter',
  promo: 'Promo',
  reservation: 'Reservasi',
  schedules: 'Jadwal',
  services: 'Layanan',
  testimonials: 'Testimoni',
};

const isHomePage = computed(() => route.path === '/' || route.path === '');

const breadcrumbItems = computed(() => {
  // Hide breadcrumb on homepage if hideOnHome is true
  if (props.hideOnHome && isHomePage.value) {
    return [];
  }

  // If custom items are provided, use them
  if (props.items) {
    return props.items;
  }

  const items: BreadcrumbItem[] = [];

  // Always add home if showHome is true and not on homepage
  if (props.showHome) {
    items.push({
      title: 'Beranda',
      to: '/',
      disabled: isHomePage.value,
    });
  }

  // Generate breadcrumbs from route path
  const pathSegments = route.path
    .split('/')
    .filter((segment) => segment !== '');

  // If on homepage and showHome is true, just return home item
  if (isHomePage.value && props.showHome) {
    return items;
  }

  // Build breadcrumb items from path segments
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // Get the title from mapping or format the segment
    const title = pageTitleMap[segment] || formatSegmentTitle(segment);

    items.push({
      title,
      to: currentPath,
      disabled: isLast, // Last item is disabled (current page)
    });
  });

  return items;
});

/**
 * Format a route segment into a readable title
 */
function formatSegmentTitle(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Don't render component if no items
const shouldRender = computed(() => {
  return breadcrumbItems.value.length > 0;
});
</script>
