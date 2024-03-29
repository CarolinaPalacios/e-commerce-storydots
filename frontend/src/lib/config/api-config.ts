import { initQueryClient } from '@ts-rest/react-query'
import { contracts } from '../api-client'

export const api = initQueryClient(contracts, {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
  baseHeaders: {},
})
