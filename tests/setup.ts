import { vi } from 'vitest'

// Basic clipboard mock for share tests
// Note: override only if not present to avoid JSDOM warnings
if (typeof globalThis.navigator === 'object') {
  // @ts-expect-error allow write
  globalThis.navigator.clipboard = globalThis.navigator.clipboard ?? {
    writeText: vi.fn().mockResolvedValue(undefined),
  }
}

