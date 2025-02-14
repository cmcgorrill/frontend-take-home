import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserResponse, USERS_API_URL } from "../constants"
import axios from "axios"


const useUsers = (search: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<UserResponse>({ queryKey: ['users', search], queryFn: () => getUsers(search) })

  const deleteUser = useMutation({
    mutationFn: (userId: string) => deleteUserFn(userId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { userData: data, usersIsLoading: isLoading, deleteUser }
}

const getUsers = (search: string): Promise<UserResponse> => axios.get(`${USERS_API_URL}?search=${search}`).then(res => res.data)
const deleteUserFn = (userId: string) => axios.delete(`${USERS_API_URL}/${userId}`)

export default useUsers