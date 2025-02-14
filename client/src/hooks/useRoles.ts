import { useQuery } from "@tanstack/react-query"
import { Role, ROLES_API_URL } from "../constants"
import axios from "axios"


const useRoles = () => {
  const { data, isLoading, error } = useQuery<Role[]>({ queryKey: ['roles'], queryFn: getUsers })
  return { rolesData: data, rolesIsLoading: isLoading, rolesError: error }
}

const getUsers = (): Promise<Role[]> => axios.get(ROLES_API_URL).then(res => res.data.data)

export default useRoles