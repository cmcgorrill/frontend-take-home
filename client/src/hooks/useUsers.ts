import { useQuery } from "@tanstack/react-query"
import { UserResponse, USERS_API_URL } from "../constants"
import axios from "axios"


const useUsers = () => {
  const { data, isLoading, error } = useQuery<UserResponse>({ queryKey: ['users'], queryFn: getUsers })
  return { userData: data, usersIsLoading: isLoading, userError: error }
}

const getUsers = (): Promise<UserResponse> => axios.get(USERS_API_URL).then(res => res.data)

export default useUsers