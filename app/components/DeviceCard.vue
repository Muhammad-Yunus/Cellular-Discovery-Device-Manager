<script setup lang="ts">
import type { Device } from '~/composables/useDevices'

defineProps<{
  device: Device
}>()

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date)
}
</script>

<template>
  <UCard
    class="relative overflow-hidden transition-all duration-200 hover:shadow-lg"
    :ui="{ body: 'p-3', root: 'h-full' }"
  >
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2 min-w-0">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          :class="device.online ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'"
        >
          <UIcon
            name="i-lucide-router"
            class="w-4 h-4"
            :class="device.online ? 'text-green-600 dark:text-green-400' : 'text-gray-400'"
          />
        </div>

        <div class="min-w-0">
          <p class="text-sm font-mono font-semibold text-primary truncate">
            {{ device.ip }}
          </p>
          <p
            class="text-xs text-muted-foreground truncate mt-0.5"
            :title="device.hostname"
          >
            {{ device.hostname }}
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium shrink-0"
        :class="device.online
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'"
      >
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="device.online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'"
        />
        {{ device.online ? 'Online' : 'Offline' }}
      </div>
    </div>

    <div class="mt-2 pt-2 border-t border-default flex items-center justify-between text-xs text-muted-foreground">
      <span>Last seen</span>
      <span class="font-mono">{{ formatDate(device.lastSeen) }}</span>
    </div>
  </UCard>
</template>
