import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export type ProfileUpdateInput = {
  image_url?: string | null
  gender?: 'female' | 'male' | null
  work?: string | null
  bio?: string | null
}

export const useTable = () => {
  const useGetTable = () => {
    return useQuery({
      queryKey: ['table'],
      queryFn: () => axios.get('https://pokeapi.co/api/v2/berry'),
    })
  }

  return {
    useGetTable,
  }
}
