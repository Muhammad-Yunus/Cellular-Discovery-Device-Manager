import { ref, onMounted, onUnmounted } from 'vue'

const HOSTNAME_PREFIX = 'passive-rf-device-0P'
const SCAN_PORT = 8001
const API_PATH = '/api/v1/device/status'
const SCAN_RANGE_START = 1
const SCAN_RANGE_END = 254
const POLL_INTERVAL = 10000
const FETCH_TIMEOUT = 3000

export interface Device {
  ip: string
  hostname: string
  lastSeen: Date
  online: boolean
}

export function useDevices() {
  const devices = ref<Device[]>([])
  const isScanning = ref(false)
  const isPolling = ref(false)
  const error = ref<string | null>(null)
  const subnetBase = ref<string>('192.168.1')
  const detectedSubnet = ref<string>('192.168.1')
  const totalProbed = ref(0)
  const totalFound = ref(0)

  let pollTimer: ReturnType<typeof setTimeout> | null = null

  async function fetchDeviceStatus(ip: string): Promise<Device | null> {
    const url = `http://${ip}:${SCAN_PORT}${API_PATH}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors',
        headers: { accept: 'application/json' }
      })

      clearTimeout(timeoutId)

      if (!res.ok) return null

      const data = await res.json().catch(() => null)
      if (!data) return null

      const ipFromDevice = data.network?.ip_address || ip
      const hostname = `${HOSTNAME_PREFIX}${ipFromDevice.split('.').pop()}`

      return {
        ip: ipFromDevice,
        hostname,
        lastSeen: new Date(),
        online: true
      }
    } catch {
      clearTimeout(timeoutId)
      return null
    }
  }

  async function scanSubnet(rangeStart = SCAN_RANGE_START, rangeEnd = SCAN_RANGE_END): Promise<Device[]> {
    const found: Device[] = []
    const batchSize = 15
    totalProbed.value = 0

    for (let i = rangeStart; i <= rangeEnd; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, rangeEnd - i + 1) },
        (_, idx) => `${subnetBase.value}.${i + idx}`
      )

      totalProbed.value += batch.length

      const results = await Promise.all(batch.map(fetchDeviceStatus))
      const batchFound = results.filter(Boolean) as Device[]
      found.push(...batchFound)
    }

    totalFound.value = found.length
    return found
  }

  function startPolling() {
    if (isPolling.value) return

    isPolling.value = true
    error.value = null

    async function poll() {
      try {
        const found = await scanSubnet()
        devices.value = found
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Scan failed'
      } finally {
        if (isPolling.value) {
          pollTimer = setTimeout(poll, POLL_INTERVAL)
        }
      }
    }

    poll()
  }

  function stopPolling() {
    isPolling.value = false
    if (pollTimer) {
      clearTimeout(pollTimer)
      pollTimer = null
    }
  }

  async function runOneTimeScan() {
    isScanning.value = true
    error.value = null

    try {
      const found = await scanSubnet()
      devices.value = found
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Scan failed'
    } finally {
      isScanning.value = false
    }
  }

  onMounted(() => {
    const saved = localStorage.getItem('device-scan-subnet')
    if (saved) {
      subnetBase.value = saved
      detectedSubnet.value = saved
    }
  })

  onUnmounted(() => {
    stopPolling()
  })

  return {
    devices,
    isScanning,
    isPolling,
    error,
    subnetBase,
    detectedSubnet,
    totalProbed,
    totalFound,
    startPolling,
    stopPolling,
    runOneTimeScan
  }
}
