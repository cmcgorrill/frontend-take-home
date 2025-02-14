import { useQuery } from "@tanstack/react-query"
import { UserResponse, USERS_API_URL } from "../constants"
import axios from "axios"


const useUsers = (search: string) => {
  const { data, isLoading, error } = useQuery<UserResponse>({ queryKey: ['users', search], queryFn: () => getUsers(search) })
  return { userData: data, usersIsLoading: isLoading, userError: error }
}

const getUsers = (search: string): Promise<UserResponse> => axios.get(`${USERS_API_URL}?search=${search}`,).then(res => res.data)

export default useUsers