import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Role, ROLES_API_URL, RolesQueryData } from "../constants"
import axios from "axios"

interface RolePatchParams {
  roleId: string
  newName: string
}

const useRoles = (): RolesQueryData => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<Role[]>({ queryKey: ['roles'], queryFn: getRoles })

  const updateMutation = useMutation({
    mutationFn: (params: RolePatchParams) => updateRoleName(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })

  const onUpdate = (roleId: string, newName: string) => {
    updateMutation.mutate({ roleId, newName })
  }

  return { data, isLoading, onUpdate }
}

const getRoles = (): Promise<Role[]> => axios.get(ROLES_API_URL).then(res => res.data.data)

const updateRoleName = (params: RolePatchParams) =>
  axios.patch(`${ROLES_API_URL}/${params.roleId}`, { name: params.newName })


export default useRoles