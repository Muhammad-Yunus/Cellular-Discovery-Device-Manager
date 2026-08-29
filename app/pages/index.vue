<template>
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <div class="text-center py-12 space-y-4">
      <h1 class="text-3xl font-bold">
        Passive RF Device Manager
      </h1>
      <p class="text-muted-foreground max-w-md mx-auto">
        Detect and monitor passive RF scanning devices connected to your local network in real time.
      </p>

      <img
        src="~/assets/banner-diagram.png"
        alt="Network diagram"
        class="rounded-lg mx-auto mt-6"
        style="max-width: 500px; width: 100%;"
      >
    </div>

    <UAlert
      variant="subtle"
      color="info"
      icon="i-lucide-info"
      class="text-sm"
    >
      <template #title>
        Connect to the Same Network
      </template>
      <template #description>
        Make sure your browser is connected to the same WiFi network as the passive RF devices. The scanner probes port <code class="font-mono">8001</code> across your local subnet to discover all <code class="font-mono">passive-rf-device-0P*</code> units.
      </template>
    </UAlert>

    <div class="flex justify-center">
      <UButton
        to="/devices"
        size="lg"
        trailing-icon="i-lucide-arrow-right"
      >
        Go to Devices
      </UButton>
    </div>
  </div>
</template>
