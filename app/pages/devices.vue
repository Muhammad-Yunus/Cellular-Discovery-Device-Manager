<script setup lang="ts">
import { useDevices } from '~/composables/useDevices'

const { devices, isScanning, isPolling, error, subnetBase, detectedSubnet, totalProbed, startPolling, stopPolling, runOneTimeScan } = useDevices()

function saveSubnet() {
  detectedSubnet.value = subnetBase.value
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('device-scan-subnet', subnetBase.value)
  }
}

onMounted(() => {
  startPolling()
})

function togglePolling() {
  if (isPolling.value) {
    stopPolling()
  } else {
    startPolling()
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-5">
    <UCard
      :ui="{
        root: 'border-default bg-[var(--color-slate-900)]',
        body: 'p-5'
      }"
    >
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-2xl font-bold">
            Devices
          </h1>
          <p class="text-sm text-muted-foreground mt-0.5">
            Passive RF device discovery — port 8001 · prefix <code class="text-xs bg-muted px-1 py-0.5 rounded">{{ detectedSubnet }}.*</code>
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <UInput
            v-model="subnetBase"
            placeholder="192.168.1"
            class="w-40 font-mono text-sm"
            size="sm"
            @blur="saveSubnet"
          />

          <UButton
            label="Scan Now"
            icon="i-lucide-refresh-cw"
            :loading="isScanning"
            size="sm"
            @click="runOneTimeScan"
          />

          <UButton
            :label="isPolling ? 'Stop Polling' : 'Start Polling'"
            :icon="isPolling ? 'i-lucide-square' : 'i-lucide-play'"
            :color="isPolling ? 'neutral' : 'primary'"
            variant="subtle"
            size="sm"
            @click="togglePolling"
          />
        </div>
      </div>

      <div
        v-if="error"
        class="p-3 mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
      >
        {{ error }}
      </div>

      <div class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap mt-4">
        <span class="flex items-center gap-1.5">
          <UIcon
            name="i-lucide-router"
            class="w-4 h-4"
          />
          Found: <strong class="text-foreground">{{ devices.length }}</strong>
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon
            name="i-lucide-network"
            class="w-4 h-4"
          />
          Probed: <strong class="text-foreground">{{ totalProbed }}</strong>
        </span>
        <UBadge
          v-if="isPolling"
          label="Auto-refresh 10s"
          color="success"
          variant="soft"
          size="xs"
        />
      </div>
    </UCard>

    <div
      v-if="devices.length === 0 && !isScanning && !isPolling"
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-search-x"
        class="w-16 h-16 text-muted-foreground mx-auto mb-3"
      />
      <p class="text-lg font-medium text-muted-foreground">
        No Passive RF device found!
      </p>
    </div>

    <div
      v-if="isScanning && devices.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-lucide-loader-2"
        class="w-10 h-10 text-primary mx-auto mb-2 animate-spin"
      />
      <p class="text-muted-foreground text-sm">
        Scanning network... (probing {{ totalProbed }} IPs)
      </p>
    </div>

    <div
      v-if="devices.length > 0"
      class="border-[0.5px] rounded-lg p-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <DeviceCard
          v-for="device in devices"
          :key="device.ip"
          :device="device"
        />
      </div>
    </div>
  </div>
</template>
