import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fetchAllPokemon, fetchPokemonDetail } from '@/services/pokemon.service'

type FetchMock = ReturnType<typeof vi.fn>

function mockFetchOk(json: any): FetchMock {
  const fn = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => json,
  } as Response)
  // @ts-expect-error override global fetch for tests
  globalThis.fetch = fn
  return fn
}

function mockFetchError(status = 500, statusText = 'Internal Server Error', body = 'error'): FetchMock {
  const fn = vi.fn().mockResolvedValue({
    ok: false,
    status,
    statusText,
    text: async () => body,
  } as Response)
  // @ts-expect-error override global fetch for tests
  globalThis.fetch = fn
  return fn
}

describe('pokemon.service fetches', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetchAllPokemon calls PokeAPI list with limit=2000', async () => {
    const payload = { count: 0, next: null, previous: null, results: [] }
    const fetchSpy = mockFetchOk(payload)

    const res = await fetchAllPokemon()
    expect(res).toEqual(payload)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toContain('https://pokeapi.co/api/v2/pokemon')
    expect(String(url)).toContain('limit=2000')
    expect(String(url)).toContain('offset=0')
    expect((init as RequestInit).method).toBe('GET')
  })

  it('fetchAllPokemon throws on non-ok response', async () => {
    mockFetchError(503, 'Service Unavailable', 'down')
    await expect(fetchAllPokemon()).rejects.toThrow(/GET .*pokemon.* 503/i)
  })

  it('fetchPokemonDetail with absolute URL uses fetch directly', async () => {
    const detail = { id: 25, name: 'pikachu', types: [], sprites: {} }
    const fetchSpy = mockFetchOk(detail)
    const abs = 'https://pokeapi.co/api/v2/pokemon/25'
    const res = await fetchPokemonDetail(abs)
    expect(res).toEqual(detail)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const [url] = fetchSpy.mock.calls[0]
    expect(String(url)).toBe(abs)
  })

  it('fetchPokemonDetail with identifier uses api client base URL', async () => {
    const detail = { id: 25, name: 'pikachu', types: [], sprites: {} }
    const fetchSpy = mockFetchOk(detail)
    const res = await fetchPokemonDetail('pikachu')
    expect(res).toEqual(detail)
    const [url] = fetchSpy.mock.calls[0]
    expect(String(url)).toMatch(/^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/pikachu/) // built by apiClient
  })
})

