<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Cellular Discovery Device Manager'
const description = 'Detect and manage passive RF devices on your local network.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader class="bg-default/90 dark:bg-slate-900/90">
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1 flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-radio-tower"
            class="w-6 h-6 text-primary"
          />
          <span class="text-lg font-semibold">Device Manager</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1 ml-4">
          <NuxtLink
            to="/"
            class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5"
            :class="$route.path === '/' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
          >
            <UIcon
              name="i-lucide-home"
              class="w-4 h-4"
            />
            Home
          </NuxtLink>
          <NuxtLink
            to="/devices"
            class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5"
            :class="$route.path === '/devices' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
          >
            <UIcon
              name="i-lucide-router"
              class="w-4 h-4"
            />
            Devices
          </NuxtLink>
        </nav>
      </template>

      <template #right />
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
