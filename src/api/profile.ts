import { useMutation } from '@tanstack/vue-query'
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
  return {
    mutateGetTable,
  }
}
