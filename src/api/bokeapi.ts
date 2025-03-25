import { useMutation, useQuery } from '@tanstack/vue-query'
import axios from 'axios'

type paramsType = {
  offset?: number
  limit?: number
}

export const useTable = () => {
  const mutateGetTable = () => {
    return useMutation({
      mutationFn: (params: paramsType) =>
        axios.get(`https://pokeapi.co/api/v2/berry`, {
          params: params,
        }),
    })
  }
  const useGetTable = (id: string) => {
    return useQuery({
      queryKey: ['table'],
      queryFn: () => axios.get(`https://pokeapi.co/api/v2/berry/${id}`),
    })
  }

  return {
    mutateGetTable,
    useGetTable,
  }
}
