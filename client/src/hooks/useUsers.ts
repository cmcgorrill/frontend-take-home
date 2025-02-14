import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserResponse, USERS_API_URL } from "../constants"
import axios from "axios"
import { useState } from "react"


const useUsers = (search: string) => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useQuery<UserResponse>({ queryKey: ['users', search, page], queryFn: () => getUsers(search, page) })

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUserFn(userId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const onNext = () => {
    if (data?.next) {
      setPage(data.next)
    }
  }

  const onPrev = () => {
    if (data?.prev) {
      setPage(data.prev)
    }
  }

  const deleteUser = (userId: string) => {
    deleteMutation.mutate(userId)
  }

  return { userData: data, usersIsLoading: isLoading, deleteUser, onNext, onPrev }
}

const getUsers = (search: string, page: number): Promise<UserResponse> =>
  axios.get(`${USERS_API_URL}?page=${page}&search=${search}`).then(res => res.data)
const deleteUserFn = (userId: string) => axios.delete(`${USERS_API_URL}/${userId}`)

export default useUsers